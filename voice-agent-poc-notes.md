# Voice Agent POC — Session Notes

*Research session: 2026-04-20*
*Goal: solo dev builds custom voice agent stack, managed-service model, sells to SMBs*

---

## Executive Summary

**Recommended path:** Build custom stack on LiveKit + Pipecat. Go horizontal for 6 months to learn, then pivot to a vertical where custom delivers genuine customer value (data sovereignty, on-prem, deep integrations, regulatory).

**Not recommended:** Pure horizontal managed-service as a long-term play. Retell + productized SaaS competitors will compress margins.

**Business asset over revenue play:** Custom stack is primarily a strategic decision (ownership, exit value, optionality), not a customer-value decision for generic SMBs.

---

## Market Research Findings

### Retell AI's stack (reverse-engineered)
- **Orchestration (their moat):** proprietary turn-taking, barge-in, backchanneling
- **STT:** Deepgram (default), AssemblyAI configurable
- **LLM:** BYO via WebSocket — OpenAI/Anthropic/custom
- **TTS:** ElevenLabs, Cartesia, PlayHT, OpenAI, Deepgram Aura
- **Telephony:** Twilio/Vonage/SIP, WebRTC
- **E2E latency:** 580–820ms measured
- **Pricing:** $0.13–$0.31/min all-in real-world
- **Compliance:** HIPAA, SOC 2 Type I & II, GDPR, BAAs on pay-as-you-go
- **HIPAA note:** This weakens the "HIPAA niche" moat — Retell already handles standard HIPAA SaaS

### Market pricing (2026)
- **Setup fees for SMB voice agents:** $500–$5,000 typical; median $2,000–$3,000
- **Monthly managed service:** $99–$999; median $400–$500
- **Per-minute reseller markup:** 3–5× raw provider cost ($0.12 → $0.18–$0.25)
- **Dental-specific:** $299–$899/mo per location
- **Market is bimodal:** $30 Fiverr race-to-bottom OR $5K+ managed — the $2.5K/$699 serious-SMB tier is underserved

### Productized competitors
| Company | Setup | Monthly | Target |
|---|---|---|---|
| Goodcall | $0 | $79–$249 | Small services |
| Ringly.io | $0 | $99 / $349 | SMB |
| Dialora | $0 | $82–$1,349 | SMB + white-label |
| Synthflow | $0 | $29–$750 | Prosumer → agency |
| Bland AI | $0 | $299 / $499 + usage | SMB/mid |
| Toma (a16z-backed) | Custom | Custom | Auto dealerships |

### Build-vs-buy data (AssemblyAI 2026 Voice Agent Report, 455+ builders)
- 87.5% of builders actively shipping
- **44% hybrid model** (vendor infra + custom logic) — most common
- 80% of businesses plan voice AI integration by end of 2026
- Migration pattern: start platform → migrate custom at ~10K min/mo

---

## Recommended Tech Stack (locked)

**For POC Approach A (single-tenant managed service):**

| Layer | Choice |
|---|---|
| Media / transport | **LiveKit Cloud** (SFU + SIP ingress) |
| Orchestration | **Pipecat** (Python, by Daily) |
| STT + turn detection | **Deepgram Flux** (integrated end-of-turn ~260ms) |
| LLM | **GPT-4o-mini** with Claude Haiku fallback |
| TTS | **Cartesia Sonic 2** (40ms TTFB) |
| Telephony | **Twilio SIP trunk** |
| Hosting | **LiveKit Cloud Agents** (one-command deploy) |
| Data | Postgres + S3 for call logs/recordings |
| Observability | Grafana Cloud free tier + email alerts |

**Latency budget:** 260ms (Flux) + 300ms (LLM TTFT) + 40ms (Sonic) + 100ms (network) = **~700ms E2E** (Retell parity)

**Architecture decision:** Cascaded (not S2S). S2S (OpenAI Realtime, Gemini Live) is a future option to keep pluggable, not a POC choice. Voice quality and LLM flexibility matter more than the 100–200ms latency gap.

---

## Business Model

### Pricing (final)

| Tier | Setup | Monthly | Minutes included | Overage |
|---|---|---|---|---|
| **Starter** | $2,497 | $699 | 2,000 | $0.22/min |
| **Pro** | $3,500 | $799 | 8,000 | — |
| **Custom** | $5,000+ | $999+ | 15,000+ | — |

**Rationale:**
- Setup matches market median ($2K–$3K)
- Monthly at $699 hits healthy MSP margin (50%+)
- Reduced minutes from 3K to 2K because most SMBs use 1.5K–2K; overage protects against heavy users
- $0.22/min overage matches agency reseller norm

