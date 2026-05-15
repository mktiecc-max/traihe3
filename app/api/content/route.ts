import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { defaultContent, type SiteContent } from '@/lib/content'

// GET: fetch all site content
export async function GET() {
  try {
    const db = createAdminClient()
    const { data, error } = await db
      .from('site_content')
      .select('section, content')

    if (error) {
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
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}

// PUT: update a section
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
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
    const { error } = await db
      .from('site_content')
      .upsert(
        { section, content, updated_at: new Date().toISOString() },
        { onConflict: 'section' }
      )

    if (error) {
      console.error('[content] Supabase upsert error:', error)
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
