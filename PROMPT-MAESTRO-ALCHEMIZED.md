# 🧪 PROMPT MAESTRO — Alchemized BioHealing Institute (web pública)

> Pega este bloque como contexto en cualquier IA/sesión para que entienda
> exactamente qué es la web, cómo se ve, qué tiene y cómo está configurada.
> Fiel al código real (no inventado). Última verificación: 2026-05-30.

---

## 1) Qué es
**Alchemized BioHealing Institute** — web pública, premium y **bilingüe (EN/ES)**, de
un instituto de longevidad, biohacking y medicina regenerativa en Miami. Es la
**fusión de dos practicantes** (no reducir a uno):
- **Dr. Michael J. Meighen, MD** — doble board-certified, best-seller #1 en Amazon
  ("A New You"), uno de ~30 proveedores DiscSeel® del mundo, 25+ años. Lente
  clínico/funcional: medicina regenerativa, péptidos, hormonas, manejo del dolor.
- **Holistic Bella Vargas** — lente espiritual/energético: Constelaciones
  Familiares, Biodescodificación, chakras, Kabbalah, sombra junguiana, Reiki,
  medicina ancestral, regulación del sistema nervioso.

**Tagline:** *"Where science meets soul. Healing from within."*
**Es SOLO la web pública (pre-conversión).** El Orion clínico del doctor es un
proyecto aparte; aquí solo se enlaza ("Meet Orion").

**Datos reales del negocio:** Alchemized Biohealing Institute · 2970 Coral Way,
Miami, FL 33145 · 305-305-3820 · livelimitlessmd.com · Live:
https://the-alchemist-danae.netlify.app

---

## 2) Identidad visual (AUTORITATIVA — ignorar tokens viejos navy/Montserrat)
**Paleta (de `app/globals.css`):**
- Fondo negro `#000000`
- Oro `#C9963C` (claro `#E4B85A`, shimmer hasta `#F5D78E`)
- Sage/teal `#3DC898` → acento del **Dr. Meighen** (ciencia)
- Rosa `#E06090` → acento de **Bella** (espíritu)
- Texto crema `#F0E8D8` · tarjetas `#0D0D0D` · borde oro `rgba(201,150,60,.3)`

**Tipografía:**
- Títulos: **Cormorant Garamond** (serif elegante)
- Cuerpo: **Jost** (sans ligera)

**Estilo:** lujo oscuro, etéreo, "alquímico". Fondo negro con dorado, mucho aire,
texto con *gold shimmer* animado, secciones que aparecen al hacer scroll
(`section-reveal`), scrollbar dorado fino, scroll suave.
**Animaciones (CSS):** `breathe`, `logoFloat` (logo flota sin marco), `orbit`/`orbit2`,
`pulse-ring`, `marquee`, `fadeInUp`, `shimmer`, `spin-slow`.

---

## 3) Qué tiene actualmente
**Páginas / rutas:**
- `/` (home) con secciones ancladas: `#about`, `#team`, `#memberships`,
  `#services`, `#therapies`, `#protocols`, `#science`, `#lyra`, `#orion`.
- `/about/bella` y `/about/meighen` (perfiles del dúo)
- `/assessment` — **Soul Assessment/Reading** (entrada gratuita, recomendador IA)
- `/booking` — reserva (API `/api/booking`, valida reglas; ej. membresías "mismo día")
- `/lyra` — **espacio espiritual de Bella** (agente IA propio)
- `/admin` — panel interno
- `/orion/*` — módulo clínico enlazado (login, patients, protocols, intelligence,
  alerts, reference) — **conceptualmente separado**, no fusionar con la web pública.

**3 agentes de IA (Anthropic Claude):**
- **Lumina** — chat recomendador premium. `components/LuminaChat.tsx` +
  `app/api/lumina/route.ts`, conocimiento en `lib/alchemist/soul-knowledge-base.ts`.
- **Lyra** — espacio espiritual de Bella. `/lyra` + `app/api/lyra` +
  `lib/alchemist/lyra-knowledge-base.ts`.
- **Soul Reading** — `/assessment` + `app/api/soul-reading`.

