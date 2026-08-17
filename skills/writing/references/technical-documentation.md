# Technical documentation

Organize durable technical documentation along two independent axes:

1. **Reader purpose:** what relationship does the reader have to the material?
2. **Delivery:** when and how does the reader or agent receive it?

The first axis comes from [Diátaxis](https://diataxis.fr/). The second prevents
agent repositories from turning Diátaxis into a rigid four-folder taxonomy.

## Contents

- [Classify the reader purpose](#classify-the-reader-purpose)
- [Choose the delivery surface](#choose-the-delivery-surface)
- [Treat the root as operational reference](#treat-the-root-as-operational-reference)
- [Let reference follow the machinery](#let-reference-follow-the-machinery)
- [Keep explanation searchable](#keep-explanation-searchable)
- [Keep records in their lifecycle](#keep-records-in-their-lifecycle)
- [Restructure documentation](#restructure-documentation)
- [Final test](#final-test)

## Classify the reader purpose

| Purpose | Reader need | Shape |
| --- | --- | --- |
| Tutorial | Learn through a safe, guided experience | A complete path that teaches by doing |
| How-to | Accomplish a real task | Goal-oriented procedure for a competent reader |
| Reference | Look up accurate facts while working | Concise description structured like the machinery |
| Explanation | Understand why the system has its shape | Rationale, tradeoffs, failure narratives, and connections |

Classify information blocks, not whole files by reflex. A document can contain
more than one purpose, but one purpose should govern its reading path. Split or
layer material when readers must continually switch activities.

## Choose the delivery surface

For an agent-operated repository, map purpose onto activation:

| Delivery | Typical surface | Appropriate content |
| --- | --- | --- |
| Always loaded | Root `AGENTS.md`, `CLAUDE.md`, or canonical README | Authority, priorities, universal invariants, and routing triggers |
| Trigger loaded | Skills | Executable procedures and task-specific rulings |
| Source local | Package README, types, schemas, manifests | Technical reference for the machinery beside it |
| Search loaded | Explanation documents | Durable rationale needed during design or diagnosis |
| Temporal | Plans, pull requests, changelogs, incident records | Decisions and evidence tied to a lifecycle stage |

Use this mapping as a default, not as a requirement to manufacture every
surface. Create a tutorial only for a demonstrated learning need. Do not create
empty taxonomy folders merely to mirror the framework.

## Treat the root as operational reference

A root agent contract is reference-shaped: authoritative, concise, organized
around repository machinery, and consulted by an agent already at work. It is
also executable policy, so imperatives are legitimate.

Keep only universal authority, priorities, invariants with short reasons,
decision rules, an escalation route, and skill triggers in always-loaded
context. Put commands, credential procedures, review loops, migrations, and
detailed exceptions in the triggered skill that owns the task. Use
`agent-rules.md` when the surface instructs agents; this reference owns purpose
and placement, while `agent-rules.md` owns control behavior.

## Let reference follow the machinery

Match reference structure to what it describes:

- let the root contract cover repository-wide authority and routing;
- let package or directory READMEs cover local ownership and public contracts;
- let types and schemas define exact executable shapes;
- let manifests and command help define versions and invocable operations.

An index may link to these surfaces but should not restate facts available from
the canonical machinery. Colocation lowers retrieval cost and makes drift
visible.

## Keep explanation searchable

Use explanation for the why: a failure narrative, tradeoff, system model,
constraint, or rejected alternative that future design and diagnosis work will
need. Connect explanation to reference rather than absorbing it. Reference says
what the contract is; explanation says why it exists and where it stops.

## Keep records in their lifecycle

A plan, pull request, changelog, research artifact, or incident record is not a
fifth Diátaxis quadrant. It captures evidence or decisions at a point in time.
Current behavior belongs in code, tests, and the owning reference or skill.

When rationale survives the lifecycle, distill it into current explanation or
reference. Do not make future readers infer present behavior from a historical
record. Use `technical-plans.md` for plans and RFCs, and `reports.md` for a
report or analysis handed to a human reader.

## Restructure documentation

1. Identify the reader, their task, and what should be possible after reading.
2. Inventory information-bearing blocks and their current canonical owners.
3. Classify each block by reader purpose and required activation.
4. Choose one canonical home for each fact, rule, procedure, and rationale.
5. Move rather than copy; leave short links where discovery requires them.
6. Rewrite each destination for its purpose instead of merely relocating text.
7. Remove stale duplicates and verify every link and named mechanism.

Preserve useful detail through progressive disclosure. A shorter primary path
does not justify deleting evidence, exceptions, or operational depth that still
has a reader.

## Final test

Confirm the documentation system lets a reader answer:

- Where do I start?
- What do I load for this task?
- Where is the exact current contract?
- Where can I understand why it has this shape?
- Which records are historical evidence rather than current instructions?

If one fact has several plausible answers, the system still lacks a canonical
owner.
