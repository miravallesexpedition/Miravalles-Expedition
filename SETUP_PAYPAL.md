# Configuración de PayPal

## ¿Por qué PayPal?
PayPal es seguro, confiable y ampliamente aceptado. Es perfecto para negocios de turismo en Latinoamérica.

## Paso 1: Crear cuenta PayPal Business

1. Ve a [https://www.paypal.com/es/](https://www.paypal.com/es/)
2. Crea una cuenta de **negocio**
3. Verifica tu email y teléfono
4. Proporciona información de tu empresa

## Paso 2: Configurar Sandbox (para pruebas)

1. Ve a [https://developer.paypal.com/](https://developer.paypal.com/)
2. Inicia sesión con tu cuenta PayPal
3. Ve a **Apps & Credentials**
4. Selecciona **Sandbox**
5. Busca tus apps en **REST API apps**

## Paso 3: Obtener credenciales

En el Dashboard de PayPal Developer:

1. **Client ID**: Cópialo
2. **Secret**: Cópialo

## Paso 4: Actualizar .env.local

```env
# Sandbox (para desarrollo/pruebas)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=tu_sandbox_client_id
PAYPAL_SECRET_KEY=tu_sandbox_secret_key

# Para producción, usa:
# NEXT_PUBLIC_PAYPAL_CLIENT_ID=tu_production_client_id
# PAYPAL_SECRET_KEY=tu_production_secret_key
```

## Paso 5: Crear cuenta de prueba (Sandbox)

En PayPal Developer Dashboard:

1. Ve a **Sandbox** > **Accounts**
2. Crea dos cuentas:
   - **Personal Account** (para clientes)
   - **Business Account** (para ti)

### Datos de prueba:

**Cliente (Personal):**
```
Email: sb-xxxxx@personal.example.com
Contraseña: 12345678
Saldo: $1000 (por defecto)
```

**Negocio (Business):**
```
Email: sb-xxxxx@business.example.com
Contraseña: 12345678
```

## Paso 6: Probar pagos

1. Ejecuta `npm run dev`
2. Intenta hacer una reserva
3. En el paso de pago, serás redirigido a PayPal Sandbox
4. Usa la cuenta personal para simular el pago
5. Confirma el pago

## URLs importantes

- **Sandbox Testing**: https://www.sandbox.paypal.com/
- **API Reference**: https://developer.paypal.com/docs/api/orders/v2/
- **Dashboard**: https://www.paypal.com/es/

## Migración a Producción

Cuando estés listo para ir a producción:

1. Ve a **Apps & Credentials** > **Live**
2. Obtén tus credenciales de producción
3. Actualiza `.env.local` con las credenciales de Live
4. Cambia las URLs de `sandbox` a `live`
5. ¡Listo para recibir dinero real!

---

## Próximos Pasos

1. ✅ Supabase - Base de datos
2. ✅ Resend - Emails
3. ✅ PayPal - Pagos
4. ⏳ Panel Admin - Gestión
5. ⏳ Multiidioma - i18n
