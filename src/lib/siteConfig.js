export const business = {
  name: 'Miravalles Expedition',
  location: 'Fortuna, Guanacaste, Costa Rica',
  meetingPoint: 'Fortuna, cerca del Volcán Miravalles',
  mapsUrl: 'https://maps.app.goo.gl/9jzTzmpLHVMG65Wg8',
  mapsEmbedUrl: 'https://www.google.com/maps?q=Miravalles%20Expedition%4010.6752514,-85.1986184&z=15&hl=es&output=embed',
  tagline: 'Cataratas escondidas, paisajes volcánicos y experiencias locales de naturaleza en Guanacaste.',
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
  morphoCabroVideo: '/videos/morpho-cabro-muco-hero.mp4',
  morphoBlancaClip: '/videos/morpho-blanca-clip.mp4',
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
  cabroMucoFall: '/images/cabro-muco-waterfall-clean.jpg',
  cabroMucoUnderWaterfall: '/images/cabro-muco-under-waterfall.jpg',
  morphoBlancaGuide: '/images/morpho-blanca-8627.jpg',
  morphoBlancaPool: '/images/morpho-blanca-8686.jpg',
  morphoBlancaWaterfall: '/images/morpho-blanca-8633.jpg'
}

export const commonIncludes = [
  'Guía local con conocimiento de la zona',
  'Agua en caso de necesitarla',
  'Refrigerio o snacks',
  'Acompañamiento durante todo el recorrido',
  'Binoculares cuando aplica',
  'Fotografías personales opcionales',
  'Coordinación previa por WhatsApp'
]

export const commonNotIncluded = [
  'Transporte',
  'Almuerzo',
  'Gastos personales',
  'Entradas externas cuando apliquen'
]

export const commonBring = [
  'Buena hidratación',
  'Zapatos cómodos y cerrados para caminar',
  'Ropa fresca y cómoda',
  'Bloqueador solar',
  'Repelente contra insectos',
  'Botella reutilizable',
  'Cámara o celular protegido contra agua'
]

export const heroBadges = [
  'Guías locales',
  'Cataratas escondidas',
  'Grupos pequeños',
  'Aventura segura'
]

export const galleryImages = [
  {
    url: tourImages.morphoBlancaWaterfall,
    alt: 'Catarata Morpho Blanca entre roca volcánica y bosque',
    caption: 'Catarata Morpho Blanca',
    featured: true
  },
  {
    url: tourImages.cabroMucoUnderWaterfall,
    alt: 'Vista desde debajo de la catarata Cabro Muco',
    caption: 'Bajo Cabro Muco',
    featured: true
  },
  {
    url: tourImages.morphoBlancaPool,
    alt: 'Poza natural y río en la ruta Morpho Blanca',
    caption: 'Poza natural de Morpho Blanca'
  },
  {
    url: tourImages.morphoBlancaGuide,
    alt: 'Guía local explorando las cascadas de Morpho Blanca',
    caption: 'Ruta Morpho + Cabro Muco'
  },
  {
    url: tourImages.hero,
    alt: 'Catarata y poza natural en Miravalles',
    caption: 'Poza de catarata escondida',
    featured: true
  },
  {
    url: tourImages.cabroMucoFall,
    alt: 'Catarata Cabro Muco con poza natural',
    caption: 'Catarata Cabro Muco'
  },
  {
    url: tourImages.tallWaterfall,
    alt: 'Catarata alta en la zona de Miravalles',
    caption: 'Catarata volcánica',
    featured: true
  },
  {
    url: tourImages.forestTrail,
    alt: 'Sendero de bosque hacia las cataratas',
    caption: 'Sendero de bosque'
  },
  {
    url: tourImages.trailSign,
    alt: 'Rótulo del sendero Cabro Muco',
    caption: 'Sendero Cabro Muco'
  },
  {
    url: tourImages.redRockWaterfall,
    alt: 'Cascada sobre roca volcánica rojiza',
    caption: 'Roca volcánica rojiza'
  },
  {
    url: tourImages.catarataRiver,
    alt: 'Río y pequeñas cascadas de montaña',
    caption: 'Río de montaña'
  },
  {
    url: tourImages.volcano,
    alt: 'Vista del Volcán Miravalles en Guanacaste',
    caption: 'Volcán Miravalles',
    featured: true
  },
  {
    url: tourImages.bromelia,
    alt: 'Bromelia roja del bosque tropical',
    caption: 'Flora tropical'
  },
  {
    url: tourImages.butterfly,
    alt: 'Mariposa en una flor tropical',
    caption: 'Detalles de vida silvestre'
  },
  {
    url: tourImages.orchids,
    alt: 'Orquídeas naranjas de Costa Rica',
    caption: 'Orquídeas de Costa Rica'
  },
  {
    url: tourImages.bird,
    alt: 'Ave local observada en Guanacaste',
    caption: 'Observación de aves'
  },
  {
    url: tourImages.duck,
    alt: 'Ave acuática entre vegetación tropical',
    caption: 'Vida silvestre'
  }
]

