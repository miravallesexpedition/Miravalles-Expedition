# Configuracion de Supabase

Supabase guarda las reservas reales. Sin Supabase activo, la web prepara la solicitud y abre WhatsApp/correo, pero la respuesta de la API queda como `persisted: false`.

## Crear la base de datos

1. Entra a Supabase.
2. Abre el proyecto de Miravalles Expedition.
3. Ve a SQL Editor.
4. Copia y ejecuta todo el contenido de `src/db/schema.sql`.

Ese script crea:

- `tours`
- `bookings`
- `admin_users`
- `email_logs`

Los tours usan IDs tipo texto, por ejemplo `crater-volcan-miravalles`, para coincidir con la web.

Si la base ya existia antes de la columna `confirmation_expires_at`, ejecuta tambien:

```sql
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS confirmation_expires_at TIMESTAMP WITH TIME ZONE;
```

## Variables necesarias

En Vercel agrega:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
```

Tambien funcionan las llaves legacy:

```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Donde encontrarlas

En Supabase:

- Project URL: Project Settings > API.
- Publishable key: Project Settings > API Keys.
- Secret key: Project Settings > API Keys.

## Seguridad

- La publishable key puede ir como `NEXT_PUBLIC_`.
- La secret key no debe ir en archivos ni en frontend.
- La secret key solo debe guardarse como variable segura en Vercel.

## Verificacion

Despues de hacer redeploy:

1. Crear una reserva de prueba.
2. Revisar la respuesta de `/api/bookings`.
3. Debe devolver:

```json
{
  "persisted": true
}
```

Si devuelve `persisted: false`, la web sigue sin poder conectar a Supabase o la tabla no coincide con el esquema actual.
