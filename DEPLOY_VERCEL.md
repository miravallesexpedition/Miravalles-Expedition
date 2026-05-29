# Deploy en Vercel

## 1. Verificar localmente

```bash
npm run predeploy
```

Si este comando falla, corrige primero lo que indique.

## 2. Subir cambios a GitHub

```bash
git status
git add .
git commit -m "Prepare Miravalles Expedition for production deploy"
git push
```

## 3. Importar o abrir proyecto en Vercel

1. Ir a Vercel.
2. Abrir el proyecto de Miravalles Expedition.
3. Confirmar que el root directory es la raiz del repositorio.
4. Framework preset: Next.js.

## 4. Variables de entorno

En Vercel > Project Settings > Environment Variables:

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

NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_SECRET_KEY=
PAYPAL_ENV=live
PAYPAL_WEBHOOK_ID=
```

## 5. Dominio

En Vercel > Settings > Domains:

- Agregar `miravallesexpedition.com`.
- Agregar `www.miravallesexpedition.com`.
- Dejar que Vercel configure SSL.

Registros DNS habituales:

```text
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

Usa siempre los valores exactos que muestre Vercel para tu proyecto.

## 6. PayPal Webhook

En PayPal Developer, configura el webhook:

```text
https://miravallesexpedition.com/api/payments/paypal/webhook
```

Eventos:

- `CHECKOUT.ORDER.APPROVED`
- `PAYMENT.CAPTURE.COMPLETED`
- `PAYMENT.CAPTURE.DENIED`
- `CHECKOUT.PAYMENT-APPROVAL.REVERSED`

Guarda el Webhook ID en `PAYPAL_WEBHOOK_ID`.

## 7. Verificacion final

1. Abrir `https://miravallesexpedition.com`.
2. Abrir `https://miravallesexpedition.com/favicon.ico`.
3. Entrar a `https://miravallesexpedition.com/admin/reservas`.
4. Crear una reserva de prueba.
5. Confirmar el enlace por email.
6. Probar que pago USD abre PayPal.
7. Probar que reserva CRC ofrece coordinacion manual.
8. Revisar Vercel Logs.

## 8. Google despues de publicar

En Google Search Console:

1. Inspeccionar `https://miravallesexpedition.com/`.
2. Solicitar indexacion.
3. Enviar `https://miravallesexpedition.com/sitemap.xml`.
