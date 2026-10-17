# dot_auto

Research for an English/Simplified-Chinese video delivery and storage planning workbench.

**No website has been implemented or deployed. Stage 1 is in progress, not passed.** This repository currently preserves a reviewed research snapshot, not a working product or proof of commercial demand.

## Current evidence

- 100 frozen candidate phrases: 50 English and 50 Simplified Chinese, mapped to eight canonical tools rather than 100 separate pages.
- 72 strictly tool-intent candidates meet the numerical threshold of at least 60. Eight additional comparison candidates are included in the broader 80-row candidate flag; 20 are learning/informational queries.
- The frozen dataset records zero verified top-three SERP observations. Live observation is incomplete and will be archived separately after review. The full Stage 1 gate is **not passed**.
- Ten core queries are selected for later competitor inspection. Stage 2 requires opening and screenshotting the observed top five organic results per query. Browser-readiness checks do not count toward these 50 competitor screenshots.
- Niche comparison and an independent challenge document existing supply and plausible differentiation. They do not establish search volume, low competition, traffic, paid demand, revenue, or country accessibility.

## Files

- `research/media-keywords-100.csv` and `.json`: frozen candidate list, including explicit unknown evidence fields.
- `research/media-keywords-freeze.json`: freeze metadata and CSV SHA-256.
- `research/media-keywords-core10.json`: selected next-stage queries.
- `research/media-keywords-revisions.json`: candidate revisions.
- `research/media-keywords-audit.md`: historical pre-freeze review. Its required replacements were applied in the freeze; the revision log is authoritative for those changes. Its broader 80 candidate count includes comparisons, not 80 strictly tool-intent rows.
- `research/niche-comparison.md` and `research/media_niche_challenge.md`: recommendation, alternatives, primary references, risks and limits.
- `acceptance/00-project-gates.md`: acceptance criteria for each stage.
- `CHANGELOG/2026-10-17.md`: factual progress record in UTC.

Formula specifications and example fixtures are still under independent review and are not included in this snapshot. The niche report's formula-spec reference describes planned supporting material, not a published implementation.

## Planned scope, not completed features

Video file size; target bitrate; upload/transfer time; delivery deadlines; recording capacity; multicamera storage; offload/verified-copy time planning; proxy/storage tradeoff. Computation is intended to use supplied measurements and explicit assumptions. It will not encode, upload, copy, or verify media files.

Implementation is gated on research acceptance. No performance score, passing test suite, working preview, or completed stage is claimed here.
