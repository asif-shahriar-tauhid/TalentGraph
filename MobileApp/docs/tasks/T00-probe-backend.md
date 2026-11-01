# T00 — Probe the live backend (read-only, no Flutter code)
Read: `docs/api/auth-contract.md`.
Do:
1. Ask the owner to start the backend and give its port. Run `python3 tools/probe_auth.py http://localhost:<port>/api/v1`.
2. Save output verbatim to `docs/api/observed-responses.md` + 5 lines: envelope confirmed?, `redirect_uri` found (= `GITHUB_CALLBACK_URL`), scope, what `/auth/me` returns (ask owner for a real Bearer token via `--bearer`, never paste it into files), any difference from contract §2–§4.
3. From the `redirect_uri`: custom scheme → strategy C; http(s) URL → strategy A unless owner chose B (Q11). Record the choice in the contract §5.
Don't: write app code, edit backend/web, print tokens.
Accept: observed-responses.md filled; contract updated where reality differs; strategy recorded; blockers listed or "none".
