# Diagram doctrine

Choose the smallest visual that answers the reader's question.

| Question | Preferred visual |
|---|---|
| What exists and where does it run? | Context, container, or deployment diagram |
| Who owns each fact or identifier? | Mapping graph or ownership table |
| What happens across components? | Sequence diagram |
| How does work branch or converge? | Flowchart or decision tree |
| How does an entity change over time? | State machine |
| How do choices differ? | Side-by-side diagrams plus a comparison table |

## Required qualities

- Give every diagram a conclusion-bearing title or caption.
- Keep one abstraction level per diagram.
- Name the system boundary and external actors.
- Label directional edges with the action, protocol, or data.
- Show state stores and sole writers when correctness depends on them.
- Mark trust, runtime, provider, or transactional boundaries when relevant.
- Distinguish control flow from data flow when both appear.
- Define colors, line styles, and abbreviations in a legend.
- Keep node text short. Put explanations in the caption or body.
- Use stable domain and component names that match the prose.

## Required sequence

1. Put one context or container diagram in the one-page brief.
2. Show the normal end-to-end lifecycle.
3. Add state, concurrency, failure, or deployment diagrams only when they answer a different question.
4. Explain residual ambiguity in the body or appendix rather than overloading the visual.

## Quality checks

- Can a reader explain the main path without reading surrounding prose?
- Does every arrow have a clear direction and meaning?
- Does each state transition name its trigger or owner?
- Do the text and diagram assign the same owner and contract?
- Does the diagram reveal a race, ambiguous writer, or missing failure path?
- Can any node, edge, or label be removed without losing meaning? Remove it when creating or ordinarily revising a diagram.

Do not add a diagram merely because the document is long. Do not use a single giant diagram to mix context, components, code, deployment, and failure interleavings.

## Lossless-remap exception

Treat every source diagram as protected. Preserve its fence verbatim for automatic lossless certification. A user-authorized redraw is a manual-review exception unless the original fence also remains in the canonical document; record a complete participant, node, state, edge, boundary, label, and caption ledger. A synthesized one-page diagram is additive and never replaces a more detailed source diagram. Do not merge diagrams merely because they share components; distinct topology, identity, state, lifecycle, failure, concurrency, and operational views carry different information.
