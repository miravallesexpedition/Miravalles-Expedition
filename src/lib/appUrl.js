export const publicAppUrl = 'https://miravallesexpedition.com'

export function getAppUrl(requestUrl) {
  const configuredUrl = normalizeUrl(process.env.NEXT_PUBLIC_APP_URL)

  if (configuredUrl) {
    return configuredUrl
  }

  if (requestUrl) {
    try {
      return new URL(requestUrl).origin
    } catch {
      return publicAppUrl
    }
  }

  return publicAppUrl
}

function normalizeUrl(value) {
  const cleanValue = String(value || '').trim()

  if (!cleanValue) {
    return null
  }

  return cleanValue.replace(/\/+$/, '')
}
