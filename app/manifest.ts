import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Portfolio — Leonel Delmat AZANGUE',
    short_name: 'AZANGUE L.D',
    description:
      "Portfolio de Leonel Delmat AZANGUE — Ingénieur en IA & Full-Stack, IA Agentique, DevOps. Solutions technologiques à impact social et inclusif.",
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#020617',
    lang: 'fr',
    categories: ['portfolio', 'technology', 'education'],
    icons: [
      { src: '/icon', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
