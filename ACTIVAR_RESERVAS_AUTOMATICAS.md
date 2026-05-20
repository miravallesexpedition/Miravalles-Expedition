# Activar reservas, correos y pagos automáticos

La web ya tiene el flujo preparado. Para que deje de funcionar en modo manual y pase a modo automático real, faltan estas credenciales:

## 1. Supabase

Necesario para guardar reservas en base de datos.

Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Pasos:

1. Crear un proyecto en Supabase.
2. Ejecutar `src/db/schema.sql` en el SQL editor.
3. Copiar la URL del proyecto y la anon key.
4. Agregarlas en Vercel como variables de entorno.

Cuando Supabase esté bien configurado, la API `/api/bookings` guardará reservas persistentes y generará enlace de confirmación.

## 2. Resend

Necesario para enviar correos automáticos al cliente y al correo de reservas.

Variables:

```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@miravallesexpedition.com
NEXT_PUBLIC_CONTACT_EMAIL=reservas.miravallesexpedition@gmail.com
```

Recomendación:

- Verificar el dominio `miravallesexpedition.com` en Resend.
- Usar un remitente como `reservas@miravallesexpedition.com` o `noreply@miravallesexpedition.com`.

## 3. PayPal

Opcional para pagos en línea.

Variables:

```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_SECRET_KEY=
PAYPAL_ENV=sandbox
```

Para producción real:

```env
PAYPAL_ENV=live
```

Mientras PayPal no tenga credenciales reales, la página de pago muestra opción de coordinar pago por WhatsApp o correo.

## 4. Después de cambiar variables

Redeploy en Vercel:

```bash
npx vercel --prod --yes
```
