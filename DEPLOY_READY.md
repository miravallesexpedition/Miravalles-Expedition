# Deploy Ready - Miravalles Expedition

Antes de publicar, ejecuta:

```bash
npm run predeploy
```

Ese comando revisa tests, lint, auditoria de dependencias, variables criticas y build.

## Variables requeridas en Vercel

Configuralas en Project Settings > Environment Variables:

```env
NEXT_PUBLIC_APP_URL=https://miravallesexpedition.com

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=

RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@miravallesexpedition.com

ADMIN_ACCESS_TOKEN=
BOOKING_CONFIRMATION_EXPIRES_HOURS=24
MAX_PARTICIPANTS_PER_TOUR=10
MAX_PARTICIPANTS_HOT_SPRINGS=30

NEXT_PUBLIC_CONTACT_EMAIL=reservas.miravallesexpedition@gmail.com
NEXT_PUBLIC_WHATSAPP_NUMBER=50670063382
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/miravalles.expedition/
NEXT_PUBLIC_FACEBOOK_URL=https://www.facebook.com/profile.php?id=61589218435914&locale=es_LA
NEXT_PUBLIC_TIKTOK_URL=https://www.tiktok.com/@miravalles.expedi

NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_SECRET_KEY=
PAYPAL_ENV=live
PAYPAL_WEBHOOK_ID=
```

Tambien puedes usar `.env.production.example` como plantilla para copiar los nombres exactos.

Tambien funcionan las llaves legacy de Supabase:

```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Supabase

Para una base nueva, ejecuta `src/db/schema.sql`.

Si la base ya existia, ejecuta tambien:

```sql
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS confirmation_expires_at TIMESTAMP WITH TIME ZONE;
```

## Resend

Verifica el dominio en Resend antes de usar `RESEND_FROM_EMAIL` con el dominio real. Si el dominio no esta verificado, Resend puede rechazar emails.

## PayPal

Para produccion:

- `PAYPAL_ENV=live`
- Usa credenciales Live, no Sandbox.
- Configura el webhook de PayPal apuntando a:

```text
https://miravallesexpedition.com/api/payments/paypal/webhook
```

Eventos recomendados:

- `CHECKOUT.ORDER.APPROVED`
- `PAYMENT.CAPTURE.COMPLETED`
- `PAYMENT.CAPTURE.DENIED`
- `CHECKOUT.PAYMENT-APPROVAL.REVERSED`

## Verificacion despues de deploy

1. Abrir `https://miravallesexpedition.com`.
2. Revisar `https://miravallesexpedition.com/favicon.ico`.
3. Entrar a `/admin/reservas` con `ADMIN_ACCESS_TOKEN`.
4. Crear una reserva de prueba.
5. Confirmar el enlace recibido.
6. Revisar que el pago USD abre PayPal.
7. Revisar que reservas CRC ofrecen coordinacion manual.
8. Revisar Vercel Logs por errores.
9. Revisar `https://miravallesexpedition.com/api/health`.
