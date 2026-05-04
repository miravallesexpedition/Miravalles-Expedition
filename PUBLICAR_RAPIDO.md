## 🚀 PUBLICAR EN 3 PASOS

### ⚠️ Requisitos previos:
- ✅ Supabase configurado (URL y API Key)
- ✅ Resend configurado (API Key)
- ✅ PayPal configurado (Client ID y Secret)
- ✅ Proyecto en Git (GitHub)

---

## PASO 1: Preparar Git

```bash
git add .
git commit -m "Miravalles Expedition - Listo para producción"
git push
```

---

## PASO 2: Conectar a Vercel

1. Ve a https://vercel.com
2. Click en **Sign Up** → **Continue with GitHub**
3. Autoriza Vercel
4. Click en **Add New** → **Project**
5. Selecciona tu repositorio
6. Click en **Import**

---

## PASO 3: Configurar variables y deployar

**Antes de hacer click en Deploy**, agrega estas variables:

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Tu URL de Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Tu API Key de Supabase |
| `RESEND_API_KEY` | Tu API Key de Resend |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | Tu Client ID de PayPal |
| `PAYPAL_SECRET_KEY` | Tu Secret Key de PayPal |
| `NEXT_PUBLIC_APP_URL` | `https://miravallles.cr` (después) |

Luego: **Click en Deploy** → Espera 2-3 minutos → ¡Listo! 🎉

---

## Tu URL será:
`https://your-project.vercel.app`

## Para usar tu dominio personalizado:
Ver [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md) - Paso 6

---

## ✅ Verificar que funciona:

1. Abre tu URL de Vercel
2. Intenta hacer una reserva
3. Revisa que llegue email de confirmación
4. Prueba el flujo completo

**¡Listo! Tu sitio está en línea 🌐**
