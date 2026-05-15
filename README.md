# ☿ The Alchemist Miami

**Where Science meets Spirit** — Integrative wellness platform for Bella Vargas & Dr. Michael J. Meighen in Miami.

Built by **Danae Pozo · Blue Ocean AI Systems · Miami 2026**

---

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4**
- **Supabase** (PostgreSQL database)
- **Anthropic API** (Lumina AI concierge + Soul Readings)
- **Resend** (transactional emails)
- **Stripe** (memberships & payments)

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Edit `.env.local` and fill in your API keys (see below).

### 3. Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
the-alchemist/
├── app/
│   ├── page.tsx              <- Main landing page (10 sections)
│   ├── assessment/page.tsx   <- Soul Assessment 7D
│   ├── booking/page.tsx      <- Booking system
│   ├── admin/page.tsx        <- Admin dashboard
│   └── api/
│       ├── lumina/route.ts       <- Lumina AI endpoint
│       ├── soul-reading/route.ts <- Soul Reading generator
│       └── booking/route.ts      <- Booking + emails
├── components/
│   └── LuminaChat.tsx        <- Floating AI chat widget
├── lib/
│   ├── supabase.ts
│   ├── anthropic.ts
│   └── resend.ts
├── supabase/
│   └── schema.sql            <- Database schema
└── .env.local                <- Environment variables (fill in)
```

---

## Connecting External Services (in order)

### 1. Supabase (Database)
1. Go to supabase.com -> New Project
2. Copy Project URL and anon public key -> paste in `.env.local`
3. Copy service_role secret -> paste in `.env.local`
4. Go to SQL Editor -> paste contents of `supabase/schema.sql` -> Run

### 2. Anthropic (Lumina AI + Soul Readings)
1. Go to console.anthropic.com -> API Keys
2. Create key -> paste as `ANTHROPIC_API_KEY` in `.env.local`

### 3. Resend (Emails)
1. Go to resend.com -> API Keys -> paste as `RESEND_API_KEY`
2. Verify domain `thealchemist.miami` in Resend -> Domains

### 4. Stripe (Memberships)
1. Go to dashboard.stripe.com -> Developers -> API Keys
2. Copy Secret key and Publishable key -> paste in `.env.local`

---

## Deploy on Vercel

```bash
npm install -g vercel
vercel
vercel domains add thealchemist.miami
```

In Vercel Dashboard -> Settings -> Environment Variables -> add all from `.env.local`

---

## Pages & Routes

| URL | Description |
|-----|-------------|
| `/` | Main landing page |
| `/assessment` | Soul Assessment 7D |
| `/booking` | Book a session |
| `/admin` | Admin dashboard |
| `/api/lumina` POST | Lumina AI chat |
| `/api/soul-reading` POST | Generate Soul Reading |
| `/api/booking` POST | Create booking + send emails |

---

## Design Tokens

| Token | Value |
|-------|-------|
| Background | `#000000` |
| Foreground | `#F0E8D8` |
| Gold | `#C9963C` |
| Sage | `#3DC898` |
| Rose | `#E06090` |

Fonts: **Cormorant Garamond** (headings) + **Jost** (body)

---

*Built by Danae Pozo · Blue Ocean AI Systems · Miami 2026*
