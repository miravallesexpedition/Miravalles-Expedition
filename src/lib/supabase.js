import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const serverKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseKey = serverKey || publicKey

function isValidSupabaseKey(key) {
  if (!key) return false
  return key.startsWith('sb_publishable_') || key.startsWith('sb_secret_') || key.length > 80
}

export const isSupabaseConfigured = Boolean(
  supabaseUrl?.startsWith('https://') &&
  isValidSupabaseKey(supabaseKey)
)
export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseKey) : null
