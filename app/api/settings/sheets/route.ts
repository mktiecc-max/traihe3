import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { createAdminClient } from '@/lib/supabase-admin'

/** GET — return current saved URL */
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ ok: false }, { status: 401 })

  const db = createAdminClient()

  // Try env var first
  const envUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL
  if (envUrl && !envUrl.includes('REPLACE')) {
    return NextResponse.json({ ok: true, url: envUrl, source: 'env' })
  }

  // Fallback: settings table
  const { data } = await db
    .from('settings')
    .select('value')
    .eq('key', 'google_sheets_webapp_url')
    .single()

  return NextResponse.json({ ok: true, url: data?.value ?? '', source: 'db' })
}

/** POST — save URL to Supabase settings table */
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ ok: false }, { status: 401 })

  const { url } = await req.json()
  if (!url || typeof url !== 'string') {
    return NextResponse.json({ ok: false, error: 'URL không hợp lệ' }, { status: 400 })
  }

  const db = createAdminClient()

  // Upsert into settings table
  const { error } = await db.from('settings').upsert(
    { key: 'google_sheets_webapp_url', value: url },
    { onConflict: 'key' }
  )

  if (error) {
    console.error('[settings/sheets] upsert error:', error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
