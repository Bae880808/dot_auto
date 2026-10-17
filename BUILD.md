# Build and verify

## Requirements and commands

Node.js 18+; no npm dependencies, external fonts, media assets, accounts or API keys are needed. Python 3 is optional for a local static preview.

```sh
npm run verify
npm run serve
```

Open `http://localhost:4173/en/video-file-size/` or the Chinese equivalent at `/zh/video-file-size/`. Local preview is not a deployment or a mobile Lighthouse audit.

### Production origin

Canonical URLs, hreflang alternatives and sitemap URLs are emitted only when the actual deployment origin has been verified. Do not supply an invented domain.

```sh
SITE_URL=https://verified-deployment-origin.example npm run build
npm test
npm run check
```

The example host above is a placeholder, not a claimed deployment. Replace it with the verified HTTPS origin, without a path. Deploy the contents of `dist/`, not the project root: research, acceptance files, source notes and publication internals are deliberately excluded from the generated site. `dist/` is a completely reproducible generated directory and can be deleted/rebuilt safely. The publisher handles repository commits and the assigned deployment worker handles deployments.

## Files and extension points

- `src/content/en.mjs`, `src/content/zh.mjs`: inspectable language-specific copy and content arrays, independent from visual layout.
- `src/math.mjs`: pure validated arithmetic shared by runtime and tests. All rates normalize through explicit units; no network calls or media reads.
- `src/app.mjs`: progressive interactive enhancement, per-field errors, result announcements, unit-preserving changes, copy and loadable examples.
- `src/style.css`: responsive shared design system; system fonts, visible keyboard focus, reduced-motion preference.
- `scripts/build.mjs`: the shared page/layout renderer, structured data, localized home/tool paths, robots and optional canonical/hreflang/sitemap emission.
- `scripts/check.mjs`: static title/H1 uniqueness, nine modules, four FAQs, examples, schema, IDs, link targets and content-length checks.
- `tests/math.test.mjs`: independent fixtures, unit conversions, numerical domain and presentation tests using Node's built-in test runner.

## Implemented routes (Stage 4)

- `/`: language selector, not a calculator.
- `/en/`, `/zh/`: localized homes linking all eight functional tools.
- Each locale has `/video-file-size/`, `/target-bitrate/`, `/upload-transfer-time/`, `/delivery-deadline/`, `/recording-capacity/`, `/multicamera-storage/`, `/offload-verified-copy/`, `/proxy-storage-tradeoff/`.
- `/qa/`: noindex, robots-excluded same-origin responsive iframe fixture. Select any tool and EN/ZH, then load its 360, 390 and 768 CSS-pixel frames. Tall frames avoid internal vertical scrollbars; record `innerWidth`, `clientWidth` and document/body `scrollWidth` separately. No overflow is hidden. This is CSS viewport testing, not mobile device emulation, and is excluded from sitemap/tool counts.

The Stage 3 source snapshot remains under its acceptance directory. The current build extends the same renderer, visual system and zero-dependency architecture; no framework replacement occurred.

### Stage 4 extension files

- `src/planner-math.mjs`: seven-tool normalized Number arithmetic plus proxy-timing comparison; explicit sequential/parallel models and scalar validation.
- `src/planner-defs.mjs`: declarative field schemas, unit-preserving conversion, strict input boundary, active-mode normalization and human-readable result presentation.
- `src/planner-ui.mjs`, `src/planner-app.mjs`: shared accessible field/result HTML and browser interaction; repeatable camera groups and destinations, source-reread options, loadable fixtures and copying.
- `src/content/planners.mjs`: bilingual explanatory modules and exactly four provenance-matched FAQ questions per new tool.
- `scripts/planner-template.mjs`: common nine-module renderer and fixture-to-form mapping. All examples load the same actual fields and computation path used by ordinary inputs.
- `tests/planner-math.test.mjs`, `tests/planner-adapter.test.mjs`: independent-fixture coverage, input adapters, mode isolation, unit round trips and infeasible/edge-case presentation.

## Validation contract

Inputs use a decimal point, no grouping separators, no exponent syntax, and a maximum of 15 significant digits. Blank/partial/nonfinite/negative inputs are rejected. Video bitrate and duration must be positive; zero audio and allowance are valid. Numeric normalized quantities and intermediates must stay finite and within Number.MAX_SAFE_INTEGER, a software range limit, not a media/device limit. A resulting zero from underflow is rejected. No assumed maximum container allowance is enforced; above 20% is a visible warning, not a technical limit.

Values displayed in GB/GiB round to three decimals; small positive values use a less-than threshold. Raw results remain unrounded for arithmetic. Changing rate or duration units preserves the physical quantity within floating-point tolerance. The examples use exact integer-byte results from `data/calculator-fixtures.json`, with explanatory text independently written from the specification.

## Acceptance boundaries

`npm run verify` does not open a browser, emulate a device or produce Lighthouse scores. It must not be described as browser QA. Screenshot, interaction, responsive overflow and real mobile Lighthouse Performance/SEO/Accessibility >=90 remain separate deployment-worker gates. No competitor superiority claim is made. The FAQ provenance is preserved in research and is described honestly: four observed English Bing PAA questions, independently authored answers, Chinese translations rather than independent Chinese-market PAA observations.

## Model-specific safety boundaries

Measured transfer mode omits nominal rate and efficiency rather than discounting a measured payload rate twice. Deadline v1 uses elapsed time remaining, and separately names how long before the deadline the entire workflow versus upload must start; no unqualified local-time or DST arithmetic is used. Target budgets that are nonpositive are explicitly infeasible; a positive budget below 0.01 Mbps does not recommend a zero encoder setting.

Multicamera groups may have different camera counts, durations and bitrates. Total destination copy count excludes source cards; leaving a fraction free divides by (1 − reserve). Offload uses measured sequential copy rates by default, destination read-and-hash rates and optional independent source reread. Advanced parallel is expressly idealized fan-out with mandatory source, destination and aggregate caps, separate copy/verification phases and no unknown-cap infinity assumption. Results do not perform or prove file integrity verification.

Proxy storage retains independent original/proxy copy counts (either may be zero, not both); this is not permission to delete originals. Handoff timing compares one set under sequential transcode-then-upload, using the same measured effective throughput for both alternatives. Break-even branches handle zero transcode, equal/larger proxies and positive/negative savings without division by zero. Rounding and display thresholds are separated from raw feasibility comparisons.

## Clean code-only checkout

Required build/test files are `package.json`, `src/`, `scripts/`, `tests/` and `data/`. No research directory, acceptance archive, publication tooling, credentials or external download is required. `data/calculator-fixtures.json` is immutable code/test data containing the eighteen synthetic numeric scenarios used to validate and load examples. Its exact-byte SHA-256 and caveats are in `data/README.md`. Do not regenerate its expected values from the implementation being tested.

From that clean file set, run `SITE_URL=https://dot-auto.vercel.app npm run verify`. The command tests, builds all localized routes and checks static output. No dependency installation is needed.
