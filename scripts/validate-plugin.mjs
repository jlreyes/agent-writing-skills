#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const errors = [];

const skill = await readFile(new URL("skills/writing/SKILL.md", root), "utf8");
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

if (errors.length > 0) {
  for (const error of errors) process.stderr.write(`ERROR: ${error}\n`);
  process.exit(1);
}

process.stdout.write(
  `Validated ${new Set(referenceLinks).size} portable skill references.\n`,
);
