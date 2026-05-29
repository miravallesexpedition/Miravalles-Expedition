import fs from 'fs'
import path from 'path'

const envPath = path.join(process.cwd(), '.env.local')
const fileEnv = fs.existsSync(envPath) ? parseEnvFile(fs.readFileSync(envPath, 'utf8')) : {}
const env = { ...fileEnv, ...process.env }

const required = [
  'NEXT_PUBLIC_APP_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  ['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'],
  ['SUPABASE_SECRET_KEY', 'SUPABASE_SERVICE_ROLE_KEY'],
  'RESEND_API_KEY',
  'RESEND_FROM_EMAIL',
  'ADMIN_ACCESS_TOKEN'
]

const recommended = [
  'NEXT_PUBLIC_CONTACT_EMAIL',
  'NEXT_PUBLIC_WHATSAPP_NUMBER',
  'PAYPAL_ENV',
  'NEXT_PUBLIC_PAYPAL_CLIENT_ID',
  'PAYPAL_SECRET_KEY',
  'PAYPAL_WEBHOOK_ID'
]

const errors = []
const warnings = []

for (const requirement of required) {
  if (Array.isArray(requirement)) {
    if (!requirement.some((key) => hasValue(env[key]))) {
      errors.push(`Missing one of: ${requirement.join(', ')}`)
    }
    continue
  }

  if (!hasValue(env[requirement])) {
    errors.push(`Missing required variable: ${requirement}`)
  }
}

for (const key of recommended) {
  if (!hasValue(env[key])) {
    warnings.push(`Recommended variable is empty: ${key}`)
  }
}

if (hasValue(env.NEXT_PUBLIC_APP_URL)) {
  try {
    const appUrl = new URL(env.NEXT_PUBLIC_APP_URL)
    if (appUrl.protocol !== 'https:' || appUrl.hostname === 'localhost') {
      errors.push('NEXT_PUBLIC_APP_URL must be the production HTTPS domain before deploy.')
    }
  } catch (error) {
    errors.push('NEXT_PUBLIC_APP_URL must be a valid URL.')
  }
}

if (hasValue(env.ADMIN_ACCESS_TOKEN) && String(env.ADMIN_ACCESS_TOKEN).length < 16) {
  errors.push('ADMIN_ACCESS_TOKEN should be at least 16 characters.')
}

if (hasValue(env.PAYPAL_ENV) && !['sandbox', 'live'].includes(env.PAYPAL_ENV)) {
  errors.push('PAYPAL_ENV must be sandbox or live.')
}

if (env.PAYPAL_ENV === 'live' && !hasValue(env.PAYPAL_WEBHOOK_ID)) {
  errors.push('PAYPAL_WEBHOOK_ID is required when PAYPAL_ENV=live.')
}

if (warnings.length) {
  console.warn('Deploy env warnings:')
  for (const warning of warnings) console.warn(`- ${warning}`)
}

if (errors.length) {
  console.error('Deploy env check failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log('Deploy env check passed.')
}

function hasValue(value) {
  return Boolean(String(value || '').trim())
}

function parseEnvFile(content) {
  const result = {}

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue

    const separatorIndex = line.indexOf('=')
    if (separatorIndex === -1) continue

    const key = line.slice(0, separatorIndex).trim()
    let value = line.slice(separatorIndex + 1).trim()

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    result[key] = value
  }

  return result
}
