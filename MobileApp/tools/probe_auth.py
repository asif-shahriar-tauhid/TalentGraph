#!/usr/bin/env python3
"""Read-only probe of the EXISTING backend auth endpoints (no changes, no secrets printed).
Usage: python3 tools/probe_auth.py http://localhost:<port>/api/v1 [--bearer <accessToken>]
Prints response SHAPES (keys/types) and the GitHub authorize URL parts. Paste the output into
docs/api/observed-responses.md. Values of anything token-like are never printed.
"""
import json, sys, urllib.request, urllib.error, urllib.parse

def shape(v, d=0):
    if isinstance(v, dict): return {k: shape(x, d+1) for k, x in v.items()} if d < 4 else "{…}"
    if isinstance(v, list): return [shape(v[0], d+1)] if v else []
    return type(v).__name__

def call(base, path, method="GET", body=None, bearer=None):
    req = urllib.request.Request(base.rstrip("/") + path, method=method)
    req.add_header("Accept", "application/json")
    if bearer: req.add_header("Authorization", f"Bearer {bearer}")
    data = None
    if body is not None:
        data = json.dumps(body).encode(); req.add_header("Content-Type", "application/json")
    try:
        r = urllib.request.urlopen(req, data, timeout=10); status, raw, hdrs = r.status, r.read(), r.headers
    except urllib.error.HTTPError as e:
        status, raw, hdrs = e.code, e.read(), e.headers
    except Exception as e:
        print(f"{method} {path}: FAILED {type(e).__name__}"); return None
    try: js = json.loads(raw)
    except Exception: js = None
    print(f"\n{method} {path} -> {status}")
    print("  set-cookie header present:", bool(hdrs.get_all("Set-Cookie")))
    print("  body shape:", json.dumps(shape(js)) if js is not None else "(not JSON)")
    return js

def main():
    if len(sys.argv) < 2: sys.exit(__doc__)
    base = sys.argv[1]; bearer = sys.argv[sys.argv.index("--bearer")+1] if "--bearer" in sys.argv else None
    js = call(base, "/auth/github/url?state=probe-state-123")
    url = (js or {}).get("data", {}).get("url") if isinstance(js, dict) else None
    if url:
        u = urllib.parse.urlparse(url); q = urllib.parse.parse_qs(u.query)
        print("\n  authorize host/path:", u.netloc + u.path)
        print("  redirect_uri:", q.get("redirect_uri"))
        print("  scope:", q.get("scope"), "| state echoed:", q.get("state"), "| params:", sorted(q))
        print("  >>> redirect_uri decides how the app can capture the return (see docs/api/auth-contract.md §2)")
    call(base, "/auth/me", bearer=bearer)  # expect 401 without --bearer; with it shows User shape
    call(base, "/auth/refresh-token", "POST", {"refreshToken": "invalid-on-purpose"})  # shows error shape
    print("\nNext: with a REAL sign-in done on the web, re-run with --bearer <accessToken> to see the User shape.")
    print("Never paste real tokens into docs or chat.")

main()
