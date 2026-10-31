#!/usr/bin/env python3
"""Sort the Stitch export into segment folders for the TalentGraph mobile app.

Run from MobileApp/ :
  python3 tools/sort_stitch_export.py            # DRY RUN (default): prints plan, writes nothing
  python3 tools/sort_stitch_export.py --apply    # copies files + writes docs/design/screens/INDEX.md
  python3 tools/sort_stitch_export.py --apply --move   # moves instead of copying (originals leave the raw folder)

Defaults: --src docs/design/screens/stitch_talentgraph_candidate_mobile_app  --dest docs/design/screens
Layout produced:
  <dest>/<segment>/<screen>__<dark|light>__v<N>.png
  <dest>/<segment>/html/<screen>__<dark|light>__v<N>.html     (hidden from Kilo by .kilocodeignore)
  <dest>/_archive/<reason>/...                                (out of scope; hidden from Kilo)
Segments: auth, jobs (incl. apply flow), assessments, notifications, shared-states (left for the team).
Naming facts about the Stitch export this relies on: folder = one screen; suffix _light_mode / _dark_mode;
trailing _1,_2,_3 = alternative generations of the same screen (kept as v1,v2,v3 until a human approves one).
"""
import argparse, re, shutil, sys
from pathlib import Path

# (regex on base name, segment, note) - first match wins. segment starting with "_archive/" = out of scope.
RULES = [
    (r"^skill_percentiles",            "_archive/not-in-spec",  "SkillGraph-style content; mobile spec forbids SkillGraph/charts"),
    (r"^untitled_prototype",           "_archive/untitled",     "unnamed prototype"),
    (r"^email_verification",           "_archive/dropped",      "owner: GitHub-only auth, no email verification"),
    (r"^(candidate_welcome|github_connection)", "auth",         ""),
    (r"^(jobs_|job_details)",          "jobs",                  ""),
    (r"^application_",                 "jobs",                  "apply flow lives under Jobs"),
    (r"^assessment_result",            "assessments",           "NEEDS DECISION: result release is TBD in the spec"),
    (r"^(assessment_|active_assessment)", "assessments",        ""),
    (r"^(candidate_notifications|notification_)", "notifications", ""),
]
NAME_RE = re.compile(r"^(?P<base>.*?)(?:_(?P<theme>light|dark)_mode)?(?:_(?P<n>\d+))?$")

def parse(name: str):
    m = NAME_RE.match(name)
    return m.group("base"), (m.group("theme") or "dark"), int(m.group("n") or 1)

def classify(base: str):
    for rx, seg, note in RULES:
        if re.search(rx, base):
            return seg, note
    return "_archive/unmatched", "no rule matched - review by hand"

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", default="docs/design/screens/stitch_talentgraph_candidate_mobile_app")
    ap.add_argument("--dest", default="docs/design/screens")
    ap.add_argument("--apply", action="store_true"); ap.add_argument("--move", action="store_true")
    a = ap.parse_args(); src, dest = Path(a.src), Path(a.dest)
    if not src.is_dir(): sys.exit(f"source folder not found: {src}")
    # guard: folders whose names end with a space (seen in the project tree) create duplicates on Linux
    if dest.is_dir():
        bad = [p.name for p in dest.iterdir() if p.is_dir() and p.name != p.name.strip()]
        if bad: sys.exit(f"ERROR: folder names with trailing spaces in {dest}: {bad!r}. Rename them first (e.g. mv 'assessments ' assessments).")
    rows, ops, seen = [], [], {}
    for d in sorted(p for p in src.iterdir() if p.is_dir()):
        files = {f.suffix.lower(): f for f in d.iterdir() if f.is_file()}
        if d.name == "evidence_trail" or (".md" in files and ".png" not in files and ".html" not in files):
            tgt = dest / "_archive" / "stitch-design-system" / f"{d.name}-DESIGN.md"
            ops.append((files[".md"], tgt)); rows.append((d.name, "_archive", "design-system", "-", "-", "md", "Stitch-generated design system; tokens.md stays authoritative")); continue
        base, theme, n = parse(d.name); seg, note = classify(base)
        key = (seg, base, theme, n); k = seen.get(key, 0); seen[key] = k + 1
        if k: n = n * 100 + k  # same key twice (shouldn't happen) - keep distinct
        stem = f"{base}__{theme}__v{n}"
        have = []
        for ext, sub in ((".png", ""), (".html", "html")):
            if ext in files:
                tgt = dest / seg / sub / f"{stem}{ext}" if sub else dest / seg / f"{stem}{ext}"
                ops.append((files[ext], tgt)); have.append(ext[1:])
        flag = note + ("; NO PNG (html only)" if "png" not in have else "")
        rows.append((d.name, seg, base, theme, f"v{n}", "+".join(have), flag.strip("; ")))
    for s, t in ops:
        print(f"{'MOVE' if a.move else 'COPY'}  {s.relative_to(src.parent) if s.is_relative_to(src.parent) else s}  ->  {t}")
        if a.apply:
            t.parent.mkdir(parents=True, exist_ok=True)
            (shutil.move if a.move else shutil.copy2)(s, t)
    segs = {}
    for r in rows: segs[r[1].split('/')[0]] = segs.get(r[1].split('/')[0], 0) + 1
    print("\nscreens per segment:", segs, "| files:", len(ops))
    if a.apply:
        out = ["# Screen index (generated by tools/sort_stitch_export.py)", "",
               "Status values: unreviewed -> approved | rejected | needs-rework. A human sets the approved variant per screen.", "",
               "| Stitch folder | Segment | Screen | Theme | Variant | Files | Status | Notes |", "|---|---|---|---|---|---|---|---|"]
        out += [f"| `{r[0]}` | {r[1]} | {r[2]} | {r[3]} | {r[4]} | {r[5]} | unreviewed | {r[6]} |" for r in rows]
        dest.mkdir(parents=True, exist_ok=True); (dest / "INDEX.md").write_text("\n".join(out) + "\n")
        print(f"wrote {dest/'INDEX.md'}")
    else:
        print("DRY RUN - nothing written. Re-run with --apply.")

if __name__ == "__main__":
    main()
