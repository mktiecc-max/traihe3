import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { createAdminClient } from '@/lib/supabase-admin'
import { appendToSheet } from '@/lib/sheets'

export const maxDuration = 60

/** POST — sync all existing leads to Google Sheets */
export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ ok: false }, { status: 401 })

  const db = createAdminClient()

  // Fetch all leads
  const { data: leads, error } = await db
    .from('leads')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  if (!leads || leads.length === 0) {
    return NextResponse.json({ ok: true, synced: 0, failed: 0 })
  }

  let synced = 0
  let failed = 0

  // Process sequentially to avoid hitting Apps Script rate limits
  for (const lead of leads) {
    try {
      const ok = await appendToSheet({
        childName: lead.child_name,
        phone: lead.phone,
        birthYear: lead.birth_year,
        session: lead.session,
        address: lead.address ?? '',
        notes: lead.notes ?? '',
        source: lead.source ?? 'Landing - Trại hè 2026',
        submittedAt: lead.created_at,
      })
      if (ok === false) failed++
      else synced++
      // Small delay to be polite to Apps Script
      await new Promise((r) => setTimeout(r, 300))
    } catch {
      failed++
    }
  }

  return NextResponse.json({ ok: true, synced, failed, total: leads.length })
}
