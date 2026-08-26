# Surveys and questionnaires

Use this reference for product surveys, screeners, questionnaires, polls, and
in-product feedback. A survey is both a measurement instrument and a respondent
experience: it succeeds only when the answers support the intended decision and
the intended audience can answer as the writer meant.

## Start from the decision and the respondent

Name the decision, the people whose experience can inform it, and the signal
that would change it. If no plausible answer changes the decision, do not add a
question. If the purpose is still broad or unsettled, use exploratory research
before drafting a measurement instrument.

Keep a short, private signal note connecting the decision to the inferences the
survey must support. This is working context, not a prescribed ledger and never
respondent-facing copy. It should be just detailed enough to expose an orphan
question, an unsupported conclusion, or an analysis the instrument cannot
produce. Name the target population and how and when people will encounter the
survey; the claimed inference must not outrun that recruitment or trigger.

Treat the brief's taxonomy as provisional. The author is responsible for
challenging a model that cannot be translated into something respondents
recognize and can report. Terms such as `workflow`, `occasion`, or an internal
feature area belong in the survey only when the audience actually uses them
with the intended meaning.

Ask for evidence respondents can reliably provide. Recent concrete behavior,
a specific episode, usual behavior, attitudes, intentions, and hypothetical
choices are different signals; do not slide from one to another. Match recall
periods and answer units to the activity's natural cadence. Monthly budgeting
and annual tax filing, for example, should not inherit one generic frequency
question merely because both were grouped under personal finance.

## Preserve the signal in respondent language

Plain language is not a request to weaken the construct. Keep the research
meaning precise in the private signal note, then express one answerable task in
the audience's words. If the signal remains understandable only with an
explanation of the research model, change the item design: split the question,
ground it in a concrete scenario, or choose a different source of evidence.

Do not let hypothetical usefulness stand in for evidence of current behavior.
Keep those signals distinct and choose their order deliberately. Asking about
behavior first can protect recall from concept framing; when order effects are
material, randomize, split the sample, or state the limitation. Keep a
particular episode separate from what usually happens. Each item should ask the
respondent to remember, judge, or predict one thing in one frame of reference.

Response options are part of the measurement. They must express the construct
in an interpretable way and let a truthful respondent answer. For an ordinal
construct, keep scale direction stable and make the order legible. A privacy
progression must increase protection rather than changing storage, processing,
provider access, and device location at once. Product and privacy claims must
match the real system.

Treat the instrument as one experience. Every block should earn its place by
changing the decision, supporting a meaningful comparison, or routing someone
to a question they can answer. If a form becomes a behavior study, concept
test, pricing exercise, privacy study, and recruitment screener at once, split
the research job instead of hiding the collision in more pages.

Branching, requiredness, and presentation can change the data as surely as
wording can. Before implementation, inspect the relevant native components and
formatting capabilities of the available platform, then choose the presentation
that makes each question, instruction, and transition easiest to understand.
Do not use a capability merely because it exists; use it when it improves the
respondent's task. A skip must not bypass data needed later, a required item
must remain reachable, and a forced-answer item is an instruction-following
check, not a display check or proof of general comprehension and attention.

## Review from both sides

For a consequential or novel external survey, comprehension and measurement
are distinct failure modes. When both are material, the primary agent should
use the existing fresh writer role in two independent cold-review contexts
after the author drafts. Give the respondent reviewer only the audience context
and rendered instrument; ask where a target respondent could misunderstand the
task, recall a different experience, lack an honest option, follow a broken
path, or struggle with the actual device and presentation. Give the measurement
reviewer the private signal note as well; ask whether the instrument supports
the intended inference, keeps behavior distinct from attitude and intention,
uses defensible comparisons and timeframes, and avoids leading, ordering,
sampling, privacy, and routing artifacts.

These are scoped reviews, not new permanent roles. The author reconciles them
against the decision in a bounded revise-and-recheck loop, normally one
revision with targeted recheck. Exit when no material threat to the decision
signal remains. If another material defect appears or the two needs remain in
conflict, state what is unresolved and escalate with a recommendation rather
than polishing indefinitely.

AI review is preflight, not launch proof. Validate comprehension and the
rendered experience with actual target respondents before a consequential
external launch; use a pilot or soft launch when the stakes or uncertainty
justify it. If that testing is outside the agent's authority or available
mechanisms, report the limitation and recommendation instead of declaring the
instrument launch-ready. Use a lighter process for a low-stakes internal pulse;
proportionality is part of the method.

## Inspect the rendered survey experience

After implementation, use the existing fresh writer role in a separate,
independent survey-experience review context. Give that reviewer the rendered
instrument, audience context, and an inventory of materially distinct
respondent routes; ask whether the actual composition, visual hierarchy,
grouping, spacing, device presentation, and transitions make the primary task
clear and give instructions, examples, and other secondary copy proportionate
weight. This is not a permanent third reviewer role. It is a post-build review
of the interface that respondents will use.

Start route QA after implementation and after any material content, logic, or
layout change. Enumerate materially distinct routes rather than every answer
permutation, then exercise each listed route end to end, including
qualification, disqualification, and branches whose questions, requirements,
or completion state differ. Success means every listed route was exercised and
no material experience or measurement defect remains; after an edit, recheck
only the affected routes and presentation. Call this “rendered-path testing”
only when that full listed route set was covered. If the route set, rendered
form, or relevant platform capabilities cannot be inspected, report what is
outstanding and escalate with a recommendation rather than declaring the survey
complete.

## Source basis

This reference favors practitioners who combine survey measurement with
product and user behavior. SurveyMonkey research scientist [Erin Pinkus](https://www.surveymonkey.com/curiosity/qa-expert-survey-advice-from-our-research-scientist/)
connects survey goals, respondent burden, comparison groups, analysis, and
early cross-functional review. Google researchers Hendrik Müller and Aaron
Sedley cover rigorous [survey design for HCI](https://research.google/pubs/designing-surveys-for-hci-research/)
and the effect of triggering, sampling, wording, and device presentation in
[contextual product surveys](https://research.google/pubs/user-experience-considerations-for-contextual-product-surveys-on-smartphones/).
MeasuringU's Jeff Sauro and Jim Lewis bring research methods, statistics,
experimental psychology, and decades of product UX practice to their
[survey-question blueprint](https://measuringu.com/blueprint-for-writing-survey-questions/)
and book on [surveying the user experience](https://measuringu.com/book/surveying-the-user-experience/).
