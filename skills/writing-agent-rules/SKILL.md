---
name: writing-agent-rules
description: Writes, reviews, and restructures text that controls agent behavior, including AGENTS.md, CLAUDE.md, skills, system prompts, working agreements, and review instructions. Must be used whenever creating or changing agent-facing rules, or when agents repeatedly grind, overengineer, follow stale procedures, or rediscover the same blocker.
license: MIT
metadata:
  author: jlreyes
  version: 1.0.0
---

# Writing agent rules

Write the smallest instruction system that reliably shapes behavior. Modern
agents can infer ordinary practice; every additional rule consumes context,
creates another possible conflict, and may be followed long after its premise
expires.

This skill applies because the text **instructs an agent**, not merely because
an agent writes it. When deciding the architecture or placement of durable
documentation, also load `writing-technical-documentation` if it is available.

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
exceptions behind task-specific skill triggers. The skill is canonical for its
procedure; the root file summarizes the invariant and points to the owner.

Write trigger descriptions as concrete conditions such as “use when changing
database migrations,” not as broad topic labels.

## Choose the right kind of rule

Classify each proposed instruction:

1. **Hard invariant:** an absolute justified by material blast radius, such as
   secret exposure, destructive data loss, production authority, or history
   corruption. State the consequence that earns the absolute.
2. **Principle with context:** a judgment rule for variable situations. Explain
   the objective and priority rather than enumerating every case.
3. **Mechanic:** a command, procedure, table, or troubleshooting fact. Put it in
   a triggered skill, tool, or script.

If an instruction does not fit one of these roles, it is probably narration,
duplicated convention, or a workaround that should not become policy.

## Give every rule one owner

Repetition creates drift. When moving a rule, remove the old copy and leave a
short pointer when discovery still needs it. Do not keep a summary and a
procedure that can independently evolve into different policies.

Prefer one scoped rule to a rule followed by a growing list of counter-rules.
State the actual boundary directly. For example, distinguish content-only
documentation from behavior-bearing instructions instead of saying that all
documentation is exempt and then adding exceptions.

## Bound autonomous behavior

Every loop or gate must define:

- what causes it to start;
- which changes cause it to run again;
- a budget or progress signal;
- the condition that means success;
- the condition that means stop and escalate;
- what a headless agent reports when it cannot ask.

Retrigger only on changes that can affect the result. Bookkeeping, formatting,
or status updates should not restart a source-code review or test convergence
loop unless they alter the behavior being checked.

## Include an escalation valve

Rules record decisions, not laws of physics. Tell the agent to stop and ask the
owner—with a recommendation—when a required mechanism is unavailable, rules
conflict, a loop is not converging, or scope is ballooning merely to satisfy the
written process. A headless agent should report the same decision as `BLOCKED`
instead of silently choosing or engineering around the rule.

## Name only executable mechanisms

Before requiring a command, gate, permission, reviewer, or environment, verify
that the bound agent can actually invoke it. If the mechanism is human-only or
role-gated, say who performs it and what the agent does while waiting.

Date empirical premises that can become stale and state the condition under
which the rule should be deleted or revisited.

## Review the finished instruction set

Confirm that:

- every absolute names a concrete consequence;
- every loop has a bounded exit and a material-change retrigger;
- every mechanism is available to the agent it binds;
- every topic has one canonical owner;
- task-specific mechanics stay behind a trigger;
- temporary facts carry a date or retirement condition;
- the agent can tell when to proceed, when it has discretion, and when it must
  stop and ask.

If the rule set keeps growing while the same failures recur, revise the control
surface instead of adding another layer of reminders.
