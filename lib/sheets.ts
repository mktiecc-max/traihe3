import type { LeadInput } from './validations'

/**
 * Fire-and-forget: append a lead row to Google Sheet via Apps Script Web App.
 * Does NOT block the API response. Failure is logged but silently ignored.
 */
export async function appendToSheet(lead: LeadInput & { source?: string; userAgent?: string }) {
  const url = process.env.GOOGLE_SHEETS_WEBAPP_URL
  if (!url || url.includes('REPLACE')) {
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
      submittedAt: new Date().toISOString(),
    })

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    await fetch(url, {
      method: 'POST',
      body: fd,
      signal: controller.signal,
    })

    clearTimeout(timeout)
  } catch (err) {
    console.warn('[sheets] sync failed:', err instanceof Error ? err.message : err)
  }
}
