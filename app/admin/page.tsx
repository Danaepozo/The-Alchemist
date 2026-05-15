'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Booking {
  id: string
  client_id?: string
  service: string
  practitioner: string
  date: string
  time: string
  status: string
  notes?: string
  created_at: string
  clients?: { name: string; email: string }
}

interface Assessment {
  id: string
  created_at: string
  soul_reading?: string
  clients?: { name: string; email: string }
}

// Mock data for when Supabase is not connected
const MOCK_BOOKINGS: Booking[] = [
  { id: 'BK-001', service: 'Soul Assessment', practitioner: 'Bella Vargas', date: '2026-05-15', time: '10:00 AM', status: 'confirmed', created_at: new Date().toISOString(), clients: { name: 'Ana García', email: 'ana@example.com' } },
  { id: 'BK-002', service: 'IV Therapy', practitioner: 'Both Practitioners', date: '2026-05-16', time: '2:00 PM', status: 'pending', created_at: new Date().toISOString(), clients: { name: 'Marcus Williams', email: 'marcus@example.com' } },
  { id: 'BK-003', service: 'Medical Consultation', practitioner: 'Dr. Michael J. Meighen', date: '2026-05-17', time: '11:00 AM', status: 'confirmed', created_at: new Date().toISOString(), clients: { name: 'Sofia Martínez', email: 'sofia@example.com' } },
]

const MOCK_ASSESSMENTS: Assessment[] = [
  { id: 'AS-001', created_at: new Date().toISOString(), soul_reading: 'Sample reading...', clients: { name: 'Ana García', email: 'ana@example.com' } },
  { id: 'AS-002', created_at: new Date(Date.now() - 86400000).toISOString(), clients: { name: 'Marcus Williams', email: 'marcus@example.com' } },
]

const STATUS_COLOR: Record<string, string> = {
  pending: '#E4B85A',
  confirmed: '#3DC898',
  cancelled: '#E06090',
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'assessments'>('overview')
  const [bookings] = useState<Booking[]>(MOCK_BOOKINGS)
  const [assessments] = useState<Assessment[]>(MOCK_ASSESSMENTS)

  const today = new Date().toISOString().split('T')[0]
  const todayBookings = bookings.filter(b => b.date === today)
  const pendingBookings = bookings.filter(b => b.status === 'pending')

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#F0E8D8' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(201,150,60,0.2)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', color: '#C9963C', textDecoration: 'none' }}>☿ THE ALCHEMIST</Link>
        <div style={{ fontSize: '0.8rem', color: 'rgba(240,232,216,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Admin Panel</div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: "Today's Sessions", value: todayBookings.length, color: '#C9963C' },
            { label: 'Pending Confirmations', value: pendingBookings.length, color: '#E4B85A' },
            { label: 'Total Bookings', value: bookings.length, color: '#3DC898' },
            { label: 'Assessments', value: assessments.length, color: '#E06090' },
          ].map(stat => (
            <div key={stat.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,150,60,0.15)', borderRadius: '4px', padding: '1.25rem' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.5)', letterSpacing: '0.05em' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '1.5rem', borderBottom: '1px solid rgba(201,150,60,0.2)' }}>
          {(['overview', 'bookings', 'assessments'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{
                background: 'none', border: 'none', padding: '0.75rem 1.5rem', cursor: 'pointer',
                color: activeTab === tab ? '#C9963C' : 'rgba(240,232,216,0.5)',
                borderBottom: activeTab === tab ? '2px solid #C9963C' : '2px solid transparent',
                fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'capitalize',
                marginBottom: '-1px', transition: 'color 0.2s',
              }}>{tab}</button>
          ))}
        </div>

        {/* Content */}
        {(activeTab === 'overview' || activeTab === 'bookings') && (
          <div>
            {activeTab === 'overview' && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#C9963C', marginBottom: '0.5rem' }}>Upcoming Sessions</h2>
                <p style={{ color: 'rgba(240,232,216,0.5)', fontSize: '0.85rem' }}>Next 7 days</p>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {bookings.map(booking => (
                <div key={booking.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,60,0.15)', borderRadius: '4px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: '0 0 80px' }}>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(240,232,216,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Date</div>
                    <div style={{ fontSize: '0.9rem', color: '#F0E8D8' }}>{booking.date}</div>
                    <div style={{ fontSize: '0.8rem', color: '#C9963C' }}>{booking.time}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: '160px' }}>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(240,232,216,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Client</div>
                    <div style={{ fontSize: '0.9rem' }}>{booking.clients?.name || '—'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.4)' }}>{booking.clients?.email}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: '140px' }}>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(240,232,216,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Service</div>
                    <div style={{ fontSize: '0.85rem' }}>{booking.service}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.4)' }}>{booking.practitioner}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.25rem 0.75rem', border: `1px solid ${STATUS_COLOR[booking.status] || '#C9963C'}`, color: STATUS_COLOR[booking.status] || '#C9963C', borderRadius: '2px' }}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'assessments' && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#C9963C', marginBottom: '0.5rem' }}>Soul Assessments</h2>
              <p style={{ color: 'rgba(240,232,216,0.5)', fontSize: '0.85rem' }}>Leads from the 7D assessment</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {assessments.map(a => (
                <div key={a.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,60,0.15)', borderRadius: '4px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem' }}>{a.clients?.name || 'Anonymous'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.4)' }}>{a.clients?.email}</div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(240,232,216,0.4)' }}>
                    {new Date(a.created_at).toLocaleDateString()}
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.25rem 0.75rem', border: '1px solid rgba(61,200,152,0.5)', color: '#3DC898', borderRadius: '2px' }}>
                      {a.soul_reading ? 'Complete' : 'Partial'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
