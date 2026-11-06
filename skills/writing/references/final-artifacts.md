# Writer pass for final artifacts

The agent doing the work writes the draft and owns its accuracy. Before
delivering a substantive final artifact, give it to one fresh writer subagent
for one plain-language rewrite. This includes Markdown documents, reports,
plans, other written artifacts, PR descriptions, and substantive comments,
whether delivered as files or directly in chat.

Keep ordinary chat replies, progress updates, internal notes, intermediate
drafts, trivial labels, and mechanical edits with the working agent. Call the
writer once the facts and decisions are settled enough to deliver.

Start a new writer with no inherited conversation for every pass. Never reuse,
resume, or send another writing task to a writer that has already completed a
pass. This also applies to later revisions of the same artifact: send the
updated draft and facts to another new writer. Reusing the earlier writer
retains its previous framing and defeats the cold-reader pass.

Give the writer the draft, audience and purpose, required facts and
qualifications, designated source
passages, and required links or exact text. The writer loads the writing skill
and its applicable references. It reads only the handoff, designated sources,
and writing guidance. It flags missing information rather than researching or
guessing.

Also list the names coined during the work, each with what it stands for in
plain words: labels for groups of changes, for states the work reached, and
for checks it passed. The working agent is the only party who knows which
names it invented; to the writer, a coined label used consistently looks like
an established term. When the handoff has no such list, the writer applies the
skill's checks under "Name what happened, not your label for it" to every term
that carries the point.

The writer replaces the draft's language, rather than just tidying it. Treat
the wording as disposable while preserving its meaning. Rebuild awkward
sentences around the person or component doing the action; do not keep
abstract labels because they appeared in the draft or because the sources use
them consistently.

Return replacement prose. Lead with the point, explain who does
what and why it matters, use familiar words and active verbs, and remove
repetition and internal shorthand. Keep useful technical detail. Preserve
facts, uncertainty, decisions, scope, citations, commands, code, and unrelated
content. The rewrite must preserve what a survey measures and what an
instruction requires an agent to do.

The working agent checks the rewrite against the sources before delivery and
corrects factual drift directly. Run another writer pass only when a later
substantive change leaves new prose to rewrite. Keep independent code, test,
and domain reviews with their existing owners; the writer pass does not
replace them.

The writer handles one pass. If it has already completed a writing pass in
this session, it reports that a new writer is required instead of performing
another rewrite. It completes the rewrite without delegating again. It does not
publish or submit anything, and the handoff grants no new authority to do so.
If a writer is unavailable, tell the user the pass could not be completed.
