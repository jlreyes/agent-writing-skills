#!/usr/bin/env node

import { readFile, readdir } from "node:fs/promises";
import { basename, join } from "node:path";

const root = new URL("../skills/", import.meta.url);
const entries = (await readdir(root, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .sort((a, b) => a.name.localeCompare(b.name));

const expected = [
  "editing-documents",
  "writing-agent-rules",
  "writing-technical-documentation",
  "writing-technical-plans",
  "writing-user-facing-reports",
];

const errors = [];
const names = entries.map((entry) => entry.name);

if (JSON.stringify(names) !== JSON.stringify(expected)) {
  errors.push(`expected skills ${expected.join(", ")}; found ${names.join(", ")}`);
}

for (const entry of entries) {
  const file = new URL(`./${entry.name}/SKILL.md`, root);
  let source;

  try {
    source = await readFile(file, "utf8");
  } catch (error) {
    errors.push(`${entry.name}: missing SKILL.md (${error.message})`);
    continue;
  }

  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    errors.push(`${entry.name}: missing YAML frontmatter`);
    continue;
  }

  const frontmatter = match[1];
  const field = (name) =>
    frontmatter.match(new RegExp(`^${name}:\\s*(.+)$`, "m"))?.[1]?.trim();
  const name = field("name");
  const description = field("description");
  const license = field("license");
  const lineCount = source.split("\n").length;

  if (name !== basename(entry.name)) {
    errors.push(`${entry.name}: frontmatter name is ${name ?? "missing"}`);
  }
  if (!name || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) || name.length > 64) {
    errors.push(`${entry.name}: invalid open-standard name`);
  }
  if (!description || description.length > 1024) {
    errors.push(`${entry.name}: description must be 1-1024 characters`);
  }
  if (license !== "MIT") {
    errors.push(`${entry.name}: license must be MIT`);
  }
  if (lineCount > 500) {
    errors.push(`${entry.name}: SKILL.md has ${lineCount} lines; maximum is 500`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${entries.length} skills: ${names.join(", ")}`);
}
