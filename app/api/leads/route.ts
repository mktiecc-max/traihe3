import { NextRequest, NextResponse } from 'next/server'
import { leadSchema } from '@/lib/validations'
import { createAdminClient } from '@/lib/supabase-admin'
import { appendToSheet } from '@/lib/sheets'
import { notifyTelegram } from '@/lib/telegram'

// Simple in-memory rate limit: 5 requests per minute per IP
const rateMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || entry.resetAt < now) {
    rateMap.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }
  if (entry.count >= 5) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: { code: 'RATE_LIMIT', message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.' } },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: 'INVALID_JSON', message: 'Request body không hợp lệ.' } },
      { status: 400 }
    )
  }

  // Honeypot check
  if (typeof body === 'object' && body !== null && (body as Record<string, unknown>).website) {
    // Silently succeed for bots
    return NextResponse.json({ ok: true })
  }

  // Validate
  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Dữ liệu không hợp lệ.',
          fields: parsed.error.flatten().fieldErrors,
        },
      },
      { status: 422 }
    )
  }

  const data = parsed.data
  const userAgent = req.headers.get('user-agent') ?? ''

  // Get UTM params from referer/body if present
  const utm = (body as Record<string, unknown>).utm as Record<string, string> | undefined

  // Insert into Supabase
  const db = createAdminClient()
  const { data: lead, error } = await db
    .from('leads')
    .insert({
      child_name: data.childName,
      phone: data.phone,
      birth_year: data.birthYear,
      session: data.session,
      address: data.address,
      notes: data.notes,
      source: 'Landing - Trại hè 2026',
      utm: utm ?? null,
      user_agent: userAgent,
      ip,
      status: 'NEW',
    })
    .select()
    .single()

  if (error) {
    console.error('[leads] Supabase insert error:', error)
    return NextResponse.json(
      { ok: false, error: { code: 'DB_ERROR', message: 'Lỗi lưu dữ liệu.' } },
      { status: 500 }
    )
  }

  // Fire-and-forget: Google Sheets + Telegram (do NOT await — keep response fast)
  appendToSheet({ ...data, leadId: lead?.id, source: 'Landing - Trại hè 2026', userAgent })
  if (lead) notifyTelegram(lead)

  return NextResponse.json({ ok: true, leadId: lead?.id })
}
