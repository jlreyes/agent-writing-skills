#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const pluginDir = process.env.EVAL_PLUGIN_DIR ?? root;
const cases = JSON.parse(await readFile(new URL("../evals/cases.json", import.meta.url), "utf8"));
const caseId = process.argv[2];
const testCase = cases.find((entry) => entry.id === caseId);

if (!testCase) {
  process.stderr.write(`Usage: node scripts/run-eval.mjs <case-id>\n\nCases:\n`);
  for (const entry of cases) process.stderr.write(`  ${entry.id}\n`);
  process.exit(2);
}

const prompt = [
  "Delegate the final user-facing response to the agent-writing:writer subagent.",
  "Pass the following handoff faithfully, then return the writer's response without adding commentary:",
  testCase.handoff,
].join("\n\n");

const run = spawnSync(
  "claude",
  [
    "--plugin-dir", pluginDir,
    "--add-dir", pluginDir,
    "-p", prompt,
    "--model", process.env.EVAL_MODEL ?? "sonnet",
    "--effort", process.env.EVAL_EFFORT ?? "medium",
    "--tools", "Agent,Read",
    "--setting-sources", "",
    "--strict-mcp-config",
    "--mcp-config", '{"mcpServers":{}}',
    "--output-format", "stream-json",
    "--verbose",
    "--forward-subagent-text",
    "--no-session-persistence",
    "--max-budget-usd", process.env.EVAL_MAX_BUDGET_USD ?? "1.00",
  ],
  {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
    timeout: Number(process.env.EVAL_TIMEOUT_MS ?? 180_000),
  },
);

if (run.error) {
  process.stderr.write(`Claude eval could not complete: ${run.error.message}\n`);
  process.exit(1);
}
const events = run.stdout
  .split("\n")
  .filter(Boolean)
  .map((line) => JSON.parse(line));

const init = events.find((event) => event.type === "system" && event.subtype === "init");
const loaded =
  init?.plugins?.some((plugin) => plugin.name === "agent-writing") &&
  init?.agents?.includes("agent-writing:writer") &&
  init?.skills?.includes("agent-writing:writing");
const delegated = events.some((event) =>
  event.type === "assistant" &&
  event.message?.content?.some((block) =>
    block.type === "tool_use" &&
    ["Agent", "Task"].includes(block.name) &&
    block.input?.subagent_type === "agent-writing:writer"));
const writerReads = events.flatMap((event) =>
  event.type === "assistant" && (event.parent_tool_use_id || event.message?.parent_tool_use_id)
    ? (event.message?.content ?? []).filter((block) => block.type === "tool_use" && block.name === "Read")
    : []);
const styleRouted = writerReads.some((block) =>
  block.input?.file_path?.endsWith("/references/style.md"));
const artifactRouted = testCase.reference === "core" || writerReads.some((block) =>
  block.input?.file_path?.endsWith(`/references/${testCase.reference}.md`));
const routed = styleRouted && artifactRouted;
const failedTool = run.stdout.includes('"is_error":true') ||
  run.stdout.includes("Agent terminated early") ||
  run.stdout.includes("would be spawned with zero tools");
const result = [...events].reverse().find((event) => event.type === "result");

if (run.status !== 0 || !loaded || !delegated || !routed || failedTool || !result?.result) {
  process.stderr.write(run.stderr);
  process.stderr.write(run.stdout);
  process.stderr.write(
    "\nEval infrastructure failed: expected a loaded plugin, writer, skill, " +
    "successful delegation, universal style loading, and the declared artifact-routing behavior.\n",
  );
  process.exit(1);
}

process.stdout.write(`${result.result}\n\nReview criteria:\n`);
for (const criterion of testCase.criteria) process.stdout.write(`- ${criterion}\n`);
