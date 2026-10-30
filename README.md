# Agent Writing

[![skills.sh](https://skills.sh/b/jlreyes/agent-writing-skills)](https://skills.sh/jlreyes/agent-writing-skills)

Agent Writing gives coding agents one reader-first writing skill. The agent
doing the work loads the skill and writes the prose itself; the plugin does not
include a separate writer agent.

The repository keeps one architecture across runtimes:

| Component | Purpose |
| --- | --- |
| `skills/writing/` | The portable skill and its progressively loaded references |
| `.claude-plugin/` and `.codex-plugin/` | Native manifests for the same plugin bundle |

The canonical authorship doctrine lives in
[`agent-rules.md`](skills/writing/references/agent-rules.md). The skill itself
stays reader-first and portable.

## Install

### Claude Code

Add this repository as a marketplace and install the plugin:

```bash
claude plugin marketplace add jlreyes/agent-writing-skills
claude plugin install agent-writing@agent-writing
```

Run `/reload-plugins` in an existing session after installation. For local
development, start Claude Code with:

```bash
claude --plugin-dir /path/to/agent-writing-skills
```

### Codex

Install the portable skill from the Codex marketplace manifest:

```bash
codex plugin marketplace add jlreyes/agent-writing-skills
codex plugin add agent-writing@agent-writing
```

Start a new session after installing or updating the plugin.

The skill can also be installed independently:

```bash
npx skills add jlreyes/agent-writing-skills --skill writing
```

## Release and update

A writing release keeps one portable `skills/writing/` tree current across the
Claude plugin, Codex plugin, and skills.sh project copies. Use the native
installer or runtime command for each channel; do not create a separate sync
script or a consumer-specific copy of the writing instructions.

Update installed plugin channels with their native CLIs:

```bash
claude plugin marketplace update agent-writing
claude plugin update agent-writing@agent-writing
codex plugin marketplace upgrade agent-writing
codex plugin add agent-writing@agent-writing
```

From the consumer project, update its skills.sh copy:

```bash
npx --yes skills update writing -p -y
```

Versions before 0.4.0 also shipped a writer agent. If you installed its native
Codex copy, delete `${CODEX_HOME:-~/.codex}/agents/writer.toml` when upgrading.

After each release, compare the full installed `skills/writing/` reference tree
with the source tree and run the relevant discovery and behavior checks in every
supported runtime.

## Use

The agent doing the work authors, revises, and finalizes the prose with the
skill loaded. The canonical
[`agent-rules.md`](skills/writing/references/agent-rules.md) reference defines
that authorship rule and keeps independent code, test, and domain review
separate from it.

Skill descriptions guide model selection; they are not enforcement hooks. When
skill use must be deterministic in either runtime, request
`agent-writing:writing` explicitly. A repository instruction can make that
request durable for one project; the plugin does not silently change global
Codex instructions.

## Guidance included

The skill always loads the universal style reference, then every reference
whose artifact or operation matches the writing job:

| Reference | Use |
| --- | --- |
| `reports.md` | Analyses, investigations, audits, research, and decision briefs |
| `technical-documentation.md` | Content-oriented README, tutorial, how-to, reference, and explanation |
| `technical-plans.md` | RFCs, architecture plans, and implementation plans |
| `surveys.md` | Product surveys, screeners, questionnaires, polls, and in-product feedback |
| `agent-rules.md` | Behavior-bearing AGENTS.md, CLAUDE.md, skills, prompts, and policy |
| `editing.md` | Revisions that must preserve unrelated material |
| `style.md` | Universal prose judgment and final style pass |

## Validate and evaluate

Run the static checks:

```bash
node scripts/validate-plugin.mjs
claude plugin validate --strict .
npx skills add . --list
```

Run the live boundary cases in fresh authenticated sessions:

```bash
node scripts/run-boundary-eval.mjs claude
node scripts/run-boundary-eval.mjs codex
```

Both suites prove fresh-session skill discovery and activation, universal style
loading, routed references read by the authoring session itself, and that
trivial prose skips the skill. Except where the survey guidance calls for
independent reviewers, they fail if the session launches a subagent. Both also
check that the durable-instruction case stays within its designated source.
Claude activates the skill implicitly for that case; the Codex suite uses an
explicit skill request. `evals/cases.json` remains the optional deeper Claude
content corpus. Live evals are intentionally excluded from unauthenticated CI.

## License

MIT
