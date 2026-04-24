# A2P 10DLC — copy-paste form values for Twilio Console

Use these strings when you submit the Sole Proprietor brand + campaign at
https://console.twilio.com/us1/develop/sms/regulatory-compliance

---

## Customer Profile (Sole Proprietor)

- Business type: **Sole Proprietorship**
- Business name: `Keo Labs`
- Business registration number: (leave blank — not required for Sole Prop)
- Doing business as: `Keo Labs`
- Business website: `https://keolabs.ai`
- Social profile URL: (optional — LinkedIn if you have a company page)
- Business email: `kieldro@gmail.com`
- Business phone: `+12545365227`
- Physical address: your Austin home address (required; only TCR sees it)

**You (authorized representative):**

- First/last name: your legal name
- Title: `Owner`
- Email: `kieldro@gmail.com`
- Phone: your cell
- Identity verification: SSN — Twilio forwards this to TCR but does not store it

---

## A2P Brand (Sole Proprietor)

Auto-approves within minutes once the customer profile is done.

- Brand type: **Sole Proprietor**
- All fields pre-fill from the customer profile; just review and submit.

---

## Messaging Service + Campaign

In Messaging → Services → Create new → Sender pool includes `+1 254 536 5227`.

Then add a Campaign:

- **Use case**: `Low Volume Mixed`
- **Campaign name**: `keolabs-call-recap`
- **Description**:

  > Keo Labs operates AI phone receptionists for small businesses. After a
  > consumer calls a Keo Labs–powered phone line and provides their number,
  > the AI agent texts them a one-to-two sentence recap of the call with any
  > next steps (e.g., booked appointment time, quoted price, or confirmation
  > that a human will follow up). One message per call. Opt-out via STOP;
  > help via HELP.

- **Message flow / opt-in**:

  > Consumer provides their phone number verbally during an inbound call to a
  > Keo Labs-powered number. The AI agent confirms on-call that a text recap
  > will be sent. By providing the number, the consumer consents to receive
  > that single follow-up SMS per call. Consent is also documented in the
  > call recording and transcript.

- **Sample messages** (paste each on its own line):

  1. `Thanks for calling Keo Labs! You're booked for a 30-min demo Tuesday at 2pm Central. We'll send a calendar invite shortly. — Keo Labs`
  2. `Got it — we'll send your moving quote within an hour. If anything changed since the call, text us back. — Pack N' Throw Movers`
  3. `Confirming your oil change appointment for Thursday at 9am. Address: 123 Main St. Reply STOP to unsubscribe. — Bob's Auto`
  4. `Hey Sarah, our on-call tech is heading your way for the AC emergency. ETA ~25 min. — Capital Climate`
  5. `Appreciate the call. Reply STOP to opt out, HELP for help. — Keo Labs`

- **Opt-in keywords**: (leave blank — verbal consent on call)
- **Opt-in confirmation message**: (leave blank)
- **Opt-out keywords**: `STOP, UNSUBSCRIBE, END, QUIT, CANCEL`
- **Opt-out confirmation message**:

  > You've been opted out and will not receive any more texts from this number.
  > Reply START to opt back in.

- **HELP keywords**: `HELP, INFO`
- **HELP response**:

  > Keo Labs AI receptionist. Reply STOP to opt out. Questions: kieldro@gmail.com
  > or keolabs.ai.

- **Monthly volume estimate**: `<1,000`
- **Privacy policy URL**: `https://keolabs.ai/privacy`
- **Terms of service URL**: `https://keolabs.ai/privacy` (same page covers it for now)

---

## Timeline

- Customer Profile: instant (Sole Prop path)
- Brand: minutes
- Campaign: 3–5 business days

Once approved, link the Messaging Service to `+1 254 536 5227` (it may
already be in the sender pool from the creation step). After that, SMS
throughput is unthrottled up to the Sole-Prop tier cap (~1k/day).
