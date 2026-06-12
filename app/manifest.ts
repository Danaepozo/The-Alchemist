import type { MetadataRoute } from 'next'

// Web app manifest. start_url '/' guarantees the site always opens on the home
// page — including when added to a phone's home screen.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Alchemized BioHealing Institute',
    short_name: 'Alchemized',
    description: 'Longevity & regenerative medicine sanctuary in Miami — where science meets soul.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
