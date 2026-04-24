# Toll-Free Verification — copy-paste form values

Twilio Toll-Free Verification is the regulatory track for SMS from the `+1 (855) 928-2979` number. It does **not** require an LLC or A2P 10DLC — sole props / individuals can submit it. Approval: 2–4 weeks.

Submit at: https://console.twilio.com/us1/develop/sms/regulatory-compliance/tollfree-verifications

## Business info

- Business name: `Keo Labs`
- Business type: **Sole Proprietorship**
- Business industry: `Technology`
- Business registration / tax ID: (leave blank — sole prop doesn't need EIN)
- Business website: `https://keolabs.ai`
- Business regions of operation: `USA`
- Address: your Austin home address (TCR internal, not public)

## Authorized rep

- First / last name: your legal name
- Email: `kieldro@gmail.com`
- Phone: your cell
- Job position: `Owner`

## Messaging use case

- Use case category: **Mixed** (covers both confirmations and occasional marketing; safer than Customer Care which is stricter)
- Use case description:

  > Keo Labs operates AI phone receptionists for small businesses. When a
  > consumer calls a Keo Labs–powered number and provides their phone number
  > during the call, the AI agent sends one follow-up SMS summarizing what
  > was discussed and any next steps (e.g., a booked appointment time, a
  > quote, or a confirmation that a human will follow up). Volume is low
  > (< 1,000 messages / month). One message per call. No marketing blasts.

## Opt-in

- Opt-in type: **Verbal**
- Opt-in workflow description:

  > The consumer verbally provides their phone number during an inbound
  > phone call with our AI receptionist. The AI agent confirms on-call that
  > a text recap will be sent to that number after the call ends. By
  > providing the number, the consumer consents to receive that single
  > follow-up SMS per call. The call recording and transcript document the
  > consent.

- Message frequency: `1 message per call, approximately < 1,000 messages per month total across all clients`

## Sample messages (paste each on its own line as a separate sample)

1. `Thanks for calling Keo Labs! You're booked for a 30-min demo Tuesday at 2pm Central. Calendar invite coming shortly. — Keo Labs`
2. `Got it — we'll send your moving quote within an hour. If anything changed since the call, text us back. Reply STOP to opt out. — Pack N' Throw Movers`
3. `Confirming your oil change appointment for Thursday at 9am. Address: 123 Main St. Reply STOP to opt out. — Bob's Auto Repair`
4. `Hey Sarah, our on-call tech is heading your way for the AC emergency. ETA ~25 min. Reply STOP to opt out. — Capital Climate`
5. `Thanks for calling. Text summary of what we discussed above. Reply STOP to opt out, HELP for help. — Keo Labs`

## Opt-out

- Opt-out keywords: `STOP, UNSUBSCRIBE, END, QUIT, CANCEL`
- Confirmation message (Twilio sends this automatically):

  > You are unsubscribed and will no longer receive messages from this number.
  > Reply START to resubscribe.

## Help

- HELP response:

  > Keo Labs AI receptionist. Reply STOP to opt out. Questions: kieldro@gmail.com or keolabs.ai.

## Privacy + terms links

- Privacy policy URL: `https://keolabs.ai/privacy`
- Terms of service URL: `https://keolabs.ai/privacy` (same page covers it for now)

## Expected volume + throughput

- Monthly volume estimate: `< 1,000`
- Peak messages per second: `1`

Once approved, unverified throughput (~5 msg/min) is lifted and the 855 number becomes fully usable for the post-call recap SMS.
