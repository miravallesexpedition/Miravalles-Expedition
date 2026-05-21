import { parseMoney } from '@/lib/pricing'
import { business, contact, seoKeywords, tourImages, tours } from '@/lib/siteConfig'

const baseUrl = 'https://miravallesexpedition.com'

export default function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        name: business.name,
        url: baseUrl,
        inLanguage: 'es-CR',
        publisher: {
          '@id': `${baseUrl}/#business`
        }
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${baseUrl}/#business`,
        name: business.name,
        url: baseUrl,
        image: `${baseUrl}${tourImages.logo}`,
        logo: `${baseUrl}${tourImages.logo}`,
        telephone: contact.phoneDisplay,
        email: contact.email,
        description: business.tagline,
        priceRange: '$15-$260',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Fortuna',
          addressRegion: 'Guanacaste',
          addressCountry: 'CR'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 10.6752514,
          longitude: -85.1986184
        },
        areaServed: [
          'Fortuna',
          'Guanacaste',
          'Volcán Miravalles',
          'Colinas del Miravalles',
          'Palo Verde'
        ],
        knowsAbout: seoKeywords,
        sameAs: [business.mapsUrl],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Tours de aventura en Miravalles',
          itemListElement: tours.map((tour, index) => ({
            '@type': 'Offer',
            position: index + 1,
            name: tour.name,
            price: getOfferPrice(tour),
            priceCurrency: getOfferCurrency(tour),
            availability: 'https://schema.org/InStock',
            url: `${baseUrl}/tours/${tour.id}`,
            itemOffered: {
              '@id': `${baseUrl}/tours/${tour.id}#tour`
            }
          }))
        }
      },
      ...tours.map((tour) => ({
        '@type': 'TouristTrip',
        '@id': `${baseUrl}/tours/${tour.id}#tour`,
        name: tour.name,
        description: tour.description,
        image: `${baseUrl}${tour.image}`,
        url: `${baseUrl}/tours/${tour.id}`,
        provider: {
          '@id': `${baseUrl}/#business`
        },
        touristType: [
          'Viajeros de aventura',
          'Amantes de naturaleza',
          'Parejas',
          'Grupos pequeños',
          'Fotografía de naturaleza'
        ],
        itinerary: {
          '@type': 'ItemList',
          itemListElement: (tour.itinerary || tour.highlights || []).map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: typeof item === 'string' ? item : item.title,
            description: typeof item === 'string' ? undefined : item.text
          }))
        },
        offers: {
          '@type': 'Offer',
          price: getOfferPrice(tour),
          priceCurrency: getOfferCurrency(tour),
          availability: 'https://schema.org/InStock',
          url: `${baseUrl}/tours/${tour.id}`
        },
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Duración', value: tour.duration },
          { '@type': 'PropertyValue', name: 'Distancia', value: tour.distance || 'Consultar' },
          { '@type': 'PropertyValue', name: 'Dificultad', value: tour.level },
          { '@type': 'PropertyValue', name: 'Transporte', value: 'No incluido' }
        ]
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

function getPrimaryPriceLabel(tour) {
  return tour.pricing?.general || tour.pricing?.foreignAdult || tour.priceLabel
}

function getOfferPrice(tour) {
  return parseMoney(getPrimaryPriceLabel(tour)) || Number(tour.price || 0)
}

function getOfferCurrency(tour) {
  const priceLabel = String(getPrimaryPriceLabel(tour) || '')
  return priceLabel.includes('₡') || /\d{1,3}(?:\.\d{3})+/.test(priceLabel) ? 'CRC' : 'USD'
}
