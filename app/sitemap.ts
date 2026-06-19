import type { MetadataRoute } from 'next'

const SITE_URL = 'https://alchemizedbiohealing.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '/', priority: 1.0, freq: 'weekly' as const },
    { path: '/about', priority: 0.9, freq: 'monthly' as const },
    { path: '/services', priority: 0.9, freq: 'monthly' as const },
    { path: '/memberships', priority: 0.9, freq: 'monthly' as const },
    { path: '/team', priority: 0.8, freq: 'monthly' as const },
    { path: '/retreats', priority: 0.8, freq: 'weekly' as const },
    { path: '/shop', priority: 0.7, freq: 'monthly' as const },
    { path: '/bio-age', priority: 0.9, freq: 'monthly' as const },
    { path: '/biohacking-miami', priority: 0.85, freq: 'monthly' as const },
    { path: '/regenerative-medicine-miami', priority: 0.85, freq: 'monthly' as const },
    { path: '/functional-medicine-miami', priority: 0.85, freq: 'monthly' as const },
    { path: '/peptide-therapy-miami', priority: 0.85, freq: 'monthly' as const },
    { path: '/hormone-optimization-miami', priority: 0.85, freq: 'monthly' as const },
    { path: '/mindfulness-nervous-system-miami', priority: 0.85, freq: 'monthly' as const },
    { path: '/nad-iv-therapy-miami', priority: 0.9, freq: 'monthly' as const },
    { path: '/longevity-clinic-coral-gables', priority: 0.9, freq: 'monthly' as const },
    { path: '/about/bella', priority: 0.8, freq: 'monthly' as const },
    { path: '/about/meighen', priority: 0.8, freq: 'monthly' as const },
    { path: '/assessment', priority: 0.7, freq: 'monthly' as const },
    { path: '/booking', priority: 0.7, freq: 'monthly' as const },
  ]
  return routes.map(r => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.freq,
    priority: r.priority,
  }))
}
