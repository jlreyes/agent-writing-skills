#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const errors = [];

const skill = await readFile(new URL("skills/writing/SKILL.md", root), "utf8");
const agentRules = await readFile(
  new URL("skills/writing/references/agent-rules.md", root),
  "utf8",
);
const surveys = await readFile(
  new URL("skills/writing/references/surveys.md", root),
  "utf8",
);
const claudeAgent = await readFile(new URL("agents/writer.md", root), "utf8");
const codexAgent = await readFile(
  new URL(".codex/agents/writer.toml", root),
  "utf8",
);
const codexManifest = JSON.parse(
  await readFile(new URL(".codex-plugin/plugin.json", root), "utf8"),
);
const codexMarketplace = JSON.parse(
  await readFile(new URL(".codex-plugin/marketplace.json", root), "utf8"),
);
JSON.parse(await readFile(new URL(".claude-plugin/plugin.json", root), "utf8"));
JSON.parse(await readFile(new URL(".claude-plugin/marketplace.json", root), "utf8"));
const referenceLinks = [
  ...skill.matchAll(/\]\((references\/[a-z-]+\.md)\)/g),
].map((match) => match[1]);

for (const reference of new Set(referenceLinks)) {
  try {
    await access(new URL(`skills/writing/${reference}`, root));
  } catch {
    errors.push(`broken skill reference: ${reference}`);
  }
}

if (referenceLinks.length === 0) {
  errors.push("writing skill does not link any specialized references");
}
if (skill.includes("${CLAUDE_SKILL_DIR}") || skill.includes("use `Read`")) {
  errors.push("portable skill must use relative links instead of Claude-specific loading mechanics");
}

const skillFrontmatter = skill.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
const skillKeys = [...skillFrontmatter.matchAll(/^([a-zA-Z0-9_-]+):/gm)].map(
  (match) => match[1],
);
if (skillKeys.some((key) => !["name", "description"].includes(key))) {
  errors.push("portable skill frontmatter may contain only name and description");
}
if (!skillFrontmatter.includes("description: Use for every meaningful prose task")) {
  errors.push("writing skill description must lead with its activation condition");
}

for (const artifact of [
  "user responses",
  "README",
  "AGENTS.md",
  "CLAUDE.md",
  "skills",
  "prompts",
  "plans",
  "reports",
  "surveys",
  "PR",
  "comments",
  "docstrings",
]) {
  if (!skillFrontmatter.includes(artifact)) {
    errors.push(`writing skill description omits recognizable artifact: ${artifact}`);
  }
}
for (const source of ["surveymonkey.com", "research.google", "measuringu.com"]) {
  if (!surveys.includes(source)) {
    errors.push(`survey reference omits practitioner source: ${source}`);
  }
}

if (!claudeAgent.includes("description: >\n  Delegate to this fresh writer")) {
  errors.push("Claude writer description must lead with its delegation condition");
}
if (!claudeAgent.includes("model: sonnet") || !claudeAgent.includes("effort: medium")) {
  errors.push("Claude writer must declare Sonnet at medium effort");
}
if (claudeAgent.includes("maxTurns:")) {
  errors.push("Claude writer must not impose an arbitrary turn ceiling");
}
if (!codexAgent.includes('name = "writer"') || !codexAgent.includes('description = "Delegate to this fresh writer')) {
  errors.push("Codex writer must use the native standalone custom-agent schema");
}
if (!codexAgent.includes('model = "gpt-5.6-terra"') || !codexAgent.includes('model_reasoning_effort = "medium"')) {
  errors.push("Codex writer must declare Terra at medium effort");
}
if (!codexAgent.includes("developer_instructions")) {
  errors.push("Codex writer role must define developer instructions");
}
if (!skill.includes("For every activation, load [style]")) {
  errors.push("writing skill must always load the universal style reference");
}
for (const source of [
  "the-new-rules-of-context-engineering-for-claude-5-generation-models",
  "claude-prompting-best-practices",
]) {
  if (!agentRules.includes(source)) {
    errors.push(`canonical agent-rules reference omits source grounding: ${source}`);
  }
}
try {
  await access(new URL(".codex/config.toml", root));
  errors.push("Codex adapter must not use the obsolete [agents.writer] indirection");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
await access(new URL("scripts/install-codex-agent.mjs", root));
if (codexManifest.skills !== "./skills/") {
  errors.push("Codex plugin manifest must expose the portable skill directory");
}
const codexMarketplaceEntry = codexMarketplace.plugins?.find(
  (entry) => entry.name === codexManifest.name,
);
if (
  codexMarketplaceEntry?.source?.source !== "local" ||
  codexMarketplaceEntry.source.path !== "./"
) {
  errors.push("Codex marketplace must point at the repository-root plugin");
}
if (
  codexMarketplaceEntry?.policy?.installation !== "AVAILABLE" ||
  codexMarketplaceEntry.policy.authentication !== "ON_INSTALL"
) {
  errors.push("Codex marketplace must declare explicit installation and authentication policy");
}

const doctrine = "The more durable and behavior-shaping the prose";
if (!agentRules.includes(doctrine)) {
  errors.push("canonical agent-rules reference is missing the ownership doctrine");
}
for (const [name, text] of [
  ["portable skill", skill],
  ["Claude adapter", claudeAgent],
  ["Codex adapter", codexAgent],
]) {
  if (text.includes(doctrine)) errors.push(`${name} duplicates the canonical doctrine`);
}

if (errors.length > 0) {
  for (const error of errors) process.stderr.write(`ERROR: ${error}\n`);
  process.exit(1);
}

process.stdout.write(
  `Validated ${new Set(referenceLinks).size} portable skill references.\n`,
);
