---
name: writing
description: Use for every meaningful prose task for a human or agent, including user responses, README/docs, AGENTS.md/CLAUDE.md, skills, prompts, plans, reports, PR text, substantive comments, and docstrings. Covers authorship, material revision, cold review, and finalization; skip only trivial labels and mechanical wording changes. Establishes audience, purpose, reader context, information order, proportion, style, and evidence boundaries.
---

# Write for readers

Make the intended reader able to form the right mental model and take the
intended next step quickly. Optimize for the reader's time to understanding,
not for completeness of the writer's narration.

## Establish the reader and job

Before writing, establish who the reader is, what they already know, what they
need to understand, decide, or do, and how much explanation that requires.

For an agent reader, also establish the behavior to produce, the concrete
failure to prevent, the authority and scope of the instruction, and the
mechanisms the agent can actually invoke.

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

Use the smallest structure that makes the logic easy to recover. Reserve tables
for repeated comparisons and diagrams for relationships or sequence that prose
cannot make equally clear.

For an ordinary answer, question, recommendation, completion note, or status
update:

- state limitations or blockers that change what the reader can do;
- include evidence in proportion to the claim;
- ask only for a decision or action that is actually needed;
- stop when the reader can understand and act.

## Preserve epistemic boundaries

Keep distinct what is known, inferred, recommended, decided, and still
uncertain. Put material qualifications beside the claims they qualify. Do not
use confidence of tone to erase uncertainty. Never add factual detail absent
from the source: plausible specifics become false information. Preserve
underspecified dates, locations, mechanisms, causes, and product surfaces as
given.

## Load the writing references

For every activation, load [style](references/style.md). Apply it with
judgment: preserve useful voice and do not turn its examples into word bans.

Then load every artifact reference that matches the writing job:

- Report-shaped artifacts such as substantive analyses, investigation or audit
  reports, research syntheses, decision briefs, and formal findings reports:
  [reports](references/reports.md)
- Content-oriented README, tutorial, how-to, reference, or explanatory
  documentation:
  [technical documentation](references/technical-documentation.md)
- RFCs, architecture plans, design documents, or implementation plans:
  [technical plans](references/technical-plans.md)
- AGENTS.md, CLAUDE.md, skills, prompts, policies, or other behavior-bearing
  instructions: [agent rules](references/agent-rules.md). This reference is the
  canonical owner for deciding whether the primary agent writes inline or
  delegates to a fresh writer; follow its decision before drafting.

- Revision of an existing artifact where unrelated content must be preserved:
  also load [editing](references/editing.md)

Use multiple references for a mixed artifact. Match references to the writing
job, not merely to topics mentioned in the source material.

## Run the cold-reader test

Before returning prose, imagine the intended reader arriving cold. Confirm
they can tell, without reconstructing the writer's process:

- what matters;
- why it matters;
- what is known versus uncertain;
- what they need to do next.

If not, repair the information order before polishing sentences.