**Catálogo = fuente única de verdad** (`lib/alchemist/catalog.ts`, NO hardcodear
precios en componentes):
- **Membresías:** Stress Relief & High Frequency **$333** (1 pago, entrada) ·
  Loving Myself **$444/mes** (1 persona, 4 visitas, *featured*) · Soulmates Dates
  **$777/mes** (2 personas, mismo día) · My Sacred Family **$1,111/mes** (4 personas).
  Todos los miembros: **30% off** en servicios.
- **9 terapias bio-energéticas**, **4 protocolos holísticos**, oferta
  "**12 en 30 días = 30%**", menú de IVs y care packages.
- **Citas científicas reales** (`citations[]`): Kuopio sauna/JAMA 2015 ·
  Floatation-REST/PLOS ONE 2018 · fotobiomodulación/Hamblin 2017 · Hallmarks of
  Aging/Cell 2023. **REGLA: nunca inventar citas**, solo estudios verificados.

---

## 4) Voz y reglas de marca
**Tono:** premium, científico, cálido, bilingüe ES/EN nativo (validar antes de retar).
- ✅ Usar: *client, optimization, protocol, investment, journey, vitality, healthspan*.
- ❌ Evitar (copy público): *patient, treatment, prescription, cost, cheap, cure*.
- (Esta regla de vocabulario premium es SOLO para la web pública, no para Orion.)

**5 pilares filosóficos:** 1) el sistema médico actual está roto · 2) medicina
proactiva, no reactiva · 3) el cliente es participante activo · 4) basado en
evidencia, más allá de lo alopático · 5) maximizar healthspan y vitalidad, no solo
años de vida.

**Reglas duras (negocio/seguridad):**
1. La IA **nunca diagnostica ni receta** → siempre escala al Dr. Meighen.
2. Mostrar **siempre** un disclaimer médico apropiado.
3. Precios/catálogo **desde `catalog.ts`**, nunca hardcodeados en componentes.
4. Validar estrictamente las reglas de reserva.

---

## 5) Cómo está configurada (stack y deploy)
- **Framework:** Next.js **16.2.6** (App Router) + React **19.2** + TypeScript.
  ⚠️ Es un Next con breaking changes; revisar `node_modules/next/dist/docs/` antes
  de escribir código.
- **Estilos:** Tailwind CSS **v4** (config por CSS con `@theme` en `globals.css`,
  vía `@tailwindcss/postcss`). Sin `tailwind.config.js`.
- **Base de datos / auth:** **Supabase** (proyecto `pjmhtekeyymftpwzepca`,
  **compartido con el Orion del doctor**). `lib/supabase.ts`, esquema en
  `supabase/schema.sql`.
- **IA:** `@anthropic-ai/sdk` (`lib/anthropic.ts`) para Lumina/Lyra/Soul Reading.
- **Pagos:** Stripe (`@stripe/stripe-js` + `stripe`).
- **Email:** Resend (`lib/resend.ts`).
- **Bilingüe:** `components/LanguageProvider.tsx` + `lib/i18n/{en,es}.ts` +
  `TranslateWidget`.
- **SEO:** metadata + JSON-LD `MedicalBusiness` (founders, dirección, teléfono) en
  `app/layout.tsx`; keywords longevidad/biohacking/Miami EN+ES.
- **Deploy:** **Netlify** site `the-alchemist-danae` · GitHub `Danaepozo/The-Alchemist`.
  Comando: `netlify deploy --prod --build` (si el build falla por tipos: `rm -rf .next` antes).
- **Código:** `C:\Users\danae\Proyectos-Danae\the-alchemist`.

---

## 6) Pendientes conocidos
- Migrar las membresías que aún viven en `app/page.tsx` 100% al catálogo (en proceso).
- Definir si sobrevive la consulta dual "$199 Bella+Meighen" (no está en los flyers;
  hoy la entrada es el Soul Assessment gratis → luego el paquete de $333).
- Orion aún **no** consume `catalog.ts` (solo la web pública lo usa).

---

### Cómo usar este prompt
Para rediseñar, ampliar o crear contenido nuevo de la web, pega las secciones 1–5
y di qué quieres. Mantén SIEMPRE: paleta (negro/oro/sage/rosa), fuentes
(Cormorant Garamond + Jost), la fusión ciencia+espíritu, el bilingüe EN/ES, y las
reglas duras de seguridad.
