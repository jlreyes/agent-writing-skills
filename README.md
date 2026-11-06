# Agent Writing

[![skills.sh](https://skills.sh/b/jlreyes/agent-writing-skills)](https://skills.sh/jlreyes/agent-writing-skills)

Agent Writing helps coding agents write for their readers. The agent doing the
work drafts the text and checks its accuracy. A fresh writer gives substantive
final artifacts one plain-language rewrite before delivery. Ordinary chat and
working drafts stay with the agent doing the work.

The repository keeps one architecture across runtimes:

| Component | Purpose |
| --- | --- |
| `skills/writing/` | The shared writing skill and its references |
| `agents/writer.md` | Claude writer, included with the plugin |
| `.codex/agents/writer.toml` | Native Codex writer, installed separately |
| `.claude-plugin/` and `.codex-plugin/` | Native manifests for the same plugin bundle |

The [final-artifact workflow](skills/writing/references/final-artifacts.md)
defines the handoff and the accuracy check before delivery.

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

Codex loads the skill from the plugin and the writer as a native custom agent.
From an updated checkout of this repository, install the writer:

```bash
node scripts/install-codex-agent.mjs
```

The installer writes `${CODEX_HOME:-~/.codex}/agents/writer.toml`. It refuses to
replace a different existing writer unless you pass `--force`. Start a new
session after installing or updating the plugin and writer.

The skill can also be installed independently:

```bash
npx skills add jlreyes/agent-writing-skills --skill writing
```

## Release and update

A writing release keeps one portable `skills/writing/` tree current across the
Claude plugin, Codex plugin, native Codex writer, and skills.sh project copies.
Use the native installer or runtime command for each channel; do not create a
separate sync script or a consumer-specific copy of the writing instructions.

Update installed plugin channels with their native CLIs:

```bash
claude plugin marketplace update agent-writing
claude plugin update agent-writing@agent-writing
codex plugin marketplace upgrade agent-writing
codex plugin add agent-writing@agent-writing
```

From an updated source checkout, update the native Codex writer:

```bash
node scripts/install-codex-agent.mjs --force
```

From the consumer project, update its skills.sh copy:

```bash
npx --yes skills update writing -p -y
```

Version 0.5.0 restores the writer removed in 0.4.0, with a narrower job: rewrite
completed final artifacts. Replace any pre-0.4.0 native Codex writer with the
current adapter so it does not take over ordinary drafting.

After each release, compare the full installed `skills/writing/` reference tree
with the source tree and run the relevant discovery and behavior checks in every
supported runtime.

## Use

The working agent drafts the text and resolves review findings. It then gives
one fresh writer the draft, audience, purpose, required facts and
qualifications, and designated sources, without the full working conversation.
The writer returns replacement prose. The working agent checks it against the
sources and corrects factual drift before delivery.

Use the writer for substantive final Markdown documents, reports, plans, PR
descriptions, and substantive comments, including artifacts returned directly
in chat. Keep ordinary replies, progress updates, internal notes, intermediate
drafts, trivial labels, and mechanical edits with the working agent. Code,
test, and domain reviews remain separate.

Claude exposes `agent-writing:writer`; Codex exposes the natively installed
`writer`. Start a new writer for every pass, including later revisions of the
same artifact; do not resume or send follow-up writing tasks to a previous
writer. In Codex, set `fork_turns` to `none` on each new writer.
Neither adapter publishes or submits the result. The Claude adapter uses Sonnet
at medium effort; the Codex adapter uses GPT-6.1 Terra at medium effort.

The model uses skill descriptions to decide when to load a skill; descriptions
do not enforce activation. When skill use must be deterministic in either
runtime, request
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
| `pull-requests.md` | PR titles, descriptions, validation evidence, and trial-build links |
| `technical-plans.md` | RFCs, architecture plans, and implementation plans |
| `surveys.md` | Product surveys, screeners, questionnaires, polls, and in-product feedback |
| `agent-rules.md` | Behavior-bearing AGENTS.md, CLAUDE.md, skills, prompts, and policy |
| `editing.md` | Revisions that must preserve unrelated material |
| `style.md` | Universal prose judgment and final style pass |
| `final-artifacts.md` | When to use the writer, what to hand over, and what to check |

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

The suites check fresh-session discovery, reference loading, and writer use
for final artifacts. They reject subagent use for ordinary replies, working
drafts, and trivial prose. The final-instruction case also checks that the
writer loads the applicable references and avoids the unrelated fixture.
Codex cases explicitly request the native writer; Claude selects its plugin writer from the skill's
guidance. The suites check behavior. Inspect the returned prose to assess its
writing quality too.

`evals/cases.json` remains the optional deeper Claude content corpus. Live
evals are intentionally excluded from unauthenticated CI.

## License

MIT
