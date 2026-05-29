# Checklist antes de publicar

Guia completa y actualizada: `DEPLOY_READY.md`.

## 1. Predeploy local

```bash
npm run predeploy
```

Debe pasar:

- Tests
- Lint
- Auditoria de dependencias
- Revision de variables criticas
- Build de Next.js

## 2. Variables en Vercel

- `NEXT_PUBLIC_APP_URL=https://miravallesexpedition.com`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` o `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SECRET_KEY` o `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `ADMIN_ACCESS_TOKEN`
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
- `PAYPAL_SECRET_KEY`
- `PAYPAL_ENV=live`
- `PAYPAL_WEBHOOK_ID`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

## 3. Base de datos

- Ejecutar `src/db/schema.sql` si la base es nueva.
- Si la base ya existia, confirmar que `bookings.confirmation_expires_at` existe.

## 4. Despues del deploy

- Abrir la home.
- Revisar `/favicon.ico`.
- Entrar a `/admin/reservas`.
- Crear reserva de prueba.
- Confirmar email.
- Probar pago USD con PayPal.
- Confirmar que pago CRC queda por coordinacion manual.
- Revisar logs en Vercel.
