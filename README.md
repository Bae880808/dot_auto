# dot_auto

An English/Simplified-Chinese video delivery and storage planning workbench.

## Current source: accepted Stage 4

Eight functional calculators, each localized into English and Simplified Chinese, provide 16 tool URLs plus two localized homes:

1. Video file size
2. Target-size bitrate budget
3. Upload/transfer time
4. Delivery-deadline budget
5. Recording capacity
6. Multicamera storage
7. Offload and verified-copy time planning
8. Proxy/storage and handoff-time tradeoff

The Stage 4 source has passed local automated verification. Stage 5 deployed auditing is in progress; local tests are not browser, mobile or Lighthouse acceptance.

Verified preview origin: https://dot-auto.vercel.app/en/

At this source publication, the public preview still serves the accepted Stage 3 home/template and file-size exemplar until the next deployment. Do not assume the preview matches this commit. Stage 3 previously achieved mobile Lighthouse Performance/Accessibility/SEO 100/100/100 on its four localized home/tool pages; those scores do not certify the expanded Stage 4 site.

## Build and verify

Node.js 18+; no npm dependencies, account or API credentials required.

    SITE_URL=https://dot-auto.vercel.app npm run verify
    npm run serve

See [BUILD.md](BUILD.md) for routes, units, assumptions and verification boundaries. Required files are src/, scripts/, tests/, data/ and package.json. The code-owned synthetic numeric fixtures are documented in [data/README.md](data/README.md). Deploy only generated dist contents, never the repository root.

This code was archived from the accepted Stage 4 source snapshot with SHA-256 6be4c4307a7ff832d2a102276515ee05c98f85e03636a5a8f9793ffeb864eff4. No later in-progress source changes are included.

## Limits

Calculations use supplied measurements and explicit assumptions. They do not encode, upload, copy or verify media files, guarantee delivery times, or validate camera presets. Advanced parallel offload is an explicitly idealized model, not a performance promise.

Existing research files are the initial frozen candidate snapshot. Later research archives and screenshots are not included in this code-only commit. Candidate phrases and competitor offers are not proof of demand, revenue, low competition or country reach.
