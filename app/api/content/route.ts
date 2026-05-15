import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { defaultContent, type SiteContent } from '@/lib/content'

// GET: fetch all site content (dùng cho cả admin lẫn landing preview)
export async function GET() {
  try {
    const db = createAdminClient()
    const { data, error } = await db
      .from('site_content')
      .select('section, content')

    if (error) {
      console.error('[content GET] Supabase error:', error)
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    // Merge with defaults
    const content: SiteContent = { ...defaultContent }
    if (data) {
      for (const row of data) {
        const key = row.section as keyof SiteContent
        if (key in content) {
          content[key] = { ...content[key], ...row.content }
        }
      }
    }

    return NextResponse.json({ ok: true, content })
  } catch (err) {
    console.error('[content GET] Unexpected error:', err)
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}

// PUT: update a section
export async function PUT(req: NextRequest) {
  try {
    let body: any
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
    }

    const { section, content } = body as { section: string; content: Record<string, unknown> }

    if (!section || !content) {
      return NextResponse.json(
        { ok: false, error: 'Missing section or content' },
        { status: 400 }
      )
    }

    // Validate section key
    if (!(section in defaultContent)) {
      return NextResponse.json(
        { ok: false, error: `Invalid section: ${section}` },
        { status: 400 }
      )
    }

    const db = createAdminClient()

    // Upsert: insert hoặc update nếu đã tồn tại
    const { error } = await db
      .from('site_content')
      .upsert(
        { section, content, updated_at: new Date().toISOString() },
        { onConflict: 'section' }
      )

    if (error) {
      console.error('[content PUT] Supabase upsert error:', error.message, error.details, error.hint)
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[content PUT] Unexpected error:', err)
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
