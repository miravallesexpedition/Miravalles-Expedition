export const contact = {
  phoneDisplay: '+506 6295 7301',
  whatsappNumber: '50662957301',
  email: 'reservas.miravallesexpedition@gmail.com'
}

export const tourImages = {
  hero: '/images/hero-waterfall.jpg',
  catarataPool: '/images/hero-waterfall.jpg',
  catarataRiver: '/images/waterfall-river.jpg',
  tallWaterfall: '/images/tall-waterfall.jpeg',
  redRockWaterfall: '/images/red-rock-waterfall.jpg',
  volcano: '/images/volcano.jpg',
  bromelia: '/images/bromelia.jpg',
  butterfly: '/images/butterfly.jpg',
  bird: '/images/bird.jpg',
  duck: '/images/duck.jpg',
  orchids: '/images/orchids.jpg',
  rioCuipilapa: '/images/rio-cuipilapa-sign.jpg'
}

export const galleryImages = [
  { url: tourImages.hero, alt: 'Catarata y poza natural' },
  { url: tourImages.tallWaterfall, alt: 'Catarata alta en Miravalles' },
  { url: tourImages.redRockWaterfall, alt: 'Cascada sobre roca rojiza' },
  { url: tourImages.catarataRiver, alt: 'Río y cascadas de montaña' },
  { url: tourImages.volcano, alt: 'Volcán Miravalles' },
  { url: tourImages.bromelia, alt: 'Bromelia del bosque' },
  { url: tourImages.butterfly, alt: 'Mariposa en flor' },
  { url: tourImages.orchids, alt: 'Orquídeas naranjas' },
  { url: tourImages.bird, alt: 'Ave local' },
  { url: tourImages.duck, alt: 'Ave acuática' },
  { url: tourImages.rioCuipilapa, alt: 'Rótulo Río Cuipilapa' }
]

export const tours = [
  {
    id: 'catarata-cabro-mucho',
    name: 'Catarata Cabro Mucho',
    price: 55,
    priceLabel: '$55',
    level: 'Moderado',
    image: tourImages.hero,
    description: 'Caminata hacia una hermosa catarata en las montañas de Fortuna.'
  },
  {
    id: 'morfo-celestes',
    name: 'Morfo Celestes',
    price: 60,
    priceLabel: '$60',
    level: 'Fácil',
    image: tourImages.butterfly,
    description: 'Observación de mariposas, flores y vida silvestre en su hábitat natural.'
  },
  {
    id: 'hot-springs',
    name: 'Hot Springs',
    price: 50,
    priceLabel: '$50',
    level: 'Relajado',
    image: tourImages.redRockWaterfall,
    description: 'Disfruta de aguas naturales, paisajes volcánicos y un ambiente relajante.'
  },
  {
    id: 'el-yoko',
    name: 'El Yoko',
    price: 75,
    priceLabel: '$75',
    level: 'Difícil',
    image: tourImages.catarataRiver,
    description: 'Aventura completa entre río, roca y bosque tropical.'
  },
  {
    id: 'crater-volcan-miravalles',
    name: 'Cráter del Volcán Miravalles',
    price: 65,
    priceLabel: '$65',
    level: 'Difícil',
    image: tourImages.volcano,
    description: 'Caminata al cráter del Volcán Miravalles con vistas espectaculares.'
  },
  {
    id: 'tour-aves-palo-verde',
    name: 'Tour de Aves en Palo Verde',
    price: 70,
    priceLabel: '$70',
    level: 'Fácil',
    image: tourImages.bird,
    description: 'Observación de aves en una de las zonas naturales más especiales de Guanacaste.'
  }
]

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function buildMailtoUrl(subject, body) {
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
