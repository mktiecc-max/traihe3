import { createAdminClient } from './supabase-admin'

/**
 * Format a date string or Date to dd/mm/yyyy hh:mm:ss in Vietnam timezone (UTC+7)
 */
function formatVNDateTime(dateInput?: string | Date): string {
  const d = dateInput ? new Date(dateInput) : new Date()
  const vn = new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(d)

  const get = (t: string) => vn.find((p) => p.type === t)?.value ?? '00'
  return `${get('day')}/${get('month')}/${get('year')} ${get('hour')}:${get('minute')}:${get('second')}`
}

export type SheetLeadPayload = {
  childName: string
  phone: string
  birthYear: number
  session: string
  address?: string
  notes?: string
  source?: string
  userAgent?: string
  submittedAt?: string
}

/**
 * Resolve the Google Sheets Web App URL.
 * Priority: env var → Supabase settings table
 */
async function resolveWebAppUrl(): Promise<string | null> {
  const envUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL
  if (envUrl && !envUrl.includes('REPLACE')) {
    return envUrl
  }

  try {
    const db = createAdminClient()
    const { data } = await db
      .from('settings')
      .select('value')
      .eq('key', 'google_sheets_webapp_url')
      .single()

    if (data?.value && !data.value.includes('REPLACE')) {
      return data.value as string
    }
  } catch {
    // settings table may not exist — silently ignore
  }

  return null
}

/**
 * Fire-and-forget: append a lead row to Google Sheet via Apps Script Web App.
 * Does NOT block the API response. Failure is logged but silently ignored.
 */
export async function appendToSheet(lead: SheetLeadPayload) {
  const url = await resolveWebAppUrl()
  if (!url) {
    console.warn('[sheets] GOOGLE_SHEETS_WEBAPP_URL not configured — skipping')
    return
  }

  try {
    const fd = new URLSearchParams({
      childName: lead.childName,
      phone: lead.phone,
      birthYear: String(lead.birthYear),
      session: lead.session,
      address: lead.address ?? '',
      notes: lead.notes ?? '',
      source: lead.source ?? 'Landing - Trại hè 2026',
      userAgent: lead.userAgent ?? '',
      submittedAt: formatVNDateTime(lead.submittedAt),
    })

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    const res = await fetch(url, {
      method: 'POST',
      body: fd,
      signal: controller.signal,
    })

    clearTimeout(timeout)
    return res.ok || res.status === 302
  } catch (err) {
    console.warn('[sheets] sync failed:', err instanceof Error ? err.message : err)
    return false
  }
}
