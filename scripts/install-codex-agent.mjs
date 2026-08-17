#!/usr/bin/env node

import { copyFile, mkdir, readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = resolve(root, ".codex/agents/writer.toml");
const codexHome = resolve(process.env.CODEX_HOME ?? join(homedir(), ".codex"));
const targetDirectory = join(codexHome, "agents");
const target = join(targetDirectory, "writer.toml");
const force = process.argv.includes("--force");

let existing;
try {
  existing = await readFile(target, "utf8");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const desired = await readFile(source, "utf8");
if (existing === desired) {
  process.stdout.write(`Codex writer already current: ${target}\n`);
  process.exit(0);
}

if (existing !== undefined && !force) {
  process.stderr.write(
    `Refusing to replace existing Codex agent: ${target}\n` +
      "Review it, then rerun with --force to install this writer.\n",
  );
  process.exit(1);
}

await mkdir(targetDirectory, { recursive: true });
await copyFile(source, target);
process.stdout.write(`Installed Codex writer: ${target}\n`);
