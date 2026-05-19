import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { createAdminClient } from '@/lib/supabase-admin'

/** GET — debug: show which URL is actually being resolved */
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ ok: false }, { status: 401 })

  const envUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL ?? null
  let dbUrl: string | null = null

  try {
    const db = createAdminClient()
    const { data } = await db
      .from('settings')
      .select('value')
      .eq('key', 'google_sheets_webapp_url')
      .single()
    dbUrl = data?.value ?? null
  } catch {
    dbUrl = null
  }

  const activeUrl = (dbUrl && !dbUrl.includes('REPLACE') && dbUrl.startsWith('https://'))
    ? dbUrl
    : (envUrl && !envUrl.includes('REPLACE') && envUrl.startsWith('https://'))
      ? envUrl
      : null

  return NextResponse.json({
    ok: true,
    activeUrl,         // URL thực sự được dùng khi sync
    activeSource: activeUrl === dbUrl ? 'database' : activeUrl === envUrl ? 'env_var' : 'none',
    dbUrl,             // URL trong Supabase settings
    envUrl,            // URL trong biến môi trường Vercel
  })
}
