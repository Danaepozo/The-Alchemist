import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Alchemist Miami | Where Science Meets Spirit',
  description: 'Integrative wellness platform in Miami. Precision Medicine, Peptide Therapy, Reiki Healing, IV Therapy, Ancestral Medicine. Bella Vargas & Dr. Michael J. Meighen.',
  keywords: 'wellness Miami, precision medicine, peptide therapy, reiki, IV therapy, integrative health, functional medicine, longevity',
  openGraph: {
    title: 'The Alchemist Miami',
    description: 'Nervous system regulation. Human connection. Where Science meets Spirit.',
    type: 'website',
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
      </head>
      <body>{children}</body>
    </html>
  )
}
