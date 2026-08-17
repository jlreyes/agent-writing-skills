# Agent Writing

[![skills.sh](https://skills.sh/b/jlreyes/agent-writing-skills)](https://skills.sh/jlreyes/agent-writing-skills)

Agent Writing gives coding agents one reader-first writing skill and one fresh
writer role for authorship, material revision, cold review, and final handoffs.

The repository keeps one architecture across runtimes:

| Component | Purpose |
| --- | --- |
| `skills/writing/` | The portable skill and its progressively loaded references |
| `agents/writer.md` | Claude Code adapter that preloads the skill |
| `.codex/config.toml` and `.codex/agents/writer.toml` | Codex project agent registration and model adapter |
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

Codex 0.146.0 plugin bundles install skills but do not install custom-agent
roles. To use the writer outside this repository, copy its `[agents.writer]`
entry and `agents/writer.toml` into the target project's `.codex/` config, or
register the role in the user config. These are native Codex TOML settings, not
shared Claude frontmatter.

The skill can also be installed independently:

```bash
npx skills add jlreyes/agent-writing-skills --skill writing
```

## Use

Use the delegation criteria and handoff contract in the canonical
[`agent-rules.md`](skills/writing/references/agent-rules.md) reference. Invoke
the same writer for authorship, material revision, cold review, or a final
handoff; the reference defines when inline prose is appropriate.

Claude exposes the writer as `agent-writing:writer`. The Codex project adapter
registers the corresponding role as `writer`; see the current CLI limitation
below.

## Guidance included

The skill handles ordinary reader-first prose directly and loads a specialized
reference only when the artifact requires one:

| Reference | Use |
| --- | --- |
| `reports.md` | Analyses, investigations, audits, research, and decision briefs |
| `technical-documentation.md` | Content-oriented README, tutorial, how-to, reference, and explanation |
| `technical-plans.md` | RFCs, architecture plans, and implementation plans |
| `agent-rules.md` | Behavior-bearing AGENTS.md, CLAUDE.md, skills, prompts, and policy |
| `editing.md` | Revisions that must preserve unrelated material |
| `style.md` | Optional repair of generic or inflated model prose |

## Native model defaults

The adapters keep runtime-specific model configuration thin:

- Claude Code uses `sonnet` at low effort. `CLAUDE_CODE_SUBAGENT_MODEL` or an
  explicit invocation model can override the model default.
- The Codex adapter requests `gpt-5.6-terra` at low effort. Codex gives a
  role-local model setting precedence, so override it by changing the project
  or user copy of `writer.toml`.

Claude's default was exercised through the installed writer. Codex 0.146.0
accepted the requested default under strict configuration, but did not apply the
registered writer role; see the runtime boundary below. Rerun the behavioral
evals when changing either adapter or runtime version.

## Runtime boundaries

Fresh context is controlled context, not an empty sandbox.

Claude custom subagents receive a fresh conversation but still receive the
applicable `CLAUDE.md` hierarchy and git-status snapshot. The writer has only
`Read`, and its prompt limits reads to skill references and files designated in
the handoff. Claude does not currently enforce an agent-local path allowlist, so
that scope is a behavioral rule rather than a security boundary. See
[what Claude loads into a subagent](https://code.claude.com/docs/en/sub-agents#what-loads-at-startup).

Codex custom agents are project- or user-scoped rather than plugin-shipped.
Codex 0.146.0 accepted this project adapter under `--strict-config`, but the v2
CLI did not automatically delegate from its description and an explicit launch
recorded a generic child rather than the registered role. The eval reports that
as a runtime limitation. The role's `read-only` sandbox prevents writes but does
not itself prevent reads of unrelated accessible files; controlled context is
likewise a behavioral rule.

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

The Claude suite proves implicit skill activation, fresh-writer delegation plus
controlled designated context for a durable agent instruction, and inline
handling of trivial prose. The Codex suite proves skill activation and trivial
inline handling while reporting the current custom-role limitation.
`evals/cases.json` remains the optional deeper Claude content corpus. Live evals
are intentionally excluded from unauthenticated CI.

## License

MIT
