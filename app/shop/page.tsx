'use client'

import { useState } from 'react'
import { SiteNav, SiteFooter } from '@/components/SiteChrome'
import LuminaChat from '@/components/LuminaChat'
import { SHOP_PRODUCTS } from '@/lib/alchemist/site-content'

export default function ShopPage() {
  const [toast, setToast] = useState('')
  const addToCart = (name: string) => {
    setToast(`${name} — checkout coming soon ✨`)
    setTimeout(() => setToast(''), 2600)
  }

  return (
    <main style={{ background: '#000', color: '#F0E8D8', minHeight: '100vh' }}>
      <SiteNav />
      <section style={{ padding: '8rem 2rem 6rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '1rem' }}>The Apothecary</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 5.5vw, 3.4rem)', fontWeight: 300 }}>Sacred Tools for Home</h1>
          <p style={{ color: 'rgba(240,232,216,0.6)', marginTop: '1rem', maxWidth: '520px', margin: '1rem auto 0', lineHeight: 1.8 }}>Physician-curated supplements and rituals to continue your healing between visits.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {SHOP_PRODUCTS.map(p => (
            <div key={p.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,60,0.18)', borderRadius: '6px', padding: '2rem 1.75rem', textAlign: 'center', position: 'relative' }}>
              {p.tag && <div style={{ position: 'absolute', top: '0.9rem', right: '0.9rem', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', color: '#3DC898', border: '1px solid rgba(61,200,152,0.4)', borderRadius: '2px', padding: '0.2rem 0.4rem', textTransform: 'uppercase' }}>{p.tag}</div>}
              <div style={{ width: '58px', height: '58px', color: '#C9963C', margin: '0 auto 1.2rem' }}>
                <svg viewBox="0 0 58 58" fill="none" style={{ width: '100%', height: '100%' }} dangerouslySetInnerHTML={{ __html: p.icon }} />
              </div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#C9963C', marginBottom: '0.5rem' }}>{p.name}</h3>
              <p style={{ fontSize: '0.84rem', color: 'rgba(240,232,216,0.6)', lineHeight: 1.6, marginBottom: '1.2rem', minHeight: '3.2rem' }}>{p.desc}</p>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#F0E8D8', marginBottom: '1.2rem' }}>{p.price}</div>
              <button onClick={() => addToCart(p.name)} style={{ width: '100%', background: 'linear-gradient(135deg, #C9963C, #E4B85A)', color: '#000', border: 'none', borderRadius: '2px', padding: '0.7rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>Add to Cart</button>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', color: 'rgba(240,232,216,0.4)', fontSize: '0.8rem', marginTop: '2.5rem' }}>Secure online checkout coming soon. To order now, contact the Institute at 305-305-3820.</p>
      </section>

      {toast && (
        <div style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 200, background: 'rgba(13,13,13,0.96)', border: '1px solid rgba(201,150,60,0.4)', color: '#F0E8D8', padding: '0.85rem 1.6rem', borderRadius: '30px', fontSize: '0.85rem', letterSpacing: '0.04em', boxShadow: '0 10px 40px rgba(0,0,0,0.6)' }}>{toast}</div>
      )}
      <SiteFooter />
      <LuminaChat />
    </main>
  )
}
