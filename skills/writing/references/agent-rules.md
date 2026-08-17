# Agent rules

Write the smallest instruction system that reliably shapes behavior. Modern
agents can infer ordinary practice; every additional rule consumes context,
creates another possible conflict, and may outlive its premise.

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
from a fresh writer becomes. A material mistake in a user response costs one
exchange; a material mistake in a README, `AGENTS.md`, `CLAUDE.md`, skill,
prompt, or other instruction can mislead many readers or propagate through
later agent sessions.

Materially author or revise those durable surfaces through the same fresh
writer used for cold review and final handoffs. This is especially important
for behavior-bearing instructions, but it also applies to substantial
content-only documentation. Keep the distinction explicit: documentation
explains a system to a reader; an instruction changes what an agent will do.
When a document does both, apply this reference to the behavior-bearing parts
and `technical-documentation.md` to the explanatory parts.

The primary agent still owns the facts and decisions. Its handoff should give
the writer:

- the audience and intended behavior or reader outcome;
- the concrete failure the prose must prevent;
- the decisions, evidence, constraints, and uncertainty that must survive;
- the exact source material needed, either inline or as designated files and
  passages.

Fresh context means controlled context, not no context. The writer may read the
files or passages explicitly designated in the handoff, but should not explore
the repository independently to invent or recover missing premises. A missing
material premise goes back to the primary agent.

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

Keep a root instruction file compact enough to be understood on every turn. It
should contain only repository purpose, authority and priority, a few universal
invariants with short reasons, an escalation valve, and triggers for more
specific skills.

Move commands, procedures, lookup tables, examples, and domain-specific
exceptions behind task-specific triggers. Let the skill be canonical for its
procedure; keep only the invariant and pointer in the root.

Keep trigger descriptions concrete rather than reducing them to broad topic
labels.

## Choose the right kind of rule

Classify each proposed instruction:

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

Every loop or gate must define:

- what causes it to start;
- which material changes cause it to run again;
- a budget or progress signal;
- the condition that means success;
- the condition that means stop and escalate;
- what a headless agent reports when it cannot ask.

Do not restart a review or convergence loop for bookkeeping, formatting, or
status updates that cannot affect its result.

## Include an escalation valve

Tell the agent to stop and ask the owner, with a recommendation, when a required
mechanism is unavailable, rules conflict, a loop is not converging, or scope is
ballooning merely to satisfy the written process. A headless agent should report
the same decision as `BLOCKED` instead of silently choosing or engineering
around the rule.

## Name only executable mechanisms

Before requiring a command, gate, permission, reviewer, or environment, verify
that the bound agent can invoke it. If a mechanism is human-only or role-gated,
name who performs it and what the agent does while waiting.

Date empirical premises that can become stale and state the condition under
which the rule should be removed or revisited.

## Review the instruction set

Confirm that:

- every absolute names a concrete consequence;
- every loop has a bounded exit and a material-change retrigger;
- every mechanism is available to the agent it binds;
- every topic has one canonical owner;
- task-specific mechanics stay behind a trigger;
- temporary facts carry a date or retirement condition;
- the agent can tell when to proceed, use discretion, or stop and ask.

If the rule set keeps growing while the same failures recur, revise the control
surface instead of adding another reminder.
