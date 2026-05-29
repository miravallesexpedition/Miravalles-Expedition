import { isPayPalConfigured, isPayPalWebhookConfigured } from '@/lib/paypal'
import { isResendConfigured } from '@/lib/emails'
import { isSupabaseConfigured } from '@/lib/supabase'
import { isAdminConfigured } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

export async function GET() {
  const checks = {
    appUrl: Boolean(process.env.NEXT_PUBLIC_APP_URL),
    supabase: isSupabaseConfigured,
    resend: isResendConfigured,
    admin: isAdminConfigured(),
    paypal: isPayPalConfigured,
    paypalWebhook: isPayPalWebhookConfigured
  }
  const ready = checks.appUrl && checks.supabase && checks.resend && checks.admin

  return Response.json(
    {
      status: ready ? 'ready' : 'degraded',
      checks,
      timestamp: new Date().toISOString()
    },
    {
      status: ready ? 200 : 503,
      headers: {
        'Cache-Control': 'no-store'
      }
    }
  )
}
