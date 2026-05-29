# ⭐ START HERE — ALCHEMIZED BIOHEALING (web pública + Lumina + Lyra)
Web pública del dúo Bella Vargas + Dr. Meighen, con los agentes Lumina (chat) y Lyra (espacio espiritual de Bella) y el Soul Assessment.
**Este repo es SOLO la web pública.** El Orion clínico del Dr. Meighen es OTRO repo/proyecto (C:\Projects\orion) — aquí solo se enlaza ("Meet Orion"). El Orion de Danae (C:\Projects\orion-template) no tiene nada que ver.

- **Live:** https://the-alchemist-danae.netlify.app (pública, bilingüe EN/ES) · **Netlify site:** the-alchemist-danae · GitHub: Danaepozo/The-Alchemist
- **Supabase:** `pjmhtekeyymftpwzepca` (compartido con el Orion del doctor)
- **Deploy:** `netlify deploy --prod --build` (`rm -rf .next` antes si el build falla por tipos)
- **Agentes:** Lumina (`components/LuminaChat.tsx` + `app/api/lumina`), Lyra (`/lyra` + `lib/alchemist/lyra-knowledge-base.ts` + `app/api/lyra`), Soul Assessment (`/assessment` + `app/api/soul-reading`).
- **Catálogo único:** `lib/alchemist/catalog.ts` (membresías/IVs/terapias). Logo: `public/logo-alchemized.png`.
- Páginas: home, /about/bella, /about/meighen, /retreats, /booking. Detalle completo: memoria `project_alchemist.md`.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# The Alchemist — Project Rules (Dr. Meighen Edition)

> Derived from the v3.0 Master spec, **filtered by Danae's decisions (2026-05-21)**. Where the spec conflicts with what is already live, the live product wins. Live URL: https://the-alchemist-danae.netlify.app

