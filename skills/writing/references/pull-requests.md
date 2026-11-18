# Pull requests

Write for a reviewer who has not seen the conversation. Lead with the concrete
problem and the behavior the change produces. Use a before/after example when
it helps explain the trigger and result. The title should name what changes,
and the writer writes it with the description.

By default, aim for about 200 words with all `<details>` blocks closed.
Say what changed and where to start the review. State what you checked and
flag any material gaps. A small change may need only one paragraph with
evidence.

Use the repository's template when one exists, but
make its contents useful. Include implementation details, tradeoffs, and risks
only when they help assess the final diff. If scope changes, rewrite the title
and description around the final implementation.

## Put evidence beside the claim

Explain what was exercised, what happened, and what remains unverified. Link or
embed the relevant recording, screenshots, CLI transcript, or downloadable build
where the reviewer needs it. Label each link with what it shows. For a trial
build, include the tested revision, supported platform, and how to install and
try the changed behavior.

Put full commands, long transcripts, and review logs in GitHub `<details>`
blocks or behind links the reviewer can open. Give each block a `<summary>`
that names the evidence. Keep conclusions and limits visible beside the
claims they qualify.

Keep automated checks and observed use distinct. A passing test suite does not
establish that a UI was used or a downloaded package was launched. Name the
revision and environment for each result, and distinguish older evidence from
the current implementation. Preserve failed checks, missing artifacts,
and other limits that affect the reviewer's confidence.

When writing from supplied evidence, preserve its scope and gaps; do not invent
a recording, result, or download link to complete a section. A checklist entry
such as “tested” cannot replace the evidence and observed result.

## Keep the description current

Describe the final change, omitting conversational history and abandoned
approaches unless they explain a tradeoff the reviewer must assess. Preserve
existing artifact URLs when editing unless the evidence has been superseded;
label replacements by revision so the reviewer can tell which result applies.

Before posting, the working agent reads the rendered description with all
`<details>` blocks closed. The agent checks that the stated revision and check
status match the final diff.
