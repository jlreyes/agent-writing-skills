# Engineering concern matrix

Use this matrix as a trigger system, not a form. Include a concern only when the change can materially affect it. Every triggered concern needs a conclusion in the main body and may link to deeper evidence.

| Concern | Trigger | The plan must decide |
|---|---|---|
| Goals and success | The work changes user or system behavior | Measurable outcome, non-goals, completion signal |
| Principles and priorities | More than one reasonable local choice exists | Canonical doctrine links, priority order, deviations |
| Ownership and state | More than one component reads or writes durable facts | Sole writer, source of truth, lifecycle, retention |
| Interfaces and identifiers | Work crosses a module, process, service, or client boundary | Contract, identity, authorization, error semantics, versioning |
| Concurrency and ordering | Multiple requests, workers, retries, or writers can overlap | Serialization boundary, ordering guarantee, race elimination or coordination |
| Idempotency and retries | An effect can be repeated or its outcome can be ambiguous | Idempotency key, dedup scope, retry owner, convergence, residue |
| Failure and recovery | A dependency or process can fail mid-operation | Detection, durable state, recovery path, retryability, terminal state |
| Data lifecycle | User, sensitive, regulated, or expensive data is stored | Collection, location, encryption, retention, deletion, auditability |
| Security and abuse | A trust boundary or privileged action changes | Authentication, authorization, secrets, threat/abuse controls |
| Reliability and operations | The feature serves production traffic or background work | Availability target, degradation, backpressure, operator actions |
| Performance, scale, and cost | Load, latency, storage, or vendor cost can drive design | Budget, capacity assumption, bottleneck, scaling mechanism, cost owner |
| Observability | Failure or degradation is not directly visible to the user | Structured events, metrics, traces, dashboards, alerts, ownership |
| Compatibility and migration | Existing data, clients, APIs, or deployments change | Compatibility window, migration, version skew, rollback safety |
| Testing and verification | A design claim is load-bearing | Invariant, test seam, real versus mocked boundary, acceptance criterion |
| Delivery and rollback | Work spans dependencies or can damage production | Increment order, dependency gates, rollout stages, trigger metrics, rollback |
| Hard-to-reverse choices | A wrong choice creates expensive migration or lock-in | Decision owner, evidence, alternatives appendix, reevaluation trigger |

## Decision-completeness audit

Before implementation, verify:

1. Every load-bearing choice is `locked`, `bounded`, `open`, or an explicit `assumption`.
2. Every `open` item blocks a named dependent step or has an authorized default.
3. Principles cover ordinary local discretion; priorities resolve conflicts between principles.
4. Shared state has a writer census and one owner per fact.
5. Concurrency is eliminated by topology where practical before locks, leases, or queues are introduced.
6. Normal flow appears before failure and adversarial interleavings.
7. Errors specify who observes them and what durable residue remains.
8. Tests prove architectural invariants at the real seam when mocks cannot establish the claim.
9. Rollout defines success and rollback triggers, not only deployment steps.
10. An implementing agent can identify when to proceed, when it has discretion, and when it must stop and escalate.