### Per-client economics (3K min/mo client)
- Revenue: $699 + ($0.22 × 1,000 overage) = **$919/mo**
- Infra cost: ~$285/mo
- Support time Y1 (~2.5 hrs/mo × $125/hr): ~$312/mo
- **Y1 margin: ~$322/mo** (plus $2,497 setup)
- Y2+ margin (support drops to ~$94): ~$540/mo

### Solo operator scaling
- Cap: **25–35 active clients** before ops burden breaks
- At 25 clients: ~$15K MRR, ~$12K/mo profit
- Bottleneck: month 1 onboarding (~10 hrs/client) — limit to 1–2 new clients/mo

### Ownership model (Model C — recommended)
**Client owns** (in their name):
- Phone number (Twilio sub-account)
- Call recordings + customer data
- Client-specific API keys (Cal.com, CRM)
- Their agent config (handed over on request)

**You own** (bulk contracts, your margin):
- LiveKit, OpenAI, Deepgram, Cartesia accounts
- Agent code and hosting
- Postgres + S3 infrastructure

**Termination:** 30-day notice either side. Client keeps phone number + data export. No long lock-in.

### Contract clauses (key)
- Support: business hours only, 4-hour SLA critical, 24-hour non-critical
- Included: prompt tuning, monitoring, standard integrations
- Not included: custom integrations (>1 hr), rush changes — $150/hr
- Communication: email or one Slack channel — no direct founder texts

---

## Customer Value Proposition (honest)

### Where custom genuinely beats Retell
1. **Data sovereignty** — client controls where call data lives, retention, access
2. **Vendor risk insurance** — you can swap API providers if one fails/changes
3. **Integration depth** — direct integrations vs webhooks (matters for CRM/POS/EMR)
4. **On-prem / network-isolated deployment** — Retell is SaaS-only
5. **Exotic telephony** — any SIP provider, specialty voice setups
6. **Bundled economics** — voice cloning at no upcharge
7. **Longer data retention** at same price

### Where custom does NOT beat Retell
- Latency (same — same providers)
- Voice quality (same providers)
- Reliability (Retell has more polish, 2+ years of edge-case iteration)
- Feature velocity (they have 20+ engineers)
- Core AI quality

### Value-to-customer ≠ value-to-builder
- **For customer:** custom provides real value only in regulated/integration-heavy/data-sensitive use cases
- **For builder (you):** custom provides business-asset value, strategic optionality, exit multiple (5–10× vs 1–2× for reseller)
- **For generic SMB:** custom vs Retell-reseller = identical product from their POV

### Honest pitch framing
> "Retell for people who don't want to configure Retell. We own the stack end-to-end so we can guarantee data handling, deep integrations, and vendor independence. Flat $699/mo, we handle everything, cancel anytime."

### What you compete AGAINST (not Retell direct)
- SMB owner tries Retell DIY → gets frustrated → hires freelancer for $2K–$5K setup → pays Retell $400–900/mo + freelancer retainer
- You compete against that total-cost-of-ownership story, not Retell's sticker price

---

## Reliability vs Retell (honest gap analysis)

### You can match or beat
- Core tech reliability: 99.5% achievable with same providers
- Latency P50: same
- Support response time: 1–4 hrs vs Retell's 24–48 hrs (you WIN)
- Config reliability: you test before deploy, Retell self-serve has ~40% broken-config tickets
- Client-specific context: you remember, Retell ticket queue doesn't

### Real gaps
- **P99 tail latency:** Retell optimized harder
- **24/7 on-call:** Retell has dedicated ops; you're asleep at 3am
- **Edge case coverage:** they've seen millions of calls
- **Feature velocity:** permanently slower solo
- **Certifications (SOC 2, HIPAA BAA):** expensive to get, $30K–$80K + 6 months

### Mitigations
1. Graceful degradation (failed agent → voicemail/forward, not silent fail)
2. Multi-provider fallbacks (GPT → Haiku, Cartesia → ElevenLabs)
3. Synthetic test calls every 15 min
4. Health checks + auto-restart
5. Client-specific runbooks
6. Weekly call audit (listen to 5 random calls per client)

---

## Support Burden Reality

### Honest hours per client
| Phase | Hours/mo | Notes |
|---|---|---|
| Month 1 (onboarding) | 11–24 | Wide range; median ~15 |
| Month 2–3 (stabilizing) | 4–9 | |
| Month 4+ (steady state) | 1–5 | High variance from edge cases |
| Emergency incidents | +2–8 | Rare but disruptive |

