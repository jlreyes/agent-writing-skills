#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const [command, ...args] = process.argv.slice(2);

if (command === "--help" || command === "-h" || !command) {
  usage(command ? 0 : 2);
}

if (command === "inventory") {
  if (args.length !== 2) usage(2);
  inventory(args[0], args[1]);
} else if (command === "check") {
  if (args.length < 3 || args.length > 4) usage(2);
  check(args[0], args[1], args[2], args[3]);
} else {
  usage(2);
}

function usage(exitCode) {
  console.log("Usage:");
  console.log("  node audit-remap.mjs inventory <source.md> <manifest.json>");
  console.log("  node audit-remap.mjs check <source.md> <target.md> <manifest.json> [report.json]");
  process.exit(exitCode);
}

function read(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch (error) {
    console.error(`ERROR cannot read ${file}: ${error.message}`);
    process.exit(2);
  }
}

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function normalizeText(value, type) {
  const unix = value.replace(/\r\n?/g, "\n").trimEnd();
  if (type === "heading") return unix.replace(/^#{1,6}\s+/, "");
  return unix;
}

function slugifyHeading(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function isTableLine(line) {
  return /^\s*\|.*\|\s*$/.test(line);
}

function isListStart(line) {
  return /^\s*(?:[-*+] |\d+[.)] )\S/.test(line);
}

function isStructuralStart(line) {
  return /^\s*(?:`{3,}|~{3,})/.test(line) || /^#{1,6}\s+\S/.test(line) || isTableLine(line) || isListStart(line);
}

function extractUnits(source) {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const units = [];
  const headingStack = [];
  const slugCounts = new Map();
  let index = 0;

  const add = (type, start, end, metadata = {}) => {
    const raw = lines.slice(start, end + 1).join("\n");
    const normalized = normalizeText(raw, type);
    const ancestry = headingStack.filter(Boolean).map((heading) => heading.anchor);
    units.push({
      id: `U${String(units.length + 1).padStart(4, "0")}`,
      type,
      startLine: start + 1,
      endLine: end + 1,
      sha256: sha256(normalized),
      normalized,
      sectionAnchor: metadata.sectionAnchor || ancestry.at(-1) || "#document",
      headingAncestry: metadata.headingAncestry || ancestry,
      ...metadata,
    });
  };

  while (index < lines.length) {
    if (!lines[index].trim()) {
      index += 1;
      continue;
    }

    const fence = lines[index].match(/^\s*(`{3,}|~{3,})\s*([^\s`~]*)/);
    if (fence) {
      const fenceCharacter = fence[1][0];
      const minimumLength = fence[1].length;
      const closingFence = new RegExp(`^\\s*${fenceCharacter === "`" ? "`" : "~"}{${minimumLength},}\\s*$`);
      let end = index + 1;
      while (end < lines.length && !closingFence.test(lines[end])) end += 1;
      if (end >= lines.length) end = lines.length - 1;
      add(fence[2].toLowerCase() === "mermaid" ? "diagram" : "fence", index, end);
      index = end + 1;
      continue;
    }

    const heading = lines[index].match(/^(#{1,6})\s+(.+)/);
    if (heading) {
      const level = heading[1].length;
      const title = heading[2].trim();
      const base = slugifyHeading(title) || "section";
      const duplicate = slugCounts.get(base) || 0;
      slugCounts.set(base, duplicate + 1);
      const anchor = `#${base}${duplicate ? `-${duplicate}` : ""}`;
      headingStack.length = level - 1;
      headingStack[level - 1] = { anchor, title, level };
      const ancestry = headingStack.filter(Boolean).map((item) => item.anchor);
      add("heading", index, index, {
        sectionAnchor: anchor,
        headingAncestry: ancestry,
        headingLevel: level,
        headingTitle: title,
      });
      index += 1;
      continue;
    }

    if (isTableLine(lines[index])) {
      add("table-row", index, index);
      index += 1;
      continue;
    }

    if (isListStart(lines[index])) {
      let end = index + 1;
      while (
        end < lines.length &&
        lines[end].trim() &&
        !isStructuralStart(lines[end])
      ) {
        end += 1;
      }
      add("list-item", index, end - 1);
      index = end;
      continue;
    }

    let end = index + 1;
    while (end < lines.length && lines[end].trim() && !isStructuralStart(lines[end])) end += 1;
    add("paragraph", index, end - 1);
    index = end;
  }

  return units;
}

function countMatches(source, pattern) {
  return [...source.matchAll(pattern)].length;
}

function multiset(source, pattern, transform = (match) => match[0]) {
  const result = new Map();
  for (const match of source.matchAll(pattern)) {
    const value = transform(match);
    result.set(value, (result.get(value) || 0) + 1);
  }
  return result;
}

function sourceStats(source, units) {
  const splitLines = source.replace(/\r\n?/g, "\n").split("\n");
  const tableRows = units.filter((unit) => unit.type === "table-row");
  const tableSeparators = tableRows.filter((unit) => /^\|?\s*:?-{3,}/.test(unit.normalized));
  return {
    lines: splitLines.length - (splitLines.at(-1) === "" ? 1 : 0),
    words: source.trim().split(/\s+/).filter(Boolean).length,
    bytes: Buffer.byteLength(source),
    headings: units.filter((unit) => unit.type === "heading").length,
    tables: tableSeparators.length,
    tableRows: tableRows.length - 2 * tableSeparators.length,
    diagrams: units.filter((unit) => unit.type === "diagram").length,
    otherFencedBlocks: units.filter((unit) => unit.type === "fence").length,
    protectedUnits: units.length,
  };
}

function literalInventory(source) {
  const values = (pattern, transform = (match) => match[0]) =>
    [...new Set([...source.matchAll(pattern)].map(transform))].sort();
  const identifierCounts = Object.fromEntries(
    [...multiset(source, /\b(?:D|V|P|S)\d{1,3}\b/g)].sort(([left], [right]) => left.localeCompare(right)),
  );
  const normativeLines = source
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line, index) => (/\b(?:must|never|only|non-negotiable|rejected|deferred|accepted)\b/i.test(line) ? index + 1 : null))
    .filter(Boolean);

  return {
    identifierCounts,
    routes: values(/\b(?:GET|POST|PUT|PATCH|DELETE)\s+\/[^\s`|)]+/g),
    errorLiterals: values(/\b[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+\b/g),
    inlineCode: values(/`([^`\n]+)`/g, (match) => match[1]),
    urls: values(/https?:\/\/[^\s)>]+/g),
    markdownLinkTargets: values(/\]\(([^)]+)\)/g, (match) => match[1]),
    versions: values(/\b\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?\b/g),
    operationHeadings: values(/^#{1,6}\s+(Operation\s+[A-Z][^\n]*)$/gm, (match) => match[1]),
    decisionDefinitions: values(/\bD\d{1,3}\s+—[^\n]*/g),
    verificationDefinitions: values(/\bV\d{1,3}\s+—[^\n]*/g),
    normativeLines,
  };
}

