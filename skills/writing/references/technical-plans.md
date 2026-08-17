# Technical plans

A plan should contain only the decisions an implementer would otherwise have to
invent. Give reviewers enough evidence to judge those decisions and implementers
enough precision to execute them without guessing at load-bearing behavior.

Writing a plan is not authority to make missing architecture decisions. Present
decisions established by the source material; expose an absent mechanism or
contract as an open choice instead of selecting a plausible one.
Do not infer schema changes, access cadence, or migration work merely because a
data owner or storage location is named. Do not move an approval gate earlier
or later than the source places it; state any additional dependency as a
conditional question. If the source does not say what an open gate blocks, name
the gate without deciding its scope or inventing downstream dependencies.
Do not turn a required sequence into an invented control mechanism. For
example, if the source requires observation before enforcement but does not say
how the transition is controlled, state the required states and leave the
switching mechanism open.

Treat a plan as a lifecycle record, not permanent reference by default. Move
lasting contracts and rationale to their canonical homes when the work lands.
Use `agent-rules.md` as well when the plan binds implementing agents, and
`technical-documentation.md` when deciding where the plan belongs.

## Establish scope and evidence

Identify the outcome, intended reviewers and implementers, decision authority,
current sources of truth, and cost of being wrong. The plan's source material
should include applicable repository rules, source and test evidence,
architecture documents, and installed dependency contracts needed for
load-bearing claims. Do not invent missing evidence.

Separate established facts, chosen decisions, assumptions, and open questions.
Do not let an unresolved choice hide inside implementation prose; resolve it,
bound the implementer's discretion, or make it a visible stop gate.
Tie each gate or open question only to the work that actually depends on it; do
not claim that all execution is blocked unless the source establishes that.

## Include the minimum executable decision set

A bounded, reversible change may need only:

- goal and non-goals;
- selected approach and important constraints;
- implementation sequence;
- verification.

Add detail only when ambiguity, irreversibility, cross-team impact, or
operational risk earns it. Do not manufacture sections because a template lists
them.

For each material decision, make clear what was chosen, why, what it affects,
and how implementation or testing will make the choice observable. Substantial
work should trace back to a goal, constraint, or decision.

## Add architecture depth when consequences require it

For consequential architecture, additionally consider:

- component ownership and dependency direction;
- interfaces, data, state, and invariants;
- normal and material failure lifecycles;
- security, privacy, concurrency, and operational behavior;
- alternatives and tradeoffs;
- rollout, rollback, observability, and unresolved gates.

For an important component, specify only the contracts that another implementer
could otherwise get materially wrong: what it owns, its inputs and outputs, who
writes durable state, trust boundaries, prohibited dependencies, and relevant
failure behavior.

Use a diagram when several components, identities, writers, state transitions,
deployment boundaries, or failure windows are hard to understand linearly. Keep
it at one abstraction level and make it understandable on its own.

## Organize for decisions and execution

Lead with the outcome, rationale, material costs, and genuine gates. Order the
rest by reader dependency: context before decisions, decisions before contracts,
contracts before implementation, and implementation before verification and
rollout.

Put deep evidence and exhaustive alternatives where they remain inspectable
without blocking the main path. Omit immaterial modules instead of filling them
with `N/A` prose.

When material, define:

- target packages, files, interfaces, or generated artifacts;
- build order and dependency constraints;
- allowed implementation discretion and stop conditions;
- tests that prove the important invariants;
- rollout, rollback, and failure-detection triggers.

Prefer verification tied to decisions and invariants over a long generic test
list. Name the evidence that would prove the plan wrong.

## Revise and validate

When updating an existing plan, also use `editing.md`. Preserve unaffected
decisions, evidence, rationale, structure, and voice, then sweep for consequences
of the changed decision.

Before handing off the plan, confirm that:

- reviewers can identify the direction, evidence, and principal tradeoffs;
- implementers know where they have discretion and where they must stop;
- load-bearing decisions reach the affected contracts, steps, tests, and
  operations;
- interfaces, diagrams, and terminology agree;
- open gates appear before dependent work;
- the level of detail matches the consequence.
