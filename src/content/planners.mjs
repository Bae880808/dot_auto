// Bilingual planning content. FAQ questions preserve observed English wording; Chinese questions are translations.
export default {
  "target-bitrate": {
    "en": {
      "title": "Target-size bitrate calculator",
      "description": "Calculate an average video bitrate budget for a target file size, allowing for audio, container bytes and a chosen size reserve.",
      "intro": "Work backward from the file-size ceiling. Keep audio and your chosen safety reserve visible instead of assigning the whole budget to video.",
      "formulaIntro": "Allocate the usable file-size budget first, remove the proportional container allowance, then divide by duration and subtract audio.",
      "formulaDefs": [
        "S is the target size in bytes; D is elapsed seconds; A is total audio in bit/s. h is container allowance and r is the target-size reserve, both fractions.",
        "Budget = S × (1 − r). Video bitrate V = 8 × S × (1 − r) ÷ [D × (1 + h)] − A. Divide V by 1,000,000 for Mbps.",
        "If V ≤ 0, audio and allowances leave no positive video budget. A zero video setting is not a workable solution.",
        "Normalize sizes to bytes and rates to bits/s unless a disk rate is explicitly bytes/s. 1 byte = 8 bits; 1 kbps = 1,000 bit/s; 1 Mbps = 1,000,000 bit/s. 1 MB/s = 8 Mbps; 1 MiB/s = 8.388608 Mbps.",
        "1 MB = 10⁶ B, 1 GB = 10⁹ B, 1 TB = 10¹² B; 1 MiB = 2²⁰ B, 1 GiB = 2³⁰ B, 1 TiB = 2⁴⁰ B. One minute is 60 seconds; one hour is 3,600 seconds. Percent inputs become fractions: 2% = 0.02."
      ],
      "formulaAfter": "Reserve and container allowance do different jobs. Reserve leaves part of the ceiling unused; allowance estimates extra finished-file bytes. Neither percentage is an industry requirement.",
      "steps": [
        "Choose the actual file-size limit and its decimal or binary unit. Enter the full elapsed duration, not frame timecode.",
        "Enter all audio tracks together. A 128 kbps stereo track normally means 128 kbps total, not 128 kbps per channel.",
        "Choose explicit allowance and reserve values, then round the proposed average video rate downward to your encoder’s supported precision.",
        "Make a test export and inspect its actual byte count before a hard-limit delivery."
      ],
      "examples": [
        {
          "title": "A 100 MB one-minute delivery",
          "text": "Target 100 MB, duration 60 seconds, audio 128 kbps, container allowance 2%, size reserve 5%.",
          "equation": "V = 8 × 100,000,000 × 0.95 ÷ (60 × 1.02) ÷ 10⁶ − 0.128",
          "answer": "≈ 12.290300654 Mbps video; planned finished size 95 MB.",
          "note": "For 0.01 Mbps encoder increments, choose at most 12.29 Mbps, not 12.30."
        },
        {
          "title": "A 2 GiB twenty-minute delivery",
          "text": "Target 2 GiB, duration 1,200 seconds, audio 320 kbps, container allowance 2%, size reserve 5%.",
          "equation": "V = 8 × 2,147,483,648 × 0.95 ÷ (1,200 × 1.02) ÷ 10⁶ − 0.32",
          "answer": "≈ 13.014048795 Mbps video; planned size 1.9 GiB.",
          "note": "At 0.01 Mbps precision, use at most 13.01 Mbps. The underlying budget is 2,040,109,465.6 bytes."
        }
      ],
      "limits": [
        "This is an arithmetic average-rate budget, not an encoder compliance or visual-quality guarantee.",
        "A maximum bitrate setting is not the same as a target average. Constant-quality encoding needs a test encode or measured average.",
        "Audio, duration and container estimates must match the eventual export. Platform-specific size limits are not embedded in this calculator."
      ],
      "faqs": [
        [
          "How do you calculate bitrate?",
          "For a completed file, total average bitrate is file bytes × 8 ÷ elapsed seconds. For a video-only target, first account for audio, container allowance and any chosen size reserve as shown above."
        ],
        [
          "What is the difference between target bitrate and max bitrate?",
          "Target bitrate describes the intended average data rate; maximum bitrate constrains peaks where the encoder supports it. Entering the maximum as the average can overstate the expected size."
        ],
        [
          "How does variable bitrate affect video quality?",
          "VBR lets the encoder distribute data unevenly across simpler and more complex scenes. Quality still depends on content, codec and encoder settings; a calculated size budget alone cannot establish an acceptable result."
        ],
        [
          "What is video bitrate?",
          "Video bitrate is the number of encoded video bits per second. It is distinct from resolution, frame rate and audio bitrate. For size planning, use an average over the actual duration."
        ]
      ],
      "sourceNames": [
        "NIST: Prefixes for binary multiples",
        "Adobe Premiere: Export settings reference",
        "FFmpeg: Formats documentation"
      ],
      "sourceClaims": [
        "Defines decimal and binary storage units and the bit/byte distinction.",
        "Explains target versus maximum bitrate and CBR/VBR settings; no universal codec bitrate is assumed.",
        "Documents muxers and metadata options; container overhead depends on format and configuration."
      ],
      "sourceUrls": [
        "https://physics.nist.gov/cuu/Units/binary.html",
        "https://helpx.adobe.com/premiere/desktop/render-and-export/export-files/overview-of-export-settings.html",
        "https://ffmpeg.org/ffmpeg-formats.html"
      ]
    },
    "zh": {
      "title": "目标文件大小码率计算器",
      "description": "根据目标文件大小计算平均视频码率预算，单独考虑音频、封装预留及文件大小安全余量。",
      "intro": "从文件大小上限倒推视频码率。先为音频与安全余量留出空间，不把整个大小预算都分配给画面。",
      "formulaIntro": "先得到可分配的文件大小，扣除比例形式的封装预留，再按时长换算总码率并减去音频。",
      "formulaDefs": [
        "S 是目标字节数，D 是秒数，A 是音频总码率（bit/s）；h 为封装预留比例，r 为文件大小安全余量比例。",
        "预算 = S × (1 − r)。视频码率 V = 8 × S × (1 − r) ÷ [D × (1 + h)] − A。结果除以 1,000,000 得到 Mbps。",
        "若 V ≤ 0，表示音频与预留已耗尽可用预算，不能把零视频码率当作可用设置。",
        "先把大小统一为字节，码率统一为 bit/s；磁盘速率若使用 B/s，需保留单位区别。1 字节 = 8 比特；1 kbps = 1,000 bit/s；1 Mbps = 1,000,000 bit/s。1 MB/s = 8 Mbps，1 MiB/s = 8.388608 Mbps。",
        "1 MB = 10⁶ B，1 GB = 10⁹ B，1 TB = 10¹² B；1 MiB = 2²⁰ B，1 GiB = 2³⁰ B，1 TiB = 2⁴⁰ B。1 分钟 = 60 秒，1 小时 = 3,600 秒。百分数先转为小数，例如 2% = 0.02。"
      ],
      "formulaAfter": "文件大小安全余量让上限的一部分保持不用；封装预留用于估算编码数据之外的字节。两者不同，也都不是通用行业要求。",
      "steps": [
        "输入真实的文件大小上限并选择十进制或二进制单位，时长使用经过的时间，不使用帧时间码。",
        "把所有音轨码率相加；128 kbps 立体声音轨通常指合计 128 kbps，而非每声道 128 kbps。",
        "明确设置封装预留与安全余量，再按编码器支持的精度向下取整视频码率。",
        "有硬性上限时先试导出，并核对成品的实际字节数。"
      ],
      "examples": [
        {
          "title": "100 MB、一分钟交付",
          "text": "目标 100 MB，时长 60 秒，音频 128 kbps，封装预留 2%，文件大小安全余量 5%。",
          "equation": "V = 8 × 100,000,000 × 0.95 ÷ (60 × 1.02) ÷ 10⁶ − 0.128",
          "answer": "视频码率约 12.290300654 Mbps；预计成品 95 MB。",
          "note": "编码器若以 0.01 Mbps 为步长，最多选择 12.29 Mbps，而不是 12.30。"
        },
        {
          "title": "2 GiB、二十分钟交付",
          "text": "目标 2 GiB，时长 1,200 秒，音频 320 kbps，封装预留 2%，大小安全余量 5%。",
          "equation": "V = 8 × 2,147,483,648 × 0.95 ÷ (1,200 × 1.02) ÷ 10⁶ − 0.32",
          "answer": "视频码率约 13.014048795 Mbps；预计成品 1.9 GiB。",
          "note": "精确预算为 2,040,109,465.6 字节；若步长为 0.01 Mbps，最多选择 13.01 Mbps。"
        }
      ],
      "limits": [
        "结果是平均码率的数学预算，不保证编码器一定遵守，也不保证画质。",
        "最高码率与平均目标码率不同；恒定质量编码需要试编码或实测平均值。",
        "音频、时长及封装估计应与实际导出一致。本工具没有内置特定平台的上传上限。"
      ],
      "faqs": [
        [
          "如何计算码率？",
          "已完成文件的平均总码率等于字节数乘以 8，再除以秒数。若需要视频单独的目标值，应先按上述公式考虑音频、封装预留和大小安全余量。"
        ],
        [
          "目标码率和最大码率有什么区别？",
          "目标码率描述预期平均数据率；最高码率在编码器支持时约束峰值。把最高码率当作平均值，可能高估成品大小。"
        ],
        [
          "可变码率如何影响视频质量？",
          "VBR 允许编码器为简单与复杂画面分配不同数量的数据。画质仍取决于内容、编码格式及设置，大小预算本身不能判定画质是否合格。"
        ],
        [
          "什么是视频码率？",
          "视频码率是每秒编码视频数据的比特数，与分辨率、帧率和音频码率不同。估算大小时应使用覆盖实际时长的平均值。"
        ]
      ],
      "sourceNames": [
        "NIST：二进制倍数前缀",
        "Adobe Premiere：导出设置参考",
        "FFmpeg：格式文档"
      ],
      "sourceClaims": [
        "支撑十进制、二进制存储单位及比特与字节换算。",
        "说明目标与最高码率及 CBR/VBR 设置，不提供通用的固定编码码率。",
        "说明混流器和元数据选项；封装开销取决于格式与配置。"
      ],
      "sourceUrls": [
        "https://physics.nist.gov/cuu/Units/binary.html",
        "https://helpx.adobe.com/premiere/desktop/render-and-export/export-files/overview-of-export-settings.html",
        "https://ffmpeg.org/ffmpeg-formats.html"
      ]
    }
  },
  "upload-transfer-time": {
    "en": {
      "title": "Upload and transfer time calculator",
      "description": "Estimate upload or file-copy duration from complete file size and measured throughput, or an explicitly assumed link efficiency.",
      "intro": "Divide the bytes you need to move by the rate you can actually sustain. A measured payload rate and an advertised connection speed are different inputs.",
      "formulaIntro": "Use either measured throughput or a link-rate scenario. Do not reduce an already measured payload rate by another generic efficiency factor.",
      "formulaDefs": [
        "S is complete file size in bytes. Measured mode: T = S ÷ q, where q is bytes/s.",
        "Link mode: effective rate = L × e in bit/s; T = 8S ÷ (L × e), where 0 < e ≤ 1.",
        "An explicitly chosen setup delay f gives total time T + f. Rate × elapsed time must use matching bit or byte units.",
        "Normalize sizes to bytes and rates to bits/s unless a disk rate is explicitly bytes/s. 1 byte = 8 bits; 1 kbps = 1,000 bit/s; 1 Mbps = 1,000,000 bit/s. 1 MB/s = 8 Mbps; 1 MiB/s = 8.388608 Mbps.",
        "1 MB = 10⁶ B, 1 GB = 10⁹ B, 1 TB = 10¹² B; 1 MiB = 2²⁰ B, 1 GiB = 2³⁰ B, 1 TiB = 2⁴⁰ B. One minute is 60 seconds; one hour is 3,600 seconds. Percent inputs become fractions: 2% = 0.02."
      ],
      "formulaAfter": "A 100% efficiency setting is an ideal scenario. Lower percentages are user-selected planning assumptions, not universal facts about internet connections.",
      "steps": [
        "Use the complete measured file size if it exists; do not add audio or container overhead again.",
        "Prefer a representative sustained upload or copy measurement. Otherwise select the link mode and state its efficiency.",
        "Check the direction: internet download speed, Wi-Fi connection rate and storage interface labels are not measured upload throughput.",
        "Round the required elapsed time upward for scheduling, and allow separate time for any processing or review."
      ],
      "examples": [
        {
          "title": "10 GB over a nominal 100 Mbps link",
          "text": "File size 10 GB; link 100 Mbps; assumed payload efficiency 80%.",
          "equation": "T = 8 × 10 × 10⁹ ÷ (100 × 10⁶ × 0.8)",
          "answer": "1,000 seconds, or 16 minutes 40 seconds.",
          "note": "Effective payload rate is 80 Mbps. The 80% input is illustrative, not a promised network efficiency."
        },
        {
          "title": "100 GiB at measured 250 MB/s",
          "text": "Complete dataset 100 GiB; measured sustained payload throughput 250 MB/s.",
          "equation": "T = 100 × 2³⁰ ÷ (250 × 10⁶)",
          "answer": "≈ 429.4967296 seconds; schedule at least 7 minutes 10 seconds.",
          "note": "No further efficiency deduction applies because the input is already measured throughput."
        }
      ],
      "limits": [
        "A throughput sample may not represent a long transfer. Contention, retries, latency, packet loss and throttling can change the result.",
        "Concurrent uploads share the available connection; each does not receive its full nominal rate.",
        "This estimates data movement only. No platform processing time or upload limit is inferred."
      ],
      "faqs": [
        [
          "How long does it take to upload a video to YouTube?",
          "Upload duration depends on complete file size and effective upload throughput: seconds = file bytes × 8 ÷ upload bit/s. YouTube processing is a separate stage; this calculator does not predict its service queue."
        ],
        [
          "Why do YouTube videos take so long to upload?",
          "A larger file or lower effective upload rate increases transfer time. Connection sharing and network conditions can reduce throughput. If upload is already complete, a processing delay is not an upload-speed problem."
        ],
        [
          "What does upload speed mean on YouTube?",
          "Upload speed is the rate at which data leaves your connection for the destination. Mbps counts millions of bits per second, while MB/s counts millions of bytes per second; 8 Mbps equals 1 MB/s."
        ],
        [
          "How long does a YouTube video take to process?",
          "No fixed processing duration is assumed here. Processing is not obtained by dividing bytes by internet upload speed. Measure relevant past jobs or leave an explicit post-upload allowance, then check the platform status."
        ]
      ],
      "sourceNames": [
        "NIST: Prefixes for binary multiples",
        "IBM Cloud: Using Aspera high-speed transfer"
      ],
      "sourceClaims": [
        "Defines decimal and binary storage units and the bit/byte distinction.",
        "Describes network conditions affecting transfers, not a universal efficiency percentage."
      ],
      "sourceUrls": [
        "https://physics.nist.gov/cuu/Units/binary.html",
        "https://cloud.ibm.com/docs/cloud-object-storage?locale=en&topic=cloud-object-storage-aspera"
      ]
    },
    "zh": {
      "title": "上传与传输耗时计算器",
      "description": "使用完整文件大小及实测传输速率，或明确的标称链路效率假设，估算上传与复制耗时。",
      "intro": "把需要传输的字节数除以可持续达到的速率。实测有效速率与标称连接速度不是同一种输入。",
      "formulaIntro": "选择实测速率模式或链路速率模式。已经测得的有效速率，不再重复乘一个通用效率系数。",
      "formulaDefs": [
        "S 为完整文件字节数。实测模式：T = S ÷ q，其中 q 的单位是 B/s。",
        "链路模式：有效码率 = L × e（bit/s）；T = 8S ÷ (L × e)，且 0 < e ≤ 1。",
        "若明确加入准备延迟 f，总耗时为 T + f。速率与大小必须使用匹配的比特或字节单位。",
        "先把大小统一为字节，码率统一为 bit/s；磁盘速率若使用 B/s，需保留单位区别。1 字节 = 8 比特；1 kbps = 1,000 bit/s；1 Mbps = 1,000,000 bit/s。1 MB/s = 8 Mbps，1 MiB/s = 8.388608 Mbps。",
        "1 MB = 10⁶ B，1 GB = 10⁹ B，1 TB = 10¹² B；1 MiB = 2²⁰ B，1 GiB = 2³⁰ B，1 TiB = 2⁴⁰ B。1 分钟 = 60 秒，1 小时 = 3,600 秒。百分数先转为小数，例如 2% = 0.02。"
      ],
      "formulaAfter": "效率为 100% 时是理想情况。其他百分数也只是用户选择的规划假设，并非所有网络都适用的规律。",
      "steps": [
        "已有成品时直接使用完整文件的实际大小，不再重复加音频或封装。",
        "优先使用有代表性的持续上传或复制实测值；否则选择链路模式并明确效率假设。",
        "核对速率方向：下载速度、Wi-Fi 连接速度及存储接口标称值，都不等于实测上传速率。",
        "排期时向上取整传输时间，并为后续处理与检查单独留时间。"
      ],
      "examples": [
        {
          "title": "10 GB，标称 100 Mbps 链路",
          "text": "完整文件 10 GB，链路 100 Mbps，假设有效传输效率为 80%。",
          "equation": "T = 8 × 10 × 10⁹ ÷ (100 × 10⁶ × 0.8)",
          "answer": "1,000 秒，即 16 分 40 秒。",
          "note": "有效码率为 80 Mbps；80% 仅为示例假设，不是网络效率保证。"
        },
        {
          "title": "100 GiB，实测 250 MB/s",
          "text": "完整数据集 100 GiB，实测持续有效速率 250 MB/s。",
          "equation": "T = 100 × 2³⁰ ÷ (250 × 10⁶)",
          "answer": "约 429.4967296 秒；排期至少留 7 分 10 秒。",
          "note": "输入已是实测有效速率，不再扣除其他效率比例。"
        }
      ],
      "limits": [
        "短时测量未必代表长时间传输；拥塞、重试、延迟、丢包及限速都会改变结果。",
        "同时上传的任务共享带宽，不能让每个任务都按整条链路速率计算。",
        "这里仅估算数据移动，不推断任何平台的处理时间或上传限制。"
      ],
      "faqs": [
        [
          "将视频上传到 YouTube 需要多久？",
          "上传秒数取决于完整文件字节数乘以 8，再除以有效上传码率。YouTube 的后续处理属于另一个阶段，本工具不预测平台队列。"
        ],
        [
          "为什么 YouTube 视频上传需要这么长时间？",
          "文件越大或有效上传速率越低，传输越久。网络共享和实际链路状况可能降低速率。如果上传已完成，处理等待不属于上传速度问题。"
        ],
        [
          "YouTube 上的上传速度是什么意思？",
          "上传速度表示数据从你的连接传向目标端的速率。Mbps 是每秒百万比特，MB/s 是每秒百万字节；8 Mbps 等于 1 MB/s。"
        ],
        [
          "YouTube 视频处理需要多久？",
          "这里不设固定处理时长。平台处理时间不能通过文件大小除以上传速度得到。可参考相近任务的实测记录，明确预留后处理时间，并查看平台状态。"
        ]
      ],
      "sourceNames": [
        "NIST：二进制倍数前缀",
        "IBM Cloud：使用 Aspera 高速传输"
      ],
      "sourceClaims": [
        "支撑十进制、二进制存储单位及比特与字节换算。",
        "说明网络条件对传输的影响，并不支持某个通用效率百分比。"
      ],
      "sourceUrls": [
        "https://physics.nist.gov/cuu/Units/binary.html",
        "https://cloud.ibm.com/docs/cloud-object-storage?locale=en&topic=cloud-object-storage-aspera"
      ]
    }
  },
  "delivery-deadline": {
    "en": {
      "title": "Video delivery deadline calculator",
      "description": "Budget export, transfer, post-upload checks and buffer time; estimate deadline slack and the effective upload rate required.",
      "intro": "A file arriving before the deadline is not always a finished delivery. Include the work before and after upload, then see what transfer window remains.",
      "formulaIntro": "The default workflow is sequential: prepare or export, transfer, post-check, then the chosen buffer. No stages silently overlap.",
      "formulaDefs": [
        "W is remaining seconds; P is preparation/export; Q is post-upload processing/QC; B is buffer. Available transfer time A = W − P − Q − B.",
        "For S bytes and effective q bit/s: transfer T = 8S ÷ q; total = P + T + Q + B; slack = W − total.",
        "If A > 0, required effective rate = 8S ÷ A. If A ≤ 0, no transfer time remains; do not report negative or infinite bandwidth.",
        "Latest workflow start = deadline − total. Latest upload start = deadline − Q − B − T. A nominal link requirement divides the required effective rate by the same explicit efficiency.",
        "Normalize sizes to bytes and rates to bits/s unless a disk rate is explicitly bytes/s. 1 byte = 8 bits; 1 kbps = 1,000 bit/s; 1 Mbps = 1,000,000 bit/s. 1 MB/s = 8 Mbps; 1 MiB/s = 8.388608 Mbps.",
        "1 MB = 10⁶ B, 1 GB = 10⁹ B, 1 TB = 10¹² B; 1 MiB = 2²⁰ B, 1 GiB = 2³⁰ B, 1 TiB = 2⁴⁰ B. One minute is 60 seconds; one hour is 3,600 seconds. Percent inputs become fractions: 2% = 0.02."
      ],
      "formulaAfter": "A positive slack value means the entered scenario fits, not that the delivery is guaranteed. Duration-based remaining time avoids timezone ambiguity; dated schedules need explicit timezone handling.",
      "steps": [
        "Enter the time remaining and complete file size, then estimate preparation, post-upload checks and buffer separately.",
        "Use measured effective upload throughput, or clearly state any link-efficiency assumption.",
        "Read both slack and required effective rate. A negative slack value is an estimated shortfall, not zero spare time.",
        "Keep workflow start distinct from upload start, and recheck the plan if export duration or file size changes."
      ],
      "examples": [
        {
          "title": "A two-hour delivery window",
          "text": "5 GB; link 40 Mbps at 80% efficiency; 2 hours remaining; export 30 minutes; post-check 10 minutes; buffer 15 minutes.",
          "equation": "Transfer = 8 × 5 × 10⁹ ÷ (40 × 10⁶ × 0.8) = 1,250 s; total = 1,800 + 1,250 + 600 + 900",
          "answer": "Total 1 h 15 m 50 s; slack 44 m 10 s.",
          "note": "The 3,900-second transfer window needs ≈ 10.256410256 Mbps effective, or ≈ 12.820512821 Mbps nominal at 80%."
        },
        {
          "title": "A three-hour window that does not fit",
          "text": "20 GB; link 20 Mbps at 70%; 3 hours remaining; preparation 20 minutes; post-check 10 minutes; buffer 10 minutes.",
          "equation": "Transfer = 8 × 20 × 10⁹ ÷ (20 × 10⁶ × 0.7); total = 1,200 + 11,428.571429 + 600 + 600",
          "answer": "Total ≈ 3 h 50 m 29 s; short by ≈ 50 m 29 s.",
          "note": "The 8,400-second transfer window needs ≈ 19.047619048 Mbps effective, or ≈ 27.210884354 Mbps nominal at 70%."
        }
      ],
      "limits": [
        "The model excludes overlapping export/upload and platform-specific processing guarantees.",
        "Calendar dates across timezones or daylight-saving changes require elapsed-time calculation from actual instants.",
        "Buffers are deliberate allowances, not evidence that the network or service will meet a deadline."
      ],
      "faqs": [
        [
          "How long does it take to export a video?",
          "Export time depends on the project, effects, encoder settings and the machine doing the work. Use a representative measured export, not the clip duration alone, and enter that as preparation time."
        ],
        [
          "How long does it take to upload a video to YouTube?",
          "Estimate transfer from complete bytes and effective upload bit/s. Add preparation and post-upload processing separately; an upload-time estimate alone does not establish the delivery completion time."
        ],
        [
          "What does upload speed mean on YouTube?",
          "It is the outgoing data rate to the service, not your download speed. Use sustained payload throughput when possible. An advertised line rate requires an explicitly selected efficiency assumption."
        ],
        [
          "How long should a video take to process?",
          "There is no universal duration implied by this tool. Enter a measured or deliberately conservative processing allowance. If processing is still pending, apparent upload completion does not mean the finished deliverable is ready."
        ]
      ],
      "sourceNames": [
        "NIST: Prefixes for binary multiples",
        "IBM Cloud: Using Aspera high-speed transfer",
        "Adobe Premiere: Export settings reference"
      ],
      "sourceClaims": [
        "Defines decimal and binary storage units and the bit/byte distinction.",
        "Describes network conditions affecting transfers, not a universal efficiency percentage.",
        "Explains target versus maximum bitrate and CBR/VBR settings; no universal codec bitrate is assumed."
      ],
      "sourceUrls": [
        "https://physics.nist.gov/cuu/Units/binary.html",
        "https://cloud.ibm.com/docs/cloud-object-storage?locale=en&topic=cloud-object-storage-aspera",
        "https://helpx.adobe.com/premiere/desktop/render-and-export/export-files/overview-of-export-settings.html"
      ]
    },
    "zh": {
      "title": "视频交付截止时间计算器",
      "description": "统一规划导出、传输、后处理与缓冲时间，估算剩余余量及按时交付所需的有效上传速率。",
      "intro": "文件在截止时间前上传完，不一定意味着交付已完成。把上传前后的工作也计入，再看还剩多少传输时间。",
      "formulaIntro": "默认工作流顺序执行：准备或导出、传输、后续检查，再加所选时间缓冲，不暗中假定阶段重叠。",
      "formulaDefs": [
        "W 为剩余秒数，P 为准备或导出时间，Q 为上传后处理或质检时间，B 为缓冲。可传输时间 A = W − P − Q − B。",
        "S 为字节数，q 为有效 bit/s：传输 T = 8S ÷ q；总时间 = P + T + Q + B；余量 = W − 总时间。",
        "若 A > 0，所需有效速率 = 8S ÷ A；若 A ≤ 0，应提示没有剩余传输时间，不输出负数或无穷大带宽。",
        "最晚工作流开始时间 = 截止时间 − 总时间；最晚上传开始时间 = 截止时间 − Q − B − T。所需标称速率还需除以同一明确效率。",
        "先把大小统一为字节，码率统一为 bit/s；磁盘速率若使用 B/s，需保留单位区别。1 字节 = 8 比特；1 kbps = 1,000 bit/s；1 Mbps = 1,000,000 bit/s。1 MB/s = 8 Mbps，1 MiB/s = 8.388608 Mbps。",
        "1 MB = 10⁶ B，1 GB = 10⁹ B，1 TB = 10¹² B；1 MiB = 2²⁰ B，1 GiB = 2³⁰ B，1 TiB = 2⁴⁰ B。1 分钟 = 60 秒，1 小时 = 3,600 秒。百分数先转为小数，例如 2% = 0.02。"
      ],
      "formulaAfter": "余量为正只说明输入场景在预算内，不保证准时。用剩余时长可避免时区歧义；使用日期时间时必须明确时区。",
      "steps": [
        "输入剩余时间及完整文件大小，分别估算准备、后处理与缓冲。",
        "使用实测有效上传速率，或明确说明链路效率假设。",
        "同时查看余量与所需速率；负余量表示预计超时，不能当作零空闲时间。",
        "区分工作流开始与上传开始，导出时间或文件大小变化后重新计算。"
      ],
      "examples": [
        {
          "title": "两小时交付窗口",
          "text": "5 GB；40 Mbps 链路，效率 80%；剩余 2 小时；导出 30 分钟，后检查 10 分钟，缓冲 15 分钟。",
          "equation": "传输 = 8 × 5 × 10⁹ ÷ (40 × 10⁶ × 0.8) = 1,250 秒；总计 = 1,800 + 1,250 + 600 + 900",
          "answer": "总计 1 小时 15 分 50 秒；余量 44 分 10 秒。",
          "note": "传输窗口 3,900 秒，需要约 10.256410256 Mbps 有效速率；按 80% 效率对应约 12.820512821 Mbps 标称速率。"
        },
        {
          "title": "三小时窗口仍然不足",
          "text": "20 GB；20 Mbps 链路，效率 70%；剩余 3 小时；准备 20 分钟，后检查 10 分钟，缓冲 10 分钟。",
          "equation": "传输 = 8 × 20 × 10⁹ ÷ (20 × 10⁶ × 0.7)；总计 = 1,200 + 11,428.571429 + 600 + 600",
          "answer": "总计约 3 小时 50 分 29 秒；预计超时约 50 分 29 秒。",
          "note": "传输窗口 8,400 秒，需要约 19.047619048 Mbps 有效速率；按 70% 效率对应约 27.210884354 Mbps 标称速率。"
        }
      ],
      "limits": [
        "模型不包含导出与上传重叠，也不承诺特定平台处理速度。",
        "跨时区或夏令时的日期应先转换成实际时间点，再计算经过时间。",
        "缓冲是主动预留，不代表网络或服务一定满足截止时间。"
      ],
      "faqs": [
        [
          "导出一个视频需要多久？",
          "导出时间取决于项目、效果、编码设置和执行设备，不能仅由片长判断。最好使用有代表性的实测导出时间，并填入准备阶段。"
        ],
        [
          "将视频上传到 YouTube 需要多久？",
          "先用完整字节数与有效上传码率估算传输，再单独加入准备和上传后处理。仅知道上传耗时，不能确定整个交付何时完成。"
        ],
        [
          "YouTube 上的上传速度是什么意思？",
          "它是向服务端发送数据的速率，不是下载速度。优先使用持续有效传输实测值；使用标称链路速率时应明确效率假设。"
        ],
        [
          "视频处理通常需要多久？",
          "本工具不假定通用处理时间。应填写实测值或明确偏保守的处理预留。如果处理仍未结束，上传完成不等于交付成品已就绪。"
        ]
      ],
      "sourceNames": [
        "NIST：二进制倍数前缀",
        "IBM Cloud：使用 Aspera 高速传输",
        "Adobe Premiere：导出设置参考"
      ],
      "sourceClaims": [
        "支撑十进制、二进制存储单位及比特与字节换算。",
        "说明网络条件对传输的影响，并不支持某个通用效率百分比。",
        "说明目标与最高码率及 CBR/VBR 设置，不提供通用的固定编码码率。"
      ],
      "sourceUrls": [
        "https://physics.nist.gov/cuu/Units/binary.html",
        "https://cloud.ibm.com/docs/cloud-object-storage?locale=en&topic=cloud-object-storage-aspera",
        "https://helpx.adobe.com/premiere/desktop/render-and-export/export-files/overview-of-export-settings.html"
      ]
    }
  },
  "recording-capacity": {
    "en": {
      "title": "Recording capacity calculator",
      "description": "Estimate recording duration from usable storage, average video and audio bitrate, container allowance and free-space reserve.",
      "intro": "Convert available bytes into recording time. Capacity is only one constraint: a card also needs to sustain the camera’s required write workload.",
      "formulaIntro": "Remove the explicitly reserved space, then divide the remaining bits by the complete estimated recording rate.",
      "formulaDefs": [
        "C is capacity in bytes; r is the fraction left free; V and A are average video and total audio rates in bit/s; h is container allowance.",
        "Usable bytes U = C × (1 − r). Recording seconds D = 8U ÷ [(V + A) × (1 + h)].",
        "For PCM only, audio bit/s = sample rate × bit depth × channel count. 48,000 × 24 × 2 = 2,304,000 bit/s. Compressed audio needs its encoded bitrate.",
        "Normalize sizes to bytes and rates to bits/s unless a disk rate is explicitly bytes/s. 1 byte = 8 bits; 1 kbps = 1,000 bit/s; 1 Mbps = 1,000,000 bit/s. 1 MB/s = 8 Mbps; 1 MiB/s = 8.388608 Mbps.",
        "1 MB = 10⁶ B, 1 GB = 10⁹ B, 1 TB = 10¹² B; 1 MiB = 2²⁰ B, 1 GiB = 2³⁰ B, 1 TiB = 2⁴⁰ B. One minute is 60 seconds; one hour is 3,600 seconds. Percent inputs become fractions: 2% = 0.02."
      ],
      "formulaAfter": "If you enter current free space rather than nominal capacity, the percentage reserve is additional. Do not subtract existing files twice. Round available whole-second recording time downward.",
      "steps": [
        "Choose the actual capacity unit. If known, use current free bytes instead of assuming the entire card is empty.",
        "Enter average video-only bitrate and total audio bitrate. Do not add audio again to a camera rate that already includes it.",
        "Set the free-space reserve and container allowance independently; both are visible assumptions.",
        "Compare the time estimate with the shoot plan, then check media compatibility, sustained write performance and non-storage limits separately."
      ],
      "examples": [
        {
          "title": "A 256 GB card at 100 Mbps video",
          "text": "256 GB capacity; retain 10% free; video 100 Mbps; audio 320 kbps; container allowance 2%.",
          "equation": "D = 8 × 256 × 10⁹ × 0.9 ÷ [(100 + 0.32) × 10⁶ × 1.02]",
          "answer": "Usable space 230.4 GB; ≈ 18,012.946806 seconds, displayed as 5 h 00 m 12 s.",
          "note": "Recording capacity rounds downward, unlike scheduled transfer duration."
        },
        {
          "title": "128 GiB with higher-rate recording",
          "text": "128 GiB capacity; retain 5% free; video 400 Mbps; PCM audio 2.304 Mbps; allowance 1%.",
          "equation": "D = 8 × 128 × 2³⁰ × 0.95 ÷ [(400 + 2.304) × 10⁶ × 1.01]",
          "answer": "Usable space 130,567,005,798.4 bytes; ≈ 2,570.678157 seconds, displayed as 42 m 50 s.",
          "note": "The audio value represents 48 kHz, 24-bit stereo PCM; it is not inferred for compressed audio."
        }
      ],
      "limits": [
        "This is storage-limited duration, not a promise about battery life, heat, camera time limits or file splitting.",
        "VBR can change the average rate with scene content. Use measured averages or explicitly labeled low/high scenarios.",
        "The calculator does not certify a card’s sustained write speed, camera compatibility, data recoverability or remaining lifespan."
      ],
      "faqs": [
        [
          "How much video can you record on a 128GB SD card?",
          "A 128 GB label alone cannot establish recording time. Divide usable bits by the actual average combined recording rate, including any chosen allowance. A 128 GiB input is a different number of bytes from 128 GB."
        ],
        [
          "Why does my sd card display less capacity than advertised?",
          "One common source of a different displayed number is decimal versus binary units. Formatting, existing files and reserved space can also matter. Check actual byte counts before concluding that storage is missing."
        ],
        [
          "What are SD card speed classes?",
          "Speed classes describe write-performance categories, rather than how many hours fit. This calculator does not select or certify a class; check the current card and camera documentation for the recording mode you will use."
        ],
        [
          "What is variable bitrate & constant bitrate?",
          "CBR targets a relatively steady encoded rate, while VBR varies the rate across the material. For capacity planning, use a representative average and allow for uncertainty; a maximum rate is not automatically the average."
        ]
      ],
      "sourceNames": [
        "NIST: Prefixes for binary multiples",
        "Adobe Premiere: Export settings reference",
        "Sony: Recording-time notes"
      ],
      "sourceClaims": [
        "Defines decimal and binary storage units and the bit/byte distinction.",
        "Explains target versus maximum bitrate and CBR/VBR settings; no universal codec bitrate is assumed.",
        "Supports scene-dependent VBR variability for the documented device, not limits for every camera."
      ],
      "sourceUrls": [
        "https://physics.nist.gov/cuu/Units/binary.html",
        "https://helpx.adobe.com/premiere/desktop/render-and-export/export-files/overview-of-export-settings.html",
        "https://helpguide.sony.net/cam/1510/v1/en/print.pdf"
      ]
    },
    "zh": {
      "title": "存储容量可录制时长计算器",
      "description": "根据可用存储空间、平均视频与音频码率、封装预留及空闲比例估算可录制时长。",
      "intro": "把可用字节换算为录制时间。容量只是约束之一，存储卡还必须持续承担相机所需的写入负载。",
      "formulaIntro": "先扣除明确保留的空间，再把剩余比特数除以完整录制数据率。",
      "formulaDefs": [
        "C 为容量字节数，r 为保留空闲比例；V、A 分别为平均视频码率与音频总码率（bit/s），h 为封装预留。",
        "可用字节 U = C × (1 − r)；可录制秒数 D = 8U ÷ [(V + A) × (1 + h)]。",
        "仅对 PCM：音频 bit/s = 采样率 × 位深 × 声道数。48,000 × 24 × 2 = 2,304,000 bit/s；压缩音频应使用编码码率。",
        "先把大小统一为字节，码率统一为 bit/s；磁盘速率若使用 B/s，需保留单位区别。1 字节 = 8 比特；1 kbps = 1,000 bit/s；1 Mbps = 1,000,000 bit/s。1 MB/s = 8 Mbps，1 MiB/s = 8.388608 Mbps。",
        "1 MB = 10⁶ B，1 GB = 10⁹ B，1 TB = 10¹² B；1 MiB = 2²⁰ B，1 GiB = 2³⁰ B，1 TiB = 2⁴⁰ B。1 分钟 = 60 秒，1 小时 = 3,600 秒。百分数先转为小数，例如 2% = 0.02。"
      ],
      "formulaAfter": "若输入的是当前剩余空间而非标称容量，所选空闲比例是额外预留，不要重复扣除已有文件。显示完整秒数时向下取整。",
      "steps": [
        "核对容量单位；已知当前剩余字节数时优先使用，不假定整张卡都空着。",
        "输入平均视频单独码率与音频总码率。相机给出的数据率若已含音频，不应再次添加。",
        "分别设置空闲比例与封装预留，两者都是需要明确的假设。",
        "对照拍摄计划，再单独检查媒体兼容性、持续写入性能及非存储限制。"
      ],
      "examples": [
        {
          "title": "256 GB 卡，视频 100 Mbps",
          "text": "容量 256 GB，保留 10% 空闲；视频 100 Mbps，音频 320 kbps，封装预留 2%。",
          "equation": "D = 8 × 256 × 10⁹ × 0.9 ÷ [(100 + 0.32) × 10⁶ × 1.02]",
          "answer": "可用空间 230.4 GB；约 18,012.946806 秒，显示为 5 小时 00 分 12 秒。",
          "note": "可录制时长向下取整，与排期所需传输时间的向上取整不同。"
        },
        {
          "title": "128 GiB，高码率录制",
          "text": "容量 128 GiB，保留 5% 空闲；视频 400 Mbps，PCM 音频 2.304 Mbps，封装预留 1%。",
          "equation": "D = 8 × 128 × 2³⁰ × 0.95 ÷ [(400 + 2.304) × 10⁶ × 1.01]",
          "answer": "可用 130,567,005,798.4 字节；约 2,570.678157 秒，显示为 42 分 50 秒。",
          "note": "音频值对应 48 kHz、24 位立体声 PCM，不是对压缩音频的推断。"
        }
      ],
      "limits": [
        "这里只估算容量限制，不保证电池、温控、相机单次时长或分段录制表现。",
        "VBR 平均码率会随画面变化，宜使用实测平均值或明确的高低场景。",
        "本工具不认证卡片持续写入速度、兼容性、可恢复性或剩余寿命。"
      ],
      "faqs": [
        [
          "128GB SD 卡能录制多少视频？",
          "仅凭 128 GB 标签不能确定时长。应把可用比特数除以实际平均总录制码率，并考虑明确的预留。128 GiB 与 128 GB 对应的字节数不同。"
        ],
        [
          "为什么我的 SD 卡显示的容量小于标称容量？",
          "十进制与二进制单位是显示数字不同的常见原因；格式化、已有文件及保留空间也可能有影响。判断容量缺失前应先核对实际字节数。"
        ],
        [
          "SD 卡有哪些速度等级？",
          "速度等级描述写入性能类别，不描述能装多少小时。本计算器不选择或认证某个等级，请按实际录制模式核对当前卡片与相机文档。"
        ],
        [
          "什么是可变码率和恒定码率？",
          "CBR 以相对稳定的数据率为目标，VBR 会随内容变化。容量规划应使用有代表性的平均值并考虑不确定性，最高码率不自动等于平均码率。"
        ]
      ],
      "sourceNames": [
        "NIST：二进制倍数前缀",
        "Adobe Premiere：导出设置参考",
        "Sony：录制时长说明"
      ],
      "sourceClaims": [
        "支撑十进制、二进制存储单位及比特与字节换算。",
        "说明目标与最高码率及 CBR/VBR 设置，不提供通用的固定编码码率。",
        "支撑画面变化与 VBR 对时长的影响，不把该设备限制套用于其他相机。"
      ],
      "sourceUrls": [
        "https://physics.nist.gov/cuu/Units/binary.html",
        "https://helpx.adobe.com/premiere/desktop/render-and-export/export-files/overview-of-export-settings.html",
        "https://helpguide.sony.net/cam/1510/v1/en/print.pdf"
      ]
    }
  },
  "multicamera-storage": {
    "en": {
      "title": "Multicamera storage calculator",
      "description": "Sum mixed camera recording sizes, total destination copies and the capacity needed to leave a chosen fraction free.",
      "intro": "Different cameras need not record for the same duration or at the same rate. Build a media total first, then plan retained destination sets and free space.",
      "formulaIntro": "Calculate each camera group separately. Add its unique bytes, multiply by total destination copies, then divide by the fraction of capacity you intend to use.",
      "formulaDefs": [
        "For group j, n is camera count, V and A are average video and audio bit/s, D is recorded seconds, and h is container allowance.",
        "Unique media S = Σ[n × (V + A) × D × (1 + h) ÷ 8]. Stored bytes = c × S, where c is total destination copies excluding source camera cards.",
        "Required aggregate capacity = c × S ÷ (1 − r). For identical destinations, each needs S ÷ (1 − r), where r is the fraction left free.",
        "Normalize sizes to bytes and rates to bits/s unless a disk rate is explicitly bytes/s. 1 byte = 8 bits; 1 kbps = 1,000 bit/s; 1 Mbps = 1,000,000 bit/s. 1 MB/s = 8 Mbps; 1 MiB/s = 8.388608 Mbps.",
        "1 MB = 10⁶ B, 1 GB = 10⁹ B, 1 TB = 10¹² B; 1 MiB = 2²⁰ B, 1 GiB = 2³⁰ B, 1 TiB = 2⁴⁰ B. One minute is 60 seconds; one hour is 3,600 seconds. Percent inputs become fractions: 2% = 0.02."
      ],
      "formulaAfter": "Leaving 20% free means dividing by 0.8, not adding 20%. Two total destination copies means two complete retained sets, not an original plus two additional copies.",
      "steps": [
        "Add one group for cameras sharing the same bitrate, audio and recorded duration; split groups when settings differ.",
        "Use recorded duration rather than event length when a camera records intermittently. Count separately recorded audio once as its own media contribution.",
        "Choose the total destination copy count and explicitly exclude camera cards from that destination total.",
        "Check each destination, not only aggregate capacity. Add proxies, caches, renders and unrelated files separately if they are part of the storage plan."
      ],
      "examples": [
        {
          "title": "Three matching cameras and two destinations",
          "text": "Three cameras each record 2 hours at 50 Mbps video plus 256 kbps audio, with 2% allowance. Keep two destination copies and leave 20% free.",
          "equation": "S = 3 × (50 + 0.256) × 10⁶ × 7,200 × 1.02 ÷ 8; capacity = 2S ÷ 0.8",
          "answer": "Unique media 138.405024 GB; stored copies 276.810048 GB; required aggregate capacity 346.01256 GB.",
          "note": "Each identical destination needs 173.00628 GB. Source cards are excluded."
        },
        {
          "title": "Mixed durations and three retained sets",
          "text": "Two cameras record 90 minutes at 100 + 0.32 Mbps; one records 60 minutes at 200 + 2.304 Mbps. All use 1% allowance. Keep three destination sets and leave 10% free.",
          "equation": "S = [2 × 100.32 × 5,400 + 202.304 × 3,600] × 10⁶ × 1.01 ÷ 8; capacity = 3S ÷ 0.9",
          "answer": "Unique media 228.733488 GB; copies 686.200464 GB; required aggregate capacity 762.44496 GB.",
          "note": "Each identical destination needs 254.14832 GB. A large aggregate number does not prove every individual drive fits."
        }
      ],
      "limits": [
        "Source camera cards are outside the reported destination capacity. Do not silently count them as an additional retained copy.",
        "Raw RAID capacity is not necessarily usable capacity. Mirroring is not automatically an independent backup.",
        "Audio must not be duplicated when the camera bitrate already includes it. Resolution and codec names do not set a fixed average bitrate."
      ],
      "faqs": [
        [
          "How much storage does a video need?",
          "Storage follows average combined bitrate multiplied by recorded duration, with explicit container allowance. For multiple cameras, sum their individual contributions before counting retained copies."
        ],
        [
          "What factors should you consider when buying video storage?",
          "Separate usable capacity from sustained throughput and redundancy. Check each destination’s capacity, the ingest/edit workload, connection bottlenecks and the number of genuinely independent retained sets. The arithmetic does not choose hardware."
        ],
        [
          "Do video files need cloud storage?",
          "Cloud is optional. It is one possible destination for a retained set, with its own transfer time and access constraints. Counting a cloud copy does not make it uploaded or verified; local and remote sets must be tracked separately."
        ],
        [
          "Does 4K video take up more storage than 1080p?",
          "Often workflows use higher rates for higher resolution, but resolution alone does not determine bytes. At equal duration and equal complete average bitrate, 4K and 1080p have the same arithmetic size estimate."
        ]
      ],
      "sourceNames": [
        "NIST: Prefixes for binary multiples",
        "Adobe Premiere: Export settings reference",
        "FFmpeg: Formats documentation"
      ],
      "sourceClaims": [
        "Defines decimal and binary storage units and the bit/byte distinction.",
        "Explains target versus maximum bitrate and CBR/VBR settings; no universal codec bitrate is assumed.",
        "Documents muxers and metadata options; container overhead depends on format and configuration."
      ],
      "sourceUrls": [
        "https://physics.nist.gov/cuu/Units/binary.html",
        "https://helpx.adobe.com/premiere/desktop/render-and-export/export-files/overview-of-export-settings.html",
        "https://ffmpeg.org/ffmpeg-formats.html"
      ]
    },
    "zh": {
      "title": "多机位素材存储计算器",
      "description": "汇总不同相机的素材大小、目标端总副本数，以及保留指定空闲比例所需的容量。",
      "intro": "不同机位不一定同码率、同录制时长。先求唯一素材大小，再规划目标端保留多少套及需要多少空闲空间。",
      "formulaIntro": "逐个相机组计算并相加，乘以目标端总副本数，再除以实际准备使用的容量比例。",
      "formulaDefs": [
        "每组的 n 为相机数，V、A 为平均视频与音频 bit/s，D 为实际录制秒数，h 为封装预留。",
        "唯一素材 S = Σ[n × (V + A) × D × (1 + h) ÷ 8]；保存字节 = c × S。c 是目标端总副本数，不含源相机卡。",
        "总所需容量 = c × S ÷ (1 − r)；目标盘相同时，每盘需 S ÷ (1 − r)，r 为保留空闲比例。",
        "先把大小统一为字节，码率统一为 bit/s；磁盘速率若使用 B/s，需保留单位区别。1 字节 = 8 比特；1 kbps = 1,000 bit/s；1 Mbps = 1,000,000 bit/s。1 MB/s = 8 Mbps，1 MiB/s = 8.388608 Mbps。",
        "1 MB = 10⁶ B，1 GB = 10⁹ B，1 TB = 10¹² B；1 MiB = 2²⁰ B，1 GiB = 2³⁰ B，1 TiB = 2⁴⁰ B。1 分钟 = 60 秒，1 小时 = 3,600 秒。百分数先转为小数，例如 2% = 0.02。"
      ],
      "formulaAfter": "保留 20% 空闲意味着除以 0.8，而不是增加 20%。两份目标副本指两套完整保存的数据，不是原片外再加两份。",
      "steps": [
        "相同码率、音频和录制时长的机位可合为一组，设置不同则分组。",
        "间歇拍摄按实际录制时间计算，不直接使用活动总时长；独立录音按单独媒体计算一次。",
        "选择目标端总副本数，明确不把源相机卡计入该总数。",
        "逐个核对目标盘，不只看总量；代理、缓存、渲染及其他文件需要另行加入。"
      ],
      "examples": [
        {
          "title": "三个相同机位、两个目标盘",
          "text": "三台相机各录 2 小时，视频 50 Mbps、音频 256 kbps，封装预留 2%；保留两套目标副本，各留 20% 空闲。",
          "equation": "S = 3 × (50 + 0.256) × 10⁶ × 7,200 × 1.02 ÷ 8；容量 = 2S ÷ 0.8",
          "answer": "唯一素材 138.405024 GB；副本合计 276.810048 GB；所需总容量 346.01256 GB。",
          "note": "相同配置下，每个目标盘需 173.00628 GB；不含源卡。"
        },
        {
          "title": "不同录制时长、三套副本",
          "text": "两台相机各录 90 分钟，码率 100 + 0.32 Mbps；另一台录 60 分钟，码率 200 + 2.304 Mbps。均预留 1% 封装，保存三套，留 10% 空闲。",
          "equation": "S = [2 × 100.32 × 5,400 + 202.304 × 3,600] × 10⁶ × 1.01 ÷ 8；容量 = 3S ÷ 0.9",
          "answer": "唯一素材 228.733488 GB；副本 686.200464 GB；所需总容量 762.44496 GB。",
          "note": "相同配置下每盘需 254.14832 GB；总容量够用不等于每块盘都放得下。"
        }
      ],
      "limits": [
        "目标端容量不包含源相机卡，不能默默将源卡当作额外保留副本。",
        "RAID 原始容量不一定等于可用容量，镜像也不自动等于独立备份。",
        "相机码率已含音频时不要重复添加；分辨率与编码名称不能确定固定平均码率。"
      ],
      "faqs": [
        [
          "一个视频需要多少存储空间？",
          "存储大小由平均总码率乘以录制时长决定，再加明确的封装预留。多机位先汇总各机位数据，再计算保留副本。"
        ],
        [
          "购买视频存储设备时应考虑哪些因素？",
          "应区分可用容量、持续速率及冗余。逐盘检查空间、导入与剪辑负载、连接瓶颈及真正独立的保留套数；算式本身不能替你选硬件。"
        ],
        [
          "视频文件需要云存储吗？",
          "云端不是必需条件，只是可选保存位置之一，也有传输时间和访问限制。计入一份云副本不等于已经上传或验证，本地与远端应分别追踪。"
        ],
        [
          "4K 视频比 1080p 占用更多存储空间吗？",
          "高分辨率工作流常使用更高码率，但分辨率本身不能决定字节数。如果时长和完整平均码率相同，4K 与 1080p 的数学大小估计相同。"
        ]
      ],
      "sourceNames": [
        "NIST：二进制倍数前缀",
        "Adobe Premiere：导出设置参考",
        "FFmpeg：格式文档"
      ],
      "sourceClaims": [
        "支撑十进制、二进制存储单位及比特与字节换算。",
        "说明目标与最高码率及 CBR/VBR 设置，不提供通用的固定编码码率。",
        "说明混流器和元数据选项；封装开销取决于格式与配置。"
      ],
      "sourceUrls": [
        "https://physics.nist.gov/cuu/Units/binary.html",
        "https://helpx.adobe.com/premiere/desktop/render-and-export/export-files/overview-of-export-settings.html",
        "https://ffmpeg.org/ffmpeg-formats.html"
      ]
    }
  },
  "offload-verified-copy": {
    "en": {
      "title": "Offload and verified-copy time calculator",
      "description": "Plan sequential offload and checksum readback time, with a separately labeled advanced parallel model and explicit shared-resource caps.",
      "intro": "Copying bytes and reading them back for verification are different workloads. Estimate both without pretending a timer can prove that a copy is safe.",
      "formulaIntro": "Sequential is the default: copy each destination, then account for checksum readback. An additional independent source reread is optional and off by default. Both worked examples explicitly turn it on.",
      "formulaDefs": [
        "S is source bytes; c is destination count; Kᵢ is measured end-to-end copy B/s; Vᵢ is destination read-and-hash B/s; Vₛ is source read-and-hash B/s; f is setup seconds.",
        "Sequential copy = Σ(S ÷ Kᵢ). Verification = I × S ÷ Vₛ + Σ(S ÷ Vᵢ), where I = 1 only for an additional independent source reread. Total = f + copy + verification.",
        "Component-only Kᵢ ≈ min(Rₛ, Wᵢ) is an idealized bottleneck estimate, not a measured copy rate. Hashing already included in Kᵢ must not be charged again as an identical pass.",
        "Advanced parallel: source is read once and fanned out; copy = max(S/Rₛ, maxᵢ(S/Wᵢ), cS/Cw). Cw is measured aggregate destination-write B/s, not a bidirectional interface rating.",
        "Parallel verification = max(I × S/Vₛ, maxᵢ(S/Vᵢ), (c + I)S/Cv). Cv is aggregate read-and-hash B/s across the selected verification reads. Copy and verification phases do not overlap.",
        "Normalize sizes to bytes and rates to bits/s unless a disk rate is explicitly bytes/s. 1 byte = 8 bits; 1 kbps = 1,000 bit/s; 1 Mbps = 1,000,000 bit/s. 1 MB/s = 8 Mbps; 1 MiB/s = 8.388608 Mbps.",
        "1 MB = 10⁶ B, 1 GB = 10⁹ B, 1 TB = 10¹² B; 1 MiB = 2²⁰ B, 1 GiB = 2³⁰ B, 1 TiB = 2⁴⁰ B. One minute is 60 seconds; one hour is 3,600 seconds. Percent inputs become fractions: 2% = 0.02."
      ],
      "formulaAfter": "Parallel assumes concurrent independent paths and explicitly entered source, destination and shared-resource limits. It is an idealized resource-bound estimate, not a universal schedule. Software that rereads the source per copy needs a different source constraint.",
      "steps": [
        "Enter complete source bytes and total destination copies. Each destination must have at least one source dataset of available space.",
        "Use measured copy and checksum-read rates that include hashing cost where applicable. Select the actual verification method.",
        "Leave the optional source reread off unless your workflow performs an extra independent pass. Do not confuse an in-copy checksum with destination readback.",
        "Use advanced parallel only when the stated topology and aggregate caps are known. Review actual application verification logs afterward."
      ],
      "examples": [
        {
          "title": "Sequential: two copies with an extra source reread",
          "text": "120 GB source; two destinations; source read 300 MB/s; each destination write and measured end-to-end copy 200 MB/s; source verification 300 MB/s; each destination verification 200 MB/s; setup 120 seconds; extra source reread ON.",
          "equation": "Copy = 600 + 600 = 1,200 s; verify = 400 + 600 + 600 = 1,600 s; total = 120 + 1,200 + 1,600",
          "answer": "2,920 seconds, or 48 minutes 40 seconds; destination storage 240 GB total, 120 GB each.",
          "note": "With the extra source reread OFF, this scenario becomes 2,520 seconds. Verification results still need actual logs."
        },
        {
          "title": "Advanced parallel: explicit write and verification caps",
          "text": "120 GB source; two destinations; source 300 MB/s; each destination writes 200 MB/s; aggregate destination-write cap 400 MB/s. Source read-and-hash 300 MB/s; each destination read-and-hash 200 MB/s; aggregate verification cap 400 MB/s. Setup 120 seconds; extra source reread ON.",
          "equation": "Copy = max(400, 600, 600) = 600 s; verify = max(400, 600, 900) = 900 s; total = 120 + 600 + 900",
          "answer": "1,620 seconds, or 27 minutes; destination storage 240 GB total, 120 GB each.",
          "note": "The source is read once for fan-out copying, then independently reread for verification. This is not sequential time divided by two."
        }
      ],
      "limits": [
        "A file-size match is not checksum readback verification. This calculator performs neither copying nor verification.",
        "Unknown shared caps cannot be treated as unlimited without an explicit idealization warning; prefer sequential planning when topology is uncertain.",
        "Small files, filesystem work, CPU contention, thermal changes and retries can make actual work slower. A physical bus may carry both source reads and destination writes.",
        "Never erase source media because the predicted time has elapsed. Actual successful checks and your retention policy are separate requirements."
      ],
      "faqs": [
        [
          "How does checksum verification work?",
          "Checksum verification compares values calculated from the relevant source and copied content. Destination readback requires reading the written data, not merely checking a filename or size. The method and logs establish what was actually checked; this page only estimates time."
        ],
        [
          "What are checksum algorithms?",
          "They are defined methods for reducing input data to a check value. Different algorithms and verification modes can have different processing costs and purposes. Use the copy application’s documented mode and measure its effective throughput rather than assuming verification always doubles time."
        ],
        [
          "Does changing a file's name affect a checksum?",
          "A content-only hash is based on file bytes, so renaming without changing those bytes does not change that hash. A manifest may also record paths or metadata, which can affect the wider verification workflow. Matching names alone is not verification."
        ],
        [
          "Why is my copy speed slow?",
          "The slowest relevant storage path, shared bus, CPU hashing workload and file overhead can limit a copy. Simultaneous destinations can compete for resources. Measure sustained end-to-end rates for the actual topology instead of substituting an interface’s advertised peak."
        ]
      ],
      "sourceNames": [
        "NIST: Prefixes for binary multiples",
        "Hedge OffShoot: Verification",
        "Hedge OffShoot: Overview"
      ],
      "sourceClaims": [
        "Defines decimal and binary storage units and the bit/byte distinction.",
        "Explains verification modes and source/destination reading; timing depends on the selected method.",
        "Documents simultaneous-copy workflows, not guaranteed parallel throughput."
      ],
      "sourceUrls": [
        "https://physics.nist.gov/cuu/Units/binary.html",
        "https://docs.hedge.video/offshoot/features/verification",
        "https://docs.hedge.video/offshoot/overview"
      ]
    },
    "zh": {
      "title": "素材卸载与验证副本耗时计算器",
      "description": "规划顺序卸载及校验和回读时间，并提供明确标注共享资源上限的高级并行模型。",
      "intro": "复制字节与回读验证是不同负载。分别估算，而不把时间结束当成副本安全的证明。",
      "formulaIntro": "默认顺序执行：逐个复制目标端，再计入校验和回读。额外独立源端重读默认关闭；下面两个示例都明确开启。",
      "formulaDefs": [
        "S 为源字节数，c 为目标副本数，Kᵢ 为实测端到端复制 B/s，Vᵢ 为目标回读并计算校验和的 B/s，Vₛ 为源端相同速率，f 为准备秒数。",
        "顺序复制 = Σ(S ÷ Kᵢ)；验证 = I × S ÷ Vₛ + Σ(S ÷ Vᵢ)，只有额外独立源端重读开启时 I = 1；总计 = f + 复制 + 验证。",
        "只有组件速率时，Kᵢ ≈ min(Rₛ, Wᵢ) 是理想瓶颈估计，不是实测复制速率。Kᵢ 已含的哈希计算不能作为相同流程再次计费。",
        "高级并行：源端读一次并分发；复制 = max(S/Rₛ, maxᵢ(S/Wᵢ), cS/Cw)。Cw 是实测目标端合计写入 B/s，不是双向接口标称值。",
        "并行验证 = max(I × S/Vₛ, maxᵢ(S/Vᵢ), (c + I)S/Cv)。Cv 是所选验证读取的合计回读与哈希速率。复制与验证两个阶段不重叠。",
        "先把大小统一为字节，码率统一为 bit/s；磁盘速率若使用 B/s，需保留单位区别。1 字节 = 8 比特；1 kbps = 1,000 bit/s；1 Mbps = 1,000,000 bit/s。1 MB/s = 8 Mbps，1 MiB/s = 8.388608 Mbps。",
        "1 MB = 10⁶ B，1 GB = 10⁹ B，1 TB = 10¹² B；1 MiB = 2²⁰ B，1 GiB = 2³⁰ B，1 TiB = 2⁴⁰ B。1 分钟 = 60 秒，1 小时 = 3,600 秒。百分数先转为小数，例如 2% = 0.02。"
      ],
      "formulaAfter": "并行模型要求路径可同时运行，并明确源端、每个目标端及共享资源上限。它是理想化资源约束估计，不是通用排程；若软件为每份副本重新读源，应改变源端约束。",
      "steps": [
        "输入完整源数据量与目标副本数，每个目标端至少需容纳一套源数据。",
        "尽量使用已包含哈希开销的实测复制与验证速率，并选择真实验证方法。",
        "只有工作流确实额外独立读取源端时才开启该选项；复制时计算哈希不等于目标回读。",
        "只有拓扑及共享上限明确时才用高级并行；实际操作后检查软件验证日志。"
      ],
      "examples": [
        {
          "title": "顺序：两份副本，额外源端重读",
          "text": "源数据 120 GB，两个目标端；源读取 300 MB/s，每个目标写入及实测端到端复制 200 MB/s；源验证 300 MB/s，每个目标验证 200 MB/s；准备 120 秒；额外源端重读开启。",
          "equation": "复制 = 600 + 600 = 1,200 秒；验证 = 400 + 600 + 600 = 1,600 秒；总计 = 120 + 1,200 + 1,600",
          "answer": "2,920 秒，即 48 分 40 秒；目标存储合计 240 GB，每个目标 120 GB。",
          "note": "关闭额外源端重读时为 2,520 秒；是否验证通过仍须查看实际日志。"
        },
        {
          "title": "高级并行：写入与验证共享上限明确",
          "text": "源 120 GB，两个目标端；源读取 300 MB/s，目标各写入 200 MB/s，合计写入上限 400 MB/s；源回读并哈希 300 MB/s，目标各 200 MB/s，合计验证上限 400 MB/s；准备 120 秒；额外源端重读开启。",
          "equation": "复制 = max(400, 600, 600) = 600 秒；验证 = max(400, 600, 900) = 900 秒；总计 = 120 + 600 + 900",
          "answer": "1,620 秒，即 27 分钟；目标存储合计 240 GB，每个目标 120 GB。",
          "note": "复制阶段源端只读一次并分发，验证阶段再独立重读。这不是简单把顺序时间除以二。"
        }
      ],
      "limits": [
        "文件大小相同不等于校验和回读验证。本工具不会执行复制或验证。",
        "共享上限未知时不能默认为无限而不提示理想化假设；拓扑不明宜采用顺序规划。",
        "小文件、文件系统工作、CPU 竞争、温度及重试可能拖慢操作；物理总线可能同时承担源读取与目标写入。",
        "不要因为预计时间到了就擦除源媒体；实际验证成功及素材保留规则是独立要求。"
      ],
      "faqs": [
        [
          "校验和验证如何工作？",
          "校验和验证比较源内容与复制内容计算出的校验值。目标回读需要读取已写入的数据，而不只是检查文件名或大小。真实检查范围由方法与日志确定；本页只估算时间。"
        ],
        [
          "什么是校验和算法？",
          "它们是把输入数据计算成校验值的方法。不同算法与验证模式有不同成本和用途，应按复制软件文档选择并实测有效速率，不假定验证总会让时间翻倍。"
        ],
        [
          "更改文件名会影响校验和吗？",
          "仅基于内容字节的哈希不会因单纯改名而变化。但清单还可能记录路径或元数据，从而影响整体验证流程。文件名相同不能证明内容已验证。"
        ],
        [
          "为什么我的复制速度很慢？",
          "相关存储路径、共享总线、CPU 哈希及文件处理开销都可能限制速率，同时写多个目标也会竞争资源。应测量实际拓扑的持续端到端速率，不用接口峰值代替。"
        ]
      ],
      "sourceNames": [
        "NIST：二进制倍数前缀",
        "Hedge OffShoot：验证",
        "Hedge OffShoot：概览"
      ],
      "sourceClaims": [
        "支撑十进制、二进制存储单位及比特与字节换算。",
        "说明验证模式与源端、目标端读取；耗时取决于所选方法。",
        "说明同时复制工作流的存在，并不保证并行速率。"
      ],
      "sourceUrls": [
        "https://physics.nist.gov/cuu/Units/binary.html",
        "https://docs.hedge.video/offshoot/features/verification",
        "https://docs.hedge.video/offshoot/overview"
      ]
    }
  },
  "proxy-storage-tradeoff": {
    "en": {
      "title": "Proxy storage and handoff time calculator",
      "description": "Compare originals, proxies and retained storage, then test whether proxy transcoding plus upload beats transferring originals.",
      "intro": "A smaller editing set can help a collaborator without shrinking the archive. Compare retained bytes and sequential handoff time as two separate decisions.",
      "formulaIntro": "Estimate complete original and proxy sets independently from their total source-footage duration and average rates. For timing, compare one set on the same effective link, including proxy creation first.",
      "formulaDefs": [
        "For each set: S = (V + A) × D × (1 + h) ÷ 8, with rates in bit/s and D in seconds. Use complete measured bytes instead when available; do not apply allowance twice.",
        "Portable reduction = Sₒ − Sₚ; reduction percent = 100 × (1 − Sₚ/Sₒ); size ratio = Sₒ/Sₚ. Retained bytes = cₒSₒ + cₚSₚ, default one original set plus one proxy set.",
        "For measured effective q bit/s and transcode seconds Tc: original upload = 8Sₒ/q; proxy upload = 8Sₚ/q; proxy total = Tc + 8Sₚ/q; net time saved = 8Sₒ/q − Tc − 8Sₚ/q.",
        "Break-even transcode budget = 8(Sₒ − Sₚ)/q. Proxies win only when Tc is smaller than that budget; equality is a tie.",
        "When Sₒ > Sₚ and Tc > 0, break-even effective rate = 8(Sₒ − Sₚ)/Tc. Slower links favor proxies plus transcode; faster links favor originals in this sequential model.",
        "Normalize sizes to bytes and rates to bits/s unless a disk rate is explicitly bytes/s. 1 byte = 8 bits; 1 kbps = 1,000 bit/s; 1 Mbps = 1,000,000 bit/s. 1 MB/s = 8 Mbps; 1 MiB/s = 8.388608 Mbps.",
        "1 MB = 10⁶ B, 1 GB = 10⁹ B, 1 TB = 10¹² B; 1 MiB = 2²⁰ B, 1 GiB = 2³⁰ B, 1 TiB = 2⁴⁰ B. One minute is 60 seconds; one hour is 3,600 seconds. Percent inputs become fractions: 2% = 0.02."
      ],
      "formulaAfter": "Positive net time saved is a modeled win; negative is a penalty. If smaller proxies already exist (Tc = 0), there is no finite break-even rate. Equal sizes with no transcode tie; equal or larger proxies with positive transcode cannot win on the same link.",
      "steps": [
        "Use total source-footage duration, not the duration of the finished sequence. Enter original and proxy video/audio rates separately.",
        "Read proxy-only working-set reduction separately from originals-plus-proxies storage. Retaining originals while adding proxies consumes more total storage.",
        "Enter measured transcode time for the dataset, or label an extrapolated representative test as an estimate, and use the same effective upload throughput for both routes.",
        "Compare transcode, upload and total time. Retained copy counts do not multiply a one-set editorial handoff. Include any later originals transfer or conform as additional work."
      ],
      "examples": [
        {
          "title": "Two hours of source footage",
          "text": "Originals: 200 Mbps video + 320 kbps audio. Proxies: 10 Mbps video + 128 kbps audio. Duration 2 hours; both use 1% container allowance.",
          "equation": "Sₒ = 200.32 × 10⁶ × 7,200 × 1.01 ÷ 8; Sₚ = 10.128 × 10⁶ × 7,200 × 1.01 ÷ 8",
          "answer": "Originals 182.09088 GB; proxies 9.206352 GB; both 191.297232 GB.",
          "note": "The proxy-only portable set is 172.884528 GB smaller, ≈ 94.944089457% reduction; original/proxy ratio ≈ 19.778830964×."
        },
        {
          "title": "Five hours with the same PCM audio",
          "text": "Originals: 100 Mbps video + 2.304 Mbps audio. Proxies: 45 Mbps video + 2.304 Mbps audio. Duration 5 hours; both use 1% allowance.",
          "equation": "Sₒ = 102.304 × 10⁶ × 18,000 × 1.01 ÷ 8; Sₚ = 47.304 × 10⁶ × 18,000 × 1.01 ÷ 8",
          "answer": "Originals 232.48584 GB; proxies 107.49834 GB; both 339.98418 GB.",
          "note": "Portable reduction 124.9875 GB, ≈ 53.761338755%; ratio ≈ 2.162692373×. Audio makes a video-only bitrate ratio misleading."
        },
        {
          "title": "Timing win: a slower handoff connection",
          "text": "Original set 182.09088 GB; proxy set 9.206352 GB; measured transcode 1,800 seconds; measured effective upload 50 Mbps; transcode finishes before upload starts.",
          "equation": "Original = 29,134.5408 s; proxy upload = 1,473.01632 s; proxy total = 1,800 + 1,473.01632",
          "answer": "Net saving ≈ 25,861.52448 seconds, conservatively 7 h 11 m 01 s.",
          "note": "Transcode budget ≈ 27,661.52448 s; break-even rate 768.37568 Mbps. At 50 Mbps, this proxy route wins."
        },
        {
          "title": "Timing loss: a fast connection",
          "text": "Original set 232.48584 GB; proxy set 107.49834 GB; measured transcode 1,800 seconds; effective upload 1,000 Mbps; stages are sequential.",
          "equation": "Original = 1,859.88672 s; proxy upload = 859.98672 s; proxy total = 2,659.98672 s",
          "answer": "Net saving −800.1 seconds: a proxy-route penalty of about 13 m 21 s, rounded upward.",
          "note": "Transcode budget is only 999.9 s; break-even rate 555.5 Mbps. At 1,000 Mbps, sending originals is faster despite the smaller proxy upload."
        }
      ],
      "limits": [
        "Proxy codecs and dimensions do not imply a universal size ratio. Proxies can be larger than heavily compressed originals.",
        "This timing model assumes existing originals, sequential transcode then upload, and the same effective rate. It excludes overlap, retries, relinking and later finishing work.",
        "Caches, optimized media and renders are additional categories. Smaller proxies are not permission to delete originals.",
        "A proxy editorial handoff is not necessarily a full-resolution archive or final delivery. Check what the recipient actually needs."
      ],
      "faqs": [
        [
          "What is a proxy video?",
          "A proxy is an alternative editing representation linked to source media. It can reduce the active editing or transfer workload, but its actual bytes depend on codec, bitrate, audio and duration rather than the word “proxy.”"
        ],
        [
          "Do proxies need to be available at export time?",
          "Availability requirements depend on the editor and export settings. A workflow exporting from originals needs access to the originals; do not assume an offline proxy-only handoff can produce every final deliverable. Verify relinking and the intended export source."
        ],
        [
          "Can Proxies improve export speed?",
          "Proxy playback benefits do not automatically mean faster final export. For this page’s handoff comparison, transcoding must be paid back by upload-time savings. A fast connection can make sending originals quicker overall, as the loss example shows."
        ],
        [
          "Why should you use proxies in video editing?",
          "They can make an editorial working set easier to handle and transfer. The tradeoff includes creation time and extra retained storage when originals remain. Compare the collaboration need with later relinking, finishing and archival requirements rather than treating smaller files as a complete workflow win."
        ]
      ],
      "sourceNames": [
        "NIST: Prefixes for binary multiples",
        "Adobe Premiere: Export settings reference",
        "FFmpeg: Formats documentation",
        "Apple Final Cut Pro: Proxy files"
      ],
      "sourceClaims": [
        "Defines decimal and binary storage units and the bit/byte distinction.",
        "Explains target versus maximum bitrate and CBR/VBR settings; no universal codec bitrate is assumed.",
        "Documents muxers and metadata options; container overhead depends on format and configuration.",
        "Explains proxy editing media and workflow choices; no fixed size ratio is implied."
      ],
      "sourceUrls": [
        "https://physics.nist.gov/cuu/Units/binary.html",
        "https://helpx.adobe.com/premiere/desktop/render-and-export/export-files/overview-of-export-settings.html",
        "https://ffmpeg.org/ffmpeg-formats.html",
        "https://support.apple.com/en-lamr/guide/final-cut-pro/verb97cebff/mac"
      ]
    },
    "zh": {
      "title": "代理存储与交付耗时对比计算器",
      "description": "比较原片、代理及总保留空间，再判断代理转码加上传是否比直接传原片更快。",
      "intro": "较小的剪辑素材集可以方便协作，但不会自动缩小归档空间。把保留字节数与顺序交付总时间分开比较。",
      "formulaIntro": "按全部源素材时长及平均码率，分别计算完整原片与代理大小。时间比较采用同一有效链路，每种路线只传一套，并先计入代理制作。",
      "formulaDefs": [
        "每套 S = (V + A) × D × (1 + h) ÷ 8，码率为 bit/s，D 为秒。已有完整实测字节数可直接使用，不重复添加封装预留。",
        "便携集减少量 = Sₒ − Sₚ；减少比例 = 100 × (1 − Sₚ/Sₒ)；大小比 = Sₒ/Sₚ；保留字节 = cₒSₒ + cₚSₚ，默认一套原片加一套代理。",
        "q 为实测有效 bit/s，Tc 为转码秒数：原片上传 = 8Sₒ/q；代理上传 = 8Sₚ/q；代理总计 = Tc + 8Sₚ/q；净节省 = 8Sₒ/q − Tc − 8Sₚ/q。",
        "临界转码预算 = 8(Sₒ − Sₚ)/q。Tc 小于此预算时代理路线才更快；相等时两条路线耗时相同。",
        "当 Sₒ > Sₚ 且 Tc > 0，临界有效速率 = 8(Sₒ − Sₚ)/Tc。顺序模型中，较慢链路有利于代理加转码，较快链路有利于直接传原片。",
        "先把大小统一为字节，码率统一为 bit/s；磁盘速率若使用 B/s，需保留单位区别。1 字节 = 8 比特；1 kbps = 1,000 bit/s；1 Mbps = 1,000,000 bit/s。1 MB/s = 8 Mbps，1 MiB/s = 8.388608 Mbps。",
        "1 MB = 10⁶ B，1 GB = 10⁹ B，1 TB = 10¹² B；1 MiB = 2²⁰ B，1 GiB = 2³⁰ B，1 TiB = 2⁴⁰ B。1 分钟 = 60 秒，1 小时 = 3,600 秒。百分数先转为小数，例如 2% = 0.02。"
      ],
      "formulaAfter": "净节省为正表示场景下更快，为负表示多花时间。较小代理已就绪（Tc = 0）时没有有限临界速率；同样大小且无转码时相等；代理相同或更大且需转码时，在同一链路上不能胜出。",
      "steps": [
        "使用全部源素材时长，不是成片时间线时长；原片与代理分别输入视频和音频码率。",
        "区分仅带代理的工作集减少量与原片加代理总空间。保留原片再做代理，会增加总存储。",
        "填写该数据集的实测转码时间；若由代表片段外推，应标明估算。两条路线使用相同有效上传速率。",
        "比较转码、上传与总时间；保留套数不自动乘到一次协作交付上。后续传原片及套底需要另算。"
      ],
      "examples": [
        {
          "title": "两小时源素材",
          "text": "原片视频 200 Mbps、音频 320 kbps；代理视频 10 Mbps、音频 128 kbps；时长 2 小时；两者封装预留均为 1%。",
          "equation": "Sₒ = 200.32 × 10⁶ × 7,200 × 1.01 ÷ 8；Sₚ = 10.128 × 10⁶ × 7,200 × 1.01 ÷ 8",
          "answer": "原片 182.09088 GB；代理 9.206352 GB；合计 191.297232 GB。",
          "note": "仅带代理的便携集减少 172.884528 GB，约 94.944089457%；原片与代理大小比约 19.778830964 倍。"
        },
        {
          "title": "五小时素材，相同 PCM 音频",
          "text": "原片视频 100 Mbps、音频 2.304 Mbps；代理视频 45 Mbps、音频 2.304 Mbps；时长 5 小时；两者封装预留均为 1%。",
          "equation": "Sₒ = 102.304 × 10⁶ × 18,000 × 1.01 ÷ 8；Sₚ = 47.304 × 10⁶ × 18,000 × 1.01 ÷ 8",
          "answer": "原片 232.48584 GB；代理 107.49834 GB；合计 339.98418 GB。",
          "note": "便携集减少 124.9875 GB，约 53.761338755%；比值约 2.162692373 倍。只比较视频码率会忽略音频影响。"
        },
        {
          "title": "时间胜出：较慢交付链路",
          "text": "原片 182.09088 GB，代理 9.206352 GB，实测转码 1,800 秒，有效上传 50 Mbps；转码结束后才开始上传。",
          "equation": "原片 = 29,134.5408 秒；代理上传 = 1,473.01632 秒；代理总计 = 1,800 + 1,473.01632",
          "answer": "净节省约 25,861.52448 秒；保守向下取整为 7 小时 11 分 01 秒。",
          "note": "转码预算约 27,661.52448 秒，临界速率 768.37568 Mbps；50 Mbps 下代理路线更快。"
        },
        {
          "title": "时间落后：较快交付链路",
          "text": "原片 232.48584 GB，代理 107.49834 GB，实测转码 1,800 秒，有效上传 1,000 Mbps；各阶段顺序执行。",
          "equation": "原片 = 1,859.88672 秒；代理上传 = 859.98672 秒；代理总计 = 2,659.98672 秒",
          "answer": "净节省 −800.1 秒，即代理路线多用约 13 分 21 秒，向上取整。",
          "note": "转码预算仅 999.9 秒，临界速率 555.5 Mbps；1,000 Mbps 下，虽然代理更小，直接传原片仍更快。"
        }
      ],
      "limits": [
        "代理编码格式与尺寸不代表通用大小比例；代理可能比高度压缩的原片更大。",
        "时间模型假定原片已存在、先转码再上传、有效速率相同，不含重叠、重试、重链接及后续精修。",
        "缓存、优化媒体及渲染文件应另计。代理更小不代表可以删除原片。",
        "代理剪辑交付不一定满足全分辨率归档或最终交付，需要核对接收方真实需求。"
      ],
      "faqs": [
        [
          "什么是代理视频？",
          "代理是与源媒体关联的另一种剪辑表示，可减轻活跃剪辑或传输负载。但实际大小取决于编码格式、码率、音频与时长，不由“代理”这个名称决定。"
        ],
        [
          "导出时必须能访问代理文件吗？",
          "取决于剪辑软件与导出设置。使用原片导出的流程需要能访问原片，不能认为只有离线代理就能完成任何最终交付；应验证重链接及所选导出源。"
        ],
        [
          "代理能提高导出速度吗？",
          "代理改善播放，不自动代表最终导出更快。本页比较的是交付路线，转码时间必须由上传节省抵消。连接很快时，直接传原片总耗时可能更短，落后示例就说明了这一点。"
        ],
        [
          "为什么要在视频剪辑中使用代理？",
          "代理可以降低剪辑工作集处理与传输负担，但也需要制作时间；原片保留时，总存储会增加。应结合协作需求、后续重链接、精修与归档判断，而不是只看文件变小。"
        ]
      ],
      "sourceNames": [
        "NIST：二进制倍数前缀",
        "Adobe Premiere：导出设置参考",
        "FFmpeg：格式文档",
        "Apple Final Cut Pro：代理文件"
      ],
      "sourceClaims": [
        "支撑十进制、二进制存储单位及比特与字节换算。",
        "说明目标与最高码率及 CBR/VBR 设置，不提供通用的固定编码码率。",
        "说明混流器和元数据选项；封装开销取决于格式与配置。",
        "说明代理剪辑媒体及工作流选择，不假定固定大小比例。"
      ],
      "sourceUrls": [
        "https://physics.nist.gov/cuu/Units/binary.html",
        "https://helpx.adobe.com/premiere/desktop/render-and-export/export-files/overview-of-export-settings.html",
        "https://ffmpeg.org/ffmpeg-formats.html",
        "https://support.apple.com/en-lamr/guide/final-cut-pro/verb97cebff/mac"
      ]
    }
  }
};
