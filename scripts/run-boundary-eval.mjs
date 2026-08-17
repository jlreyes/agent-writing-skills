#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import {
  copyFile,
  cp,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  symlink,
} from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const platform = process.argv[2];
const selectedCase = process.argv[3];
const cases = JSON.parse(
  await readFile(new URL("../evals/boundary-cases.json", import.meta.url), "utf8"),
).filter((entry) => !selectedCase || entry.id === selectedCase);
const claudePluginVersion = JSON.parse(
  await readFile(new URL("../.claude-plugin/plugin.json", import.meta.url), "utf8"),
).version;

if (!["claude", "codex"].includes(platform) || cases.length === 0) {
  process.stderr.write(
    "Usage: node scripts/run-boundary-eval.mjs <claude|codex> [case-id]\n",
  );
  process.exit(2);
}

const timeout = Number(process.env.EVAL_TIMEOUT_MS ?? 180_000);
let failures = 0;
let limitations = 0;

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    encoding: "utf8",
    maxBuffer: 30 * 1024 * 1024,
    timeout,
    ...options,
  });
}

function parseJsonLines(output) {
  return output
    .split("\n")
    .filter((line) => line.trim().startsWith("{"))
    .map((line) => JSON.parse(line));
}

function finish(caseId, issues, runtimeLimitations = []) {
  if (issues.length > 0) {
    failures += 1;
    process.stderr.write(`FAIL ${platform} ${caseId}: ${issues.join("; ")}\n`);
    return;
  }
  if (runtimeLimitations.length > 0) {
    limitations += 1;
    process.stdout.write(
      `LIMITATION ${platform} ${caseId}: ${runtimeLimitations.join("; ")}\n`,
    );
    return;
  }
  process.stdout.write(`PASS ${platform} ${caseId}\n`);
}

async function installClaudePlugin() {
  const configDir = await mkdtemp(join(tmpdir(), "agent-writing-claude-"));
  const env = { ...process.env, CLAUDE_CONFIG_DIR: configDir };
  const add = run("claude", ["plugin", "marketplace", "add", root], { env });
  if (add.status !== 0) throw new Error(add.stderr || add.stdout);
  const install = run(
    "claude",
    ["plugin", "install", "agent-writing@agent-writing"],
    { env },
  );
  if (install.status !== 0) throw new Error(install.stderr || install.stdout);
  return {
    configDir,
    pluginDir: join(
      configDir,
      `plugins/cache/agent-writing/agent-writing/${claudePluginVersion}`,
    ),
  };
}

