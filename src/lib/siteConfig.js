export const contact = {
  phoneDisplay: '+506 6295 7301',
  whatsappNumber: '50662957301',
  email: 'reservas.miravallesexpedition@gmail.com'
}

export const tourImages = {
  hero: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&h=1000',
  volcan: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600',
  cataratas: 'https://images.unsplash.com/photo-1511316695145-4992006ffddb?w=800&h=600',
  termales: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600',
  naturaleza: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600',
  aventura: 'https://images.unsplash.com/photo-1491904014055-e4835cdcd4c6?w=800&h=600',
  grupo: 'https://images.unsplash.com/photo-1520763185298-1b434c919eba?w=800&h=600'
}

export const tours = [
  {
    id: 'catarata-cabro-mucho',
    name: 'Catarata Cabro Mucho',
    price: 55,
    priceLabel: '$55',
    level: 'Moderado',
    image: tourImages.cataratas,
    description: 'Caminata hacia una hermosa catarata en las montañas de Fortuna.'
  },
  {
    id: 'morfo-celestes',
    name: 'Morfo Celestes',
    price: 60,
    priceLabel: '$60',
    level: 'Fácil',
    image: tourImages.naturaleza,
    description: 'Observación de mariposas Morfo en su hábitat natural.'
  },
  {
    id: 'hot-springs',
    name: 'Hot Springs',
    price: 50,
    priceLabel: '$50',
    level: 'Relajado',
    image: tourImages.termales,
    description: 'Disfruta de aguas termales naturales y un ambiente relajante.'
  },
  {
    id: 'el-yoko',
    name: 'El Yoko',
    price: 75,
    priceLabel: '$75',
    level: 'Difícil',
    image: tourImages.aventura,
    description: 'Aventura completa en río y selva tropical.'
  },
  {
    id: 'crater-volcan-miravalles',
    name: 'Cráter del Volcán Miravalles',
    price: 65,
    priceLabel: '$65',
    level: 'Difícil',
    image: tourImages.volcan,
    description: 'Caminata al cráter del Volcán Miravalles con vistas espectaculares.'
  },
  {
    id: 'tour-aves-palo-verde',
    name: 'Tour de Aves en Palo Verde',
    price: 70,
    priceLabel: '$70',
    level: 'Fácil',
    image: tourImages.grupo,
    description: 'Observación de aves en una de las zonas naturales más especiales de Guanacaste.'
  }
]

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function buildMailtoUrl(subject, body) {
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