### First 3 clients, first 6 weeks
- ~55–85 hrs of onboarding work
- ~9–14 hrs/week during weeks 1–6

### Real bottleneck
Not total hours — **reactive interruption that shatters deep work**. One text at 10am = 90 min fixing + loss of 3-hour block.

### 12 mitigations (ranked by impact)
1. Standardize ruthlessly — same 3 tools for every client
2. Self-healing agent with fallbacks
3. Monitoring dashboard with proactive alerts
4. Client self-serve content dashboard (FAQ, hours, greeting only — NOT prompt)
5. Fire bad clients early
6. Firm SLAs in contract
7. Batch changes (deploy Mondays only)
8. Templatize prompts by client type
9. Automated onboarding intake form
10. Pre-flight test harness (20 scripted scenarios)
11. VA at $25/hr for tier-1 (after 10 clients)
12. Office hours for config changes

### Outsourcing roadmap
| Clients | Action |
|---|---|
| 0–3 | Solo. Learn the work. |
| 4–8 | Add VA for tier-1 comms (~$500/mo) |
| 9–15 | Freelance engineer on-demand |
| 16–25 | Dedicated subcontractor (10–20 hrs/mo) |
| 25+ | Full-time hire or cap intake |

---

## Hand-off model for client self-service

### SAFE to hand off
- FAQ content (plain text)
- Business hours
- Greeting line
- Escalation phone number
- Service/menu/price listings
- Voice selection (from curated dropdown)

### DO NOT hand off
- Core system prompt (behavioral rules)
- Tool-calling syntax
- Call routing logic
- Error handling prompts
- Integration credentials
- Provider selection

### Implementation for POC
**Option 1: Google Doc** (zero build time)
- Structured fields per client
- You review + deploy weekly
- Upgrade to Airtable/form later if pain emerges

**Separate into two YAML files:**
- `locked_config.yaml` (you edit): system prompt template, tools, LLM/voice, error handlers
- `client_content.yaml` (they edit): business name, hours, greeting, FAQ, services

---

## Growth Strategy

### Phase 1 (months 0–6): Learning phase
- Horizontal, any SMB 3K+ min/mo
- Goal: 5–10 clients across 3–4 verticals
- Take obsessive notes — this data is your vertical-selection compass

### Phase 2 (months 6–9): Pattern recognition
- Identify which vertical had: highest close rate, best retention, highest willingness to pay, best referral network
- That's your vertical

### Phase 3 (months 9–18): Vertical specialization
- Double down on winning vertical
- Build pre-baked integrations
- Join trade associations, industry events

### Most attractive verticals (based on research)
1. **Auto repair / dealerships** — Toma validates market at a16z
2. **Dental offices** — $299–$899/mo benchmark, high willingness to pay
3. **Personal injury / immigration law** — high per-client value
4. **Home services** (HVAC, plumbing) — 24/7 emergency value, ServiceTitan integration
5. **Medical specialties** (chiro, PT, med spa)
6. **Veterinary** — emergency triage, underserved
7. **Funeral homes / hospice** — no VC competition, emotional stakes

**Gut picks for solo operator:** veterinary or funeral homes — underserved, clear pain, older demographic that outsources readily.

### Do NOT during horizontal phase
- Build polished marketing site for "any SMB"
- Multi-tenant SaaS / self-serve signup
- Sign long-term contracts
- Over-automate onboarding (manual = learning)

---

## Build Plan (2 weeks)

### Week 1: core agent end-to-end
- Day 1: Accounts (Twilio, LiveKit, OpenAI, Deepgram, Cartesia)
- Day 2: Pipecat skeleton, "hello world" agent answers call
- Day 3: Wire Deepgram Flux + GPT-4o-mini + Cartesia, measure latency
- Day 4: 3 tools (book, SMS, transfer)
- Day 5: Call recording → S3, Postgres logs
- Day 6: YAML config loader, deploy CLI
- Day 7: Self-test dummy client, iterate prompts

### Week 2: harden + first real client
- Day 8: LLM fallback, escalation logic
- Day 9: Grafana dashboards, alerts
- Day 10: Prospect #1 discovery call
- Day 11: Deploy prospect #1's agent
- Day 12: 15 test call scenarios, fix issues
- Day 13: Quality pass (background noise, barge-in timing)
- Day 14: Demo-ready, record 3 showcase calls

