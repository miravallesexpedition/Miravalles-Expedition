import { business, contact, tourImages, tours } from '@/lib/siteConfig'

export default function StructuredData() {
  const baseUrl = 'https://miravallesexpedition.com'
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${baseUrl}/#business`,
        name: business.name,
        url: baseUrl,
        image: `${baseUrl}${tourImages.logo}`,
        telephone: contact.phoneDisplay,
        email: contact.email,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Fortuna',
          addressRegion: 'Guanacaste',
          addressCountry: 'CR'
        },
        areaServed: ['Guanacaste', 'Volcán Miravalles', 'Fortuna'],
        sameAs: [business.mapsUrl],
        priceRange: '$15-$240'
      },
      ...tours.map((tour) => ({
        '@type': 'TouristTrip',
        name: tour.name,
        description: tour.description,
        image: `${baseUrl}${tour.image}`,
        touristType: ['Viajeros de aventura', 'Amantes de naturaleza', 'Parejas', 'Grupos pequeños'],
        itinerary: {
          '@type': 'ItemList',
          itemListElement: tour.highlights?.map((highlight, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: highlight
          }))
        },
        offers: {
          '@type': 'Offer',
          price: tour.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: `${baseUrl}/tours/${tour.id}`
        },
        provider: {
          '@id': `${baseUrl}/#business`
        }
      }))
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
