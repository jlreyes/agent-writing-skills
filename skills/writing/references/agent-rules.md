# Agent rules

Write the smallest instruction system that reliably shapes behavior. Modern
agents can infer ordinary practice; every additional rule consumes context,
creates another possible conflict, and may outlive its premise.

Apply this guidance because the text instructs an agent, not merely because an
agent writes it. Also use `technical-documentation.md` when deciding the
architecture or placement of durable documentation.

## Contents

- [Establish the control surface](#establish-the-control-surface)
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

## Spend always-loaded context carefully

Keep a root instruction file compact enough to be understood on every turn. It
should contain only repository purpose, authority and priority, a few universal
invariants with short reasons, an escalation valve, and triggers for more
specific skills.

Move commands, procedures, lookup tables, examples, and domain-specific
exceptions behind task-specific triggers. Let the skill be canonical for its
procedure; keep only the invariant and pointer in the root.

Write trigger descriptions as concrete conditions such as “use when changing
database migrations,” not as broad topic labels.

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