function inventory(sourceFile, manifestFile) {
  const source = read(sourceFile);
  const units = extractUnits(source);
  const manifest = {
    version: 1,
    source: {
      path: path.resolve(sourceFile),
      sha256: sha256(source),
      ...sourceStats(source, units),
      protectedLiterals: literalInventory(source),
    },
    units: units.map(({ normalized: _normalized, ...unit }) => ({
      ...unit,
      status: "verbatim",
      targetLocations: [unit.sectionAnchor],
      note: "",
    })),
  };

  try {
    fs.writeFileSync(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`, { flag: "wx" });
  } catch (error) {
    console.error(`ERROR cannot create ${manifestFile}: ${error.message}`);
    process.exit(2);
  }

  console.log(`Remap inventory: ${path.resolve(sourceFile)}`);
  console.log(`Manifest: ${path.resolve(manifestFile)}`);
  const { protectedLiterals, ...summary } = manifest.source;
  console.log(JSON.stringify(summary, null, 2));
  console.log(
    `Protected literals: ${Object.keys(protectedLiterals.identifierCounts).length} identifier(s), ` +
      `${protectedLiterals.routes.length} route(s), ${protectedLiterals.inlineCode.length} inline-code literal(s), ` +
      `${protectedLiterals.normativeLines.length} normative line(s).`,
  );
}

function check(sourceFile, targetFile, manifestFile, reportFile) {
  const source = read(sourceFile);
  const target = read(targetFile);
  let manifest;
  try {
    manifest = JSON.parse(read(manifestFile));
  } catch (error) {
    console.error(`ERROR invalid manifest JSON: ${error.message}`);
    process.exit(2);
  }

  const errors = [];
  const warnings = [];
  compareMultilineCodeSpans(source, target, errors);
  rejectHiddenMarkdown(target, errors);
  const sourceUnits = extractUnits(source);
  const targetUnits = extractUnits(target);
  const sourceHash = sha256(source);
  const mappings = [];

  if (manifest?.version !== 1) errors.push("Manifest version must be 1.");
  if (manifest?.source?.sha256 !== sourceHash) errors.push("Manifest source hash does not match the current source.");
  if (manifest?.units?.length !== sourceUnits.length) errors.push("Manifest unit count does not match the current source.");

  const manifestById = new Map((manifest.units || []).map((unit) => [unit.id, unit]));
  const usedTargetUnits = new Set();
  const lastTargetLineBySection = new Map();

  for (const unit of sourceUnits) {
    const record = manifestById.get(unit.id);
    if (!record || record.sha256 !== unit.sha256) {
      errors.push(`${unit.id} ${unit.type} lines ${unit.startLine}-${unit.endLine}: manifest entry is missing or stale.`);
      continue;
    }

    if (record.status !== "verbatim") {
      errors.push(`${unit.id} ${unit.type} lines ${unit.startLine}-${unit.endLine}: non-verbatim status is a manual-review exception and cannot receive automatic lossless certification.`);
      continue;
    }

    if (!record.targetLocations?.includes(unit.sectionAnchor)) {
      errors.push(`${unit.id} ${unit.type} lines ${unit.startLine}-${unit.endLine}: manifest lost its source-section target ${unit.sectionAnchor}.`);
      continue;
    }

    const lastLine = lastTargetLineBySection.get(unit.sectionAnchor) || 0;
    const candidateIndex = targetUnits.findIndex(
      (candidate, targetIndex) =>
        !usedTargetUnits.has(targetIndex) &&
        candidate.type === unit.type &&
        candidate.sha256 === unit.sha256 &&
        candidate.sectionAnchor === unit.sectionAnchor &&
        candidate.startLine > lastLine &&
        isSubsequence(unit.headingAncestry, candidate.headingAncestry),
    );

    if (candidateIndex < 0) {
      errors.push(`${unit.id} ${unit.type} lines ${unit.startLine}-${unit.endLine}: exact unit is absent, outside preserved heading context, duplicated onto an already-used target, or out of relative order.`);
      continue;
    }

    usedTargetUnits.add(candidateIndex);
    const candidate = targetUnits[candidateIndex];
    lastTargetLineBySection.set(unit.sectionAnchor, candidate.startLine);
    mappings.push({
      sourceUnit: unit.id,
      sourceType: unit.type,
      sourceLines: [unit.startLine, unit.endLine],
      sourceSection: unit.sectionAnchor,
      targetLines: [candidate.startLine, candidate.endLine],
      targetSection: candidate.sectionAnchor,
      sha256: unit.sha256,
    });
  }

  const sourceCounts = sourceStats(source, sourceUnits);
  const targetCounts = sourceStats(target, targetUnits);
  for (const key of ["tables", "tableRows", "diagrams", "otherFencedBlocks"]) {
    if (targetCounts[key] < sourceCounts[key]) {
      errors.push(`${key} decreased from ${sourceCounts[key]} to ${targetCounts[key]}.`);
    }
  }

  compareMultiset("stable identifier", source, target, /\b(?:D|V|P|S)\d{1,3}\b/g, errors);
  compareMultiset("HTTP route", source, target, /\b(?:GET|POST|PUT|PATCH|DELETE)\s+\/[^\s`|)]+/g, errors);
  compareMultiset("error literal", source, target, /\b[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+\b/g, errors, true);
  compareMultiset("inline-code literal", source, target, /`([^`\n]+)`/g, errors, true, (match) => match[1]);
  compareMultiset("URL", source, target, /https?:\/\/[^\s)>]+/g, errors, true);
  compareMultiset("Markdown link target", source, target, /\]\(([^)]+)\)/g, errors, true, (match) => match[1]);
  compareMultiset("version", source, target, /\b\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?\b/g, errors, true);

  const sourceNormative = countMatches(source, /\b(?:must|never|only|non-negotiable|rejected|deferred|accepted)\b/gi);
  const targetNormative = countMatches(target, /\b(?:must|never|only|non-negotiable|rejected|deferred|accepted)\b/gi);
  if (targetNormative < sourceNormative) errors.push(`Normative-word occurrences decreased from ${sourceNormative} to ${targetNormative}; requirements may be weakened.`);

  validateInternalLinks(target, errors);

  const report = {
    version: 1,
    certified: errors.length === 0,
    source: { path: path.resolve(sourceFile), sha256: sourceHash, ...sourceCounts },
    target: { path: path.resolve(targetFile), sha256: sha256(target), ...targetCounts },
    mappings,
    errors,
    warnings,
  };

  if (reportFile) {
    try {
      fs.writeFileSync(reportFile, `${JSON.stringify(report, null, 2)}\n`, { flag: "wx" });
    } catch (error) {
      console.error(`ERROR cannot create ${reportFile}: ${error.message}`);
      process.exit(2);
    }
  }

  console.log(`Lossless remap audit: ${path.resolve(sourceFile)} -> ${path.resolve(targetFile)}`);
  console.log(`Source SHA-256: ${sourceHash}`);
  console.log(`Inventory: ${JSON.stringify(sourceCounts)}`);
  console.log(`Target:    ${JSON.stringify(targetCounts)}`);
  if (reportFile) console.log(`Report: ${path.resolve(reportFile)}`);
  for (const message of errors.slice(0, 40)) console.log(`ERROR ${message}`);
  if (errors.length > 40) console.log(`ERROR ...and ${errors.length - 40} more conservation error(s).`);
  for (const message of warnings) console.log(`WARN  ${message}`);
  console.log(`${errors.length} conservation error(s), ${warnings.length} warning(s)`);
  process.exit(errors.length ? 1 : 0);
}

function rejectHiddenMarkdown(target, errors) {
  const outsideFences = stripCodeSpans(stripFencedBlocks(target));
  if (/<!--|-->/.test(outsideFences)) {
    errors.push("HTML comments are prohibited in automatically certified targets because they can hide protected Markdown.");
  }
  const rawHtml = /<\/?[A-Za-z][^>]*>|<!\[CDATA\[|<\?|<![A-Za-z]/i;
  if (rawHtml.test(outsideFences)) {
    errors.push("Raw HTML outside fenced or inline code is prohibited in automatically certified targets because rendered visibility cannot be proven safely.");
  }
}

function compareMultilineCodeSpans(source, target, errors) {
  const sourceSpans = multisetFromValues(
    findCodeSpans(stripFencedBlocks(source)).filter((span) => span.raw.includes("\n")).map((span) => span.raw),
  );
  const targetSpans = multisetFromValues(
    findCodeSpans(stripFencedBlocks(target)).filter((span) => span.raw.includes("\n")).map((span) => span.raw),
  );

  for (const [value, count] of sourceSpans) {
    const targetCount = targetSpans.get(value) || 0;
    if (targetCount < count) errors.push(`Existing multiline code span is missing or changed (${count} source, ${targetCount} target): ${JSON.stringify(value.slice(0, 100))}.`);
  }
  for (const [value, count] of targetSpans) {
    const sourceCount = sourceSpans.get(value) || 0;
    if (count > sourceCount) errors.push(`Additional multiline code span can hide protected rendered structure (${sourceCount} source, ${count} target): ${JSON.stringify(value.slice(0, 100))}.`);
  }
}

function multisetFromValues(values) {
  const result = new Map();
  for (const value of values) result.set(value, (result.get(value) || 0) + 1);
  return result;
}

function findCodeSpans(source) {
  const spans = [];
  let cursor = 0;

  while (cursor < source.length) {
    const opener = nextBacktickRun(source, cursor);
    if (!opener) break;
    let searchCursor = opener.end;
    let closer = nextBacktickRun(source, searchCursor);
    while (closer && closer.length !== opener.length) {
      searchCursor = closer.end;
      closer = nextBacktickRun(source, searchCursor);
    }
    if (!closer) {
      cursor = opener.end;
      continue;
    }
    spans.push({ start: opener.start, end: closer.end, raw: source.slice(opener.start, closer.end) });
    cursor = closer.end;
  }

  return spans;
}

function nextBacktickRun(source, start) {
  const match = /`+/.exec(source.slice(start));
  if (!match) return null;
  const runStart = start + match.index;
  return { start: runStart, end: runStart + match[0].length, length: match[0].length };
}

