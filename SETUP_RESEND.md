# Configuración de Resend (Email Service)

## ¿Qué es Resend?
Resend es un servicio de envío de emails muy fácil de usar, diseñado para desarrolladores. Plan gratuito: 100 emails/día.

## Paso 1: Crear cuenta en Resend

1. Ve a [https://resend.com](https://resend.com)
2. Regístrate con tu email
3. Verifica tu email
4. Entra a tu dashboard

## Paso 2: Obtener API Key

1. En el dashboard, ve a **API Keys**
2. Copia tu **API Key**
3. Pégala en `.env.local`:

```env
RESEND_API_KEY=tu_api_key_aqui
```

## Paso 3: Verificar dominio (Opcional para producción)

Para producción, necesitas verificar tu dominio:

1. Ve a **Domains** en Resend
2. Agrega tu dominio `miravallles.cr`
3. Sigue las instrucciones para verificar con DNS
4. Una vez verificado, actualiza los emails a:

```javascript
from: 'noreply@miravallles.cr'
```

## Para Desarrollo

Mientras estés en desarrollo, puedes usar:

```javascript
from: 'onboarding@resend.dev' // Email de prueba
```

## Plantillas de Email

El proyecto incluye 3 tipos de emails:

1. **Confirmación de Reserva** - Solicita confirmación del email
2. **Reserva Confirmada** - Envía link de pago
3. **Recordatorio 24h antes** - Recuerda el tour de mañana

Todos se envían automáticamente en los momentos correctos.

---

## Próximos Pasos

1. ✅ Supabase - Base de datos
2. ✅ Resend - Emails
3. ⏳ PayPal - Pagos
4. ⏳ Panel Admin - Gestión