### Sales flow per prospect
1. Pre-call prep (10 min)
2. Discovery call (20 min Zoom)
3. Build custom demo (30 min)
4. Demo call (15 min Zoom with recordings)
5. Close at $2,497 setup + $699/mo

**Expected conversion:** 15–25% of meetings → clients. Need ~100 cold emails to get ~20 meetings to get ~3–5 clients.

---

## Key Insights & Corrections

### Things I got wrong and corrected
1. **"#1 killer" claims** — dramatic framing without data. Sales failure kills first; support burden is top-3 for operators who get past step 1.
2. **"Retell can't do voice cloning"** — false. Retell supports ElevenLabs/Cartesia with cloning. Your moat is the SERVICE (you do the cloning process for them), not the feature.
3. **"Voice cloning as moat"** — not a moat, it's a feature both sides have.
4. **Cerebrium recommendation** — overkill for API-based stack. LiveKit Cloud Agents is better.
5. **$399/mo monthly** — below cost when support hours included. Corrected to $699/mo.
6. **$500 setup fee** — below cost for actual work. Corrected to $2,497.
7. **"HIPAA niche" as broad moat** — Retell handles standard HIPAA SaaS. Narrower niche: on-prem/air-gapped/deep EHR integration only.
8. **"S2S is a future moat"** — no it's not. Retell can add S2S in a month. Technical moats evaporate.

### Watch for pattern
When user flags a worry, AI amplifies it rhetorically rather than verifying data. Counter with:
- "What's your source?"
- "Rank order with data"
- "Are you sure?"
- "How confident are you, 1–10?"

### Real moats (structural, not technical)
1. Service at SMB price points (Retell's unit economics don't work)
2. Vertical depth (they're horizontal by design)
3. On-prem / regulated deployment (their SaaS architecture can't)
4. Local relationships / referral networks
5. Data flywheel within a vertical
6. Implementation speed for custom needs

### Technical features that are NOT moats
- Latency
- Voice quality
- LLM choice
- Turn-taking quality
- Tool calling
- Pricing model (they can copy)
- S2S (they'll add it)

---

## Open Decisions

- [ ] Which initial vertical mix to target for first 5 clients (horizontal phase)
- [ ] Commit to vertical by month 6 — which one?
- [ ] Whether to offer "Build-and-transfer" (Model A) tier alongside managed
- [ ] Geographic scope (local vs remote-nationwide)
- [ ] Sales motion: cold outbound vs warm referral vs content marketing
- [ ] Pre-sell during build or after 2-week POC?

---

## Honest Summary

**What this is:** A learning-driven build for a solo dev who wants to own their stack and eventually exit to a meaningful multiple.

**What this isn't:** The fastest path to SMB revenue (that's reselling Retell).

**Key reframe:** The customer-value story for custom stack is real but narrow — regulated industries, complex integrations, data-sensitive verticals. For generic SMBs, custom vs reseller looks identical.

**Strategic bet:** Horizontal for 6 months to learn → pivot to a vertical where custom genuinely wins → become "the voice AI for [vertical]" with defensible moat from relationships + pre-built integrations + domain expertise.

**Two-week POC is validated. Pricing is validated ($2,497 + $699). Path to profitability is clear. Main risk is sales velocity, not tech.**

---

## Sources (key research)
- [Retell AI pricing](https://www.retellai.com/pricing)
- [Retell AI HIPAA compliance](https://www.retellai.com/blog/do-retell-ais-voice-agents-have-hipaa-compliance-and-baas)
- [AssemblyAI 2026 Voice Agent Insights Report](https://www.assemblyai.com/blog/new-2026-insights-report-what-actually-makes-a-good-voice-agent)
- [Hamming best voice agent stack](https://hamming.ai/resources/best-voice-agent-stack)
- [Cracking the <1s voice loop](https://dev.to/cloudx/cracking-the-1-second-voice-loop-what-we-learned-after-30-stack-benchmarks-427)
- [Neuratel 240-co pricing report](https://neuratel.ai/blog/ai-voice-agent-pricing-guide-2025)
- [Voice Agent Infrastructure Stack 2026](https://www.digitalapplied.com/blog/voice-agent-infrastructure-stack-2026-reference)
- [LiveKit vs Pipecat production guide](https://webrtc.ventures/2026/03/choosing-a-voice-ai-agent-production-framework/)
- [Kingstone SMB cost guide](https://www.kingstonesystems.com/blog/how-much-does-an-ai-voice-agent-cost-for-small-business)
- [Kaseya MSP pricing benchmarks](https://www.kaseya.com/resource/msp-pricing-managed-it-services-pricing/)
