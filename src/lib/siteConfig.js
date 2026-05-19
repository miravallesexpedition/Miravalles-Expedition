export const business = {
  name: 'Miravalles Expedition',
  location: 'Fortuna, Guanacaste, Costa Rica',
  meetingPoint: 'Fortuna, cerca del Volcán Miravalles',
  positioning:
    'Experiencias locales de caminata, cataratas, aves y naturaleza en la zona del Volcán Miravalles.',
  noTransportNotice:
    'No ofrecemos transporte. El punto de encuentro y la hora exacta se coordinan por WhatsApp después de solicitar la reserva.'
}

export const contact = {
  phoneDisplay: '+506 7006 3382',
  whatsappNumber: '50670063382',
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

export const commonIncludes = [
  'Guía local',
  'Agua',
  'Refrigerio o snacks',
  'Binoculares cuando aplica',
  'Coordinación previa por WhatsApp'
]

export const commonNotIncluded = [
  'Transporte',
  'Almuerzo',
  'Gastos personales',
  'Entradas externas cuando apliquen'
]

export const commonBring = [
  'Ropa cómoda',
  'Zapatos cerrados para caminar',
  'Bloqueador solar',
  'Repelente contra insectos',
  'Botella reutilizable',
  'Cámara o celular protegido contra agua'
]

export const galleryImages = [
  { url: tourImages.hero, alt: 'Catarata y poza natural en Miravalles' },
  { url: tourImages.tallWaterfall, alt: 'Catarata alta en la zona de Miravalles' },
  { url: tourImages.redRockWaterfall, alt: 'Cascada sobre roca volcánica rojiza' },
  { url: tourImages.catarataRiver, alt: 'Río y pequeñas cascadas de montaña' },
  { url: tourImages.volcano, alt: 'Vista del Volcán Miravalles en Guanacaste' },
  { url: tourImages.bromelia, alt: 'Bromelia roja del bosque tropical' },
  { url: tourImages.butterfly, alt: 'Mariposa en una flor tropical' },
  { url: tourImages.orchids, alt: 'Orquídeas naranjas de Costa Rica' },
  { url: tourImages.bird, alt: 'Ave local observada en Guanacaste' },
  { url: tourImages.duck, alt: 'Ave acuática entre vegetación tropical' },
  { url: tourImages.rioCuipilapa, alt: 'Rótulo del Río Cuipilapa' }
]

export const pricingGuidelines = [
  {
    label: 'Adulto extranjero',
    value: '$55',
    detail: 'Tarifa base del tour principal de 4 horas.'
  },
  {
    label: 'Niño',
    value: '$35',
    detail: 'Recomendado de 8 a 12 años, acompañado por adulto.'
  },
  {
    label: 'Nacional o residente',
    value: '₡25.000',
    detail: 'Precio local para mantener el tour accesible en Costa Rica.'
  },
  {
    label: 'Grupo 4+',
    value: '$49 p.p.',
    detail: 'Descuento por volumen sin bajar la percepción de valor.'
  },
  {
    label: 'Privado',
    value: 'Desde $160',
    detail: 'Ideal para parejas o viajeros que quieren ritmo personalizado.'
  },
  {
    label: 'Temporada baja',
    value: '$49',
    detail: 'Promoción sugerida de mayo a noviembre, según disponibilidad.'
  }
]

export const tours = [
  {
    id: 'catarata-cabro-muco-morpho-blanca',
    name: 'Catarata Cabro Muco + Morpho Blanca',
    shortName: 'Cabro Muco + Morpho Blanca',
    price: 55,
    priceLabel: '$55',
    level: 'Media',
    duration: '4 horas',
    distance: '10 km ida y vuelta',
    image: tourImages.hero,
    location: 'Fortuna, Guanacaste',
    description:
      'Caminata guiada hacia dos cataratas escondidas en la zona del Volcán Miravalles, con pozas naturales, bosque y experiencia local auténtica.',
    highlights: ['Dos cataratas', 'Poza natural', 'Bosque tropical', 'Guía local'],
    includes: commonIncludes,
    notIncluded: commonNotIncluded,
    bring: commonBring,
    pricing: {
      foreignAdult: '$55',
      foreignChild: '$35',
      nationalAdult: '₡25.000',
      nationalChild: '₡16.000',
      group: '$49 p.p. desde 4 personas',
      private: '$160 para 1-2 personas',
      promo: '$49 p.p. en temporada baja'
    }
  },
  {
    id: 'aguas-termales-miravalles',
    name: 'Aguas Termales Miravalles',
    shortName: 'Aguas Termales',
    price: 35,
    priceLabel: '$35',
    level: 'Fácil',
    duration: 'Flexible, cierran a las 9:00 p.m.',
    image: tourImages.redRockWaterfall,
    location: 'Zona Miravalles',
    description:
      'Experiencia relajada para disfrutar aguas termales y ambiente volcánico después de un día de aventura o como plan tranquilo de tarde.',
    highlights: ['Aguas termales', 'Ambiente volcánico', 'Plan relajado', 'Horario flexible'],
    includes: ['Coordinación local', 'Agua', 'Refrigerio o snacks', 'Orientación en la zona'],
    notIncluded: commonNotIncluded,
    bring: ['Traje de baño', 'Toalla', 'Sandalias', 'Cambio de ropa', 'Repelente'],
    pricing: {
      foreignAdult: '$35',
      foreignChild: '$25',
      nationalAdult: '₡18.000',
      nationalChild: '₡12.000',
      group: '$32 p.p. desde 4 personas',
      private: '$95 para 1-2 personas',
      promo: '$30 p.p. entre semana'
    }
  },
  {
    id: 'crater-volcan-miravalles',
    name: 'Camino al Cráter del Volcán Miravalles',
    shortName: 'Cráter Miravalles',
    price: 65,
    priceLabel: '$65',
    level: 'Difícil',
    duration: '5 a 6 horas',
    image: tourImages.volcano,
    location: 'Volcán Miravalles',
    description:
      'Caminata exigente para viajeros con buena condición física que quieren una experiencia de montaña, vistas amplias y terreno volcánico.',
    highlights: ['Vista volcánica', 'Ruta exigente', 'Naturaleza abierta', 'Experiencia privada disponible'],
    includes: commonIncludes,
    notIncluded: commonNotIncluded,
    bring: [...commonBring, 'Abrigo liviano', 'Bastones si los usás'],
    pricing: {
      foreignAdult: '$65',
      foreignChild: 'No recomendado para niños pequeños',
      nationalAdult: '₡30.000',
      nationalChild: 'Consultar',
      group: '$59 p.p. desde 4 personas',
      private: '$190 para 1-2 personas',
      promo: '$59 p.p. temporada baja'
    }
  },
  {
    id: 'tour-aves-vida-silvestre',
    name: 'Tour de Aves y Vida Silvestre',
    shortName: 'Aves y Vida Silvestre',
    price: 45,
    priceLabel: '$45',
    level: 'Fácil',
    duration: '3 horas',
    image: tourImages.bird,
    location: 'Fortuna y alrededores de Miravalles',
    description:
      'Salida tranquila de observación de aves, ideal temprano en la mañana para viajeros que disfrutan fotografía, binoculares y naturaleza sin prisa.',
    highlights: ['Aves locales', 'Binoculares', 'Fotografía', 'Ritmo suave'],
    includes: commonIncludes,
    notIncluded: commonNotIncluded,
    bring: ['Ropa cómoda', 'Zapatos cerrados', 'Repelente', 'Cámara', 'Sombrero o gorra'],
    pricing: {
      foreignAdult: '$45',
      foreignChild: '$30',
      nationalAdult: '₡20.000',
      nationalChild: '₡14.000',
      group: '$40 p.p. desde 4 personas',
      private: '$120 para 1-2 personas',
      promo: '$39 p.p. temporada baja'
    }
  },
  {
    id: 'fotografia-naturaleza-miravalles',
    name: 'Fotografía de Naturaleza',
    shortName: 'Fotografía de Naturaleza',
    price: 75,
    priceLabel: '$75',
    level: 'Media',
    duration: '4 horas',
    image: tourImages.butterfly,
    location: 'Fortuna, Guanacaste',
    description:
      'Recorrido pausado para capturar cataratas, flores, aves, mariposas y detalles del bosque con acompañamiento local.',
    highlights: ['Ritmo fotográfico', 'Flora y fauna', 'Cataratas', 'Acompañamiento local'],
    includes: commonIncludes,
    notIncluded: commonNotIncluded,
    bring: [...commonBring, 'Batería extra', 'Protección contra lluvia para cámara'],
    pricing: {
      foreignAdult: '$75',
      foreignChild: '$45',
      nationalAdult: '₡35.000',
      nationalChild: '₡22.000',
      group: '$68 p.p. desde 3 personas',
      private: '$175 para 1-2 personas',
      promo: '$68 p.p. temporada baja'
    }
  },
  {
    id: 'rio-cuipilapa-local',
    name: 'Experiencia Río Cuipilapa',
    shortName: 'Río Cuipilapa',
    price: 50,
    priceLabel: '$50',
    level: 'Media',
    duration: '3 a 4 horas',
    image: tourImages.rioCuipilapa,
    location: 'Zona de Fortuna',
    description:
      'Experiencia local cerca del río, con caminata, paisaje natural y espacios para conectar con la vida rural de Guanacaste.',
    highlights: ['Río local', 'Paisaje rural', 'Naturaleza', 'Tour corto'],
    includes: commonIncludes,
    notIncluded: commonNotIncluded,
    bring: commonBring,
    pricing: {
      foreignAdult: '$50',
      foreignChild: '$32',
      nationalAdult: '₡23.000',
      nationalChild: '₡15.000',
      group: '$45 p.p. desde 4 personas',
      private: '$140 para 1-2 personas',
      promo: '$45 p.p. temporada baja'
    }
  }
]

export const packages = [
  {
    name: 'Hike + Aguas Termales',
    price: 'Desde $85 p.p.',
    detail:
      'Catarata Cabro Muco + Morpho Blanca por la mañana y cierre relajado en aguas termales. Ideal para parejas y grupos pequeños.',
    bestFor: 'Aventura completa'
  },
  {
    name: 'Privado Premium',
    price: 'Desde $160',
    detail:
      'Tour privado para 1-2 personas con ritmo personalizado, más tiempo para fotos y coordinación directa con guía local.',
    bestFor: 'Parejas'
  },
  {
    name: 'Sunset Hike',
    price: 'Desde $45 p.p.',
    detail:
      'Caminata corta de tarde con enfoque en paisaje, luz de atardecer y experiencia tranquila. Sujeto a clima y ruta disponible.',
    bestFor: 'Fotografía'
  },
  {
    name: 'Birdwatching Hike',
    price: 'Desde $45 p.p.',
    detail:
      'Salida de 3 horas para observación de aves y vida silvestre con binoculares. Mejor temprano en la mañana.',
    bestFor: 'Naturaleza'
  },
  {
    name: 'Naturaleza y Fotografía',
    price: 'Desde $75 p.p.',
    detail:
      'Ruta pausada para fotos de cataratas, flores, aves y mariposas. Buena opción para viajeros que prefieren calidad sobre prisa.',
    bestFor: 'Creadores'
  },
  {
    name: 'Familias y Grupos',
    price: 'Desde $40 p.p.',
    detail:
      'Ruta fácil o media ajustada al grupo, con explicación local, descansos y coordinación previa según edades.',
    bestFor: 'Familias'
  }
]

export const experienceDetails = [
  {
    title: 'Qué incluye',
    items: commonIncludes
  },
  {
    title: 'Qué no incluye',
    items: commonNotIncluded
  },
  {
    title: 'Qué llevar',
    items: commonBring
  },
  {
    title: 'Dificultad',
    items: [
      'Cabro Muco + Morpho Blanca: media',
      'Camino al cráter: difícil',
      'Aguas termales: fácil',
      'Tour de aves: fácil'
    ]
  },
  {
    title: 'Duración',
    items: [
      'Cabro Muco + Morpho Blanca: 4 horas',
      'Aguas termales: horario flexible, cierran a las 9:00 p.m.',
      'Tour de aves: 3 horas',
      'Camino al cráter: 5 a 6 horas'
    ]
  },
  {
    title: 'Política de cancelación',
    items: [
      'Cancelación gratis hasta 48 horas antes.',
      'Cambio de fecha sujeto a disponibilidad.',
      'Si el clima presenta riesgo, se reprograma o se coordina alternativa segura.'
    ]
  }
]

export const siteFaqs = [
  {
    question: '¿Dónde queda Miravalles Expedition?',
    answer:
      'Estamos en Fortuna, Guanacaste, Costa Rica, cerca del Volcán Miravalles. El punto exacto de encuentro se confirma por WhatsApp al reservar.'
  },
  {
    question: '¿Ofrecen transporte?',
    answer:
      'No ofrecemos transporte. La experiencia inicia en el punto de encuentro acordado en Fortuna o la zona indicada para cada tour.'
  },
  {
    question: '¿Qué incluye el tour?',
    answer:
      'Incluye guía local, agua, refrigerio o snacks y binoculares cuando aplica. Algunos accesos externos se confirman antes de reservar.'
  },
  {
    question: '¿Qué debo llevar?',
    answer:
      'Ropa cómoda, zapatos cerrados para caminar, bloqueador solar, repelente contra insectos, botella reutilizable y cámara o celular protegido contra agua.'
  },
  {
    question: '¿Qué dificultad tienen los tours?',
    answer:
      'Cabro Muco + Morpho Blanca es dificultad media. El camino al cráter es difícil. Aguas termales y tour de aves son fáciles.'
  },
  {
    question: '¿Cómo confirmo mi reserva?',
    answer:
      'Elegís el tour y la fecha, enviás la solicitud y te confirmamos por WhatsApp o correo. El número oficial es +506 7006 3382.'
  }
]

export const seoKeywords = [
  'tours en Guanacaste',
  'hiking Costa Rica',
  'waterfalls Costa Rica',
  'Miravalles volcano tours',
  'hidden waterfalls Costa Rica',
  'eco tourism Costa Rica',
  'adventure tours Guanacaste',
  'cataratas en Guanacaste',
  'Volcán Miravalles'
]

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function buildMailtoUrl(subject, body) {
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
