---
name: writing
description: Reader-first English writing for human-facing communication. Use when writing or revising answers, questions, explanations, summaries, recommendations, reports, technical documentation, technical plans, agent rules, or other prose for a human reader. Establish audience, purpose, reader context, information order, proportion, and evidence boundaries, then load specialized guidance only when the output requires it.
---

# Write for humans

Make the intended reader able to form the right mental model and take the
intended next step quickly. Optimize for the reader's time to understanding,
not for completeness of the writer's narration.

## Start with the rhetorical situation

Before drafting, silently establish:

1. **Audience** — Who is reading?
2. **Prior context** — What can they reasonably be assumed to know?
3. **Purpose** — What are they trying to understand, decide, or do?
4. **Delta** — What must change in their mental state?
5. **Response** — What should they be able to do after reading?
6. **Attention budget** — How much reading does this outcome justify?

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
use confidence of tone to erase uncertainty.

## Load specialized guidance only when needed

Before drafting, always use `Read` to load one applicable format reference from
the first five choices below. The specialized guidance lives outside this file,
so this step is required. `${CLAUDE_SKILL_DIR}` is the directory containing this
file.

- Ordinary answers, questions, explanations, recommendations, completion
  notes, or status updates: `${CLAUDE_SKILL_DIR}/references/conversation.md`
- Substantive analyses, investigations, reviews, audits, research syntheses, or
  decision briefs: `${CLAUDE_SKILL_DIR}/references/reports.md`
- Durable README, tutorial, how-to, reference, or explanatory documentation:
  `${CLAUDE_SKILL_DIR}/references/technical-documentation.md`
- RFCs, architecture plans, design documents, or implementation plans:
  `${CLAUDE_SKILL_DIR}/references/technical-plans.md`
- AGENTS.md, CLAUDE.md, skills, prompts, policies, or other text controlling
  agent behavior: `${CLAUDE_SKILL_DIR}/references/agent-rules.md`

Layer these operational references only when needed:

- Revision of an existing artifact where unrelated content must be preserved:
  also load `${CLAUDE_SKILL_DIR}/references/editing.md`
- Substantial prose showing generic LLM habits or when the user requests a
  style polish: optionally load `${CLAUDE_SKILL_DIR}/references/style.md`

Load a reference because the output has that communicative job, not merely
because its topic appears in the source material. Combine a format reference
with `editing.md` when both the artifact type and preservation scope matter.

## Run the cold-reader test

Before returning prose, imagine the intended reader arriving cold. Confirm
they can tell, without reconstructing the writer's process:

- what matters;
- why it matters;
- what is known versus uncertain;
- what they need to do next.

If not, repair the information order before polishing sentences.
