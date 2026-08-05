# Agent Writing Skills

[![skills.sh](https://skills.sh/b/jlreyes/agent-writing-skills)](https://skills.sh/jlreyes/agent-writing-skills)

Four composable skills for writing instructions, documentation, reports, and
technical plans with coding agents. Each skill owns one writing problem and can
be installed independently.

| Skill | Use it for |
| --- | --- |
| `writing-agent-rules` | Rules, skills, system prompts, working agreements, and other text that controls agent behavior |
| `writing-technical-documentation` | Durable technical documentation organized by reader purpose and, for agent repositories, by how context is loaded |
| `writing-user-facing-reports` | Reports and analyses crossing the agent-to-user boundary |
| `writing-technical-plans` | Decision-complete architecture, RFC, and implementation plans |

## Install

List the available skills:

```bash
npx skills add jlreyes/agent-writing-skills --list
```

Install one skill:

```bash
npx skills add jlreyes/agent-writing-skills --skill writing-agent-rules
```

Install the collection:

```bash
npx skills add jlreyes/agent-writing-skills --skill '*'
```

Add `--global` to make a skill available across projects, and use `--agent`
to select a particular supported agent.

## How the skills compose

The skills share vocabulary but not ownership:

- `writing-agent-rules` applies when text instructs an agent. It does not apply
  merely because an agent is the author.
- `writing-technical-documentation` classifies durable documentation by reader
  need and chooses its canonical delivery surface. It routes plans and
  user-facing reports to their genre-specific skills.
- `writing-user-facing-reports` activates at the human handoff. It does not
  simplify agent-to-agent evidence packs, raw logs, or machine-readable output.
- `writing-technical-plans` is the primary workflow for plans and RFCs. A plan
  may instruct an implementing agent, in which case `writing-agent-rules` also
  applies.

This separation prevents a universal writing checklist from flattening
different genres. The repository is the distribution unit; each skill remains
an independent context unit.

## Design principles

- Lead with the reader's purpose, not the production process.
- Preserve evidence while changing its presentation for the audience.
- Use progressive disclosure instead of deleting useful depth.
- Give each durable rule or fact one canonical owner.
- Prefer a few judgment-bearing principles over mechanical style checklists.
- Keep instructions portable across agents; vendor-specific features are not
  required for the core behavior.

## Validation

Run the repository validator:

```bash
node scripts/validate-skills.mjs
```

Then verify discovery with the same CLI used by skills.sh:

```bash
npx skills add . --list
```

## License

MIT
