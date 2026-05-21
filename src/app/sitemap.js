import { tours } from '@/lib/siteConfig'

const baseUrl = 'https://miravallesexpedition.com'

export default function sitemap() {
  const lastModified = new Date()

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1
    },
    ...tours.map((tour) => ({
      url: `${baseUrl}/tours/${tour.id}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9
    }))
  ]
}
