# Technical plans

Write a technical plan that lets its reviewers understand the proposed system
and lets implementers execute without inventing load-bearing architecture along
the way. Treat a plan as a lifecycle record, not permanent reference by
default; move lasting contracts and rationale to their canonical homes when the
work lands.

Use `agent-rules.md` as well when the plan binds implementing agents, and
`technical-documentation.md` when deciding where the plan belongs.

## Contents

- [Establish authority and scope](#establish-authority-and-scope)
- [Scale detail to consequence](#scale-detail-to-consequence)
- [Classify consequential decisions](#classify-consequential-decisions)
- [Build one decision chain](#build-one-decision-chain)
- [Organize for progressive disclosure](#organize-for-progressive-disclosure)
- [Use diagrams when relationships need them](#use-diagrams-when-relationships-need-them)
- [Make execution safe](#make-execution-safe)
- [Revise without accidental loss](#revise-without-accidental-loss)
- [Validate the plan](#validate-the-plan)

## Establish authority and scope

Identify:

- the intended reviewers and implementers;
- the decision or outcome the plan must enable;
- the canonical destination and decision authority;
- the current sources of truth;
- the cost of being wrong or incomplete.

Read applicable repository rules, architecture documents, source, tests, and
installed dependency surfaces before making load-bearing claims. Prefer current
source, types, official documentation, tests, prototypes, and measurements.
Separate facts, decisions, assumptions, and unknowns.

## Scale detail to consequence

A bounded, reversible change may need only:

- goal and non-goals;
- chosen approach;
- important constraints;
- implementation sequence;
- verification.

A consequential architecture change may additionally need:

- explicit priorities;
- component ownership and dependency direction;
- interfaces, data, state, and invariants;
- normal and failure lifecycles;
- security, privacy, concurrency, and operational behavior;
- alternatives and tradeoffs;
- rollout, rollback, and unresolved gates.

Do not manufacture sections merely because a template contains them. Add depth
when ambiguity, irreversibility, cross-team impact, or operational risk earns
it.

## Classify consequential decisions

Use four states:

- **Locked:** decided; propagate its consequences.
- **Bounded:** implementation has discretion within stated limits and a priority
  rule.
- **Open:** resolve before dependent work or define an explicit stop gate.
- **Assumption:** believed true but not established; state the impact if false.

Do not hide load-bearing uncertainty inside prose. Resolve it, bound it, or make
it a visible gate.

## Build one decision chain

Connect the problem to the architecture, the architecture to component
contracts, the contracts to implementation steps, and the steps to observable
verification and rollout consequences.

For important components, make clear:

- what the component owns and does not own;
- which component is the sole writer for durable state;
- its inputs, outputs, errors, and trust boundary;
- its dependencies and prohibited dependencies;
- its normal lifecycle and material failure behavior.

Every important architectural choice should create an observable consequence
in an interface, invariant, implementation step, test, or rollout plan.
Substantial implementation work should trace back to a goal, constraint, or
architectural choice.

## Organize for progressive disclosure

Lead with a concise decision layer containing the outcome, rationale, material
costs, and genuine gates. Organize the body in reader-dependency order, often:

1. Context, goals, non-goals, and constraints.
2. Priorities and selected approach.
3. Architecture, ownership, and normal lifecycle.
4. Interfaces, data, state, invariants, and failure behavior.
5. Implementation sequence and verification.
6. Rollout, rollback, operations, risks, and open gates.
7. Detailed alternatives, evidence, and reference material.

This is a useful order, not a mandatory template. Omit immaterial modules and
do not fill them with `N/A` prose. Keep the main path conclusion-focused; put
deep evidence and exhaustive alternatives where they remain inspectable without
blocking comprehension.

## Use diagrams when relationships need them

Use a diagram when multiple components, identities, writers, state transitions,
deployment boundaries, or failure windows are hard to understand linearly.
Show the normal lifecycle before adversarial interleavings. Keep each diagram
at one abstraction level and make it understandable without the surrounding
paragraph.

Do not add a diagram merely because the artifact is called an architecture
plan.

## Make execution safe

Specify, when material:

- target packages, modules, files, and generated artifacts;
- build order and dependency constraints;
- allowed implementation discretion;
- stop-and-escalate conditions;
- tests that prove architectural invariants;
- rollout and rollback triggers;
- observability needed to detect failure.

Prefer invariant-oriented verification over a long list of tests disconnected
from the design. Name the evidence that would prove the plan wrong.

## Revise without accidental loss

When updating an existing plan, also use `editing.md`. Read the complete source
and preserve unaffected decisions, evidence, rationale, structure, and voice.
Apply the requested edit, then sweep for consequences of the changed decision.
Targeted editing is not permission to leave dependent sections inconsistent.

If the user requests a lossless structural remap or another specialized
high-ceremony transformation, establish a separate conservation method rather
than treating that machinery as the default meaning of a technical plan.

## Validate the plan

Confirm that:

- reviewers can identify the chosen direction and principal tradeoffs;
- implementers know where they have discretion and where they must stop;
- each load-bearing decision reaches affected contracts, flows, tests, and
  operations;
- interfaces, diagrams, and terminology agree;
- links and named mechanisms resolve;
- open gates appear before dependent work;
- the level of detail matches the consequence.
