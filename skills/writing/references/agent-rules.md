# Agent rules

Write the smallest instruction system that reliably shapes behavior. Modern
agents can infer ordinary practice; every additional rule consumes context,
creates another possible conflict, and may outlive its premise.

This reference combines source-aligned Claude 5 context engineering with
package policy learned from recurring agent failures. The final source section
names the boundary; do not present package policy as Anthropic guidance.

Apply this guidance because the text instructs an agent, not merely because an
agent writes it. Also use `technical-documentation.md` when deciding the
architecture or placement of durable documentation.

## Contents

- [Establish the control surface](#establish-the-control-surface)
- [Give durable prose fresh-writer ownership](#give-durable-prose-fresh-writer-ownership)
- [Make descriptions dispatch correctly](#make-descriptions-dispatch-correctly)
- [Spend always-loaded context carefully](#spend-always-loaded-context-carefully)
- [Choose the right kind of rule](#choose-the-right-kind-of-rule)
- [Give every rule one owner](#give-every-rule-one-owner)
- [Bound autonomous behavior](#bound-autonomous-behavior)
- [Include an escalation valve](#include-an-escalation-valve)
- [Name only executable mechanisms](#name-only-executable-mechanisms)
- [Keep source guidance and package policy distinct](#keep-source-guidance-and-package-policy-distinct)
- [Review the instruction set](#review-the-instruction-set)

## Establish the control surface

Before editing, identify:

- the behavior that needs to change and the concrete failure it prevents;
- the agents and environments bound by the rule;
- the file that canonically owns the topic;
- whether the instruction must always load or can load only for a relevant
  task;
- the higher-priority authority that wins if instructions conflict.

Do not add a rule when a tool, type, test, schema, or repository structure can
make the desired behavior automatic and observable.

## Give durable prose fresh-writer ownership

The more durable and behavior-shaping the prose, the more valuable authorship
from a fresh writer becomes. A material mistake in an ordinary user response is
often contained to one exchange; a material mistake in a README, `AGENTS.md`,
`CLAUDE.md`, skill, prompt, or other instruction can mislead many readers or
propagate through later agent sessions. Consequential user responses still earn
fresh-writer ownership even when they are not durable.

As package policy, default material authorship or revision of those durable
surfaces to the same fresh writer used for cold review and final handoffs. This
is especially important for behavior-bearing instructions, but it also applies
to substantial content-only documentation. Keep the distinction explicit:
documentation explains a system to a reader; an instruction changes what an
agent will do. When a document does both, apply this reference to the
behavior-bearing parts and `technical-documentation.md` to the explanatory
parts.

The primary agent still owns the facts and decisions. Its handoff should give
the writer:

- the audience and intended behavior or reader outcome;
- the concrete failure the prose must prevent;
- the decisions, evidence, constraints, and uncertainty that must survive;
- the exact source material needed, either inline or as designated files and
  passages.

Fresh context means controlled context, not no context. As an authorship and
authority boundary for this package, the writer may read the files or passages
explicitly designated in the handoff, but should not explore the repository
independently to invent or recover missing premises. A missing material premise
goes back to the primary agent.

Routine local prose can stay with the primary agent when implementation context
and latency matter: a trivial label, a mechanical wording change, or a short
comment that merely restates nearby code does not earn a handoff. Substantive
comments, docstrings, PR text, or several inline passages can be reviewed in one
batched writer call when useful. Batching is a latency optimization, not a
mandatory end-of-turn gate. Use one writer for authorship, material revision,
cold review, and final handoffs rather than adding another writing role.

## Make descriptions dispatch correctly

Treat agent and skill descriptions as part of the control surface. They decide
whether the right guidance or writer is available before its body can help.

Lead with the concrete condition for loading or delegation, then name the
artifacts people recognize: user responses, README and docs, `AGENTS.md` and
`CLAUDE.md`, skills, prompts, plans, reports, PR text, comments, and docstrings.
Include the negative boundary for trivial prose when over-activation would add
latency without changing the result.

Verify discovery and activation in fresh sessions through the real installed
runtime. A description that reads well in source but does not cause the skill
or agent to load is a broken dispatch rule.

## Spend always-loaded context carefully

Keep a root instruction file compact enough to be understood on every turn.
Spend its limited context on repository purpose, non-obvious codebase gotchas,
authority and priority, a few universal invariants with short reasons, an
escalation valve, and triggers for more specific skills. Omit facts the agent
can recover reliably from the repository itself.

Move commands, procedures, lookup tables, examples, and domain-specific
exceptions behind task-specific triggers. Let the skill be canonical for its
procedure; keep only the invariant and pointer in the root.

Keep skills lightweight and judgment-oriented. Split long skills into directly
linked references that load for the matching task, and allow rich references
to be code, tests, specs, or artifacts rather than only prose summaries.

Keep trigger descriptions concrete rather than reducing them to broad topic
labels.

## Choose the right kind of rule

Start with the intended outcome and enough context for the agent to use
judgment. Add prescriptive mechanics only when the task is fragile or the
failure has material consequences. Reconsider constraints inherited from older
models instead of carrying them forward automatically.

When a durable rule is still justified, classify it:

1. **Hard invariant:** an absolute justified by material blast radius, such as
   secret exposure, destructive data loss, production authority, or history
   corruption. State the consequence that earns the absolute.
2. **Principle with context:** a judgment rule for variable situations. Explain
   the objective and priority instead of enumerating every case.
3. **Mechanic:** a command, procedure, table, or troubleshooting fact. Put it in
   a triggered skill, tool, or script.

If an instruction fits none of these roles, it is probably narration,
duplicated convention, or a workaround that should not become policy.

## Give every rule one owner

Repetition creates drift. When moving a rule, remove the old copy and leave a
short pointer when discovery still needs it. Do not keep a summary and a
procedure that can independently evolve into different policies.

Prefer one scoped rule to a rule followed by a growing list of counter-rules.
State the actual boundary directly.

## Bound autonomous behavior

Every long-running, retrying, or convergence loop or gate must define:

- what causes it to start;
- which material changes cause it to run again;
- a budget or progress signal;
- the condition that means success;
- the condition that means stop and escalate;
- what a headless agent reports when it cannot ask.

Do not restart a review or convergence loop for bookkeeping, formatting, or
status updates that cannot affect its result.

## Include an escalation valve

Rules record decisions, not laws of physics. Tell the agent to stop and ask the
owner, with a recommendation, when a required mechanism is unavailable, rules
conflict, a loop is not converging, or scope is ballooning merely to satisfy
the written process. A headless agent should report the same decision as
`BLOCKED` instead of silently choosing or engineering around the rule.

## Name only executable mechanisms

Before requiring a command, gate, permission, reviewer, or environment, verify
that the bound agent can invoke it. If a mechanism is human-only or role-gated,
name who performs it and what the agent does while waiting.

Date empirical premises that can become stale and state the condition under
which the rule should be removed or revisited.

## Keep source guidance and package policy distinct

Anthropic's Claude 5 context-engineering guidance supports a small core:

- let capable models use judgment instead of accumulating blanket rules;
- keep root instructions lightweight and avoid restating what the repository
  or tools already make clear;
- use progressive disclosure so specialized context loads for the matching
  task;
- put tool behavior in clear interfaces and descriptions instead of repeating
  the same instruction across the prompt.

Its broader prompting guidance also supports explicit outcomes, relevant
context, and a few diverse examples when examples materially improve format,
tone, or edge-case handling. Examples are a tool, not a default substitute for
a clear interface.

The every-meaningful-prose activation rule, universal style-reference loading,
fresh-writer ownership, controlled context, dispatch heuristics,
hard-invariant/principle/mechanic categories, bounded-loop contract,
escalation valve, and executable-mechanism check are package policy derived
from observed agent failures. Keep them only while they continue to prevent
those failures; do not attribute them to Anthropic.

Primary sources:

- [The new rules of context engineering for Claude 5 generation models](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)
- [Claude prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)

## Review the instruction set

Confirm that:

- every absolute names a concrete consequence;
- every long-running, retrying, or convergence loop has a bounded exit and a
  material-change retrigger;
- every mechanism is available to the agent it binds;
- every topic has one canonical owner;
- task-specific mechanics stay behind a trigger;
- temporary facts carry a date or retirement condition;
- the agent can tell when to proceed, use discretion, or stop and ask.

If the rule set keeps growing while the same failures recur, revise the control
surface instead of adding another reminder.
