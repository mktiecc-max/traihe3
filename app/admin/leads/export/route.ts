import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { createAdminClient } from '@/lib/supabase-admin'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  const db = createAdminClient()
  const { data } = await db
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (!data) {
    return new NextResponse('No data', { status: 404 })
  }

  const headers = [
    'STT', 'ID', 'Tên con', 'SĐT', 'Năm sinh', 'Kỳ đăng ký',
    'Địa chỉ', 'Mong muốn', 'Nguồn', 'Trạng thái', 'Thời gian đăng ký',
  ]

  const rows = data.map((lead, i) => [
    i + 1,
    lead.id,
    `"${lead.child_name}"`,
    lead.phone,
    lead.birth_year,
    `"${lead.session}"`,
    `"${lead.address ?? ''}"`,
    `"${(lead.notes ?? '').replace(/"/g, '""')}"`,
    `"${lead.source ?? ''}"`,
    lead.status,
    new Date(lead.created_at).toLocaleString('vi-VN'),
  ])

  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
  const bom = '\uFEFF' // BOM for Excel Vietnamese

  return new NextResponse(bom + csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="ucmas-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
