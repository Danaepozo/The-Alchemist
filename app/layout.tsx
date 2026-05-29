import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/components/LanguageProvider'
import TranslateWidget from '@/components/TranslateWidget'

export const metadata: Metadata = {
  title: 'Alchemized BioHealing Institute | Longevity, Biohacking & Regenerative Medicine Miami',
  description: 'Longevity, biohacking and regenerative medicine in Miami where vanguard science meets the soul. Functional medicine, hormone optimization, peptide therapy, IV therapy, NAD+, nervous-system regulation and spiritual healing — integral healing of body & soul. By Holistic Bella Vargas & Dr. Michael J. Meighen, MD.',
  keywords: 'longevity, longevidad, biohacking, biohacking Miami, regenerative medicine, medicina regenerativa, functional medicine, medicina funcional, longevity medicine, medicina de longevidad, hormone optimization, optimización hormonal, peptide therapy, terapia con péptidos, IV therapy Miami, terapia intravenosa, NAD+, healthspan, anti-aging, antienvejecimiento, nervous system regulation, regulación del sistema nervioso, integrative medicine, medicina integrativa, holistic healing, sanación holística, spiritual healing, sanación espiritual, wellness Miami, Coral Gables, Alchemized BioHealing Institute, Holistic Bella, Dr. Michael Meighen, performance medicine, recovery, vitality, healing retreats, retiros de sanación',
  authors: [{ name: 'Dr. Michael J. Meighen, MD' }, { name: 'Holistic Bella Vargas' }],
  openGraph: {
    title: 'Alchemized BioHealing Institute | Longevity & Biohacking Miami',
    description: 'Where vanguard science meets the soul. Longevity, biohacking, regenerative & functional medicine. Healing from within.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Alchemized BioHealing Institute',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalBusiness',
              name: 'Alchemized BioHealing Institute',
              alternateName: 'Holistic Bella & Dr. Michael J. Meighen, MD',
              description: 'Longevity, biohacking and regenerative medicine in Miami where vanguard science meets the soul — functional medicine, hormone optimization, peptide therapy, IV therapy, NAD+, nervous-system regulation and spiritual healing.',
              medicalSpecialty: ['Regenerative Medicine', 'Functional Medicine', 'Longevity', 'Pain Medicine', 'Physical Medicine and Rehabilitation'],
              knowsAbout: ['Longevity', 'Biohacking', 'Regenerative Medicine', 'Functional Medicine', 'Hormone Optimization', 'Peptide Therapy', 'IV Therapy', 'NAD+', 'Nervous System Regulation', 'Healthspan', 'Anti-Aging'],
              areaServed: { '@type': 'City', name: 'Miami' },
              address: { '@type': 'PostalAddress', streetAddress: '2970 Coral Way', addressLocality: 'Miami', addressRegion: 'FL', postalCode: '33145', addressCountry: 'US' },
              telephone: '+1-305-305-3820',
              founder: [
                { '@type': 'Person', name: 'Dr. Michael J. Meighen, MD', jobTitle: 'Co-Founder & Medical Director', knowsAbout: ['Regenerative Medicine', 'Longevity', 'Peptides', 'Hormone Optimization', 'Pain Medicine'] },
                { '@type': 'Person', name: 'Blenedy Vargas (Holistic Bella)', jobTitle: 'Co-Founder & Holistic Director', knowsAbout: ['Spiritual Healing', 'Nervous System Regulation', 'Reiki', 'Ancestral Medicine', 'IV Therapy'] },
              ],
              slogan: 'Where science meets soul. Healing from within.',
            }),
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          {children}
          <TranslateWidget />
        </LanguageProvider>
      </body>
    </html>
  )
}
