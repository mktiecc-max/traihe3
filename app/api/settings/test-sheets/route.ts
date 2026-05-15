import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const { url } = await req.json()
  if (!url || typeof url !== 'string') {
    return NextResponse.json({ ok: false, error: 'URL không hợp lệ' }, { status: 400 })
  }

  try {
    const fd = new URLSearchParams({
      childName: 'TEST - Xóa dòng này',
      phone: '0900000000',
      birthYear: '2015',
      session: 'Kỳ 1 - Tháng 6',
      source: 'Admin Test',
    })

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const res = await fetch(url, {
      method: 'POST',
      body: fd,
      signal: controller.signal,
    })
    clearTimeout(timeout)

    return NextResponse.json({ ok: res.ok || res.status === 302 })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : 'Lỗi kết nối' })
  }
}
