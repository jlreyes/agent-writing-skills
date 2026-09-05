# Agent Writing

[![skills.sh](https://skills.sh/b/jlreyes/agent-writing-skills)](https://skills.sh/jlreyes/agent-writing-skills)

Agent Writing gives coding agents one reader-first writing skill and one fresh
writer role for authorship, material revision, cold review, and final handoffs.

The repository keeps one architecture across runtimes:

| Component | Purpose |
| --- | --- |
| `skills/writing/` | The portable skill and its progressively loaded references |
| `agents/writer.md` | Claude Code adapter that preloads the skill |
| `.codex/agents/writer.toml` | Native Codex project/user agent adapter |
| `.claude-plugin/` and `.codex-plugin/` | Native manifests for the same plugin bundle |

The canonical ownership and delegation doctrine lives in
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

Codex plugins do not package custom-agent roles. From a checkout of this
repository, install the same writer as a native user agent:

```bash
node scripts/install-codex-agent.mjs
```

The installer writes `writer.toml` to `${CODEX_HOME:-~/.codex}/agents/` and
refuses to replace a different existing writer unless you pass `--force`.
Inside this repository, Codex also discovers `.codex/agents/writer.toml`
directly as a project agent. Start a new session after installing or updating
the agent.

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

From an updated source checkout, update the native Codex writer. From the
consumer project, update its skills.sh copy:

```bash
node scripts/install-codex-agent.mjs --force
npx --yes skills update writing -p -y
```

After each release, compare the full installed `skills/writing/` reference tree
with the source tree and run the relevant discovery and behavior checks in every
supported runtime.

## Use

Use the delegation criteria and handoff contract in the canonical
[`agent-rules.md`](skills/writing/references/agent-rules.md) reference. Invoke
the same writer for authorship, material revision, cold review, or a final
handoff; the reference defines when inline prose is appropriate.

Claude exposes the writer as `agent-writing:writer`. Codex exposes the
separately installed native agent as `writer`.

Skill and agent descriptions guide model selection; they are not enforcement
hooks. When skill use must be deterministic in either runtime, request
`agent-writing:writing` explicitly. For Codex writer delegation, say: “Use
`agent-writing:writing` and delegate the material writing to the installed
`writer` agent; require it to load every routed reference before drafting.” A
repository instruction can make that request durable for one project; the
plugin does not silently change global Codex instructions.

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

## Native model defaults

The adapters keep runtime-specific model configuration thin:

- Claude Code uses `sonnet` at medium effort. `CLAUDE_CODE_SUBAGENT_MODEL` or an
  explicit invocation model can override the model default.
- The Codex adapter uses `gpt-5.6-terra` at medium effort. Override either
  setting by changing the project or user copy of `writer.toml`.

Rerun the behavioral evals when changing either adapter or runtime version.

## Runtime boundaries

Fresh context is controlled context, not an empty sandbox.

Claude custom subagents receive a fresh conversation but still receive the
applicable `CLAUDE.md` hierarchy and git-status snapshot. The writer has only
`Read`, and its prompt limits reads to skill references and files designated in
the handoff. Claude does not currently enforce an agent-local path allowlist, so
that scope is a behavioral rule rather than a security boundary. See
[what Claude loads into a subagent](https://code.claude.com/docs/en/sub-agents#what-loads-at-startup).

In Codex 0.146.0, custom agents are project- or user-scoped rather than
plugin-shipped, so the Codex install has two explicit parts: plugin installation
for the portable skill and native agent installation for the writer. The
writer's description is a selection signal, not an enforcement hook; use the
explicit invocation above when delegation must occur. Its `read-only` sandbox
prevents writes but does not itself prevent reads of unrelated accessible
files; controlled context remains a behavioral rule.

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

Both suites prove explicit fresh-session skill discovery and activation,
universal style loading, and inline handling of trivial prose. The Claude suite
also proves implicit fresh-writer delegation for a durable agent instruction.
The Codex suite uses the documented explicit request and proves that it launches
the installed `writer` role on Terra at medium effort, loads the plugin skill
and routed references inside that child, and stays within the designated source
context.
`evals/cases.json` remains the optional deeper Claude content corpus. Live evals
are intentionally excluded from unauthenticated CI.

## License

MIT
