# Activar reservas automaticas

La web ya tiene el flujo preparado. Para que deje de funcionar en modo manual y pase a modo automatico real, faltan estos puntos.

## 1. Supabase

Necesario para guardar reservas, confirmar enlaces y permitir pago PayPal despues de confirmar.

Variables en Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
```

Tambien se puede usar la llave legacy:

```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Pasos:

1. Crear o abrir el proyecto en Supabase.
2. Ir a SQL Editor.
3. Ejecutar el contenido de `src/db/schema.sql`.
4. Ir a Project Settings > API Keys.
5. Copiar:
   - Project URL.
   - Publishable key o legacy anon key.
   - Secret key o legacy service_role key.
6. Agregar las variables en Vercel.
7. Redeploy.
8. Probar `/api/bookings`; debe devolver `persisted: true`.

Nota de seguridad: `SUPABASE_SECRET_KEY` o `SUPABASE_SERVICE_ROLE_KEY` solo deben estar en Vercel, nunca en archivos ni en el navegador.

## 2. Resend

Ya existe la API key en Vercel. El dominio esta creado en Resend y esta pendiente de DNS.

Registros a agregar:

- Ver `RESEND_DNS_RECORDS.md`.

Cuando el DNS este guardado:

1. Esperar propagacion.
2. Verificar dominio en Resend.
3. Confirmar que `miravallesexpedition.com` aparece como `verified`.
4. La web podra enviar correos automaticos de reserva.

## 3. PayPal

Ya esta configurado en Vercel como produccion:

```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=...
PAYPAL_SECRET_KEY=...
PAYPAL_ENV=live
```

La web permite PayPal solo para reservas en USD. Las reservas nacionales en CRC se coordinan por WhatsApp, deposito o efectivo.
La orden de PayPal se crea con `POST` desde la pagina de pago y usa idempotencia para que los reintentos no generen capturas duplicadas.

Variables operativas recomendadas:

```env
ADMIN_ACCESS_TOKEN=
MAX_PARTICIPANTS_PER_TOUR=10
MAX_PARTICIPANTS_HOT_SPRINGS=30
BOOKING_CONFIRMATION_EXPIRES_HOURS=24
```

## 4. Prueba final

Despues de Supabase y Resend:

1. Crear reserva extranjera.
2. Confirmar enlace.
3. Abrir pagina de pago.
4. Crear orden PayPal.
5. Crear reserva nacional.
6. Confirmar que se guarda en Supabase y no intenta cobrar CRC por PayPal.
7. Confirmar que `/admin/reservas` pide clave y luego mantiene la sesion sin usar `?token=`.
