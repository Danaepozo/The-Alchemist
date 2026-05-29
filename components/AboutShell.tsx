import Link from 'next/link'

// Self-contained chrome (nav + footer) for the About pages, matching the site's
// existing palette/fonts. Server component — no client JS needed.
export default function AboutShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#000', color: '#F0E8D8', minHeight: '100vh', fontFamily: "'Jost', sans-serif" }}>
      <style>{`
        .abh-card { transition: border-color .25s, background .25s, transform .25s; }
        .abh-card:hover { border-color: rgba(201,150,60,0.55); background: rgba(201,150,60,0.05); }
        .abh-link { color: rgba(240,232,216,0.75); text-decoration: none; font-size: 0.82rem; letter-spacing: 0.08em; transition: color .2s; }
        .abh-link:hover { color: #C9963C; }
        @media (max-width: 680px) { .abh-navlinks { display: none !important; } }
      `}</style>

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(201,150,60,0.2)', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem' }}>
        <Link href="/" aria-label="Alchemized BioHealing Institute — home" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo-alchemized.png" alt="Alchemized BioHealing Institute" style={{ height: 38, width: 'auto' }} />
        </Link>
        <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
          <div className="abh-navlinks" style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
            <Link href="/about/bella" className="abh-link">Bella</Link>
            <Link href="/about/meighen" className="abh-link">Dr. Meighen</Link>
            <Link href="/lyra" className="abh-link">Lyra</Link>
          </div>
          <Link href="/booking" style={{ background: 'linear-gradient(135deg, #C9963C, #E4B85A)', color: '#000', padding: '0.5rem 1.2rem', borderRadius: 2, textDecoration: 'none', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Book</Link>
        </div>
      </nav>

      <main>{children}</main>

      {/* Footer */}
      <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,150,60,0.2)', padding: '3.5rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ maxWidth: 320 }}>
            <img src="/logo-alchemized.png" alt="Alchemized BioHealing Institute" style={{ height: 56, width: 'auto', marginBottom: '1rem' }} />
            <p style={{ fontSize: '0.85rem', color: 'rgba(240,232,216,0.5)', lineHeight: 1.8 }}>Where vanguard science meets the soul. Integral healing of body &amp; soul.</p>
          </div>
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9963C', marginBottom: '1rem' }}>Project Alchemy</div>
              {[['Holistic Bella', '/about/bella'], ['Dr. Meighen', '/about/meighen'], ['Lyra · Soul Space', '/lyra'], ['Retreats', '/retreats']].map(([l, h]) => (
                <Link key={h} href={h} className="abh-link" style={{ display: 'block', marginBottom: '0.6rem' }}>{l}</Link>
              ))}
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9963C', marginBottom: '1rem' }}>Begin</div>
              {[['Soul Assessment', '/assessment'], ['Book a Session', '/booking']].map(([l, h]) => (
                <Link key={h} href={h} className="abh-link" style={{ display: 'block', marginBottom: '0.6rem' }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: '2.5rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid rgba(201,150,60,0.12)', fontSize: '0.72rem', color: 'rgba(240,232,216,0.3)' }}>
          © 2026 Alchemized BioHealing Institute · By Holistic Bella Vargas LLC &amp; Michael J. Meighen, MD
        </div>
      </footer>
    </div>
  )
}
