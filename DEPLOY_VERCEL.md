# 🚀 Deploy en Vercel - Guía Completa

## ¿Por qué Vercel?
- ✅ Hosting gratuito para Next.js
- ✅ Deploy automático desde GitHub
- ✅ SSL gratuito
- ✅ CDN global
- ✅ Variables de entorno seguras
- ✅ Dominios personalizados

---

## Paso 1: Preparar el repositorio Git

```bash
# Si aún no es un repo Git
git init
git add .
git commit -m "Miravalles Expedition - Initial setup"

# O si ya es un repo
git status
git add .
git commit -m "Setup Supabase, Resend y PayPal"
git push
```

## Paso 2: Crear cuenta en Vercel

1. Ve a [https://vercel.com](https://vercel.com)
2. Click en **Sign Up**
3. Elige **Continue with GitHub** (recomendado)
4. Autoriza Vercel para acceder a tus repos

## Paso 3: Importar proyecto en Vercel

1. En el dashboard de Vercel, click en **Add New** > **Project**
2. Busca tu repositorio `Nueva carpeta` (o como se llame)
3. Selecciona el repositorio
4. Click en **Import**

## Paso 4: Configurar variables de entorno

En la pantalla de configuración antes de hacer deploy:

1. Abre la sección **Environment Variables**
2. Agrega estas variables (obtenidas de tu `.env.local`):

```
NEXT_PUBLIC_SUPABASE_URL      = tu_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY = tu_anon_key
RESEND_API_KEY                = tu_resend_api_key
NEXT_PUBLIC_PAYPAL_CLIENT_ID  = tu_paypal_client_id
PAYPAL_SECRET_KEY             = tu_paypal_secret_key
NEXT_PUBLIC_APP_URL           = https://tudominio.com (llenar después)
NEXT_PUBLIC_COMPANY_EMAIL     = info@miravallles.cr
```

3. Click en **Deploy**

## Paso 5: Esperar el deploy

Vercel construirá y desplegará automáticamente. Verás:
- ✅ Building
- ✅ Analyzing
- ✅ Deploying
- ✅ Done!

Recibirás una URL como: `https://miravalles-expedition.vercel.app`

---

## Paso 6: Conectar dominio personalizado

### Opción A: Comprar dominio en Vercel

1. En el proyecto, ve a **Settings** > **Domains**
2. Click en **Add Domain**
3. Digita `miravallles.cr` (o tu dominio)
4. Si no lo tienes, Vercel te permite comprarlo
5. Sigue las instrucciones

### Opción B: Usar dominio existente

1. Ve a tu proveedor de DNS (GoDaddy, Namecheap, etc.)
2. Crea estos registros DNS:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @ (root)
Value: 76.76.19.13
```

3. Vuelve a Vercel y agrega tu dominio
4. Espera 10-30 minutos para que se propague

---

## Paso 7: Actualizar variables de entorno

Una vez tengas tu dominio:

1. En Vercel, ve a **Settings** > **Environment Variables**
2. Edita `NEXT_PUBLIC_APP_URL`
3. Cambia a tu dominio: `https://miravallles.cr`
4. Redeploy:

```bash
git push  # Esto dispara un redeploy automático
```

---

## Paso 8: Verificar que todo funciona

1. Abre tu dominio: https://miravallles.cr
2. Prueba la funcionalidad:
   - ✅ Hacer una reserva
   - ✅ Verificar email de confirmación
   - ✅ Completar el flujo de pago (en sandbox)

---

## 🔄 Deployment automático

**Ya está configurado!** Cada vez que hagas `git push`:

1. Vercel detecta cambios
2. Construye automáticamente
3. Deploya si todo está bien
4. Tu sitio se actualiza al instante

---

## 📊 Monitoreo en Vercel

En tu dashboard de Vercel:

- **Analytics** - Ver visitantes y rendimiento
- **Logs** - Ver errores en tiempo real
- **Deployments** - Historial de deploys
- **Settings** - Configuración general

---

## 🆘 Troubleshooting

### El sitio muestra error 500

1. Revisa los **Logs** en Vercel
2. Verifica las **Environment Variables**
3. Asegúrate de que Supabase está activo

### Los emails no se envían

1. Verifica `RESEND_API_KEY` en Vercel
2. Comprueba que la cuenta de Resend está activa
3. Revisa los logs de Resend

### PayPal no funciona

1. Si estás en Sandbox: usa credenciales de Sandbox
2. Si estás en Producción: usa credenciales de Live
3. Verifica que las claves estén correctas en Vercel

---

## 📱 Próximos pasos después de publicar

1. **Dominio de email profesional**
   - Configurar `info@miravallles.cr`
   - Usar Resend como SMTP

2. **Certificado SSL personalizado**
   - Vercel lo proporciona gratis

3. **SEO**
   - Agregar meta tags
   - Crear sitemap
   - Submit a Google Search Console

4. **Analíticas**
   - Integrar Google Analytics
   - Trackear conversiones

5. **Backup**
   - Hacer backup de Supabase regularmente
   - Configurar alertas

---

## ✨ ¡Tu sitio está en vivo!

```
🌐 https://miravallles.cr
📧 info@miravallles.cr
💳 Pagos con PayPal habilitados
📧 Emails automáticos funcionando
```

**¿Todo listo?** 🎉

Ahora tienes un sitio completamente funcional con:
- ✅ Reservas en línea
- ✅ Confirmación por email
- ✅ Pagos seguros
- ✅ Panel de administración (próximo)