async function runClaude() {
  const installed = await installClaudePlugin();
  try {
    for (const testCase of cases) {
      const fixture = resolve(root, "evals/fixtures/AGENTS.md");
      const prompt = testCase.prompt.replace("{fixture}", fixture);
      const cli = run(
        "claude",
        [
          "--plugin-dir", installed.pluginDir,
          "--add-dir", root,
          "--add-dir", installed.pluginDir,
          "-p", prompt,
          "--model", process.env.EVAL_CLAUDE_MODEL ?? "sonnet",
          "--effort", process.env.EVAL_CLAUDE_EFFORT ?? "low",
          "--tools", "Agent,Read,Skill",
          "--setting-sources", "",
          "--strict-mcp-config",
          "--mcp-config", '{"mcpServers":{}}',
          "--output-format", "stream-json",
          "--verbose",
          "--forward-subagent-text",
          "--no-session-persistence",
          "--max-budget-usd", process.env.EVAL_MAX_BUDGET_USD ?? "1.00",
        ],
        { cwd: root },
      );
      const issues = [];
      if (cli.error || cli.status !== 0) {
        issues.push(cli.error?.message ?? `Claude exited ${cli.status}`);
        process.stderr.write(cli.stderr);
        if (process.env.EVAL_DEBUG && cli.stdout) {
          process.stderr.write(cli.stdout);
        }
        finish(testCase.id, issues);
        continue;
      }

      const events = parseJsonLines(cli.stdout);
      const init = events.find(
        (event) => event.type === "system" && event.subtype === "init",
      );
      const loaded =
        init?.plugins?.some((plugin) => plugin.name === "agent-writing") &&
        init?.agents?.includes("agent-writing:writer") &&
        init?.skills?.includes("agent-writing:writing");
      if (!loaded) issues.push("installed plugin, writer, and skill were not discovered");

      const blocks = events.flatMap((event) =>
        event.type === "assistant" ? (event.message?.content ?? []) : [],
      );
      const skillActivated = blocks.some(
        (block) =>
          block.type === "tool_use" &&
          block.name === "Skill" &&
          JSON.stringify(block.input).includes("agent-writing:writing"),
      );
      const delegated = blocks.some(
        (block) =>
          block.type === "tool_use" &&
          ["Agent", "Task"].includes(block.name) &&
          block.input?.subagent_type === "agent-writing:writer",
      );
      const writerReads = events.flatMap((event) =>
        event.type === "assistant" &&
        (event.parent_tool_use_id || event.message?.parent_tool_use_id)
          ? (event.message?.content ?? []).filter(
              (block) => block.type === "tool_use" && block.name === "Read",
            )
          : [],
      );
      const readPaths = writerReads.map((block) => block.input?.file_path ?? "");
      const allReadPaths = blocks
        .filter((block) => block.type === "tool_use" && block.name === "Read")
        .map((block) => block.input?.file_path ?? "");
      const failedTool = events.some(
        (event) =>
          event.type === "user" &&
          event.message?.content?.some(
            (block) => block.type === "tool_result" && block.is_error,
          ),
      );
      const result = [...events]
        .reverse()
        .find((event) => event.type === "result")?.result;

      if (testCase.expectSkill && testCase.id === "fresh-skill-discovery" && !skillActivated) {
        issues.push("writing skill did not activate implicitly");
      }
      if (!testCase.expectSkill && skillActivated) {
        issues.push("writing skill activated for trivial prose");
      }
      if (delegated !== testCase.expectDelegation) {
        issues.push(
          testCase.expectDelegation
            ? "writer was not delegated"
            : "writer was delegated unexpectedly",
        );
      }
      for (const expected of testCase.expectedReads ?? []) {
        const paths = expected.startsWith("references/") ? readPaths : allReadPaths;
        if (!paths.some((path) => path.endsWith(expected))) {
          issues.push(`controlled session did not read designated ${expected}`);
        }
      }
      for (const forbidden of testCase.forbiddenReads ?? []) {
        if (allReadPaths.some((path) => path.endsWith(forbidden))) {
          issues.push(`session explored forbidden ${forbidden}`);
        }
      }
      if (failedTool) issues.push("a tool call failed");
      if (!result) issues.push("no final result");
      if (testCase.mustInclude && !result?.includes(testCase.mustInclude)) {
        issues.push(`result omitted ${testCase.mustInclude}`);
      }
      if (result?.includes("UNRELATED-CONTEXT-7F3A")) {
        issues.push("unrelated context canary leaked into the result");
      }
      if (issues.length > 0 && process.env.EVAL_DEBUG) {
        process.stderr.write(cli.stdout);
      }
      finish(testCase.id, issues);
    }
  } finally {
    if (!process.env.EVAL_KEEP_TEMP) {
      await rm(installed.configDir, { recursive: true, force: true });
    }
  }
}

async function findFiles(directory, suffix) {
  const found = [];
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return found;
    throw error;
  }
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...(await findFiles(path, suffix)));
    if (entry.isFile() && entry.name.endsWith(suffix)) found.push(path);
  }
  return found;
}

async function readRollout(directory, threadId) {
  const files = await findFiles(directory, ".jsonl");
  const path = files.find((candidate) => basename(candidate).includes(threadId));
  if (!path) return [];
  return parseJsonLines(await readFile(path, "utf8"));
}

async function installCodexPlugin() {
  const configDir = await mkdtemp(join(tmpdir(), "agent-writing-codex-"));
  const projectDir = await mkdtemp(join(tmpdir(), "agent-writing-project-"));
  const auth = resolve(homedir(), ".codex/auth.json");
  await symlink(auth, join(configDir, "auth.json"));
  const env = { ...process.env, CODEX_HOME: configDir };
  const add = run(
    "codex",
    ["plugin", "marketplace", "add", root, "--json"],
    { env },
  );
  if (add.status !== 0) throw new Error(add.stderr || add.stdout);
  const install = run(
    "codex",
    ["plugin", "add", "agent-writing@agent-writing", "--json"],
    { env },
  );
  if (install.status !== 0) throw new Error(install.stderr || install.stdout);

  await mkdir(join(projectDir, ".codex/agents"), { recursive: true });
  await mkdir(join(projectDir, "evals/fixtures"), { recursive: true });
  await copyFile(
    resolve(root, ".codex/config.toml"),
    join(projectDir, ".codex/config.toml"),
  );
  await copyFile(
    resolve(root, ".codex/agents/writer.toml"),
    join(projectDir, ".codex/agents/writer.toml"),
  );
  await cp(resolve(root, "evals/fixtures"), join(projectDir, "evals/fixtures"), {
    recursive: true,
  });
  const git = run("git", ["init", "--quiet"], { cwd: projectDir });
  if (git.status !== 0) throw new Error(git.stderr || git.stdout);
  return { configDir, projectDir, env };
}

