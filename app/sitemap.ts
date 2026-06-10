import type { MetadataRoute } from 'next'

const BASE_URL = 'https://azangue-leonel-portfolio.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const sections = [
    '',
    '#about',
    '#skills',
    '#projects',
    '#experience',
    '#education',
    '#certifications',
    '#competitions',
    '#contact',
  ]

  return sections.map((section) => ({
    url: `${BASE_URL}/${section}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: section === '' ? 1 : 0.7,
  }))
}
