# ✅ CHECKLIST ANTES DE PUBLICAR

## 1️⃣ CONFIGURACIÓN TÉCNICA

### Backend
- [ ] Supabase cuenta creada
- [ ] Supabase URL en `.env.local`
- [ ] Supabase API Key en `.env.local`
- [ ] Tablas creadas (ejecuté schema.sql)
- [ ] Tours de ejemplo insertados

### Emails
- [ ] Resend cuenta creada
- [ ] Resend API Key en `.env.local`
- [ ] Email verificado (para produción: dominio verificado)

### Pagos
- [ ] PayPal Developer cuenta creada
- [ ] Sandbox Client ID en `.env.local`
- [ ] Sandbox Secret Key en `.env.local`
- [ ] Cuenta de prueba Personal creada
- [ ] Cuenta de prueba Business creada

### Local
- [ ] `npm run dev` funciona sin errores
- [ ] Consola del navegador sin errors
- [ ] Puedo crear una reserva
- [ ] Email de confirmación llega

---

## 2️⃣ GIT & GITHUB

- [ ] Proyecto es un repositorio Git
- [ ] Archivos importantes en `.gitignore`:
  - [ ] `.env.local` (NO subir!)
  - [ ] `node_modules/`
  - [ ] `.next/`
  - [ ] `*.log`
- [ ] Último commit hecho
- [ ] `git push` completado

---

## 3️⃣ VERCEL

- [ ] Cuenta en Vercel.com
- [ ] Conectado con GitHub
- [ ] Proyecto importado
- [ ] Variables de entorno agregadas:
  - [ ] NEXT_PUBLIC_SUPABASE_URL
  - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
  - [ ] RESEND_API_KEY
  - [ ] NEXT_PUBLIC_PAYPAL_CLIENT_ID
  - [ ] PAYPAL_SECRET_KEY
  - [ ] NEXT_PUBLIC_APP_URL (llenar después de deploy)
- [ ] Deploy iniciado
- [ ] Deploy completado ✅

---

## 4️⃣ PRUEBAS EN PRODUCCIÓN

- [ ] Sitio carga correctamente
- [ ] No hay errores en consola
- [ ] Puedo hacer una reserva
- [ ] Email de confirmación llega
- [ ] Link de confirmación funciona
- [ ] Link de pago carga (PayPal)
- [ ] Puedo "simular" un pago

---

## 5️⃣ DOMINIO PERSONALIZADO (Opcional)

Si quieres `miravallles.cr`:

- [ ] Dominio registrado (godaddy, namecheap, etc)
- [ ] Registros DNS configurados
- [ ] Dominio agregado en Vercel
- [ ] SSL automático configurado
- [ ] NEXT_PUBLIC_APP_URL actualizado
- [ ] Nuevo deploy hecho

---

## 6️⃣ PRODUCCIÓN FINAL

Cuando estés 100% seguro:

### Cambiar a PayPal Production

- [ ] Obtuve credenciales de LIVE en PayPal
- [ ] Cambié Client ID y Secret en Vercel
- [ ] Cambié URLs de `sandbox` a `live` en código
- [ ] Nuevo deploy hecho

### Verificar emails

- [ ] Resend dominio verificado
- [ ] Email "from" cambió a `info@miravallles.cr`
- [ ] Prueba enviando email de confirmación

### Seguridad

- [ ] No tengo credenciales en el código
- [ ] Todas las claves en variables de Vercel
- [ ] `.env.local` está en `.gitignore`
- [ ] HTTPS configurado (automático en Vercel)

---

## 🎯 RESUMEN

```
✅ Desarrollo local listo
   ↓
✅ Git & GitHub configurado
   ↓
✅ Vercel conectado
   ↓
✅ Variables de entorno en Vercel
   ↓
✅ Deploy automático
   ↓
✅ Sitio en vivo 🎉
   ↓
✅ Dominio personalizado (opcional)
   ↓
✅ PayPal Production (cuando estés listo)
```

---

## 📞 SOPORTE

¿Algo no funciona?

1. Revisa los **Logs** en Vercel Dashboard
2. Verifica las **Environment Variables**
3. Abre la consola del navegador (F12)
4. Busca errores en Supabase Dashboard

---

**¡Estás a 30 minutos de tener tu sitio en línea!** 🚀
