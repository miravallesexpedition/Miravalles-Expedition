export const business = {
  name: 'Miravalles Expedition',
  location: 'Fortuna, Guanacaste, Costa Rica',
  meetingPoint: 'Fortuna, cerca del Volcán Miravalles',
  mapsUrl: 'https://maps.app.goo.gl/9jzTzmpLHVMG65Wg8',
  tagline: 'Discover hidden waterfalls, volcanic landscapes and local nature experiences in Guanacaste.',
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
  logo: '/images/miravalles-expedition-logo.jpg',
  hero: '/images/hero-waterfall.jpg',
  heroVideo: '/videos/miravalles-hero.mp4',
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
  trailSign: '/images/trail-sign.jpg',
  forestTrail: '/images/forest-trail.jpg',
  cabroMucoFall: '/images/cabro-muco-waterfall-clean.jpg'
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

export const heroBadges = [
  'Local Guides',
  'Hidden Waterfalls',
  'Small Groups',
  'Safe Adventure'
]

export const galleryImages = [
  {
    url: tourImages.hero,
    alt: 'Catarata y poza natural en Miravalles',
    caption: 'Hidden waterfall pool',
    featured: true
  },
  {
    url: tourImages.cabroMucoFall,
    alt: 'Catarata Cabro Muco con poza natural',
    caption: 'Cabro Muco waterfall'
  },
  {
    url: tourImages.tallWaterfall,
    alt: 'Catarata alta en la zona de Miravalles',
    caption: 'Tall volcanic waterfall',
    featured: true
  },
  {
    url: tourImages.forestTrail,
    alt: 'Sendero de bosque hacia las cataratas',
    caption: 'Forest approach'
  },
  {
    url: tourImages.trailSign,
    alt: 'Rótulo del sendero Cabro Muco',
    caption: 'Cabro Muco trail'
  },
  {
    url: tourImages.redRockWaterfall,
    alt: 'Cascada sobre roca volcánica rojiza',
    caption: 'Volcanic red rock'
  },
  {
    url: tourImages.catarataRiver,
    alt: 'Río y pequeñas cascadas de montaña',
    caption: 'Mountain river'
  },
  {
    url: tourImages.volcano,
    alt: 'Vista del Volcán Miravalles en Guanacaste',
    caption: 'Miravalles Volcano',
    featured: true
  },
  {
    url: tourImages.bromelia,
    alt: 'Bromelia roja del bosque tropical',
    caption: 'Tropical flora'
  },
  {
    url: tourImages.butterfly,
    alt: 'Mariposa en una flor tropical',
    caption: 'Wildlife details'
  },
  {
    url: tourImages.orchids,
    alt: 'Orquídeas naranjas de Costa Rica',
    caption: 'Costa Rican orchids'
  },
  {
    url: tourImages.bird,
    alt: 'Ave local observada en Guanacaste',
    caption: 'Birdwatching moments'
  },
  {
    url: tourImages.duck,
    alt: 'Ave acuática entre vegetación tropical',
    caption: 'Wetland wildlife'
  }
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

const defaultSafety = [
  'El guía define el ritmo según clima, nivel del grupo y condiciones del sendero.',
  'Se recomienda informar lesiones, condición médica o limitaciones antes de iniciar.',
  'En caso de lluvia fuerte o riesgo en el río, se reprograma o se ajusta la ruta.'
]

const defaultRecommendations = [
  'Reservar con anticipación para coordinar punto de encuentro y horario.',
  'Llegar con ropa ligera y zapatos cerrados con buena tracción.',
  'Traer efectivo para gastos externos o entradas que se confirmen antes del tour.'
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
    video: tourImages.heroVideo,
    location: 'Fortuna, Guanacaste',
    description:
      'Caminata guiada hacia dos cataratas escondidas en la zona del Volcán Miravalles, con pozas naturales, bosque y experiencia local auténtica.',
    overview:
      'Una caminata de aventura real para viajeros que quieren ver una parte menos masiva de Guanacaste: senderos de bosque, agua cristalina, roca volcánica y dos cataratas con identidad local.',
    whatToExpect: [
      'Inicio con briefing de seguridad y revisión del clima.',
      'Caminata por senderos naturales con pausas para fotos, agua y observación del entorno.',
      'Llegada a las cataratas Cabro Muco y Morpho Blanca según condiciones del día.',
      'Tiempo para disfrutar la poza natural, descansar y conectar con el paisaje.'
    ],
    itinerary: [
      { title: 'Encuentro local', text: 'Coordinamos el punto exacto por WhatsApp antes del tour.' },
      { title: 'Sendero de bosque', text: 'Caminata progresiva con paradas para orientación, agua y fotografía.' },
      { title: 'Cataratas escondidas', text: 'Visita a Cabro Muco y Morpho Blanca con tiempo para observar y disfrutar.' },
      { title: 'Regreso seguro', text: 'Vuelta al punto de inicio al ritmo del grupo.' }
    ],
    highlights: ['Dos cataratas', 'Poza natural', 'Bosque tropical', 'Guía local'],
    includes: commonIncludes,
    notIncluded: commonNotIncluded,
    bring: commonBring,
    recommendations: defaultRecommendations,
    safety: defaultSafety,
    gallery: [tourImages.hero, tourImages.cabroMucoFall, tourImages.forestTrail, tourImages.trailSign],
    faqs: [
      {
        question: '¿Necesito experiencia previa?',
        answer: 'No es necesario ser experto, pero sí tener condición física normal para caminar 10 km en terreno natural.'
      },
      {
        question: '¿Se puede nadar?',
        answer: 'Depende del clima, nivel del agua y criterio del guía el día del tour.'
      }
    ],
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
    distance: 'Ruta corta / baja exigencia',
    image: tourImages.redRockWaterfall,
    location: 'Zona Miravalles',
    description:
      'Experiencia relajada para disfrutar aguas termales y ambiente volcánico después de un día de aventura o como plan tranquilo de tarde.',
    overview:
      'Una experiencia suave para bajar el ritmo, sentir la energía volcánica de Miravalles y cerrar el día en un ambiente natural.',
    whatToExpect: [
      'Coordinación previa del acceso y horario recomendado.',
      'Orientación local para llegar al punto correcto.',
      'Tiempo flexible para relajarse en aguas termales.'
    ],
    itinerary: [
      { title: 'Coordinación', text: 'Confirmamos hora, punto y recomendaciones por WhatsApp.' },
      { title: 'Llegada al sitio', text: 'Ingreso al área termal según disponibilidad y condiciones del día.' },
      { title: 'Relajación', text: 'Tiempo libre para disfrutar el agua caliente natural.' }
    ],
    highlights: ['Aguas termales', 'Ambiente volcánico', 'Plan relajado', 'Horario flexible'],
    includes: ['Coordinación local', 'Agua', 'Refrigerio o snacks', 'Orientación en la zona'],
    notIncluded: commonNotIncluded,
    bring: ['Traje de baño', 'Toalla', 'Sandalias', 'Cambio de ropa', 'Repelente'],
    recommendations: defaultRecommendations,
    safety: defaultSafety,
    gallery: [tourImages.redRockWaterfall, tourImages.volcano, tourImages.bromelia],
    faqs: [
      {
        question: '¿Hasta qué hora están abiertas?',
        answer: 'Las aguas termales cierran a las 9:00 p.m.; el horario exacto se coordina según disponibilidad.'
      }
    ],
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
    distance: 'Consultar según ruta y clima',
    image: tourImages.volcano,
    location: 'Volcán Miravalles',
    description:
      'Caminata exigente para viajeros con buena condición física que quieren una experiencia de montaña, vistas amplias y terreno volcánico.',
    overview:
      'Una ruta más física para quienes buscan montaña, paisaje abierto y una sensación real de expedición cerca del Volcán Miravalles.',
    whatToExpect: [
      'Briefing de seguridad y evaluación del clima.',
      'Ascenso por terreno natural con pausas controladas.',
      'Vistas del paisaje volcánico cuando las condiciones lo permiten.'
    ],
    itinerary: [
      { title: 'Preparación', text: 'Revisión de equipo, agua, clima y condición del grupo.' },
      { title: 'Ascenso', text: 'Caminata exigente con ritmo constante y descansos.' },
      { title: 'Puntos de vista', text: 'Paradas para paisaje, fotos y lectura del entorno volcánico.' },
      { title: 'Descenso', text: 'Regreso controlado priorizando seguridad.' }
    ],
    highlights: ['Vista volcánica', 'Ruta exigente', 'Naturaleza abierta', 'Experiencia privada disponible'],
    includes: commonIncludes,
    notIncluded: commonNotIncluded,
    bring: [...commonBring, 'Abrigo liviano', 'Bastones si los usás'],
    recommendations: defaultRecommendations,
    safety: defaultSafety,
    gallery: [tourImages.volcano, tourImages.forestTrail, tourImages.bromelia],
    faqs: [
      {
        question: '¿Es recomendado para niños?',
        answer: 'No se recomienda para niños pequeños. Se revisa caso por caso según experiencia y condición física.'
      }
    ],
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
    distance: 'Caminata suave',
    image: tourImages.bird,
    location: 'Fortuna y alrededores de Miravalles',
    description:
      'Salida tranquila de observación de aves, ideal temprano en la mañana para viajeros que disfrutan fotografía, binoculares y naturaleza sin prisa.',
    overview:
      'Un recorrido pausado para observar aves, flores, árboles y detalles de vida silvestre con acompañamiento local.',
    whatToExpect: [
      'Salida recomendada temprano en la mañana.',
      'Ritmo suave, silencioso y enfocado en observación.',
      'Uso de binoculares cuando aplica y guía local para identificar puntos de interés.'
    ],
    itinerary: [
      { title: 'Inicio temprano', text: 'Coordinamos la mejor hora según clima y actividad de aves.' },
      { title: 'Observación', text: 'Recorrido tranquilo con pausas para escuchar, mirar y fotografiar.' },
      { title: 'Cierre', text: 'Regreso con recomendaciones de naturaleza y próximos puntos de interés.' }
    ],
    highlights: ['Aves locales', 'Binoculares', 'Fotografía', 'Ritmo suave'],
    includes: commonIncludes,
    notIncluded: commonNotIncluded,
    bring: ['Ropa cómoda', 'Zapatos cerrados', 'Repelente', 'Cámara', 'Sombrero o gorra'],
    recommendations: defaultRecommendations,
    safety: defaultSafety,
    gallery: [tourImages.bird, tourImages.duck, tourImages.butterfly, tourImages.orchids],
    faqs: [
      {
        question: '¿Cuál es la mejor hora?',
        answer: 'Generalmente temprano en la mañana, cuando hay más actividad de aves y mejor luz.'
      }
    ],
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
    distance: 'Ruta ajustable',
    image: tourImages.butterfly,
    location: 'Fortuna, Guanacaste',
    description:
      'Recorrido pausado para capturar cataratas, flores, aves, mariposas y detalles del bosque con acompañamiento local.',
    overview:
      'Una experiencia visual diseñada para moverse con calma, esperar la luz correcta y encontrar detalles reales del bosque tropical.',
    whatToExpect: [
      'Ruta flexible según luz, clima e intereses del visitante.',
      'Tiempo adicional para fotos y composición.',
      'Acompañamiento local para encontrar detalles naturales sin prisa.'
    ],
    itinerary: [
      { title: 'Brief creativo', text: 'Definimos si priorizás cataratas, aves, flores, paisaje o detalles.' },
      { title: 'Recorrido pausado', text: 'Caminata con paradas largas para fotografía.' },
      { title: 'Cierre', text: 'Últimas tomas y coordinación de regreso.' }
    ],
    highlights: ['Ritmo fotográfico', 'Flora y fauna', 'Cataratas', 'Acompañamiento local'],
    includes: commonIncludes,
    notIncluded: commonNotIncluded,
    bring: [...commonBring, 'Batería extra', 'Protección contra lluvia para cámara'],
    recommendations: defaultRecommendations,
    safety: defaultSafety,
    gallery: [tourImages.butterfly, tourImages.orchids, tourImages.bromelia, tourImages.hero],
    faqs: [
      {
        question: '¿Necesito cámara profesional?',
        answer: 'No. Podés disfrutarlo con celular, cámara básica o equipo profesional.'
      }
    ],
    pricing: {
      foreignAdult: '$75',
      foreignChild: '$45',
      nationalAdult: '₡35.000',
      nationalChild: '₡22.000',
      group: '$68 p.p. desde 3 personas',
      private: '$175 para 1-2 personas',
      promo: '$68 p.p. temporada baja'
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

export function getTourById(id) {
  return tours.find((tour) => String(tour.id) === String(id)) || null
}

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function buildMailtoUrl(subject, body) {
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
