---
name: writing-technical-plans
description: Creates, revises, losslessly restructures, and reviews unified technical plans that carry a system from architecture through implementation. Use for architecture and engineering plans, implementation plans, RFCs, technical proposals, plan-mode artifacts, major cross-cutting changes, structural reviews, or reformatting an existing plan whose technical content must remain intact.
license: MIT
metadata:
  author: jlreyes
  version: 1.0.0
---

# Writing technical plans

Produce one reader-first technical plan that is both the architectural design and the execution contract. Give reviewers a concise path to the conclusion and give implementing agents enough decisions, principles, boundaries, and evidence to build a greenfield system without inventing architecture during implementation.

This is the primary skill for plans and RFCs; do not impose a generic report
format on them. If the plan binds implementing agents, also load
`writing-agent-rules` when available. If deciding where the plan belongs in a
larger documentation system, load `writing-technical-documentation` when
available; plans are lifecycle records, not permanent reference by default.

## Select the mode and depth

Select one mode:

- **Create:** Draft a new canonical document.
- **Revise:** Patch an existing canonical document without losing unaffected detail.
- **Lossless structural remap:** Reorganize a source the user considers technically complete while preserving every information-bearing unit and cross-reference.
- **Review:** Diagnose a document without changing it.
- **Clean-room handoff:** Prepare an unbiased brief only when the user explicitly requests independent work.

Use `assets/technical-plan.md` as the single canonical format. Do not split architecture and implementation into separate documents. The selected architecture, component contracts, implementation map, verification, and rollout must form one continuous decision chain.

For exceptionally long plans, detailed evidence appendices may move to sibling
files named `<plan>.appendix-<topic>.md`, each opening with a backlink. The main
document must keep the decision brief, goals and priorities, key decisions, and
an explicit appendix index. Its decision chain must remain complete without
opening a sidecar: summaries stay while evidence detail moves. Keep cross-file
links relative so the set travels together. This allowance applies to
appendices only; never split architecture from implementation.

In lossless-remap mode, treat the template as an extensible set of containers, not a closed schema or content limit. Preservation overrides brevity, deduplication, house-style cleanup, diagram simplification, and externalization advice. Add summaries and connective prose; never substitute them for protected source material.

Scale depth to consequence. Use a short document for bounded, reversible work and add detail only when scope, ambiguity, irreversibility, cross-team impact, or operational risk justifies it. Never manufacture content to fill a template.

## Follow the workflow

### 1. Establish authority and source of truth

Identify the audience, requested artifact, canonical destination, and decision authority.

For a greenfield build, treat the plan as the source of truth for both system shape and agent execution. Decide the technical foundation, ownership boundaries, target repository structure, interfaces, data model, lifecycles, cross-cutting properties, build order, invariant tests, and production activation. Do not defer a load-bearing choice merely because no existing stack constrains it.

For revisions:

1. Resolve the exact source path.
2. Confirm its title, size, role, and canonical status.
3. Read the complete source and its applicable links.
4. Preserve its decisions, information, structure, and voice unless the user authorizes restructuring.
5. Apply targeted edits, then run a cross-cutting consequence sweep. Treat targeted as an editing method, not permission to leave consequences inconsistent.

For a lossless structural remap, read `references/lossless-remapping.md` before editing. Create the source inventory and conservation manifest first. Move protected units before applying prose cleanup. Automatic lossless certification permits exact relocation plus additive material only. Treat any user-authorized semantic rewrite, merge, deletion, or redraw as a manual-review exception, not as mechanically proven conservation.

Classify consequential topics:

- **Locked:** Propagate consequences; do not reopen.
- **Bounded:** The plan defines acceptable implementation choices and the priority rule for choosing among them.
- **Open:** Resolve before dependent implementation begins, or define an explicit stop-and-escalate gate.
- **Assumption:** Verify if load-bearing; otherwise label it and describe the impact if false.

### 2. Load repository doctrine and current evidence

Read the applicable `AGENTS.md`, `CLAUDE.md`, `README`, architecture docs, standards, source, tests, and exact installed dependency surfaces before drafting load-bearing claims.

Do not restate general repository doctrine. Link its canonical location and state only:

- the priority order for this work;
- local interpretations needed to apply the doctrine;
- explicit deviations or deltas and their rationale.

When priorities conflict, state which wins. Principles guide underspecified local choices; priorities resolve conflicts between principles.

Verify uncertain load-bearing behavior from primary surfaces. Prefer current source, types, official docs, tests, prototypes, and measurements. Separate facts, decisions, assumptions, and unknowns.

For greenfield work, verify candidate dependencies and platform contracts before locking them. Record exact versions or selection constraints when compatibility or behavior is load-bearing.

### 3. Write the one-page decision brief first

Make the first layer independently useful. Include, in this order:

1. Decision-oriented title.
2. Subtitle naming the system, scope, and outcome.
3. One-sentence TL;DR.
4. Three numbered takeaways.
5. Compact goals and non-goals.
6. Explicit priority order.
7. One architecture-at-a-glance diagram.

