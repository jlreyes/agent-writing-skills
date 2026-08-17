# Agent Writing

[![skills.sh](https://skills.sh/b/jlreyes/agent-writing-skills)](https://skills.sh/jlreyes/agent-writing-skills)

**Agent Writing is a clean writing boundary for coding agents.**

Coding agents accumulate implementation details, tool output, debugging
history, and terminology their users never saw. This plugin provides a fresh,
tool-poor writer that receives the useful result of that work, models the
reader's actual context, and produces the human-facing response with one
progressively disclosed writing system.

The plugin contains:

- `agent-writing:writer`, an isolated Claude Code subagent for the final
  agent-to-human handoff;
- `/agent-writing:writing`, a portable Agent Skill that owns the universal
  reader-first rules and loads focused references only when needed.

## How it works

The working agent hands off the user's request, established facts, decisions,
uncertainty, citations, and relevant shared context. The writer treats that
handoff as evidence rather than prose, discards the production chronology, and
rebuilds the response for a reader who did not watch the work happen.

The writer has one tool, `Read`, and its prompt limits that tool to references
bundled with the `writing` skill. It cannot run commands, edit files, search the
web, or invoke other agents, and it is explicitly barred from inspecting the
repository to accumulate the same implementation context again.

The universal skill always establishes audience, purpose, prior knowledge,
attention budget, information order, proportion, and evidence boundaries. It
then selects only the guidance the output needs:

| Reference | Communicative job |
| --- | --- |
| `conversation.md` | Answers, questions, status updates, explanations, and short summaries |
| `reports.md` | Analyses, investigations, audits, research syntheses, and decision briefs |
| `technical-documentation.md` | README, tutorial, how-to, reference, explanation, and documentation placement |
| `technical-plans.md` | RFCs, architecture plans, design documents, and implementation plans |
| `agent-rules.md` | AGENTS.md, CLAUDE.md, skills, prompts, and behavior-bearing policy |
| `editing.md` | Preservation scope when revising an existing artifact |
| `style.md` | An optional pass for generic or inflated model prose |

## Install the Claude Code plugin

Add this repository as a marketplace, then install the plugin:

```bash
claude plugin marketplace add jlreyes/agent-writing-skills
claude plugin install agent-writing@agent-writing
```

Run `/reload-plugins` in an existing Claude Code session after installation.

For local development, clone the repository and launch Claude Code with:

```bash
claude --plugin-dir /path/to/agent-writing-skills
```

## Use the writer

Ask Claude to use `agent-writing:writer` for the final response, select it from
the `@` agent picker, or mention it directly:

```text
@agent-agent-writing:writer Write the user-facing response from this result.
```

The handoff should include:

- the user's request and intended audience;
- facts established and decisions made;
- uncertainty and material constraints;
- evidence or citations that must survive;
- context the user already knows that affects the answer;
- the response or decision needed from the user, if any.

Do not draft the response for the writer or include raw logs and debugging
chronology merely because they exist.

This first version does not automatically intercept every Claude response. The
calling agent or user deliberately invokes one clean handoff when the quality of
the human-facing result warrants it.

## Use the skill independently

The `writing` skill remains compatible with the broader Agent Skills ecosystem:

```bash
npx skills add jlreyes/agent-writing-skills --skill writing
```

Within Claude Code, the plugin skill is also available directly as
`/agent-writing:writing` when you want the writing system without a fresh
subagent.

## Validation

Run the repository checks:

```bash
node scripts/validate-plugin.mjs
claude plugin validate --strict .
npx skills add . --list
```

## License

MIT
