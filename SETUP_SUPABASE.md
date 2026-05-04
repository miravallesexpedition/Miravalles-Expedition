# Guía de Configuración - Supabase

## Paso 1: Crear cuenta en Supabase

1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Elige tu región (recomendamos una cerca de Costa Rica)
4. Espera a que se cree el proyecto

## Paso 2: Obtener las credenciales

1. En tu proyecto de Supabase, ve a **Project Settings** > **API**
2. Copia estos valores:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Paso 3: Crear las tablas

1. En Supabase, ve a **SQL Editor**
2. Abre un archivo nuevo
3. Copia el contenido de `src/db/schema.sql`
4. Ejecuta el script
5. ¡Las tablas están creadas!

## Paso 4: Actualizar variables de entorno

1. Abre `.env.local`
2. Reemplaza los valores con tus credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_aqui
```

## Paso 5: Verificar la conexión

Ejecuta:
```bash
npm run dev
```

Abre la consola del navegador (F12) y verifica que no hay errores.

---

## Próximos Pasos

1. **Resend Email**: Crear cuenta en [resend.com](https://resend.com)
2. **PayPal**: Configurar credenciales en [developer.paypal.com](https://developer.paypal.com)
3. **Implementar autenticación**: Email de confirmación
4. **Panel Admin**: Gestión de tours y reservas
