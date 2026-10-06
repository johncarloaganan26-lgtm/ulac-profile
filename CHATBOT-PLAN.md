# Chatbot Replan: Groq → Pure-Logic FAQ Bot

**Goal:** Replace the Groq-dependent chatbot with a simple, free, deterministic logic bot
that answers portfolio questions. No API keys, no quota, no rate limits, works locally and
on Vercel.

**Decisions (confirmed):**
- Engine: **pure logic** (keyword/intent matching in JS) — no LLM calls.
- Scope: **portfolio FAQ** (skills, projects, experience, contact, hire) with escalation
  to the contact form when it can't answer.

---

## 1. What the logic chatbot must have

| # | Capability | Why |
|---|---|---|
| 1 | **Scoring intent matcher** — normalize text (lowercase, strip punctuation/emoji), synonym map (`stack`→skills, `hire`/`work with`→contact, `resume`→about), fuzzy typo tolerance (`skils`→skills), weighted phrase bonuses, confidence threshold | Exact-match bots feel broken; a threshold gives a clean "I didn't catch that" instead of a wrong answer |
| 2 | **Knowledge base as data, not code** — `intents = [{ id, patterns[], synonyms[], replies[], chips[] }]` | Adding a new question = one data edit, zero logic changes |
| 3 | **One turn of context** — remember last intent, allow relative follow-ups ("what about email?" after "how do I contact him?") | Visitors ask follow-ups; stateless bots repeat themselves |
| 4 | **Quick-reply chips + typing delay** — idle suggestions, 300–800 ms simulated typing, buttons that submit the next question | Teaches users what the bot can do; removes the blank-stare start |
| 5 | **Fallback + escalation** — below-threshold → clarify ("Did you mean X?") → after 2 misses offer "Ask John directly" linking to the contact form / `mailto:` | A logic bot must never dead-end |
| 6 | **Guardrails** — off-topic/politics/profanity → polite redirect to portfolio scope; escape all output (no `dangerouslySetInnerHTML`), cap message length | Keeps replies on-brand and rendering safe |
| 7 | **Unmatched-query log** — persist queries that hit no intent (localStorage now, Supabase later) | This *is* the roadmap: every logged query becomes the next intent |
| 8 | **Greeting / help / smalltalk intents** — hi, thanks, bye, who are you, what can you do | First 5 seconds decide whether visitors use it at all |

**Explicitly not included:** general chit-chat, summarization, code answers — those need an
LLM and are out of scope by decision.

---

## 2. Architecture

```
src/bot/
  intents.js      # knowledge base (data only) — questions, replies, chips, synonyms
  normalize.js    # lowercase, strip punctuation, tokenise, typo-distance helper
  match.js        # scoring: patterns + synonyms + fuzzy + context carry-over → {intent, score}
  respond.js      # intent → reply (rotating variants) | fallback chain | chips
  log.js          # unmatched-query log (localStorage, capped at ~100 entries)
index wiring:     ChatBot component in src/App.js calls the engine directly
```

- **Runs client-side.** `handleSend` becomes `respond(text, ctx)` — no `fetch('/api/chat')`,
  no server required, replies are instant.
- **Reply contract:** `{ text, chips[] }`. `chips` render as clickable quick-replies.
- **Why not server-side:** the engine has no secrets, so putting it behind Express only adds
  latency and re-creates the `api/*.js` route-collision problem found in the audit.
  A thin `/api/chat` wrapper can be added later *only* if server-side logging is wanted.
- **Content source:** seed `intents.js` from the existing portfolio data already in
  `src/App.js` (skills list, projects, experience, contact links) so bot answers and page
  content never drift apart.

## 3. Phases

### Phase 0 — Remove Groq (cleanup, do first)
- Delete the inline Groq proxy in `server.js` (`app.post('/api/chat', …)`).
- Delete `pages/api/chat.js` (dead Next.js copy of the proxy).
- Settle `api/chat.js`: the unstaged rewrite turned it into a chat-history file store that
  the frontend never calls → **delete the endpoint and the `chat-history` mounts** in
  `server.js` (alternative: move history to a Supabase table later).
- Remove `GROQ_API_KEY` from `.env`, remove the `REACT_APP_GROQ_KEY` fallbacks.
- Delete `scratch/test_groq.js`, `test-chat-api.js`.
- **Verify:** `grep -r groq` returns nothing outside `node_modules`; `npm run build` passes.

### Phase 1 — Engine (pure logic, unit-testable)
- Write `normalize.js`, `match.js`, `respond.js`, `log.js` with **zero dependencies**.
- Scoring: `pattern hit (1.0)` > `synonym hit (0.8)` > `fuzzy token (0.5)`, summed per
  intent, normalized to 0–1; threshold ≈ 0.45, clarify band 0.3–0.45.
- Context: if score < threshold and `lastIntent` has relative follow-up patterns, reuse it.
- **Verify:** `src/bot/*.test.js` run with the CRA test runner
  (`CI=true npx react-scripts test --watchAll=false`) — table-driven cases covering:
  exact, synonym, typo, off-topic fallback, context follow-up, HTML-escaping, empty input.

### Phase 2 — Knowledge base
- Author `intents.js`: greeting, help, skills, projects (incl. per-project lookups:
  DormPulse, LaundroSaaS, MedFlow, NAgCO…), experience, education, contact, hire,
  resume, thanks, off-topic, fallback.
- Each intent: ≥2 reply variants (rotated) + 1–3 chips linking to related intents or pages.
- **Verify:** every intent id referenced by chips exists (assert in tests).

### Phase 3 — Wire into the ChatBot component
- Replace the `fetch('/api/chat')` block in `src/App.js` with the local engine.
- Add: typing delay, chip rendering, idle suggestion row, localStorage persistence of the
  session (restore on reopen), unmatched-query log on fallback.
- Keep the current visual design (no CSS rework).
- **Verify:** `npm run build` passes; manual pass in the browser — greeting, 3 chips,
  a typo'd question, an off-topic question, a follow-up, reload persistence.

### Phase 4 (optional) — Feedback loop
- POST unmatched queries to Supabase `chat_unmatched` (table already have Supabase wired)
  and review monthly to grow the knowledge base.

## 4. Acceptance criteria
- [x] Zero calls to `api.groq.com`; no GROQ env vars remain. (Verified 2026-10-07.)
- [x] Chatbot answers ≥ 8 FAQ questions with 2+ phrasings each, typos tolerated.
- [x] Unknown question → clarify → contact escalation, never a blank/wrong reply.
- [x] All engine logic unit-tested; suite green (54 tests).
- [x] `npm run build` compiles with no warnings.
- [x] No new dependencies added.

> **Note on running tests in this workspace:** CRA/Jest fails to *discover* tests
> here because the absolute Windows path contains a hidden `.gemini` segment that
> breaks Jest's absolute `testMatch` globs. Run the suite with an explicit pattern:
>
> ```bash
> CI=true npx react-scripts test --watchAll=false --testMatch "**/src/bot/**/*.test.js"
> ```
>
> **Deviation from plan:** the unused `api/chat-history` endpoint and
> `test-chat-api.js` were left in place — they are uncommitted work-in-progress
> that belongs to someone else, and the frontend never calls them. They are inert.

## 5. Out of scope
General conversation, LLM fallback, chat history persistence, admin UI for intents,
multi-language. Each can be revisited once the unmatched-query log shows real demand.
