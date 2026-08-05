# House style

## Reader contract

- Lead with the conclusion and its principal cost.
- Let an executive stop after the one-page brief, a reviewer stop after the main body, and an implementer continue into execution details and appendices.
- Define unfamiliar terms before first use. Expand unfamiliar acronyms once. Use one name for one concept.
- Link detailed evidence where the claim appears; do not scatter raw provenance through the reading path.

## Eternal, standalone voice

Describe the coherent design in present tense:

- Use: `The coordinator serializes messages per user.`
- Avoid: `The coordinator will serialize messages per user.`
- Avoid: `Previously the gateway serialized messages.`

Do not refer to the originating conversation, an older draft, review rounds, or what the document used to say. Words such as `previously`, `now`, `old`, `new approach`, `unchanged`, `revised`, and `before this change` usually indicate missing context.

Allow temporal language when time is the actual subject: request ordering, state transitions, retries, migrations, rollout, compatibility, evidence dates, and decision records.

## Information density

- Use prose for causality, rationale, tradeoffs, and consequences.
- Use bullets for independent facts.
- Use numbered lists only for sequence or priority.
- Use tables when several items share the same fields.
- Use diagrams for mappings, topology, hierarchy, sequence, and state.
- Prefer precise verbs over noun phrases: `retries` over `performs a retry operation`.
- Give each sentence one main idea.
- Keep paragraphs focused; split or restructure paragraphs that become walls of prose.
- Delete throat-clearing such as `This section describes`, `It is important to note`, and `As mentioned above`.
- Do not copy full code, schemas, or generated API definitions when another canonical artifact exists. In lossless-remap mode, exact source commands, configurations, schemas, probe observations, literals, and code fragments that establish a load-bearing contract are protected and remain in the canonical plan.

## Claims and decisions

Keep these categories distinct:

| Category | Treatment |
|---|---|
| Fact | State the evidence or link it near the claim. |
| Decision | State the selected behavior, owner, and consequences. |
| Principle | State the decision rule it supplies. |
| Priority | State which principle wins when they conflict. |
| Assumption | State how the design changes if it is false. |
| Unknown | Resolve, bound, or make it an implementation gate. |

Use named links rather than unexplained labels such as `D7` or `V3`. If compact identifiers are helpful, pair them with a descriptive name and link every use.

## Progressive disclosure

Keep the main body focused on the selected design. Move the following material behind links:

- full alternative scorecards and tradeoff analysis;
- prototype transcripts and package verification;
- exhaustive API or schema detail;
- capacity calculations;
- review and decision history;
- long operational recipes.

Do not move load-bearing conclusions, costs, invariants, or failure semantics out of the main body.

In lossless-remap mode, appendices and links reorganize protected source material; they do not replace or summarize it away. Preserve evidence chronology when later evidence corrects or qualifies an earlier observation.

## Revision discipline

- Start from the exact canonical source.
- Preserve good prose and unaffected detail.
- Apply a targeted patch even when the consequence sweep is broad.
- Keep a change summary or diff outside the canonical narrative.
- Do not turn feedback into `before/after` prose inside the document.
- Treat contextual repetition as meaningful until a conservation manifest proves it is byte-equivalent and the user authorizes removal.
