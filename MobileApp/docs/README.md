# docs/ index
| Path | Purpose | Loaded by Kilo? |
|---|---|---|
| `spec/auth-scope.md` | Auth requirements distilled + owner decisions | when a task says so |
| `spec/mobile-source-of-truth.md` | Full mobile spec (archival) | only on conflict |
| `design/tokens.md` | Exact color/type/spacing tokens | when a task says so |
| `design/DESIGN.md` | Full design brief (archival) | only on conflict |
| `design/screens/` | Sorted Stitch PNGs by segment + `INDEX.md` | INDEX + one PNG per task |
| `api/auth-contract.md` | Real backend contract + capture strategies | when a task says so |
| `api/observed-responses.md` | Live probe output | when a task says so |
| `decisions/open-questions.md` | Answered/open questions | when a task hits one |
| `tasks/T00…T07` | Sequential Kilo prompts | one per session |
| `AUDIT.md` | Full audit/decision log for teammates + their AI | onboarding only |
Tools (run by humans): `tools/sort_stitch_export.py`, `tools/probe_auth.py`.

## Order of work
1. Commit current state. 2. `python3 tools/sort_stitch_export.py` (dry run) → `--apply` → check `INDEX.md` → commit "design assets only". 3. Answer Q11/Q12 (or run T00). 4. Kilo: T00 → T07, one fresh session each, owner verifies each.
