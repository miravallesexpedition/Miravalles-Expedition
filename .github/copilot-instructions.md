# Miravalles Expedition - Instrucciones de Desarrollo

Este es un proyecto Next.js para un sitio web de reserva de tours con todas las características modernas.

## Contexto del Proyecto

- **Framework**: Next.js 14 con React
- **Estilos**: Tailwind CSS
- **Lenguaje**: JavaScript
- **Dependencias**: date-fns, react-hook-form, stripe

## Estructura de Componentes

- `HeroSection.js` - Banner principal con CTA
- `ToursSection.js` - Grid de tours con filtros avanzados
- `DatePicker.js` - Selector de fechas modal
- `ContactForm.js` - Formulario para contacto
- `GallerySection.js` - Galería responsiva de fotos
- `TestimonialsSection.js` - Reseñas de clientes
- `MapSection.js` - Mapa interactivo con ubicación
- `ShoppingCart.js` - Carrito flotante
- `FAQSection.js` - Preguntas frecuentes expandibles
- `PaymentSection.js` - Formulario de pago

## Guía de Personalización

### Agregar Nuevos Tours
Edita el array `tours` en `src/app/page.js`:
```javascript
{
  name: 'Nombre del Tour',
  price: '$XX',
  level: 'Dificultad',
  image: 'URL',
  description: 'Descripción'
}
```

### Cambiar Colores Principales
- Verde: `bg-green-600` → Cambiar en todos los componentes
- Azul: `bg-blue-600` → Para botones secundarios
- Editar en `tailwind.config.js` para cambios globales

### Integrar WhatsApp
En `src/app/page.js`:
```javascript
const whatsappNumber = '+506XXXXXXXX'  // Reemplaza con tu número
```

### Integrar Stripe
1. Instalar: `npm install @stripe/react-stripe-js @stripe/js`
2. Editar `PaymentSection.js` con tus claves API

## Próximas Mejoras Sugeridas

- [ ] Conectar a base de datos para tours dinámicos
- [ ] Sistema de autenticación de usuarios
- [ ] Email confirmación de reservas
- [ ] Panel de administración
- [ ] Integración PayPal
- [ ] Soporte para múltiples idiomas
- [ ] SEO optimización

## Comandos Disponibles

```bash
npm install      # Instalar dependencias
npm run dev      # Desarrollo local
npm run build    # Build para producción
npm run start    # Iniciar producción
npm run lint     # Validar código
```

## Notas de Desarrollo

- Todos los componentes usan `'use client'` para interactividad
- Los estilos son Tailwind CSS puro (sin CSS externo)
- El proyecto está listo para deploy en Vercel
- Las imágenes usan URLs de Unsplash como placeholders
