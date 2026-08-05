#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const file = process.argv[2];
if (!file || process.argv.includes("--help")) {
  console.log("Usage: node lint-plan.mjs <document.md>");
  process.exit(file ? 0 : 2);
}

let source;
try {
  source = fs.readFileSync(file, "utf8");
} catch (error) {
  console.error(`ERROR cannot read ${file}: ${error.message}`);
  process.exit(2);
}

const lines = source.split(/\r?\n/);
const errors = [];
const warnings = [];
const error = (message) => errors.push(message);
const warn = (message) => warnings.push(message);

const firstContent = lines.find((line) => line.trim());
if (!firstContent?.match(/^#\s+\S/)) error("The first content line must be an H1 title.");

const titleIndex = lines.findIndex((line) => /^#\s+\S/.test(line));
const subtitleWindow = lines.slice(titleIndex + 1, titleIndex + 5).join("\n");
if (!/(^|\n)(\*[^*\n]+\*|_[^_\n]+_|>\s+\S+)/.test(subtitleWindow)) {
  error("Add a subtitle immediately after the title.");
}

const tocIndex = lines.findIndex((line) => /^##\s+(Table of contents|Contents)\s*$/i.test(line));
if (tocIndex < 0) error("Add a second-level Table of contents after the one-page brief.");

const onePageEnd = tocIndex >= 0 ? tocIndex : Math.min(lines.length, 160);
const onePage = lines.slice(0, onePageEnd).join("\n");

const tldr = onePage.match(/\*\*TL;?DR:?\*\*:?\s*(.+)/i);
if (!tldr) {
  error("Add a one-sentence TL;DR to the one-page brief.");
} else {
  const sentenceMarks = (tldr[1].match(/[.!?](?:\s|$)/g) || []).length;
  if (sentenceMarks > 1) warn("Keep the TL;DR to one sentence.");
  if (tldr[1].trim().split(/\s+/).length > 45) warn("Keep the TL;DR below roughly 45 words.");
}

for (const n of [1, 2, 3]) {
  if (!new RegExp(`^${n}\\.\\s+\\S`, "m").test(onePage)) {
    error("Put exactly three numbered takeaways in the one-page brief.");
    break;
  }
}
if (/^4\.\s+\S/m.test(onePage)) warn("The one-page brief should normally have three takeaways, not four or more.");

if (!/\bGoals\b/i.test(onePage) || !/\bNon-goals\b/i.test(onePage)) {
  error("Put compact goals and non-goals on the one-page brief.");
}
if (!/\bPriority order\b/i.test(onePage)) error("Put an explicit priority order on the one-page brief.");
if (!/```mermaid[\s\S]*?```/i.test(onePage)) error("Put one Mermaid architecture-at-a-glance diagram on the one-page brief.");

const onePageWords = onePage
  .replace(/```[\s\S]*?```/g, " ")
  .replace(/[#*_|>`\[\]()-]/g, " ")
  .trim()
  .split(/\s+/)
  .filter(Boolean).length;
if (onePageWords > 450) warn(`The one-page brief contains ${onePageWords} words excluding fenced blocks; target roughly 400.`);

if (!/^##\s+Principles, priorities, and repository alignment\s*$/im.test(source)) {
  error("Add a Principles, priorities, and repository alignment section.");
}
if (!/^##\s+(?:Selected architecture(?: and technical foundation)?|Architecture(?: and (?:component boundaries|contracts))?)\s*$/im.test(source)) {
  error("Add a selected architecture section that fixes the system shape and technical foundation.");
}
if (!/^##\s+Agent execution contract\s*$/im.test(source)) {
  error("Add an Agent execution contract in the same document as the architecture.");
}
if (!/^##\s+Implementation sequence\s*$/im.test(source)) {
  error("Add an implementation sequence that traces architectural decisions into build work.");
}
if (!/^##\s+(?:Testing and verification|Verification and operations)\s*$/im.test(source)) {
  error("Add testing and verification for the architectural invariants.");
}
if (!/\bLocked\b[\s\S]{0,120}\bBounded\b[\s\S]{0,120}\bOpen\b[\s\S]{0,120}\bAssumption\b/i.test(source)) {
  warn("Include a decision ledger that classifies load-bearing topics as Locked, Bounded, Open, or Assumption.");
}

const appendicesIndex = lines.findIndex((line) => /^##\s+Appendices\s*$/i.test(line));
if (appendicesIndex < 0) {
  error("Add an Appendices section for alternatives, evidence, and deep detail.");
} else {
  const core = lines.slice(0, appendicesIndex).join("\n");
  if (/^##\s+(Alternatives|Tradeoffs|Trade-offs)(?:\s+considered)?\s*$/im.test(core)) {
    warn("Move detailed alternatives and tradeoff analysis into an appendix; keep only the conclusion and principal cost in the main body.");
  }
  const appendices = lines.slice(appendicesIndex).join("\n");
  if (!/Alternatives/i.test(appendices)) warn("Add an alternatives and tradeoffs appendix when the design has credible alternatives.");
  if (!/Evidence|Prototypes/i.test(appendices)) warn("Add an evidence or prototypes appendix for load-bearing verification.");
}

let previousLevel = 0;
for (let index = 0; index < lines.length; index += 1) {
  const match = lines[index].match(/^(#{1,6})\s+\S/);
  if (!match) continue;
  const level = match[1].length;
  if (previousLevel && level > previousLevel + 1) warn(`Heading level jumps at line ${index + 1}: ${lines[index].trim()}`);
  previousLevel = level;
}

const exemptHeading = /migration|rollout|history|decision record|appendix|evidence|prototype/i;
let exempt = false;
const temporalPattern = /\b(previously|the old (?:plan|design|approach)|before this (?:change|revision)|this revision|we changed|now uses|new approach|unchanged from)\b/i;
for (let index = 0; index < lines.length; index += 1) {
  const heading = lines[index].match(/^#{1,6}\s+(.+)/);
  if (heading) exempt = exemptHeading.test(heading[1]);
  if (!exempt && temporalPattern.test(lines[index])) {
    warn(`History-shaped language outside an exempt section at line ${index + 1}: ${lines[index].trim()}`);
  }
}

const opaqueIdentifierLines = [];
for (let index = 0; index < lines.length; index += 1) {
  if (/\b[DV]\d{1,3}\b/.test(lines[index]) && !/\[[^\]]+\]\([^)]+\)/.test(lines[index])) {
    opaqueIdentifierLines.push(index + 1);
  }
}
if (opaqueIdentifierLines.length) {
  const sample = opaqueIdentifierLines.slice(0, 8).join(", ");
  const remainder = opaqueIdentifierLines.length > 8 ? `, and ${opaqueIdentifierLines.length - 8} more` : "";
  warn(
    `Possible opaque decision/evidence identifiers on ${opaqueIdentifierLines.length} line(s) ` +
      `(sample: ${sample}${remainder}); retain stable identifiers and pair each use with a descriptive link.`,
  );
}

const paragraphs = source
  .replace(/```[\s\S]*?```/g, "")
  .split(/\n\s*\n/)
  .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
  .filter((paragraph) => paragraph && !/^(#|[-*+] |\d+\. |\|)/.test(paragraph));
for (const paragraph of paragraphs) {
  const count = paragraph.split(/\s+/).length;
  if (count > 140) warn(`Dense paragraph (${count} words): ${paragraph.slice(0, 90)}...`);
}

if (/<(?:Decision-oriented title|System,|Takeaway:|Measurable|Component|Load-bearing|Material item)/i.test(source)) {
  warn("The document still contains template placeholders.");
}

console.log(`Plan lint: ${path.resolve(file)}`);
for (const message of errors) console.log(`ERROR ${message}`);
for (const message of warnings) console.log(`WARN  ${message}`);
console.log(`${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
