// Generates public/og-image.png (1200x630) — dark-luxury OG card with the Vesica Piscis + logo.
const sharp = require('sharp')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const W = 1200, H = 630

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="sage" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3DC898" stop-opacity="0.45"/>
      <stop offset="55%" stop-color="#3DC898" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#3DC898" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="rose" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#E06090" stop-opacity="0.45"/>
      <stop offset="55%" stop-color="#E06090" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#E06090" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gold" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FCEBC0" stop-opacity="0.85"/>
      <stop offset="40%" stop-color="#E4B85A" stop-opacity="0.40"/>
      <stop offset="100%" stop-color="#C9963C" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="lens"><circle cx="540" cy="318" r="140"/></clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="#000000"/>

  <!-- Vesica Piscis — gold almond (union of masculine + feminine) kept fully visible -->
  <circle cx="540" cy="318" r="165" fill="url(#sage)"/>
  <circle cx="660" cy="318" r="165" fill="url(#rose)"/>
  <circle cx="540" cy="318" r="140" stroke="#3DC898" stroke-width="1.5" fill="none" opacity="0.55"/>
  <circle cx="660" cy="318" r="140" stroke="#E06090" stroke-width="1.5" fill="none" opacity="0.55"/>
  <g clip-path="url(#lens)"><circle cx="660" cy="318" r="140" fill="url(#gold)"/></g>
  <path d="M600 178 A140 140 0 0 1 600 458 A140 140 0 0 1 600 178 Z" stroke="#E4B85A" stroke-width="1.6" fill="none" opacity="0.9"/>

  <!-- Tagline -->
  <text x="600" y="528" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="42" font-style="italic" fill="#E4B85A">Where science meets soul.</text>
  <text x="600" y="564" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="22" fill="#F0E8D8" letter-spacing="3" opacity="0.85">Healing from within.</text>
  <text x="600" y="598" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#C9963C" letter-spacing="6" opacity="0.85">LONGEVITY &amp; REGENERATIVE MEDICINE · MIAMI</text>

  <!-- Gold hairline frame -->
  <rect x="22" y="22" width="${W - 44}" height="${H - 44}" fill="none" stroke="#C9963C" stroke-width="1" opacity="0.4"/>
</svg>`

async function run() {
  const bg = await sharp(Buffer.from(svg)).png().toBuffer()
  const logo = await sharp(path.join(ROOT, 'public', 'logo-alchemized.png'))
    .resize({ width: 230 })
    .toBuffer()
  const lm = await sharp(logo).metadata()
  const left = Math.round((W - (lm.width || 230)) / 2)
  const top = 36 // small, above the circles — keeps the gold union visible
  await sharp(bg)
    .composite([{ input: logo, left, top }])
    .png()
    .toFile(path.join(ROOT, 'public', 'og-image.png'))
  console.log('og-image.png written:', W + 'x' + H, '| logo', lm.width + 'x' + lm.height, 'at', left + ',' + top)
}
run().catch(e => { console.error(e); process.exit(1) })
