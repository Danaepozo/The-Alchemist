import type { MetadataRoute } from 'next'

const SITE_URL = 'https://the-alchemist-danae.netlify.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '/', priority: 1.0, freq: 'weekly' as const },
    { path: '/bio-age', priority: 0.9, freq: 'monthly' as const },
    { path: '/nad-iv-therapy-miami', priority: 0.9, freq: 'monthly' as const },
    { path: '/longevity-clinic-coral-gables', priority: 0.9, freq: 'monthly' as const },
    { path: '/about/bella', priority: 0.8, freq: 'monthly' as const },
    { path: '/about/meighen', priority: 0.8, freq: 'monthly' as const },
    { path: '/assessment', priority: 0.7, freq: 'monthly' as const },
    { path: '/booking', priority: 0.7, freq: 'monthly' as const },
    { path: '/lyra', priority: 0.6, freq: 'monthly' as const },
    { path: '/retreats', priority: 0.6, freq: 'monthly' as const },
  ]
  return routes.map(r => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.freq,
    priority: r.priority,
  }))
}
