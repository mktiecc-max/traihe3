import { createAdminClient } from '@/lib/supabase-admin'
import Link from 'next/link'

async function getStats() {
  try {
    const db = createAdminClient()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [totalRes, todayRes, newRes, closedRes] = await Promise.all([
      db.from('leads').select('*', { count: 'exact', head: true }),
      db.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', today.toISOString()),
      db.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'NEW'),
      db.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'CLOSED'),
    ])

    return {
      total: totalRes.count ?? 0,
      today: todayRes.count ?? 0,
      newLeads: newRes.count ?? 0,
      closed: closedRes.count ?? 0,
    }
  } catch {
    return { total: 0, today: 0, newLeads: 0, closed: 0 }
  }
}

async function getRecentLeads() {
  try {
    const db = createAdminClient()
    const { data } = await db
      .from('leads')
      .select('id, child_name, phone, session, status, created_at')
      .order('created_at', { ascending: false })
      .limit(8)
    return data ?? []
  } catch {
    return []
  }
}

const statusConfig: Record<string, { label: string; cls: string }> = {
  NEW: { label: 'Mới', cls: 'tag tag--new' },
  CALLED: { label: 'Đã gọi', cls: 'tag tag--called' },
  PENDING: { label: 'Chờ', cls: 'tag tag--pending' },
  CLOSED: { label: 'Đóng', cls: 'tag tag--closed' },
  LOST: { label: 'Mất', cls: 'tag tag--lost' },
}

export default async function AdminDashboard() {
  const [stats, leads] = await Promise.all([getStats(), getRecentLeads()])

  const statCards = [
    {
      label: 'Tổng leads',
      value: stats.total,
      icon: 'blue',
      delta: `+${stats.today} hôm nay`,
      up: true,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      label: 'Đăng ký hôm nay',
      value: stats.today,
      icon: 'green',
      delta: 'Hôm nay',
      up: true,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      label: 'Leads mới (chưa gọi)',
      value: stats.newLeads,
      icon: 'red',
      delta: 'Cần xử lý',
      up: false,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
    {
      label: 'Đã chốt',
      value: stats.closed,
      icon: 'yellow',
      delta: `${stats.total > 0 ? Math.round((stats.closed / stats.total) * 100) : 0}% conversion`,
      up: true,
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
    },
  ]

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Dashboard</h1>
          <p>Tổng quan trại hè UCMAS 2026</p>
        </div>
        <div className="page-head__actions">
          <Link href="/admin/leads" className="abtn abtn--primary">
            Xem tất cả leads
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="stats">
        {statCards.map((s) => (
          <div className="stat" key={s.label}>
            <div className={`stat__icon stat__icon--${s.icon}`}>{s.svg}</div>
            <div className="stat__body">
              <div className="stat__label">{s.label}</div>
              <div className="stat__value">{s.value}</div>
              <div className={`stat__delta stat__delta--${s.up ? 'up' : 'down'}`}>
                {s.up ? '↑' : '↓'} {s.delta}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent leads */}
      <div className="acard">
        <div className="acard__head">
          <div>
            <h3>Leads gần đây</h3>
            <p>8 đăng ký mới nhất</p>
          </div>
          <div className="right">
            <Link href="/admin/leads" className="abtn abtn--ghost abtn--sm">
              Xem tất cả
            </Link>
          </div>
        </div>
        <div className="acard__body--flush">
          {leads.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--admin-muted)' }}>
              Chưa có lead nào. Khi có đăng ký, dữ liệu sẽ hiện ở đây.
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Tên con</th>
                    <th>SĐT</th>
                    <th>Kỳ đăng ký</th>
                    <th>Trạng thái</th>
                    <th>Thời gian</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead: any) => {
                    const s = statusConfig[lead.status] ?? { label: lead.status, cls: 'tag' }
                    return (
                      <tr key={lead.id}>
                        <td style={{ fontWeight: 600 }}>{lead.child_name}</td>
                        <td>{lead.phone}</td>
                        <td>{lead.session}</td>
                        <td><span className={s.cls}>{s.label}</span></td>
                        <td style={{ color: 'var(--admin-muted)' }}>
                          {new Date(lead.created_at).toLocaleString('vi-VN')}
                        </td>
                        <td>
                          <Link
                            href={`/admin/leads/${lead.id}`}
                            className="abtn abtn--ghost abtn--sm"
                          >
                            Chi tiết
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
