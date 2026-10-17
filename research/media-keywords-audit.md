# Independent audit of 100 candidate queries

Reviewed live CSV at 2026-10-17 18:14:52 UTC. It already uses the agreed eight canonical tools, not the older broad tool set. Original files were not modified.

## Freeze recommendation

Pass for a 100-query bilingual SERP investigation after the two required replacements below. Do not present this as 100 independent tasks, 100 observed searches, 100 pages, or verified demand. It is 50 English candidates paired with 50 Simplified-Chinese candidates, containing 80 candidate tool-intent phrases and 20 informational phrases. The 80 tool-intent rows satisfy the >=60 candidate tool-intent gate syntactically; actual SERPs can reclassify them. There are eight canonical tool destinations, each localized, rather than 100 landing pages.

The strongest semantic duplicate is originals-retained proxy storage vs originals-plus-proxies storage: IDs 89 and 93, with Chinese equivalents 95 and 99. Replace the second pair with an actual decision task already in scope: whether transcode time is repaid by faster transfer.

## Required replacements before freezing

| ID | Current | Recommended replacement | Canonical tool | Reason |
|---|---|---|---|---|
| 93 | camera originals plus proxies total storage calculator | proxy transcoding versus upload time calculator | proxy-storage-tradeoff | Duplicates 89; replacement tests a different decision using measured transcode time. |
| 99 | 原片加代理文件总容量计算器 | 代理转码和上传总耗时对比计算器 | proxy-storage-tradeoff | Duplicates 95; same decision replacement as English. |

## Optional wording improvements, not extra intents

These improve naturalness or remove misleading implied functionality. They do not create new distinct tasks and should not increase the keyword count.

| ID | Suggested wording | Why |
|---|---|---|
| 5 | ProRes file size calculator bitrate | Custom-bitrate wording is synthetic. The tool still requires a known rate; no automatic exact ProRes preset promise. |
| 10 | 10分钟4K视频大小计算器 | More natural Chinese query order; still requires bitrate, not just resolution. |
| 12 | ProRes视频大小计算器 码率 | More natural than 自定义码率计算. |
| 23 | 100MB视频文件 目标码率计算器 | Avoids implying the site actually compresses a file. |
| 26 | 视频码率计算器 封装开销 | More natural than 含封装预留的视频码率预算计算器. |
| 47 | 视频上传最晚开始时间计算器 | Direct user task; does not promise delivery guarantees. |
| 49 | 限时上传最大文件大小计算器 | More natural, explicit size output. |
| 51 | 视频上传时间计算器 预留处理时间 | Less synthetic wording. Buffer is user supplied, not predicted by platform. |
| 61 | 存储卡预留空间后能录多久 | Natural question with a computed result; still tool intent. |
| 62 | 存储卡录制时长计算 包含音频 | Avoids the unnatural compound. |
| 74 | 拍摄素材和备份总容量计算器 | Clear total-capacity task; audio is an input in tool, not essential in query. |
| 85 | 素材校验时间估算 | Natural shorthand; tool does not actually verify files. |
| 95 | 保留原片和代理需要多大存储空间 | Natural question; computed result, not a new page. |

## Intent and overlap findings

- Informational rows 6, 7, 13, 14, 20, 21, 27, 28, 34, 40, 46, 52, 58, 64, 70, 76, 82, 88, 94 and 100 should stay informational. Do not count them as tool-intent just to strengthen the ratio. IDs 20/27 are mixed intent, but conservative informational classification is appropriate.
- IDs 3/10 specify 4K and duration without bitrate. They are legitimate research candidates, but the answer cannot be exact from those values. User must supply rate or choose a clearly sourced estimate. Do not silently assume every 4K video has one size.
- IDs 5/12 imply ProRes support. Manual bitrate input can serve the task, but results must not look like camera/codec-specific authoritative estimates without validated presets.
- IDs 16/18/23/25 are numeric size/runtime variations of the same constraint-solving task. Keep for SERP comparison, not as independent product capabilities or separate pages.
- IDs 29/30/35/36 use different units and network vs disk contexts. They legitimately test tool reach, but one canonical calculator can cover them. Input units must be explicit.
- IDs 31/37 are examples of the same upload task, not added semantic breadth.
- IDs 41–45/47–51 have useful decision variation: latest start, required rate, maximum allowable size, combined export/upload budget, and processing-buffer inclusion. These are the most defensible differentiating queries.
- IDs 53/54/59/60 overlap as card-duration scenarios; 55/61 add reserve policy and 57/63 reverse the capacity question. One page can cover them all.
- IDs 65–69/71–75 represent different operational contexts, but two-camera interview and three-camera podcast mostly change inputs. Do not use use-case names as justification for duplicated pages.
- IDs 77–81/83–87 are valid planning queries only if results clearly say they estimate copy/checksum duration. They do not execute copying, validate integrity, or assure backup safety. Two-drive copy needs explicit serial workflow or defensible contention assumptions.
- IDs 89/95 and 92/98 can overlap, but remote-editor proxy-only drive capacity versus source+proxy retention changes which files are included. Keep that distinction in the UI and examples.
- IDs 93/99 replacements require actual transcode-time input and comparison. If omitted from the implementation, replace with a genuinely supported proxy comparison, not a placeholder.

## Doorway and evidence safeguards

Use one English and one genuinely localized Chinese version per tool with appropriate language metadata; do not manufacture US/UK/AU/China copies with identical math. Country applicability is a proposed audience scope, not proof that the deployed site is reachable or discovered in each country. The current all-country field is acceptable only with that caveat.

For each of the 100 browser searches, store exact query, time, search surface/locale, visible top results, observed intent and any mismatch. Do not call the query observed demand merely because the search completed. Lack of exact matches is not low competition; it can signal unnatural wording or low demand. Top-three results are a sample, not an authoritative ranking metric.

Google explicitly warns against substantially similar query-targeting pages and scaled pages without value: https://developers.google.com/search/docs/essentials/spam-policies . The current canonical mapping avoids that structural problem if implemented honestly.

## Verdict

Freeze after IDs 93/99 replacements; optional naturalizations can also be applied before freezing. Preserve all unknown demand/difficulty fields and candidate-only labels. The plan passes a keyword-intent candidate gate, not commercial validation. Eight localized tool pages plus substantive examples/FAQ are justified; 100 keyword pages are not.