export const pricingGuidelines = [
  {
    label: 'Adulto extranjero',
    value: '$45',
    detail: 'Tarifa base del tour principal de 4 horas.'
  },
  {
    label: 'Niño extranjero',
    value: '$35',
    detail: 'Recomendado de 8 a 12 años, acompañado por adulto.'
  },
  {
    label: 'Nacional o residente',
    value: '₡10.000',
    detail: 'Tarifa local para Piedras Rojas + Morpho Blanca + Cabro Muco.'
  },
  {
    label: 'Niño nacional',
    value: '₡8.000',
    detail: 'Tarifa infantil nacional para el tour de cataratas.'
  },
  {
    label: 'Aguas termales',
    value: '$15',
    detail: 'Precio general para nacionales y extranjeros.'
  },
  {
    label: 'Privado',
    value: 'Desde $160',
    detail: 'Ideal para parejas o viajeros que quieren ritmo personalizado.'
  },
  {
    label: 'Temporada baja',
    value: 'Consultar',
    detail: 'Promociones y grupos grandes se coordinan por WhatsApp.'
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
    name: 'Catarata Piedras Rojas + Morpho Blanca + Cabro Muco',
    shortName: 'Piedras Rojas + Morpho + Cabro',
    price: 45,
    priceLabel: '$45',
    level: 'Media',
    duration: '4 horas',
    distance: '10 km ida y vuelta',
    image: tourImages.morphoBlancaWaterfall,
    video: tourImages.morphoCabroVideo,
    videos: [tourImages.morphoCabroVideo, tourImages.morphoBlancaClip],
    location: 'Fortuna, Guanacaste',
    description:
      'Caminata guiada de aproximadamente 4 horas hacia Catarata Piedras Rojas, Morpho Blanca y Cabro Muco, con bosque tropical, pozas naturales y aventura local auténtica cerca del Volcán Miravalles.',
    overview:
      'Vive una aventura inolvidable en medio de la naturaleza. Esta caminata conecta algunos de los rincones más hermosos de la zona: Catarata Piedras Rojas, Catarata Morpho Blanca y Catarata Cabro Muco. En el camino se observan flora, fauna, insectos exóticos, anfibios, reptiles y aves locales, con tiempo para nadar en las refrescantes aguas de Morpho Blanca y Cabro Muco cuando las condiciones son seguras.',
    whatToExpect: [
      'Inicio con briefing de seguridad y revisión del clima.',
      'Caminata por senderos naturales con pausas para fotos, agua y observación del entorno.',
      'Visita a Catarata Piedras Rojas, Morpho Blanca y Cabro Muco según condiciones del día.',
      'Tiempo para nadar, descansar y conectar con el paisaje en Morpho Blanca y Cabro Muco cuando el clima lo permite.'
    ],
    itinerary: [
      { title: 'Encuentro local', text: 'Coordinamos el punto exacto por WhatsApp antes del tour.' },
      { title: 'Sendero de bosque', text: 'Caminata progresiva con paradas para orientación, agua, fotografía y observación de vida silvestre.' },
      { title: 'Tres cataratas', text: 'Visita a Piedras Rojas, Morpho Blanca y Cabro Muco con tiempo para observar, nadar y disfrutar.' },
      { title: 'Regreso seguro', text: 'Vuelta al punto de inicio al ritmo del grupo.' }
    ],
    highlights: ['Tres cataratas', 'Pozas naturales', 'Flora y fauna', 'Guía local'],
    includes: commonIncludes,
    notIncluded: commonNotIncluded,
    bring: commonBring,
    recommendations: defaultRecommendations,
    safety: defaultSafety,
    gallery: [
      tourImages.morphoBlancaWaterfall,
      tourImages.cabroMucoUnderWaterfall,
      tourImages.morphoBlancaPool,
      tourImages.morphoBlancaGuide,
      tourImages.hero,
      tourImages.cabroMucoFall,
      tourImages.trailSign
    ],
    faqs: [
      {
        question: '¿Necesito experiencia previa?',
        answer: 'No es necesario ser experto, pero sí tener condición física normal para caminar 10 km en terreno natural.'
      },
      {
        question: '¿Se puede nadar?',
        answer: 'Sí, normalmente hay oportunidad de nadar en Morpho Blanca y Cabro Muco. La decisión final depende del clima, nivel del agua y criterio del guía el día del tour.'
      },
      {
        question: '¿Qué puedo ver durante la caminata?',
        answer: 'Además de cataratas y bosque tropical, es posible observar insectos exóticos, anfibios, reptiles, aves de la zona y detalles de flora local.'
      }
    ],
    pricing: {
      foreignAdult: '$45',
      foreignChild: '$35',
      nationalAdult: '₡10.000',
      nationalChild: '₡8.000',
      private: '$160 para 1-2 personas'
    }
  },
  {
    id: 'aguas-termales-miravalles',
    name: 'Aguas Termales Miravalles',
    shortName: 'Aguas Termales',
    price: 15,
    priceLabel: '$15',
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
      general: '$15',
      private: '$95 para 1-2 personas'
    }
  },
  {
    id: 'crater-volcan-miravalles',
    name: 'Camino al Cráter del Volcán Miravalles',
    shortName: 'Cráter Miravalles',
    price: 85,
    priceLabel: '$85',
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
      foreignAdult: '$85',
      foreignChild: 'No recomendado para niños pequeños',
      nationalAdult: '₡30.000',
      nationalChild: 'Consultar',
      private: '$240 para 1-2 personas'
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
      general: '$45'
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
      nationalAdult: '₡12.500',
      nationalChild: '₡12.500',
      private: '$175 para 1-2 personas'
    }
  }
]

