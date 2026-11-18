# Writer pass for final artifacts

The agent doing the work owns the artifact's accuracy. Before
delivering a substantive final artifact, give one fresh writer subagent a
brief, and the writer writes the artifact. This includes Markdown documents, reports,
plans, other written artifacts, PR descriptions, and substantive comments,
whether delivered as files or directly in chat.

Keep ordinary chat replies, progress updates, internal notes, intermediate
drafts, trivial labels, and mechanical edits with the working agent. Call the
writer once the facts and decisions are settled enough to deliver.

Start a new writer with no inherited conversation for every pass. Never reuse,
resume, or send another writing task to a writer that has already completed a
pass. This also applies to later revisions of the same artifact: send an
updated brief to another new writer. Reusing the earlier writer
retains its previous framing and defeats the cold-reader pass.

## The working agent prepares the brief

Give the writer only the following items.

- The reader and what they need to understand, decide, or do.
- Where the writer can read what you verified, such as a file, saved diff,
  saved command output, or link. Do not repeat what a source says. State a
  verified claim, in one line, only when no source holds it.
- What you did not check and what remains uncertain.
- Requirements from the user, repository, or place of publication, such as a
  template or exact text. For a survey, state what it must measure. For an
  instruction, state what behavior it must produce.
- The names coined during the work, each with what it stands for in
  plain words: labels for groups of changes, for states the work reached, and
  for checks it passed.

The working agent is the only party who knows which
names it invented; to the writer, a coined label used consistently looks like
an established term. When the handoff has no such list, the writer applies the
skill's checks under "Name what happened, not your label for it" to every term
that carries the point.

For a change to an existing document, point to the document and state the
requested change.

Do not draft the artifact or propose wording in the brief. Leave out your
own directions about content, structure, length, emphasis, and style.

## The writer writes the artifact

Load the writing skill and the references that match the artifact. Load
[editing](editing.md) only for a change to an existing document.

Limit your reading to the brief, its sources, and the writing guidance.
State only what the brief and sources support. Flag missing information.
If the handoff includes a draft or directions about form, use only the facts
from that material. Follow the requirements from the user, repository, or
place of publication.

Use the reference for the artifact to decide what to include, in what order,
and at what length. Decide which details to place behind a link or in a
collapsed section. Preserve what a survey must measure and what an instruction
must make the agent do.

The writer handles one pass. If it has already completed a writing pass in
this session, it reports that a new writer is required instead of performing
another pass. It completes the pass without delegating again. It does not
publish or submit anything, and the handoff grants no new authority to do so.

## The working agent checks the artifact

Before delivery, check that the sources support each statement in the artifact.
Check that the artifact meets the requirements and includes every material
limitation. Correct factual errors directly. Restore omitted detail only if
its absence would mislead the reader.

Run another writer pass only if a later substantive change needs new prose.
Keep independent code, test,
and domain reviews with their existing owners; the writer pass does not
replace them.
If a writer is unavailable, tell the user the pass could not be completed.
