# Agent Writing

[![skills.sh](https://skills.sh/b/jlreyes/agent-writing-skills)](https://skills.sh/jlreyes/agent-writing-skills)

Coding agents write from a context their users never saw: implementation names,
tool output, rejected approaches, debugging chronology, and repository jargon.
Agent Writing adds one reader-first handoff before that work becomes prose.

The plugin provides:

- `agent-writing:writer`, a Claude Code subagent with a fresh conversational
  context and a restricted tool set;
- `/agent-writing:writing`, one portable Agent Skill that owns the writing rules
  and progressively loads specialized guidance.

The working agent supplies the useful result of its work. The writer treats the
handoff as evidence, not a draft, and produces the response for a reader who did
not watch the work happen.

## Install

Add this repository as a Claude Code marketplace, then install the plugin:

```bash
claude plugin marketplace add jlreyes/agent-writing-skills
claude plugin install agent-writing@agent-writing
```

Run `/reload-plugins` in an existing session after installation. For local
development, clone the repository and start Claude Code with:

```bash
claude --plugin-dir /path/to/agent-writing-skills
```

## Use

Ask Claude to delegate the final response to `agent-writing:writer`, or choose
that agent from the agent picker. A useful handoff contains:

- the user's request and intended audience;
- established facts and decisions;
- uncertainty, constraints, and citations that must survive;
- relevant context the user already knows;
- the response or decision needed from the user, if any.

Do not prewrite the response or include raw logs merely because they exist.

The writer is deliberately invoked; this version does not intercept every
Claude response automatically.

## Guidance included

The preloaded skill contains the rules for ordinary answers, questions,
explanations, recommendations, completion notes, and status updates. It loads a
specialized reference only when the output requires one:

| Reference | Use |
| --- | --- |
| `reports.md` | Analyses, investigations, audits, research, and decision briefs |
| `technical-documentation.md` | README, tutorial, how-to, reference, and explanation |
| `technical-plans.md` | RFCs, architecture plans, and implementation plans |
| `agent-rules.md` | AGENTS.md, CLAUDE.md, skills, prompts, and agent policy |
| `editing.md` | Revisions that must preserve unrelated material |
| `style.md` | Optional repair of generic or inflated model prose |

The skill can also be installed without the Claude Code agent:

```bash
npx skills add jlreyes/agent-writing-skills --skill writing
```

## Limits of the boundary

This is a context-reduction mechanism, not a security sandbox.

As of Claude Code 2.1.233, custom subagents start with a fresh conversational
context but still receive the applicable `CLAUDE.md` hierarchy and a git-status
snapshot. Claude Code exposes no custom-agent setting that suppresses those
inputs; only the built-in Explore and Plan agents omit them. See [what Claude
loads into a
subagent](https://code.claude.com/docs/en/sub-agents#what-loads-at-startup).

The writer's capability allowlist contains only `Read`, which prevents commands,
edits, web searches, and further delegation. Its prompt limits `Read` to the
skill's bundled references, but plugin-shipped agents cannot enforce an
agent-local path allowlist. That path restriction is behavioral, not a security
boundary. Revisit these limitations if Claude Code adds per-agent context
filters or path-scoped file tools.

## Validate and evaluate

Run the platform-facing checks:

```bash
node scripts/validate-plugin.mjs
claude plugin validate --strict .
npx skills add . --list
```

The cases in [`evals/cases.json`](evals/cases.json) cover the reader outcomes
that matter, including omission and preservation of implementation detail,
limitations, citations, uncertainty, decisions, reports, plans, and editing.
Use `node scripts/run-eval.mjs <case-id>` for a live parent-to-writer Claude Code
run. When `EVAL_PLUGIN_DIR` names an installed cache artifact, the runner also
adds that directory to Claude's readable roots; plugin loading and file access
are separate CLI permissions. The live runner requires an authenticated Claude
CLI and is intentionally not part of unauthenticated CI.

## License

MIT