async function runCodex() {
  const installed = await installCodexPlugin();
  try {
    for (const testCase of cases) {
      const fixture = resolve(installed.projectDir, "evals/fixtures/AGENTS.md");
      const prompt = testCase.prompt.replace("{fixture}", fixture);
      const trust = `projects.${JSON.stringify(installed.projectDir)}.trust_level=\"trusted\"`;
      const args = [
        "--strict-config",
        "--enable", "multi_agent_v2",
        "exec",
        "--json",
        "--ignore-rules",
        "--skip-git-repo-check",
        "-s", "read-only",
        "-m", process.env.EVAL_CODEX_PARENT_MODEL ?? "gpt-5.6-sol",
        "-c", `model_reasoning_effort=\"${process.env.EVAL_CODEX_PARENT_EFFORT ?? "medium"}\"`,
        "-c", "agents.max_depth=1",
        "-c", "agents.max_concurrent_threads_per_session=4",
        "-c", trust,
        "-C", installed.projectDir,
      ];
      if (!testCase.expectDelegation) args.push("--ephemeral");
      args.push(prompt);
      const cli = run("codex", args, { cwd: installed.projectDir, env: installed.env });
      const issues = [];
      const runtimeLimitations = [];
      if (cli.error || cli.status !== 0) {
        issues.push(cli.error?.message ?? `Codex exited ${cli.status}`);
        process.stderr.write(cli.stderr);
        finish(testCase.id, issues);
        continue;
      }

      const stream = parseJsonLines(cli.stdout);
      const threadId = stream.find((event) => event.type === "thread.started")?.thread_id;
      const result = [...stream]
        .reverse()
        .find((event) => event.type === "item.completed" && event.item?.type === "agent_message")
        ?.item?.text;
      const parent = threadId
        ? await readRollout(resolve(installed.configDir, "sessions"), threadId)
        : [];
      const commandText = stream
        .filter((event) => event.item?.type === "command_execution")
        .map((event) => `${event.item?.command ?? ""}\n${event.item?.aggregated_output ?? ""}`)
        .join("\n");
      const skillActivated =
        commandText.includes("/skills/writing/SKILL.md") &&
        commandText.includes("# Write for readers");
      const spawn = parent.find(
        (event) =>
          event.type === "response_item" &&
          event.payload?.type === "function_call" &&
          event.payload?.name === "spawn_agent",
      );
      const childId = parent.find(
        (event) =>
          event.type === "event_msg" &&
          event.payload?.type === "sub_agent_activity" &&
          event.payload?.kind === "started",
      )?.payload?.agent_thread_id;
      const child = childId
        ? await readRollout(resolve(installed.configDir, "sessions"), childId)
        : [];
      const childMeta = child.find((event) => event.type === "session_meta")?.payload;
      const agentRole = childMeta?.source?.subagent?.thread_spawn?.agent_role;
      const childText = JSON.stringify(child);

      if (testCase.expectSkill && !skillActivated) {
        issues.push("installed writing skill did not activate successfully");
      }
      if (!testCase.expectSkill && skillActivated) {
        issues.push("writing skill activated for trivial prose");
      }
      if (!testCase.expectDelegation && spawn) {
        issues.push("writer was delegated unexpectedly");
      }
      if (testCase.expectDelegation) {
        if (!spawn) {
          runtimeLimitations.push(
            "Codex 0.146.0 did not automatically delegate from the registered writer description",
          );
        } else if (agentRole !== "writer") {
          runtimeLimitations.push(
            "Codex 0.146.0 launched a generic child instead of applying the registered writer role",
          );
        }
        for (const expected of testCase.expectedReads ?? []) {
          if (spawn && !childText.includes(expected)) {
            runtimeLimitations.push(`child did not read designated ${expected}`);
          }
        }
        for (const forbidden of testCase.forbiddenReads ?? []) {
          if (childText.includes(forbidden)) {
            issues.push(`child explored forbidden ${forbidden}`);
          }
        }
      }
      if (!result) issues.push("no final result");
      if (testCase.mustInclude && !result?.includes(testCase.mustInclude)) {
        issues.push(`result omitted ${testCase.mustInclude}`);
      }
      if (result?.includes("UNRELATED-CONTEXT-7F3A")) {
        issues.push("unrelated context canary leaked into the result");
      }
      if (issues.length > 0 && process.env.EVAL_DEBUG) {
        process.stderr.write(cli.stdout);
      }
      finish(testCase.id, issues, runtimeLimitations);
    }
  } finally {
    if (!process.env.EVAL_KEEP_TEMP) {
      await rm(installed.configDir, { recursive: true, force: true });
      await rm(installed.projectDir, { recursive: true, force: true });
    }
  }
}

try {
  if (platform === "claude") await runClaude();
  if (platform === "codex") await runCodex();
} catch (error) {
  process.stderr.write(`${error.stack ?? error.message}\n`);
  process.exit(1);
}

if (limitations > 0) {
  process.stdout.write(`${limitations} runtime limitation(s) observed.\n`);
}
process.exit(failures > 0 ? 1 : 0);
