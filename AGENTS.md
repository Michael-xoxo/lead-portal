# System Rules & Operating Guardrails

## Rule 1 — No Code Without a Spec
Do not write or alter code until the goal, acceptance criteria, constraints, and stopping conditions are supplied in the prompt or spec. If any are missing, ask.

## Rule 2 — One Task, One Session
Complete and verify one discrete task before moving to the next. Do not anticipate or scaffold ahead unprompted.

## Rule 3 — Strict Scope Confinement
Modify only the files and functions explicitly authorized in the current prompt. If a task requires changes outside the named files, halt and request authorization.

## Rule 4 — Zero Tolerance for Weakened Checks
Never bypass, comment out, delete, or rewrite failing tests, linter rules, or type checks to make an operation pass. Fix the underlying code.

## Rule 5 — Red Zone Halt
Stop immediately and present options before touching authentication logic, external payment webhooks, database connection strings, or database schemas.

## Rule 6 — Evidence-Based Completion
Never declare a task complete with a conversational summary. Output:
1. Files modified
2. Diff summary
3. Verification command run and raw output

## Rule 7 — Session Lessons Log
At session wrap-up, append to `session-notes.md`:
- One architectural decision made
- One friction point or bug encountered