Keep this layer to roughly 400 words excluding the diagram. Define unavoidable unfamiliar terms on first use. Do not use opaque decision labels or citations that require later context.

When remapping, synthesize the brief as an additive orientation layer. Relocate displaced executive detail into the body or appendices; the brief's word target never authorizes deletion from the full document.

### 4. Organize the body for progressive disclosure

Place a linked table of contents immediately after the one-page layer. Order the body by reader dependency:

1. Context and constraints.
2. Principles, priorities, and repository alignment.
3. Selected architecture and technical foundation.
4. Component contracts and normal end-to-end lifecycles.
5. Interfaces, data, state ownership, and invariants.
6. Failure behavior and cross-cutting properties.
7. Agent execution contract and target build map.
8. Implementation sequence and verification.
9. Rollout, rollback, operations, risks, and genuine open questions.
10. Appendices.

Keep the main body conclusion-focused. Put detailed alternative and tradeoff analysis in an appendix; summarize the selected conclusion and principal cost in the body with an inline link. Put experiments, package-contract evidence, capacity math, exhaustive schemas, review provenance, and detailed operational recipes in appendices or canonical external documents.

During a lossless remap, retain the source's exact evidence, commands, configurations, schemas, provenance, negative requirements, and operational recipes inside the canonical document. External documents may supplement but never replace the only durable copy. Preserve domain-specific sections as named subsections or additional appendices when a generic table would flatten their meaning.

Avoid empty sections and `N/A` essays. Omit a module when it is immaterial.

### 5. Make the document decision-complete for implementing agents

Do not treat the document only as a consensus artifact. Prevent build-time architectural improvisation by specifying:

- locked decisions and invariants;
- selected language, runtime, frameworks, persistence, infrastructure, and version constraints when load-bearing;
- component ownership and sole writers;
- target packages, modules, files, generated artifacts, and dependency direction;
- allowed implementation discretion;
- priority rules for underspecified local choices;
- exact contracts and error semantics where they are load-bearing;
- normal and failure lifecycles;
- stop-and-escalate conditions;
- tests that prove architectural invariants;
- rollout and rollback triggers.

If an important choice remains open, do not hide it in prose. Resolve it, bound it, or make it a gate before the dependent step.

Maintain traceability from every architectural decision to the component contract, build step, invariant test, and rollout consequence it creates. Architecture without an execution consequence is incomplete; implementation work without an architectural basis is unjustified.

Read `references/engineering-concern-matrix.md` and apply only the triggered concerns. Use its decision-completeness audit before declaring the plan implementation-ready.

### 6. Use semantic diagrams

Read `references/diagram-doctrine.md` when the design contains multiple components, identities, writers, state transitions, concurrency, deployment boundaries, or failure windows.

Show the normal lifecycle before adversarial interleavings. Use diagrams to expose ownership and timing that prose can obscure. Keep each diagram at one abstraction level and make it understandable without the surrounding paragraph.

### 7. Apply the house style

Read `references/house-style.md` before drafting or revising prose.

Use present-tense, self-contained language in the canonical design. Keep migration chronology in explicit migration sections and decision history in appendices or linked records. Use prose for causality and rationale, tables for repeated fields, and diagrams for relationships or sequence.

### 8. Validate the artifact

Run:

```bash
node <skill-directory>/scripts/lint-plan.mjs <document.md>
```

Treat errors as blockers. Resolve warnings or explain why they do not apply. Also:

- render or syntax-check every diagram;
- validate internal links and referenced local paths;
- check diagram/text agreement;
- check terminology and identifier consistency;
- verify that every locked decision reaches affected contracts, flows, tests, and operations;
- remove duplication and prose that establishes no fact, constraint, rationale, causality, or consequence.

The removal rule does not apply to protected source units in lossless-remap mode. Contextual repetition may bind the same invariant to distinct contracts, lifecycles, tests, or operational consequences.

For a lossless remap, also run:

```bash
node <skill-directory>/scripts/audit-remap.mjs inventory <source.md> <manifest.json>
node <skill-directory>/scripts/audit-remap.mjs check <source.md> <target.md> <manifest.json> <report.json>
```

Treat conservation errors as blockers. A normal plan lint pass cannot substitute for this source-aware audit.
Automatic certification also forbids HTML comments and raw HTML outside fenced or inline code so protected material cannot pass while hidden from the rendered document.

For substantial skill changes or risky plan patterns, forward-test with a raw artifact and a realistic request. Do not give the evaluator the expected answer or diagnosis.

## Return the result

Return the canonical artifact and a concise handoff outside it:

- what changed or was produced;
- the most important decisions and challenges;
- verification performed;
- for a remap, the source hash, inventory comparison, conservation result, and any manual-review exceptions;
- unresolved gates requiring the user's decision.

Keep change-history narration out of the timeless document itself.
