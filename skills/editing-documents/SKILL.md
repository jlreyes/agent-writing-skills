---
name: editing-documents
description: Edits existing documents conservatively, preserving their structure, detail, and intent while making the smallest changes that satisfy the request. Use when revising, redlining, restructuring, or applying feedback to an existing plan, specification, report, README, prompt, or other long-form document.
license: MIT
metadata:
  author: jlreyes
  version: 1.0.0
---

# Editing documents

Treat the existing document as intentional. The requested change defines the
edit scope; preservation is the default.

Prefer a targeted patch over a rewrite. Read enough of the whole document to
understand the changed section's role and dependencies, then make the smallest
coherent edit that fully addresses the request. Preserve unrelated sections,
detail, examples, evidence, rationale, voice, and structure.

Do not silently rewrite, summarize, compress, merge, reorder, or delete material
because a cleaner document seems possible. Change dependent passages only when
leaving them untouched would make the document inconsistent, and report that
scope expansion. Propose broader improvements separately instead of folding
them into the authorized edit.

Before finishing, compare the result with the original and account for every
removed, merged, or materially shortened section. If a loss is not required by
the request, restore it. If the requested outcome genuinely requires replacing
large sections or the intended scope is ambiguous, stop and ask before doing so.
