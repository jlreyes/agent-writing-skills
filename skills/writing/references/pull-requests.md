# Pull requests

Write for a reviewer who has not seen the conversation. Lead with the specific
problem and the behavior the change produces. Use a before-and-after example
when it helps explain the trigger and result. Name what changes in the title.

## Hand off facts and evidence

Tell a fresh writer who will review the PR and what they need to judge.
Give the writer the final scope, verified results, gaps, and the repository's
required template. Identify the facts, links, and exact text the reviewer needs.
Supply the supporting evidence separately. Label each item with what it shows,
where the check ran, and which revision it covered.

The writer composes the title and description from that brief. The writer can
combine, reorder, or omit details that do not affect review. Keep material
risks, tradeoffs, qualifications, and required template content. A previous
description can supply facts or links.

## Make the visible description useful

Aim for 200 visible words by default. Tell the reviewer what changed and where
to start the review. State what you verified and identify any material gap.
A small change may need only a paragraph and one check. Add visible detail
when the reviewer needs it to judge the change.

Keep conclusions and limits beside the claims they qualify. Put full commands,
long transcripts, and review logs in GitHub `<details>` blocks or link to them.
Make sure the reviewer can open the links. Give each block a `<summary>` that
names the evidence it contains. Include an example or excerpt inline when it
makes a result easier to understand.

## Put evidence beside the claim

Explain what was exercised, what happened, and what remains unverified. Link or
embed the relevant recording, screenshots, CLI transcript, or downloadable build
where the reviewer needs it. Label each link with what it shows. For a trial
build, include the tested revision, supported platform, and how to install and
try the changed behavior.

Keep automated checks and observed use distinct. A passing test suite does not
establish that a UI was used or a downloaded package was launched. Name the
revision and environment for each result, and distinguish older evidence from
the current implementation. Preserve failed checks, missing artifacts,
and other limits that affect the reviewer's confidence.

When writing from supplied evidence, preserve its scope and gaps; do not invent
a recording, result, or download link to complete a section. A checklist entry
such as “tested” cannot replace the evidence and observed result.

## Check the description before posting

Preview the rendered title and description with the sections collapsed.
Make sure the visible text tells the reviewer what changed, where to look, and
what the evidence shows. Check that the intended reviewer can open the links.
Compare the reported revision and check status with the final diff. Label
earlier evidence with the revision it covers.

If the scope changes, update the title and description to match the final
implementation. Keep existing artifact URLs when you edit unless newer
evidence replaces what they show. Label replacements by revision.