function stripCodeSpans(source) {
  const spans = findCodeSpans(source);
  let result = "";
  let cursor = 0;
  for (const span of spans) {
    result += source.slice(cursor, span.start);
    result += span.raw.replace(/[^\n]/g, " ");
    cursor = span.end;
  }
  return result + source.slice(cursor);
}

function stripFencedBlocks(source) {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const visible = [];
  let index = 0;
  while (index < lines.length) {
    const fence = lines[index].match(/^\s*(`{3,}|~{3,})/);
    if (!fence) {
      visible.push(lines[index]);
      index += 1;
      continue;
    }
    const fenceCharacter = fence[1][0];
    const minimumLength = fence[1].length;
    const closingFence = new RegExp(`^\\s*${fenceCharacter === "`" ? "`" : "~"}{${minimumLength},}\\s*$`);
    index += 1;
    while (index < lines.length && !closingFence.test(lines[index])) index += 1;
    if (index < lines.length) index += 1;
  }
  return visible.join("\n");
}

function isSubsequence(expected, actual) {
  let index = 0;
  for (const value of actual) {
    if (value === expected[index]) index += 1;
  }
  return index === expected.length;
}

function validateInternalLinks(target, errors) {
  const units = extractUnits(target);
  const anchors = new Set(units.filter((unit) => unit.type === "heading").map((unit) => unit.sectionAnchor.slice(1)));
  for (const match of target.matchAll(/\]\(#([^)]+)\)/g)) {
    if (!anchors.has(match[1])) errors.push(`Internal link target does not resolve: #${match[1]}.`);
  }
}

function compareMultiset(label, source, target, pattern, errors, setOnly = false, transform) {
  const sourceValues = multiset(source, pattern, transform);
  const targetValues = multiset(target, pattern, transform);
  for (const [value, count] of sourceValues) {
    const targetCount = targetValues.get(value) || 0;
    if (targetCount < (setOnly ? 1 : count)) {
      errors.push(`${label} missing or reduced: ${JSON.stringify(value)} (${count} source, ${targetCount} target).`);
    }
  }
}
