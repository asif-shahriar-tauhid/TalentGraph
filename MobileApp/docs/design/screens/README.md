# Design screens

Layout after `python3 tools/sort_stitch_export.py --apply`:
```
screens/
  INDEX.md                 one row per Stitch screen: segment, theme, variant, files, STATUS (unreviewed → approved)
  auth/  jobs/  assessments/  notifications/  shared-states/   <screen>__<dark|light>__v<N>.png
  <segment>/html/          Stitch HTML (reference only; hidden from Kilo)
  _archive/                dropped / not-in-spec / untitled / stitch-design-system (hidden from Kilo)
  stitch_talentgraph_candidate_mobile_app/   RAW export (hidden from Kilo; move out of the repo when done)
```
- `vN` = alternative generations of the same screen. Nothing is approved until a human sets STATUS in `INDEX.md`. Kilo uses `v1` unless told otherwise.
- `jobs/` includes the apply flow (application_*). `assessment_result_*` is flagged NEEDS DECISION (spec TBD).
- Rules for tools: read `INDEX.md`, then ONE PNG at a time; never attach folders; never port HTML/CSS literally.
- Folders with trailing spaces break the script — rename first (`mv 'assessments ' assessments`).
