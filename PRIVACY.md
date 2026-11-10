# Care Navigator: data agreement (DRAFT for team + process owner sign-off)

The team plan's original agreement ("nothing leaves the building", "never touches payment details") was
written for the billing idea. This product asks people about income, insurance and health problems, so it
needs its own agreement **before any real patient uses it**. Course policy (item 7) requires the team and the
process owner to agree in writing before the harness touches real data.

## What the app collects
| Data | Why | Where it goes |
|---|---|---|
| What the person types (problem, medication) | To find care and programs | Stays in the browser. **With AI mode on**, sent to Anthropic's API to be read (see below) |
| Household size, income, insurance, state | Eligibility rules | Stays in the browser (and in the AI request if AI mode is on) |
| Name, address, DOB (only on the Amgen form helper) | To fill the official PDF | Stays in the browser. The PDF is made on the device; nothing is uploaded |
| Saved 501(r) applications (Hospital dashboard) | Demo of hospital tracking | `localStorage` in that one browser only. "Clear my saved data" deletes it |
| My plan (saved plans, deadlines, checklists) | So people can come back to their plan | `localStorage` (key `cn_plan_v1`) in that browser only. "Remove" deletes an item |
| "Was this helpful?" answers | Count usefulness during deploy week | `localStorage` (key `cn_feedback_v1`): only which tab, yes/no, an optional reason from a fixed list, and the date. Never what the person typed. Staff can download totals or clear them on the Hospital dashboard. **On the Vercel site**, the same answer (tab, yes/no, fixed reason) is also added to a Supabase table so the team sees totals from every visitor; the database adds the day. No IP, user ID or time of day is stored, and the public key can only add rows, not read them (`supabase/feedback.sql`) |
| Results shown (automatic count) | Know which tools people finish, even when they don't click "Was this helpful?" | **On the Vercel site only.** Each time a tab shows a result, one row is added to a Supabase table `usage` with only the tab name; the database adds the day. The same tab name goes to Umami as a `result` event. Never what the person typed, no IP, user ID or time of day. The public key can only add rows (`supabase/usage.sql`) |
| Page visits (Umami analytics) | Know how many people visit, from which kind of device and country | Umami Cloud counts page views without cookies and without storing IP addresses. The address is counted without its `?` or `#` part, so nothing typed is ever sent. Browsers with "Do Not Track" on are not counted. Off unless set in `config.js` |
| Page visits (Vercel Web Analytics) | Same as Umami, shown in the Vercel dashboard | Cookie-free page-view counts from Vercel, only on care-navigator-site.vercel.app. The address is sent without its `?` or `#` part. Browsers with "Do Not Track" on are not counted. Off unless `vercelAnalyticsHost` is set in `config.js` |

**Not collected:** Social Security numbers, insurance member IDs, medical records, payment cards. The app never
submits anything to a hospital or drug company. The patient (or a counselor sitting with them) does.

## AI mode (Claude Sonnet 5.5 for the search bar, Claude Opus 5.5 for the guidance chat)
- Only the text typed into the search bar, and the messages typed into "Ask for guidance", are sent, from the local
  server (`serve.py`), never directly from the browser. Emergency messages are answered in the browser and never sent.
- On the published site (no server), AI mode is off: the search bar and the guidance chat use the built-in reader.
- The server does not log the text. It logs only a request ID.
- Anthropic's API terms apply to that text. **Before real patients:** confirm the account's data-retention
  settings with Anthropic and decide whether a Business Associate Agreement (HIPAA) is needed for the deployment.
  Until then, keep AI mode for demos and testing with **made-up** descriptions, or tell testers not to include names.

## Before real patients (not done yet)
1. Sign this agreement: team (Andrew, Joseph, Hayden) + process owner. Name who checks outputs before they're relied on.
2. Hosting: HTTPS only. No server-side storage of patient answers unless the hospital requires it, and then
   encrypted at rest with a retention limit (e.g. delete after 30 days).
3. If a hospital deploys it: their privacy/compliance office reviews it, and a BAA with every vendor that touches PHI.
4. Show a one-line notice in the app: what's sent where, and that nothing is submitted for them.

## Who can shut it down
The process owner or any teammate can turn AI mode off (remove the key) or take the app offline at any time, no reason needed.

Signed: ____________ (process owner) ____________ ____________ ____________ (team)   Date: ________
