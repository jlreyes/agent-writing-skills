---
name: writing
description: Reader-first English writing for human-facing communication. Use when writing or revising answers, questions, explanations, summaries, recommendations, reports, technical documentation, technical plans, agent rules, or other prose for a human reader. Establish audience, purpose, reader context, information order, proportion, and evidence boundaries, then load specialized guidance only when the output requires it.
---

# Write for humans

Make the intended reader able to form the right mental model and take the
intended next step quickly. Optimize for the reader's time to understanding,
not for completeness of the writer's narration.

## Establish the reader and job

Before writing, establish who the reader is, what they already know, what they
need to understand, decide, or do, and how much explanation that requires.

When writing from another agent's work, distinguish sharply between
information available to the upstream agent and information available to the
reader. Never assume the reader witnessed the research, implementation,
debugging, tool use, rejected alternatives, or intermediate reasoning.

## Build from the reader outward

Lead with the information of highest consequence. Give the reader context
before depending on it. Introduce unfamiliar concepts, names, and distinctions
before using them as premises.

Include information because it helps the reader understand, decide, or act,
not because it mattered to the production process. Put implementation detail in
the main path only when it materially changes:

- the conclusion;
- confidence in the conclusion;
- a tradeoff;
- the action required;
- the reader's ability to inspect or continue the work.

Otherwise omit it or move it behind progressive disclosure.

## Match the response to the job

Give a simple question a simple answer. Do not turn ordinary conversation into
a report because more context is available. Conversely, do not compress
consequential analysis until its logic becomes opaque.

Use the smallest structure that makes the logic easy to recover. Use prose for
reasoning and causality, lists for genuinely parallel items, tables for repeated
comparisons, and diagrams for relationships or sequence.

For an ordinary answer, question, recommendation, completion note, or status
update:

- lead with the answer or outcome;
- state limitations or blockers that change what the reader can do;
- include evidence in proportion to the claim;
- ask only for a decision or action that is actually needed;
- stop when the reader can understand and act.

## Make the prose carry the reasoning

Prefer:

- concrete subjects and active verbs;
- familiar words when they preserve precision;
- stable terminology;
- explicit causal and logical relationships;
- claims calibrated to their evidence;
- one controlling idea per paragraph.

Avoid:

- unexplained internal jargon;
- throat-clearing;
- generic summaries of what the reader just read;
- inflated statements of importance;
- rhetorical flourishes standing in for analysis;
- synonym cycling where one precise term is clearer;
- headings that merely label generic categories.

Delete material that does not improve understanding, confidence, or action.

## Preserve epistemic boundaries

Keep distinct what is known, inferred, recommended, decided, and still
uncertain. Put material qualifications beside the claims they qualify. Do not
use confidence of tone to erase uncertainty. Never add factual detail absent
from the source: plausible specifics become false information. Preserve
underspecified dates, locations, mechanisms, causes, and product surfaces as
given.

## Load specialized guidance only when needed

The rules above are sufficient for ordinary conversational responses. For a
specialized communicative job, load the applicable reference:

- Substantive analyses, investigations, reviews, audits, research syntheses, or
  decision briefs: [reports](references/reports.md)
- Durable README, tutorial, how-to, reference, or explanatory documentation:
  [technical documentation](references/technical-documentation.md)
- RFCs, architecture plans, design documents, or implementation plans:
  [technical plans](references/technical-plans.md)
- AGENTS.md, CLAUDE.md, skills, prompts, policies, or other text controlling
  agent behavior: [agent rules](references/agent-rules.md)

Layer these operational references only when needed:

- Revision of an existing artifact where unrelated content must be preserved:
  also load [editing](references/editing.md)
- Substantial prose showing generic LLM habits or when the user requests a
  style polish: optionally load [style](references/style.md)

Do not load a reference merely because its topic appears in the source
material. Combine a format reference with `editing.md` only when both the
artifact type and preservation scope matter.

## Run the cold-reader test

Before returning prose, imagine the intended reader arriving cold. Confirm
they can tell, without reconstructing the writer's process:

- what matters;
- why it matters;
- what is known versus uncertain;
- what they need to do next.

If not, repair the information order before polishing sentences.
