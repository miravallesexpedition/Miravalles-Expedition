# Miravalles Expedition - Sitio Web de Reserva de Tours

Sitio web completo para reserva de tours en el Volcán Miravalles con todas las funciones solicitadas.

## 🚀 Funciones Incluidas

✅ **Selector de Fechas** - Elige fechas disponibles en los próximos 30 días
✅ **Formulario de Contacto** - Recolecta información de los clientes
✅ **Galería de Fotos** - Muestra imágenes de los tours
✅ **Reseñas/Testimonios** - Comentarios reales de clientes
✅ **Mapa de Ubicación** - Ubica los tours en Google Maps
✅ **Carrito de Compras** - Agrega múltiples tours
✅ **Filtros de Búsqueda** - Por nivel de dificultad y precio
✅ **FAQ** - Preguntas frecuentes expandibles
✅ **Sistema de Pago** - Flujo de confirmación y pago PayPal para reservas en USD
✅ **Diseño Responsivo** - Adaptado para móvil, tablet y desktop

## 📋 Requisitos

- Node.js 18+
- npm o yarn

## 🛠️ Instalación

1. Instala Node.js desde https://nodejs.org/

2. En la carpeta del proyecto, instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en http://localhost:3000

## 📁 Estructura del Proyecto

```
├── src/
│   ├── app/
│   │   ├── layout.js          # Layout principal
│   │   ├── page.js            # Página principal con todas las secciones
│   │   └── globals.css        # Estilos globales
│   └── components/
│       └── sections/
│           ├── HeroSection.js          # Sección hero
│           ├── ToursSection.js         # Grid de tours con filtros
│           ├── DatePicker.js           # Selector de fechas
│           ├── ContactForm.js          # Formulario de contacto
│           ├── GallerySection.js       # Galería de fotos
│           ├── TestimonialsSection.js  # Testimonios de clientes
│           ├── MapSection.js           # Mapa de ubicación
│           ├── ShoppingCart.js         # Carrito flotante
│           ├── FAQSection.js           # Preguntas frecuentes
│           └── PaymentSection.js       # Formulario de pago
├── package.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Personalización

### Cambiar Tours
Edita el array `tours` en [src/app/page.js](src/app/page.js#L25):
```javascript
const tours = [
  {
    name: 'Tu Tour',
    price: '$XX',
    level: 'Nivel',
    image: 'URL_IMAGEN',
    description: 'Descripción'
  }
]
```

### Cambiar Colores
Modifica [tailwind.config.js](tailwind.config.js) para personalizar los colores.

### Agregar WhatsApp
Reemplaza el número en [src/components/sections/ContactForm.js](src/components/sections/ContactForm.js):
```javascript
+506XXXXXXXX  // Tu número de WhatsApp
```

## 🔌 Integración de Pagos

El flujo actual usa PayPal para reservas en USD. Las reservas en colones se coordinan por WhatsApp, depósito o efectivo.

Variables principales:

```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_SECRET_KEY=
PAYPAL_ENV=sandbox
PAYPAL_WEBHOOK_ID=
```

## 📱 Comandos

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Crea build para producción
- `npm run start` - Inicia servidor de producción
- `npm run lint` - Ejecuta linter

## 🌐 Deploy

### Vercel (Recomendado)
1. Sube el código a GitHub
2. Conecta tu repositorio en https://vercel.com
3. Deploy automático

### Otros Servidores
```bash
npm run build
npm run start
```

## 📞 Contacto

Para soporte o preguntas sobre la integración, contáctanos.

## 📄 Licencia

Proyecto personalizado para Miravalles Expedition 2026
