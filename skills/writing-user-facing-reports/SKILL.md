---
name: writing-user-facing-reports
description: Writes and restructures substantive reports for direct consumption by the user using audience-centered, answer-first, progressively disclosed English. Must be used before drafting, revising, or returning a report, research synthesis, analysis, audit, investigation, review, or decision brief intended for the user, including work produced by another agent or workflow. Does not apply to agent-to-agent reports, raw evidence packs, machine-readable outputs, tool logs, or short status updates.
license: MIT
metadata:
  author: jlreyes
  version: 1.0.0
---

# Writing user-facing reports

A user-facing report is an interface to evidence, not a transcript of the work that produced it.

Internal artifacts may optimize for exhaustive context, lossless transfer, or another agent's ability to continue the work. A report handed to a user has a different job: help a reader understand what matters, why it matters, how certain it is, and where to inspect the support. Preserve the underlying evidence, but redesign its presentation around that job.

This skill governs substantive artifacts meant to be read directly by the user. It does not change how agents communicate with one another. If an agent-facing artifact must remain dense, keep it intact and create a distinct user-facing report or genuinely self-sufficient reader layer.

## Start from the rhetorical situation

Before choosing sections, silently complete this sentence:

> As a **[reader]**, I need to understand or decide **[question]**, so that I can **[outcome]**.

Also establish what the reader already knows, what they are likely to challenge, how much attention they can reasonably give the report, and what they should be able to do after reading it. Infer these from the request and context when they are clear. Ask only when materially different answers would produce materially different reports.

Do not begin with the chronology of the research, the available source material, or a generic template. Those describe the writer's situation, not the reader's need.

## Think with complementary frameworks

These frameworks are lenses, not a sequence of mandatory headings. Use them together to find the clearest shape for the particular report.

### User-need formulation

The ONS user-need model keeps the report anchored in a real reader and use. Every major section should help answer the reader's question or enable the intended outcome. Material that is merely available does not earn a place in the main path.

### Minto Pyramid Principle and SCQA

Use Situation–Complication–Question–Answer to discover the question the reader actually needs answered. Then use the Pyramid Principle to organize the response: one governing answer supported by a small number of distinct, collectively sufficient points, each supported in turn by evidence and reasoning.

This is an argument structure, not necessarily a visible template. A report need not display “Situation” or “Complication” headings. Nor must the governing answer be a confident recommendation: it may be a qualified conclusion, a map of unresolved tensions, or “the evidence is insufficient.” Answer-first writing does not suppress uncertainty; it makes the uncertainty legible.

### Inverted pyramid

Order information from highest consequence to lowest:

1. What the reader must know or decide.
2. What explains, supports, qualifies, or challenges it.
3. Background, method, provenance, and reference detail.

Apply this ordering at the level of the whole report, each section, each paragraph, and—where useful—each sentence. Lead with the conclusion, then earn it.

### Progressive disclosure

Make the first layer independently useful. A reader who sees only the opening and scans the headings should still recover the governing answer, its supporting logic, the material limits, and the route to deeper evidence.

Place detail at the depth where it becomes useful. Methodology, implementation detail, SQL, logs, long quotations, source inventories, and exhaustive taxonomies normally belong in subordinate sections, appendices, or linked evidence artifacts. Promote them only when they change the interpretation, confidence, or decision.

Progressive disclosure is not deletion. It is the deliberate placement of information according to reader need.

### Plain-language principles

ISO plain-language principles ask whether readers get what they need and can find, understand, and use it. Prefer familiar and specific words, direct syntax, explicit relationships, and definitions at the point of need. Technical precision and plain language are compatible; unexplained internal vocabulary is not precision.

### Diataxis as a separation check

Diataxis is not the governing structure for an analytical report, but it is useful for detecting genre collisions. If one document is simultaneously an argument, an evidence archive, a methodology paper, a reference catalog, and an operational runbook, separate those functions into layers or companion artifacts rather than forcing them into one flat narrative.

## Build a reader-first argument

Form the governing point before drafting the body. Group support by the reader's questions and the logic of the answer—not by research phase, source, subagent, tool, or implementation component.

Use headings that carry conclusions or name a specific subject. “Two lifecycle gaps cause the failures” is more useful than “Findings”; “The evidence supports X, with two limits” is more useful than “Analysis.” A heading hierarchy should reveal the report's argument when read by itself.

Keep different epistemic roles visible:

- **Evidence**: what the sources or observations establish.
- **Interpretation**: what follows from that evidence and why.
- **Recommendation**: what the writer thinks should be done.
- **Decision**: what an authorized person has actually chosen.

These may appear together, but do not let one silently impersonate another. Put limitations and meaningful counterevidence beside the claims they qualify, not in a distant disclaimer section.

Methodology earns trust but rarely deserves to organize the opening. Surface the methodological facts that materially affect the verdict; keep procedural detail backstage and make it inspectable.

## Write prose that carries the logic

A strong analytical paragraph usually moves through **claim → evidence → reasoning or implication → material qualification**. This is a reasoning pattern, not a demand that every paragraph contain four labeled parts.

Give each paragraph one controlling point. Start from shared context and move toward new information. Use transitions that name the logical relationship—cause, contrast, consequence, example, qualification—instead of narrating the writing process.

Prefer concrete subjects and active verbs. Define unavoidable jargon once, near first use. Remove implementation detail that does not alter the reader's understanding or confidence. Use tables, diagrams, or lists when they expose comparisons, mappings, hierarchy, or sequence more clearly than prose; do not use them merely to make dense material look organized.

Compression is not the goal. A short report can still be opaque, and a long report can be navigable. Optimize for the reader's time to insight while preserving the nuance required for an honest conclusion.

## Adapt work produced for agents

When another agent, workflow, or remote system returns a dense report, treat it as source material rather than a finished user deliverable.

Read enough of the source to recover its claims, evidence, uncertainty, and provenance. Identify the user's governing question, rebuild the hierarchy around the answer, and move supporting detail to the appropriate layer. Preserve citations and evidence boundaries. Do not merely prepend an executive summary to an unchanged dump when the body still forces the user to reconstruct the argument.

If the original artifact remains useful for audit or agent continuation, preserve it as a clearly labeled evidence pack and link it from the user-facing report. If the user asked for a durable report, the durable artifact itself—not only the chat handoff—must satisfy this skill.

## Respect specialized genres

A more specific writing skill owns its artifact: for example, `writing-technical-plans`, when available, owns technical plans; a pull-request skill owns PR descriptions; and an email skill owns email. Use this skill when the artifact is genuinely a user-facing report, or to govern the final handoff where the specialized skill leaves room. Do not impose a second conflicting template.

## Test the reader's route

Before returning the report, scan only its title, opening, headings, and closing synthesis. Ask:

> Could the intended reader explain the answer, the supporting logic, the material limits, and where to inspect the evidence?

If not, repair the argument or hierarchy. More summary prose cannot compensate for a document whose main path is still organized around the production process.

Then read the report as the failure reader: someone arriving cold, short on time, skeptical of unsupported claims, and uninterested in reconstructing the agent's process. Fix the places where that reader would lose the thread, mistake inference for fact, or have to read implementation detail before learning why it matters.

## Framework sources

- [The Minto Pyramid Principle](https://barbaraminto.com/)
- [ONS: Writing user needs](https://service-manual.ons.gov.uk/content/writing-for-users/user-needs)
- [ONS: Structuring content](https://service-manual.ons.gov.uk/content/writing-for-users/structuring-content)
- [ISO 24495-1: Plain language](https://www.iso.org/standard/78907.html)