## What this is
- **The Alchemist** = the public-facing, *pre-conversion* AI recommender / experience.
- It is one half of a dual system. The other half is **Orion** (post-conversion clinical/operational tool for the doctor & staff) — a **separate repo** at `C:\Projects\orion`, routes under `/orion`. **Both apps share the SAME Supabase database.**
- Do **not** merge the two products or make them identical — they have distinct jobs. (Orion's old routes used to live here and were removed; do not re-add them.)

## Brand anchor — keep the FUSION
The brand is the digital extension of **two** practitioners, woven together — do NOT reduce it to one:
- **Dr. Michael J. Meighen, MD** — double board-certified, #1 Amazon best-seller ("A New You"), one of ~30 DiscSeel®-trained providers worldwide, 25+ yrs, regenerative/peptides/hormones. Clinical & functional-medicine lens.
- **Bella Vargas** — spiritual/energy lens (Family Constellations, Biodescodificación, chakras, Kabbalah, Jungian shadow, etc.). **Keep this layer** — it is core to the live Alchemist, not to be stripped.

**Doctor contact facts (use these in the app):** livelimitlessmd.com · 305-305-3820 · 2970 Coral Way, Miami, FL 33145 · Institute name: Alchemized Biohealing Institute.

## Visual brand — CURRENT is authoritative (ignore the spec's old tokens)
- Colors: black background `#000000`, gold `#C9963C` (+ light `#E4B85A`), sage/teal `#3DC898` (Dr. Meighen), rose `#E06090` (Bella), cream foreground `#F0E8D8`.
- Fonts: **Cormorant Garamond** (headings) + **Jost** (body).
- ⚠️ The Master spec listed navy `#0D1B3E` / Montserrat / Playfair — **DO NOT use these.** They are from an older direction Danae rejected.

## Voice & vocabulary (PUBLIC / premium — applies to The Alchemist only)
- ✅ Use: "client", "optimization", "protocol", "investment", "journey", "vitality", "healthspan".
- ❌ Avoid (public copy): "patient", "treatment", "prescription", "cost", "cheap", "cure".
- Tone: premium, scientific, warm, **bilingual ES/EN** (native, from the first commit). Validate before challenging.
- (Note: this premium-vocabulary rule does NOT apply to Orion — Orion stays clinical.)

## The 5 philosophical pillars (embody in copy & prompts)
1. The current medical system is broken. 2. Proactive, not reactive medicine. 3. The client is an active participant. 4. Evidence-based, beyond allopathic. 5. Maximize healthspan & vitality, not just lifespan.

## Evidence requirement
When educating, be able to cite real science (Harvard/Sinclair Lab, Mayo Clinic Proceedings, NIH/PubMed, Frontiers in Aging, Kuopio Sauna study, Women's Health Initiative, etc.). The catalog should carry citations so the recommender can quote them in real time.

## Hard rules (business & safety)
1. **Never diagnose or prescribe from the AI** — always escalate to Dr. Meighen.
2. **Always** show an appropriate medical disclaimer.
3. **Do not hardcode prices/catalog in components** — they must come from a data source (catalog). (Today memberships/services are hardcoded in `app/page.tsx`; migrating them to a catalog is pending — see below.)
4. Validate booking constraints strictly (e.g. if a "same-day-for-both" membership rule applies).

## Current state & pending (so future work is coherent)
- **Catalog is now centralized in `lib/alchemist/catalog.ts`** (single source of truth). It holds the REAL offerings transcribed from the official Centner Wellness / Alchemized flyers (2026-05): institute info, the membership/package cards, the 9 bio-energetic therapies, the 4 holistic protocols, and the "12-in-30-days = 30%" offer. **Do not hardcode prices elsewhere — import from here.**
- **Real membership model (replaces the old 5 spiritual tiers):**
  - Stress Relief & High Frequency Package — **$333** one-time (1 person, entry experience)
  - Loving Myself Membership — **$444/mo** (1 person · 4 visits · 3-month min)
  - Soulmates Dates Membership — **$777/mo** (2 people · same-day visits · 3-month min)
  - My Sacred Family Wellness Membership — **$1,111/mo** (4 people)
  - All members get 30% off all services. `app/page.tsx` #memberships now maps `membershipCards` from the catalog.
- **`featured` card** = Loving Myself (a chosen default — adjust if Danae wants another highlighted).
- AI prompts: Lumina lives in `lib/alchemist/soul-knowledge-base.ts` (+ `app/api/lumina/route.ts`). The Lumina system prompt was updated to the real prices + therapies/protocols. Stale "$199 First Alchemy" CTAs in `lib/i18n/{en,es}.ts` and `app/api/soul-reading/route.ts` were changed to price-agnostic "Begin Your Journey / Comienza Tu Viaje". Supabase: `lib/supabase.ts`; schema in `supabase/schema.sql`.
- **Therapies, protocols & science are now RENDERED** on `app/page.tsx`: sections `#therapies` (9 modalities w/ "Evidence-based" badges), `#protocols` (4 holistic protocols + the 12-in-30 offer), and `#science` (citations + medical disclaimer). All read from `catalog.ts`.
- **Evidence citations:** `catalog.ts` now has a `citations[]` array with 4 REAL, web-verified studies (Kuopio sauna / JAMA 2015; Floatation-REST / PLOS ONE 2018; photobiomodulation / Hamblin 2017; Hallmarks of Aging / Cell 2023), mapped to therapies via `appliesTo`. Lumina's prompt also carries them. **RULE: never fabricate citations** — only add real, verified studies (the spec's promised 25+ never arrived). Therapies without solid evidence (EES, BioCharger) intentionally carry NO citation.
- **Open questions for Danae:** (a) Did the old "$199 dual Bella+Meighen consultation" survive? It's not on the flyers — currently the AI treats the free Soul Assessment as the entry, then the $333 package. (b) Orion does NOT yet consume this catalog (only The Alchemist does).
