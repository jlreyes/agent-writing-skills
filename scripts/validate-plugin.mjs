#!/usr/bin/env node

import { readFile, readdir } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const errors = [];

async function read(relativePath) {
  try {
    return await readFile(new URL(relativePath, root), "utf8");
  } catch (error) {
    errors.push(`${relativePath}: cannot read (${error.message})`);
    return "";
  }
}

function frontmatter(source, relativePath) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    errors.push(`${relativePath}: missing YAML frontmatter`);
    return "";
  }
  return match[1];
}

function field(yaml, name) {
  return yaml.match(new RegExp(`^${name}:\\s*(.+)$`, "m"))?.[1]?.trim();
}

const pluginSource = await read(".claude-plugin/plugin.json");
const marketplaceSource = await read(".claude-plugin/marketplace.json");
let plugin;
let marketplace;

try {
  plugin = JSON.parse(pluginSource);
} catch (error) {
  errors.push(`.claude-plugin/plugin.json: invalid JSON (${error.message})`);
}

try {
  marketplace = JSON.parse(marketplaceSource);
} catch (error) {
  errors.push(`.claude-plugin/marketplace.json: invalid JSON (${error.message})`);
}

if (plugin?.name !== "agent-writing") {
  errors.push(`plugin name must be agent-writing; found ${plugin?.name ?? "missing"}`);
}
if (!/^\d+\.\d+\.\d+$/.test(plugin?.version ?? "")) {
  errors.push(`plugin version must be semantic; found ${plugin?.version ?? "missing"}`);
}
if (marketplace?.name !== "agent-writing") {
  errors.push(`marketplace name must be agent-writing; found ${marketplace?.name ?? "missing"}`);
}
const listing = marketplace?.plugins?.find((entry) => entry.name === "agent-writing");
if (!listing || listing.source !== "./" || listing.strict !== true) {
  errors.push("marketplace must strictly list agent-writing from ./");
}

const skillEntries = (await readdir(new URL("skills/", root), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

if (JSON.stringify(skillEntries) !== JSON.stringify(["writing"])) {
  errors.push(`expected one writing skill; found ${skillEntries.join(", ")}`);
}

const skillPath = "skills/writing/SKILL.md";
const skillSource = await read(skillPath);
const skillYaml = frontmatter(skillSource, skillPath);
if (field(skillYaml, "name") !== "writing") {
  errors.push(`${skillPath}: name must be writing`);
}
const skillDescription = field(skillYaml, "description");
if (!skillDescription || skillDescription.length > 1024) {
  errors.push(`${skillPath}: description must be 1-1024 characters`);
}
if (skillSource.split("\n").length > 500) {
  errors.push(`${skillPath}: SKILL.md must stay below 500 lines`);
}

const expectedReferences = [
  "agent-rules.md",
  "conversation.md",
  "editing.md",
  "reports.md",
  "style.md",
  "technical-documentation.md",
  "technical-plans.md",
];
const referenceEntries = (await readdir(new URL("skills/writing/references/", root)))
  .filter((name) => name.endsWith(".md"))
  .sort();

if (JSON.stringify(referenceEntries) !== JSON.stringify(expectedReferences)) {
  errors.push(`unexpected references: ${referenceEntries.join(", ")}`);
}
for (const reference of expectedReferences) {
  const expectedPath = '${CLAUDE_SKILL_DIR}/references/' + reference;
  if (!skillSource.includes(expectedPath)) {
    errors.push(`${skillPath}: does not route to ${reference}`);
  }
}

const agentPath = "agents/writer.md";
const agentSource = await read(agentPath);
const agentYaml = frontmatter(agentSource, agentPath);
if (field(agentYaml, "name") !== "writer") {
  errors.push(`${agentPath}: name must be writer`);
}
if (field(agentYaml, "tools") !== "Read") {
  errors.push(`${agentPath}: writer must allow only Read`);
}
if (!/^\s+- writing\s*$/m.test(agentYaml)) {
  errors.push(`${agentPath}: writing skill must be preloaded`);
}
if (field(agentYaml, "maxTurns") !== "6") {
  errors.push(`${agentPath}: maxTurns must remain bounded at 6`);
}

if (errors.length) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${plugin.name} ${plugin.version}: one writer, one skill, ` +
      `${referenceEntries.length} references`,
  );
}
