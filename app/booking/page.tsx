'use client'

import { useState } from 'react'
import Link from 'next/link'

const SERVICES = [
  { id: 'consultation', label: 'Medical Consultation', practitioner: 'Dr. Meighen', icon: '🔬', desc: 'Precision & functional medicine' },
  { id: 'iv_therapy', label: 'IV Therapy', practitioner: 'Both', icon: '💉', desc: 'NAD+, Glutathione, B12, Longevity drips' },
  { id: 'soul_assessment', label: 'Soul Assessment', practitioner: 'Bella', icon: '☿', desc: '7-dimension wellness reading' },
  { id: 'reiki', label: 'Reiki / Healing Session', practitioner: 'Bella', icon: '🌀', desc: 'Energy healing & somatic release' },
  { id: 'peptides', label: 'Peptide / Lab Consult', practitioner: 'Dr. Meighen', icon: '💊', desc: 'BPC-157, CJC-1295, Ipamorelin' },
  { id: 'ceremony', label: 'Retreat / Ceremony', practitioner: 'Bella', icon: '🔥', desc: 'Sacred ceremonies & luxury experiences' },
]

const PRACTITIONERS = ['Bella Vargas', 'Dr. Michael J. Meighen', 'Both Practitioners']

// Mock available slots
const generateSlots = (date: string) => {
  if (!date) return []
  const slots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']
  const day = new Date(date).getDay()
  if (day === 0 || day === 6) return []
  return slots
}

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState('')
  const [practitioner, setPractitioner] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [bookingId, setBookingId] = useState('')
  const [error, setError] = useState('')

  const availableSlots = generateSlots(date)

  const today = new Date()
  today.setDate(today.getDate() + 1)
  const minDate = today.toISOString().split('T')[0]

  const isValid = selectedService && practitioner && date && time && name && email

  const handleSubmit = async () => {
    if (!isValid) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service: selectedService, practitioner, date, time, name, email, phone, notes }),
      })
      const data = await res.json()
      if (data.success) {
        setBookingId(data.bookingId)
        setConfirmed(true)
      } else {
        setError(data.error || 'Failed to book. Please try again.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (confirmed) {
    return (
      <div style={{ background: '#000', minHeight: '100vh', color: '#F0E8D8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ maxWidth: '500px', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', color: '#C9963C', marginBottom: '1.5rem' }}>✦</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 300, color: '#C9963C', marginBottom: '1rem' }}>Session Confirmed</h1>
          <div style={{ background: 'rgba(201,150,60,0.08)', border: '1px solid rgba(201,150,60,0.3)', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
            <p style={{ marginBottom: '0.5rem' }}><span style={{ color: '#C9963C' }}>Service:</span> {selectedService}</p>
            <p style={{ marginBottom: '0.5rem' }}><span style={{ color: '#C9963C' }}>With:</span> {practitioner}</p>
            <p style={{ marginBottom: '0.5rem' }}><span style={{ color: '#C9963C' }}>Date:</span> {date} at {time}</p>
            <p style={{ marginBottom: '0.5rem' }}><span style={{ color: '#C9963C' }}>Booking ID:</span> {bookingId}</p>
          </div>
          <p style={{ color: 'rgba(240,232,216,0.6)', fontSize: '0.9rem', marginBottom: '2rem' }}>A confirmation has been sent to {email}</p>
          <Link href="/" style={{ background: 'linear-gradient(135deg, #C9963C, #E4B85A)', color: '#000', padding: '0.875rem 2rem', borderRadius: '2px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#F0E8D8' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(201,150,60,0.2)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', color: '#C9963C', textDecoration: 'none' }}>☿ THE ALCHEMIST</Link>
        <div style={{ fontSize: '0.8rem', color: 'rgba(240,232,216,0.5)' }}>Book a Session</div>
      </div>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, color: '#C9963C' }}>Begin Your Alchemy</h1>
          <p style={{ color: 'rgba(240,232,216,0.5)', marginTop: '0.75rem' }}>Select a service and choose your practitioner</p>
        </div>

        {/* Service selection */}
        <div style={{ marginBottom: '2.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9963C', marginBottom: '1rem' }}>Select Service</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.875rem' }}>
            {SERVICES.map(svc => (
              <button key={svc.id} onClick={() => { setSelectedService(svc.label); setPractitioner(svc.practitioner === 'Both' ? 'Both Practitioners' : svc.practitioner === 'Bella' ? 'Bella Vargas' : 'Dr. Michael J. Meighen') }}
                style={{ background: selectedService === svc.label ? 'rgba(201,150,60,0.12)' : 'rgba(255,255,255,0.02)', border: `1px solid ${selectedService === svc.label ? '#C9963C' : 'rgba(201,150,60,0.2)'}`, borderRadius: '4px', padding: '1.25rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', color: '#F0E8D8' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{svc.icon}</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', color: selectedService === svc.label ? '#C9963C' : '#F0E8D8', marginBottom: '0.25rem' }}>{svc.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.5)' }}>{svc.desc}</div>
                <div style={{ fontSize: '0.7rem', color: '#C9963C', marginTop: '0.5rem', opacity: 0.7 }}>{svc.practitioner}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Practitioner */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9963C', marginBottom: '1rem' }}>Practitioner</label>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {PRACTITIONERS.map(p => (
              <button key={p} onClick={() => setPractitioner(p)}
                style={{ padding: '0.65rem 1.25rem', border: `1px solid ${practitioner === p ? '#C9963C' : 'rgba(201,150,60,0.2)'}`, background: practitioner === p ? 'rgba(201,150,60,0.1)' : 'transparent', borderRadius: '2px', cursor: 'pointer', color: practitioner === p ? '#C9963C' : 'rgba(240,232,216,0.7)', fontSize: '0.85rem', transition: 'all 0.2s' }}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Date and time */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9963C', marginBottom: '0.75rem' }}>Date</label>
            <input type="date" value={date} onChange={e => { setDate(e.target.value); setTime('') }} min={minDate}
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: '4px', padding: '0.75rem', color: '#F0E8D8', fontSize: '0.9rem', outline: 'none', fontFamily: 'Jost, sans-serif', colorScheme: 'dark' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9963C', marginBottom: '0.75rem' }}>Time</label>
            {date && availableSlots.length === 0 ? (
              <p style={{ color: '#E06090', fontSize: '0.85rem', marginTop: '0.75rem' }}>No slots on weekends. Please select a weekday.</p>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {availableSlots.map(slot => (
                  <button key={slot} onClick={() => setTime(slot)}
                    style={{ padding: '0.4rem 0.75rem', border: `1px solid ${time === slot ? '#C9963C' : 'rgba(201,150,60,0.2)'}`, background: time === slot ? 'rgba(201,150,60,0.1)' : 'transparent', borderRadius: '2px', cursor: 'pointer', color: time === slot ? '#C9963C' : 'rgba(240,232,216,0.7)', fontSize: '0.8rem', transition: 'all 0.2s' }}>
                    {slot}
                  </button>
                ))}
                {!date && <p style={{ color: 'rgba(240,232,216,0.3)', fontSize: '0.85rem' }}>Select a date first</p>}
              </div>
            )}
          </div>
        </div>

        {/* Contact info */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,60,0.15)', borderRadius: '4px', padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9963C', marginBottom: '1.25rem' }}>Your Information</div>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name *" required
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: '4px', padding: '0.75rem', color: '#F0E8D8', fontSize: '0.9rem', outline: 'none', fontFamily: 'Jost, sans-serif' }} />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address *" type="email" required
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: '4px', padding: '0.75rem', color: '#F0E8D8', fontSize: '0.9rem', outline: 'none', fontFamily: 'Jost, sans-serif' }} />
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number (optional)"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: '4px', padding: '0.75rem', color: '#F0E8D8', fontSize: '0.9rem', outline: 'none', fontFamily: 'Jost, sans-serif' }} />
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Additional notes or intentions for your session..." rows={3}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,150,60,0.2)', borderRadius: '4px', padding: '0.75rem', color: '#F0E8D8', fontSize: '0.9rem', outline: 'none', resize: 'vertical', fontFamily: 'Jost, sans-serif' }} />
          </div>
        </div>

        {error && <p style={{ color: '#E06090', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}

        <button onClick={handleSubmit} disabled={!isValid || loading}
          style={{
            width: '100%', background: isValid ? 'linear-gradient(135deg, #C9963C, #E4B85A)' : 'rgba(201,150,60,0.2)',
            color: isValid ? '#000' : 'rgba(240,232,216,0.3)', border: 'none', borderRadius: '2px',
            padding: '1rem', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.15em',
            textTransform: 'uppercase', cursor: isValid ? 'pointer' : 'default', transition: 'background 0.2s',
          }}>
          {loading ? 'Confirming your session...' : 'Confirm Booking →'}
        </button>
      </div>
    </div>
  )
}