export const packages = [
  {
    name: 'Caminata + Aguas Termales',
    price: 'Desde $60 p.p.',
    detail:
      'Piedras Rojas + Morpho Blanca + Cabro Muco por la mañana y cierre relajado en aguas termales. Ideal para parejas y grupos pequeños.',
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
    name: 'Caminata de Aves',
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
      'Piedras Rojas + Morpho Blanca + Cabro Muco: media',
      'Camino al cráter: difícil',
      'Aguas termales: fácil',
      'Tour de aves: fácil'
    ]
  },
  {
    title: 'Duración',
    items: [
      'Piedras Rojas + Morpho Blanca + Cabro Muco: 4 horas',
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
      'Incluye guía local con conocimiento de la zona, acompañamiento durante todo el recorrido, refrigerio o snacks, agua en caso de necesitarla, binoculares cuando aplica y fotografías personales opcionales.'
  },
  {
    question: '¿Qué debo llevar?',
    answer:
      'Buena hidratación, zapatos cómodos para caminata, ropa fresca y cómoda, bloqueador solar, repelente contra insectos, botella reutilizable y cámara o celular protegido contra agua.'
  },
  {
    question: '¿Qué dificultad tienen los tours?',
    answer:
      'Piedras Rojas + Morpho Blanca + Cabro Muco es dificultad media. El camino al cráter es difícil. Aguas termales y tour de aves son fáciles.'
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
  'Catarata Piedras Rojas',
  'Catarata Morpho Blanca',
  'Catarata Cabro Muco',
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
