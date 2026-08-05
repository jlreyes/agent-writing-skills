# Lossless structural remapping

Use this procedure when the user accepts the source's technical content and asks to improve only its format, organization, navigation, or house style.

## Conservation contract

- Treat every heading, paragraph, list item, table row, fenced block, diagram, command, literal, citation, identifier, and cross-reference as a protected source unit.
- Treat the unified template as an extensible spine. Preserve domain-specific headings as subsections or additional appendices.
- Make the one-page brief additive. A summary never counts as the destination of the detail it summarizes.
- Preserve exact commands, paths, routes, payloads, error strings, status codes, versions, thresholds, SQL predicates, test cases, and evidence observations.
- Preserve negative requirements, rejected machinery, accepted residue, deferred work, and operational hazards with their causal context.
- Preserve contextual repetition when the same statement binds distinct APIs, flows, decisions, tests, or operating consequences.
- Keep source evidence inside the canonical document when an external artifact is missing, ephemeral, or not independently complete.
- Retain stable decision, evidence, probe, spike, operation, and contract-pin identifiers. Add descriptive anchors and links without renaming the keys.
- Preserve every source diagram fence verbatim. A new architecture-at-a-glance diagram is additional.
- Do not target a lower full-document word count. Information density governs presentation, not conservation.
- Do not use HTML comments, raw HTML outside code, or additional multiline code spans in an automatically certified target; hidden or retyped rendered content cannot count as preservation. Preserve any multiline code spans already present in the source exactly.

## Preflight

1. Resolve the exact source and destination paths. Record the source SHA-256, lines, words, bytes, and canonical role.
2. Run `audit-remap.mjs inventory` to create a conservation manifest before changing the source. Pass a report path to `check` so every source unit's matched target lines and section are recorded.
3. Inventory headings, tables and rows, fenced blocks, diagrams, decisions, evidence records, routes, interfaces, tests, implementation steps, commands, paths, literals, and normative statements.
4. Keep each original source heading as a heading beneath the appropriate template container. The checker permits heading-level changes but requires identical heading text.
5. Build a one-to-many mapping from every source unit and line range to target anchors. Zero units may remain unmapped.
6. Mark decisions with their existing authority. Reformatting never reopens a locked decision.
7. Declare allowed transformations. Automatic lossless certification allows relocation, heading-level changes with identical heading text, and additive headings, anchors, links, summaries, or connective prose.
8. Treat paraphrasing, merging, deduplicating, deletion, or diagram redraw as a manual-review exception. User authorization permits the exception but does not make it mechanically lossless.

Run `inventory` on a draft target when target unit IDs and hashes are useful for a manual exception report. The checker never treats an arbitrary replacement hash as proof of equivalence.

## Two-pass remap

### Pass 1: relocate without rewriting

1. Add the one-page brief and target container headings.
2. Move protected units verbatim into one or more target containers.
3. Retain original heading names as nested headings. Their levels may change; their text and relative content order remain stable.
4. Keep tables and fenced blocks intact.
5. Keep detailed test catalogues, dependency contracts, workflows, environment rules, decision records, and evidence records as named subsections or appendices.
6. Regenerate the table of contents after all destinations exist.
7. Run the source-aware audit. Resolve every missing unit before continuing.

### Pass 2: improve navigation and prose

1. Add connective text and descriptive cross-links.
2. Define terms before first use and align names without changing contract literals.
3. Move deep material behind inline links while retaining it in the same document.
4. Apply timeless prose only to canonical design narrative. Preserve evidence chronology, migrations, rollout order, state transitions, and decision history where time is the subject.
5. Do not silence density or identifier warnings by deleting protected content.
6. Keep protected units verbatim. If the user authorizes a semantic edit, list it as a manual-review exception and do not claim an automatic lossless result.

## Diagram conservation

For each diagram, record its source lines, question answered, caption, participants or nodes, states, directed edges, labels, stores, and trust/runtime/transaction boundaries. Preserve the original fence verbatim for automatic lossless certification. If the user authorizes a redraw, keep the original fence as an appendix artifact or report the redraw as a manual-review exception with an element-by-element ledger. Never merge diagrams that answer different questions.

## Postflight

- Verify every source unit has an exact, uniquely consumed target occurrence in its preserved source-heading context and relative order.
- Verify table, row, fenced-block, and diagram counts meet or exceed the source inventory.
- Verify every stable identifier and cross-reference resolves.
- Verify all exact contracts, routes, errors, commands, paths, versions, thresholds, tests, implementation gates, and normative requirements survive.
- Verify no external link becomes the sole surviving copy of source evidence.
- Verify every decision still reaches its component, lifecycle, implementation, test, and rollout consequences.
- Run the conservation audit, plan linter, diagram rendering, internal-link check, and local-path validation.
- Return the source hash, inventory comparison, zero-unmapped assertion, and manual-review exception list outside the timeless document.

Losslessness is mechanically defensible only for exact protected-unit relocation plus additive material. Authorization makes a semantic transformation permissible, not proven equivalent. If paraphrasing, merging, deletion, or redraw is requested, stop and agree on a manual comparison strategy rather than claiming the automated check proves losslessness.
