import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/components/LanguageProvider'
import TranslateWidget from '@/components/TranslateWidget'

const SITE_URL = 'https://the-alchemist-danae.netlify.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Alchemized BioHealing Institute | Longevity & Regenerative Medicine Miami',
    template: '%s | Alchemized BioHealing Institute',
  },
  description: 'Longevity, biohacking and regenerative medicine in Miami (Coral Gables) where vanguard science meets the soul. Functional medicine, hormone optimization, peptide therapy, IV therapy, NAD+, nervous-system regulation and spiritual healing — integral healing of body & soul. By Holistic Bella Vargas & Dr. Michael J. Meighen.',
  keywords: ['longevity Miami', 'longevidad Miami', 'biohacking Miami', 'regenerative medicine Miami', 'medicina regenerativa Miami', 'functional medicine Miami', 'medicina funcional', 'longevity medicine', 'medicina de longevidad', 'hormone optimization', 'optimización hormonal', 'peptide therapy', 'terapia con péptidos', 'IV therapy Miami', 'terapia intravenosa Miami', 'NAD+ Miami', 'NAD+ IV', 'healthspan', 'anti-aging Miami', 'antienvejecimiento', 'nervous system regulation', 'regulación del sistema nervioso', 'integrative medicine', 'medicina integrativa', 'holistic healing Miami', 'sanación holística', 'spiritual healing Miami', 'sanación espiritual', 'energy healing', 'Reiki Miami', 'wellness Miami', 'Coral Gables wellness', 'longevity clinic Miami', 'regenerative orthopedics', 'red light therapy Miami', 'cold plunge Miami', 'infrared sauna Miami', 'floatation therapy Miami', 'HOCATT ozone sauna', 'glutathione IV', 'Alchemized BioHealing Institute', 'Holistic Bella Vargas', 'Dr. Michael Meighen MD', 'performance medicine', 'vitality', 'healing retreats Miami', 'retiros de sanación'],
  authors: [{ name: 'Dr. Michael J. Meighen' }, { name: 'Holistic Bella Vargas' }],
  creator: 'Alchemized BioHealing Institute',
  publisher: 'Alchemized BioHealing Institute',
  category: 'Health & Wellness',
  alternates: {
    canonical: '/',
    languages: { 'en-US': '/', 'es-ES': '/', 'x-default': '/' },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Alchemized BioHealing Institute | Longevity & Regenerative Medicine Miami',
    description: 'Where vanguard science meets the soul. Longevity, biohacking, regenerative & functional medicine in Miami. Healing from within.',
    url: SITE_URL,
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES'],
    siteName: 'Alchemized BioHealing Institute',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Alchemized BioHealing Institute — Where science meets soul · Longevity & Regenerative Medicine Miami' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alchemized BioHealing Institute | Longevity & Regenerative Medicine Miami',
    description: 'Where vanguard science meets the soul. Longevity, biohacking & regenerative medicine in Miami. Healing from within.',
    images: ['/og-image.png'],
  },
  icons: { icon: '/favicon.ico' },
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
              '@graph': [
                {
                  '@type': ['MedicalBusiness', 'HealthAndBeautyBusiness', 'LocalBusiness'],
                  '@id': `${SITE_URL}/#institute`,
                  name: 'Alchemized BioHealing Institute',
                  alternateName: ['Alchemized BioHealing', 'Holistic Bella & Dr. Michael J. Meighen'],
                  description: 'Longevity, biohacking and regenerative medicine in Miami (Coral Gables) where vanguard science meets the soul — functional medicine, hormone optimization, peptide therapy, IV therapy, NAD+, bio-energetic therapies, nervous-system regulation and spiritual healing.',
                  url: SITE_URL,
                  logo: `${SITE_URL}/logo-alchemized.png`,
                  image: `${SITE_URL}/og-image.png`,
                  telephone: '+1-305-305-3820',
                  priceRange: '$$$',
                  currenciesAccepted: 'USD',
                  slogan: 'Where science meets soul. Healing from within.',
                  medicalSpecialty: ['Regenerative Medicine', 'Functional Medicine', 'Longevity', 'Pain Medicine', 'Physical Medicine and Rehabilitation'],
                  knowsAbout: ['Longevity Medicine', 'Healthspan', 'Biohacking', 'Regenerative Medicine', 'Functional Medicine', 'Hormone Optimization', 'Peptide Therapy', 'IV Therapy', 'NAD+', 'Red Light Therapy', 'Cold Plunge', 'Infrared Sauna', 'Floatation Therapy', 'HOCATT Ozone Sauna', 'Nervous System Regulation', 'Anti-Aging', 'Reiki', 'Energy Healing', 'Ancestral Medicine'],
                  areaServed: [{ '@type': 'City', name: 'Miami' }, { '@type': 'City', name: 'Coral Gables' }, { '@type': 'AdministrativeArea', name: 'Miami-Dade County' }],
                  address: { '@type': 'PostalAddress', streetAddress: '2970 Coral Way', addressLocality: 'Miami', addressRegion: 'FL', postalCode: '33145', addressCountry: 'US' },
                  geo: { '@type': 'GeoCoordinates', latitude: 25.7506, longitude: -80.2731 },
                  sameAs: ['https://livelimitlessmd.com'],
                  founder: [{ '@id': `${SITE_URL}/#meighen` }, { '@id': `${SITE_URL}/#bella` }],
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Memberships, Therapies, IV Drips & Programs',
                    itemListElement: [
                      { '@type': 'Offer', name: 'Stress Relief & High Frequency Package', price: '333', priceCurrency: 'USD' },
                      { '@type': 'Offer', name: 'Loving Myself Membership', price: '444', priceCurrency: 'USD' },
                      { '@type': 'Offer', name: 'Soulmates Dates Membership', price: '777', priceCurrency: 'USD' },
                      { '@type': 'Offer', name: 'My Sacred Family Wellness Membership', price: '1111', priceCurrency: 'USD' },
                      { '@type': 'Service', name: 'Signature IV Therapy & NAD+ Drips' },
                      { '@type': 'Service', name: 'Bio-Energetic Therapies (Red Light, Cold Plunge, Infrared Sauna, Floatation, HOCATT)' },
                      { '@type': 'Service', name: 'Nervous System & Longevity Program' },
                    ],
                  },
                },
                {
                  '@type': 'Physician',
                  '@id': `${SITE_URL}/#meighen`,
                  name: 'Dr. Michael J. Meighen',
                  jobTitle: 'Co-Founder & Medical Director',
                  worksFor: { '@id': `${SITE_URL}/#institute` },
                  medicalSpecialty: ['Regenerative Medicine', 'Physical Medicine and Rehabilitation', 'Pain Medicine'],
                  knowsAbout: ['Regenerative Medicine', 'Longevity', 'Peptide Therapy', 'Hormone Optimization', 'Pain Medicine', 'Biohacking'],
                  award: '#1 Amazon Best-Seller — "A New You"',
                  url: 'https://livelimitlessmd.com',
                },
                {
                  '@type': 'Person',
                  '@id': `${SITE_URL}/#bella`,
                  name: 'Blenedy Vargas',
                  alternateName: 'Holistic Bella',
                  jobTitle: 'Co-Founder & Holistic Director',
                  worksFor: { '@id': `${SITE_URL}/#institute` },
                  knowsAbout: ['Spiritual Healing', 'Nervous System Regulation', 'Reiki', 'Family Constellations', 'Ancestral Medicine', 'IV Therapy', 'Energy Healing'],
                },
                {
                  '@type': 'WebSite',
                  '@id': `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: 'Alchemized BioHealing Institute',
                  inLanguage: ['en', 'es'],
                  publisher: { '@id': `${SITE_URL}/#institute` },
                },
                {
                  '@type': 'FAQPage',
                  '@id': `${SITE_URL}/#faq`,
                  mainEntity: [
                    { '@type': 'Question', name: 'What is Alchemized BioHealing Institute?', acceptedAnswer: { '@type': 'Answer', text: 'Alchemized BioHealing Institute is a longevity and regenerative medicine sanctuary in Miami (Coral Gables) where regenerative medicine merges with sacred, ancestral healing and spiritual therapies. It was founded by Dr. Michael J. Meighen and Holistic Bella Vargas — uniting body and soul, science and spirit.' } },
                    { '@type': 'Question', name: 'Where is Alchemized BioHealing Institute located?', acceptedAnswer: { '@type': 'Answer', text: 'The institute is located at 2970 Coral Way, Miami, FL 33145, at Centner Wellness in Coral Gables. You can reach the team at +1 (305) 305-3820.' } },
                    { '@type': 'Question', name: 'What services and therapies does Alchemized offer?', acceptedAnswer: { '@type': 'Answer', text: 'Services include regenerative medicine, peptide therapy, hormone optimization, IV therapy and NAD+ drips, and bio-energetic therapies such as red light therapy, cold plunge and infrared sauna, floatation tanks, Bio-Sync (Vemi) bed, BioCharger and HOCATT ozone sauna — plus spiritual and energy healing, breathwork and nervous-system regulation.' } },
                    { '@type': 'Question', name: 'How much do memberships cost?', acceptedAnswer: { '@type': 'Answer', text: 'The entry experience (Stress Relief & High Frequency) is a one-time $333. Monthly memberships are Loving Myself $444/mo (1 person), Soulmates Dates $777/mo (2 people) and My Sacred Family $1,111/mo (4 people). All active members receive 30% off all services.' } },
                    { '@type': 'Question', name: 'Do you offer IV therapy and NAD+ in Miami?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Signature IV Collection offers preservative-free, physician-formulated drips across a Pain & Inflammation series and a Signature Alchemy series — including NAD+, glutathione, cellular renewal and longevity drips. Every IV includes a secret homeopathic blend.' } },
                    { '@type': 'Question', name: 'What is the Nervous System & Longevity Program?', acceptedAnswer: { '@type': 'Answer', text: 'It is a physician-designed program by Dr. Meighen that regulates the nervous system and extends healthspan — combining HRV and stress evaluation, SGB consultation, IV and red light therapy, sound healing or meditation, breathwork, sleep optimization, a supplement protocol and lifestyle coaching.' } },
                    { '@type': 'Question', name: 'Who are the founders of Alchemized BioHealing?', acceptedAnswer: { '@type': 'Answer', text: 'Dr. Michael J. Meighen — a double board-certified physician, #1 Amazon best-seller of "A New You," with 25+ years in regenerative medicine, peptides and hormones — and Holistic Bella Vargas, a Reiki Master and Harvard-certified happiness coach specializing in spiritual and ancestral healing.' } },
                  ],
                },
              ],
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
