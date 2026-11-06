---
name: writing
description: Use for every meaningful prose task for a human or agent, including user responses, README/docs, surveys and questionnaires, AGENTS.md/CLAUDE.md, skills, prompts, plans, reports, PR text, substantive comments, and docstrings. Draft in the working agent; start a new writer with no inherited conversation for each final-artifact pass. Keep ordinary chat and intermediate drafts inline; skip trivial labels and mechanical wording changes.
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

## Establish the claim before rewriting

Before rewriting, establish the claim beneath the wording. Identify what the
source says happened, who or what it concerns, and the consequence or distinction
the reader needs. Write from that understanding, making the relevant actions and
relationships explicit. Preserve supported meaning, scope, and uncertainty;
replace labels and sentence structures that obscure them.

Use abstractions when the intended reader can connect them to the relevant facts.
When a label could describe materially different actions or outcomes, explain or
replace it. Do not invent specificity where the source is unclear.

Organize details so each supports, explains, or qualifies an identifiable point.
Check what the reader could explain after reading the result. If they can only
repeat your labels, or must supply missing relationships, the explanation is
unfinished.

## Name what happened, not your label for it

Work produces private vocabulary. While researching, building, or debugging,
an agent coins names for the things it is juggling ("the fallback path", "the
hygiene pass", "sync parity") and words for how far along they are
("hardened", "validated", "coverage"). Repetition makes those words feel like
ordinary vocabulary to anyone who has read the draft and its sources. That now
includes you. The reader has never seen them.

A reader can use only a name they already own: a name from the product, the
codebase, or the field, or a word they would use themselves. A label that
exists only in this draft and the work behind it tells them how the writer
filed the work, not what the work is. Report the event first: who or what did
what, to what. Then say how sure anyone is.

You cannot find these labels by asking whether a term feels familiar; after
reading the sources, it will. Check each noun phrase and verb that carries the
point instead:

- **Where would the reader have met this term?** If the honest answer is "in
  this draft or the work behind it", it is a working label, however
  consistently the sources use it. Appearing in a heading, a file name, or
  every paragraph does not make a label the reader's. Replace it with what it
  stands for, said with the actor and the action: "the retry cleanup" becomes
  "delete jobs that failed three times".
- **Of what? For what?** Words such as "parity", "coverage", "hygiene",
  "alignment", "support", and "foundation" name a role or a state and leave
  the reader to supply the rest. Say the thing itself.
- **What action is inside the noun?** When a generic verb such as "add",
  "establish", "enable", or "improve" props up an abstract noun, move the real
  action into the verb: "add migration support" becomes "migrate saved drafts
  to the new format".
- **Is this the work, or the checking of the work?** "Validate", "harden",
  and "certify" describe how the author tested or judged a change. Say what
  the change does; report the testing separately, as evidence.

These are checks, not word bans. A term the reader already uses passes however
abstract it looks.

Replacing a working label with what the sources say it stands for adds no
facts; it restates them. This outranks keeping the draft's wording, keeping a
term stable, and making the smallest edit: those rules protect the reader's
terms and unrelated content, not the writer's labels. If the sources do not
let you say what a label stands for, that is a missing fact. Flag it instead
of passing the label through.

### Titles, headings, and opening lines

The reader meets these with nothing established, often in a list beside
unrelated items. Use only names the reader already owns, and say what changed:
an action and the thing acted on. Leave status, scope limits, and test results
to the body unless the reader must act on them before reading further.

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

Before delivering a substantive final artifact, load the
[final-artifact workflow](references/final-artifacts.md). It defines when to
use the writer, what to hand over, and how to check the replacement prose.
It also applies to artifacts returned directly in chat. Ordinary conversational
replies and intermediate drafts stay with the working agent.

Then load every artifact reference that matches the writing job:

- Report-shaped artifacts such as substantive analyses, investigation or audit
  reports, research syntheses, decision briefs, and formal findings reports:
  [reports](references/reports.md)
- Content-oriented README, tutorial, how-to, reference, or explanatory
  documentation:
  [technical documentation](references/technical-documentation.md)
- Pull request titles, descriptions, and validation comments:
  [pull requests](references/pull-requests.md)
- RFCs, architecture plans, design documents, or implementation plans:
  [technical plans](references/technical-plans.md)
- Product surveys, screeners, questionnaires, polls, or in-product feedback:
  [surveys](references/surveys.md)
- AGENTS.md, CLAUDE.md, skills, prompts, policies, or other behavior-bearing
  instructions: [agent rules](references/agent-rules.md). This reference is the
  canonical owner for instruction design.

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
- what they need to do next;
- what each name in the title, headings, and opening paragraph refers to.

If not, repair the information order before polishing sentences. Imagination
cannot settle the last item once you have read the sources; settle it with the
checks under "Name what happened, not your label for it".
