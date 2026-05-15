import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { createAdminClient } from '@/lib/supabase-admin'
import { z } from 'zod'

const patchSchema = z.object({
  status: z.enum(['NEW', 'CALLED', 'PENDING', 'CLOSED', 'LOST']).optional(),
  notes: z.string().max(500).optional(),
  assigned_to: z.string().optional(),
})

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ ok: false, error: { code: 'UNAUTHORIZED' } }, { status: 401 })
  }

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ ok: false, error: { code: 'INVALID_JSON' } }, { status: 400 })
  }

  const parsed = patchSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: { code: 'VALIDATION_ERROR', fields: parsed.error.flatten().fieldErrors } }, { status: 422 })
  }

  const db = createAdminClient()
  const { error } = await db
    .from('leads')
    .update({ ...parsed.data, updated_at: new Date().toISOString() })
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ ok: false, error: { code: 'DB_ERROR', message: error.message } }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ ok: false, error: { code: 'UNAUTHORIZED' } }, { status: 401 })
  }

  const db = createAdminClient()
  const { data, error } = await db.from('leads').select('*').eq('id', params.id).single()

  if (error || !data) {
    return NextResponse.json({ ok: false, error: { code: 'NOT_FOUND' } }, { status: 404 })
  }

  return NextResponse.json({ ok: true, lead: data })
}
