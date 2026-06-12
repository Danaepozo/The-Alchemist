'use client'

import Link from 'next/link'
import { SiteNav, SiteFooter } from '@/components/SiteChrome'
import LuminaChat from '@/components/LuminaChat'

export default function TeamPage() {
  return (
    <main style={{ background: '#000', color: '#F0E8D8', minHeight: '100vh' }}>
      <SiteNav />
      <section style={{ padding: '8rem 2rem 4rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(201,150,60,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C9963C', textTransform: 'uppercase', marginBottom: '1rem' }}>Our Team · Our Story</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 6vw, 3.6rem)', fontWeight: 300, lineHeight: 1.15 }}>Two Healers. One Practice.</h1>
          <p style={{ color: 'rgba(240,232,216,0.7)', marginTop: '1.25rem', lineHeight: 1.8, fontSize: '1.02rem' }}>
            Alchemized BioHealing Institute was not born in a boardroom. It was born from two very different stories that arrived at the same truth: <em>healing is whole only when science and soul move together.</em> Bella brings the breath, the ritual, the nervous system and the spirit. Michael brings the labs, the hormones, the regenerative science. Apart, each is powerful. <strong style={{ color: '#C9963C' }}>Together, they are the alchemy</strong> — body &amp; soul, transmuted into vitality.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '2rem', maxWidth: '1100px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Bella Vargas */}
          <div style={{ flex: '1', minWidth: '320px', maxWidth: '500px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: '4px', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #E06090, #C9963C)' }} />
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌿</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 400, color: '#C9963C', marginBottom: '0.25rem' }}>Blenedy Vargas · &ldquo;Holistic Bella&rdquo;</h2>
            <p style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E06090', marginBottom: '1.25rem' }}>Co-Founder &amp; Holistic Director</p>
            <p style={{ fontSize: '0.92rem', color: 'rgba(240,232,216,0.72)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              Bella learned healing the way many women do — holding others long before she learned to hold herself. From theology and clinical psychology to nursing and IV therapy, she wove a rare bridge between worlds, then walked it deeper: studying directly with shamans and indigenous communities in Guatemala, Mexico and Colombia. A Reiki Master and Harvard-certified happiness coach, she became a pioneer of <strong style={{ color: '#E06090' }}>homeopathic, preservative-free IV therapy</strong> — and of a philosophy that has guided everything since: <em>where science and spirit meet.</em>
            </p>
            <ul style={{ listStyle: 'none', fontSize: '0.9rem', lineHeight: 2, color: 'rgba(240,232,216,0.8)' }}>
              {['✦ Harvard Certified Happiness & Life Coach', '✦ Holistic Health Practitioner + Reiki Master', '✦ Nursing Degree + BS Health Services Admin', '✦ Certified: Neuroscience & Chakra Cleansing', '✦ Herbalist & Natural Medicine Practitioner', '✦ Ancestral Medicine: Guatemala · Mexico · Colombia', '✦ Specialist for clients afraid of needles 💉'].map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <blockquote style={{ marginTop: '2rem', padding: '1.2rem', borderLeft: '2px solid #E06090', background: 'rgba(224,96,144,0.05)', fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontStyle: 'italic', color: 'rgba(240,232,216,0.9)', lineHeight: 1.7 }}>
              &ldquo;Known for making even the most nervous clients end up laughing during their IV.&rdquo; ✨
            </blockquote>
            <Link href="/about/bella" style={{ display: 'inline-block', marginTop: '1.5rem', color: '#E06090', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Read Bella&rsquo;s full story →</Link>
          </div>
          {/* Dr. Meighen */}
          <div style={{ flex: '1', minWidth: '320px', maxWidth: '500px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: '4px', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #3DC898, #C9963C)' }} />
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔬</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 400, color: '#C9963C', marginBottom: '0.25rem' }}>Dr. Michael J. Meighen, MD</h2>
            <p style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3DC898', marginBottom: '1.25rem' }}>Co-Founder &amp; Medical Director</p>
            <p style={{ fontSize: '0.92rem', color: 'rgba(240,232,216,0.72)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              Michael learned medicine by becoming the patient. A fracture at 13 ended his athletic career and opened the door to a life in medicine; two orthopedic surgeries and six months in and out of hospitals taught him what it is to receive hard news — and that <em>the body was made to move.</em> Board-certified in Physical Medicine &amp; Rehabilitation and Pain Medicine, with 25+ years and the #1 Amazon best-seller <strong style={{ color: '#3DC898' }}>&ldquo;A New You&rdquo;</strong>, he now blends regenerative orthopedics, hormone optimization, peptides and longevity science — empowering the body to heal itself. <em>Live limitless.</em>
            </p>
            <ul style={{ listStyle: 'none', fontSize: '0.9rem', lineHeight: 2, color: 'rgba(240,232,216,0.8)' }}>
              {['✦ Precision Medicine & Functional Medicine', '✦ Hormone Optimization Therapy', '✦ Peptide Therapy: BPC-157, CJC-1295, Ipamorelin', '✦ Longevity & Performance Medicine', '✦ Nervous System Regulation (cellular level)', '✦ Pain Resolution & Trauma Physiology', '✦ Biohacking & Human Optimization', "✦ Men's Health & Regenerative Wellness"].map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <blockquote style={{ marginTop: '2rem', padding: '1.2rem', borderLeft: '2px solid #3DC898', background: 'rgba(61,200,152,0.05)', fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontStyle: 'italic', color: 'rgba(240,232,216,0.9)', lineHeight: 1.7 }}>
              &ldquo;Root cause medicine — finding and resolving the origin. Science meets spirit.&rdquo;
            </blockquote>
            <Link href="/about/meighen" style={{ display: 'inline-block', marginTop: '1.5rem', color: '#3DC898', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Read Dr. Meighen&rsquo;s full story →</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
      <LuminaChat />
    </main>
  )
}
