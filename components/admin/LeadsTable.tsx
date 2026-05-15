'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { Lead } from '@/lib/supabase'

const STATUSES = [
  { value: 'ALL', label: 'Tất cả' },
  { value: 'NEW', label: 'Mới' },
  { value: 'CALLED', label: 'Đã gọi' },
  { value: 'PENDING', label: 'Chờ xử lý' },
  { value: 'CLOSED', label: 'Đã chốt' },
  { value: 'LOST', label: 'Mất lead' },
]

const statusConfig: Record<string, { label: string; cls: string }> = {
  NEW: { label: 'Mới', cls: 'tag tag--new' },
  CALLED: { label: 'Đã gọi', cls: 'tag tag--called' },
  PENDING: { label: 'Chờ', cls: 'tag tag--pending' },
  CLOSED: { label: 'Đã chốt', cls: 'tag tag--closed' },
  LOST: { label: 'Mất', cls: 'tag tag--lost' },
}

interface Props {
  leads: Lead[]
  currentStatus?: string
  currentQ?: string
}

export default function LeadsTable({ leads, currentStatus, currentQ }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [q, setQ] = useState(currentQ ?? '')
  const [selectedStatus, setSelectedStatus] = useState(currentStatus ?? 'ALL')
  const [toast, setToast] = useState<string | null>(null)

  function applyFilter(status: string, search: string) {
    const params = new URLSearchParams()
    if (status && status !== 'ALL') params.set('status', status)
    if (search) params.set('q', search)
    startTransition(() => router.push(`/admin/leads?${params.toString()}`))
  }

  async function updateStatus(leadId: string, status: string) {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error()
      setToast('Cập nhật trạng thái thành công!')
      setTimeout(() => setToast(null), 3000)
      router.refresh()
    } catch {
      setToast('Lỗi cập nhật. Vui lòng thử lại.')
      setTimeout(() => setToast(null), 3000)
    }
  }

  return (
    <>
      {/* Filters */}
      <div className="filters">
        <select
          className="filter-select"
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value)
            applyFilter(e.target.value, q)
          }}
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        <input
          type="search"
          className="filter-search"
          placeholder="Tìm tên hoặc SĐT..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') applyFilter(selectedStatus, q)
          }}
        />

        <button
          className="abtn abtn--ghost abtn--sm"
          onClick={() => applyFilter(selectedStatus, q)}
          disabled={isPending}
        >
          Lọc
        </button>

        {(currentStatus || currentQ) && (
          <button
            className="abtn abtn--ghost abtn--sm"
            onClick={() => {
              setQ('')
              setSelectedStatus('ALL')
              applyFilter('ALL', '')
            }}
          >
            Xóa bộ lọc
          </button>
        )}

        <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--admin-muted)' }}>
          {leads.length} leads
        </span>
      </div>

      <div className="acard">
        <div className="acard__body--flush">
          {leads.length === 0 ? (
            <div style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--admin-muted)' }}>
              Không tìm thấy leads phù hợp.
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tên con</th>
                    <th>SĐT bố/mẹ</th>
                    <th>Năm sinh</th>
                    <th>Kỳ đăng ký</th>
                    <th>Địa chỉ</th>
                    <th>Trạng thái</th>
                    <th>Thời gian</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, idx) => {
                    const s = statusConfig[lead.status] ?? { label: lead.status, cls: 'tag' }
                    return (
                      <tr key={lead.id}>
                        <td style={{ color: 'var(--admin-muted)', fontSize: 12 }}>{idx + 1}</td>
                        <td>
                          <span style={{ fontWeight: 600, display: 'block' }}>{lead.child_name}</span>
                          {lead.notes && (
                            <span style={{ fontSize: 11, color: 'var(--admin-muted)', display: 'block', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {lead.notes}
                            </span>
                          )}
                        </td>
                        <td>
                          <a href={`tel:${lead.phone}`} style={{ color: 'var(--navy)', fontWeight: 600 }}>
                            {lead.phone}
                          </a>
                        </td>
                        <td>{lead.birth_year}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>{lead.session}</td>
                        <td style={{ color: 'var(--admin-muted)', fontSize: 12 }}>
                          {lead.address || '—'}
                        </td>
                        <td>
                          <select
                            value={lead.status}
                            onChange={(e) => updateStatus(lead.id, e.target.value)}
                            style={{
                              border: 0,
                              padding: '3px 8px',
                              borderRadius: 999,
                              fontFamily: 'inherit',
                              fontSize: 11,
                              fontWeight: 700,
                              cursor: 'pointer',
                              background:
                                lead.status === 'NEW' ? 'rgba(0,31,134,.08)' :
                                lead.status === 'CALLED' ? 'rgba(255,239,98,.5)' :
                                lead.status === 'PENDING' ? 'rgba(255,150,0,.12)' :
                                lead.status === 'CLOSED' ? 'rgba(0,102,52,.12)' :
                                'rgba(212,15,0,.08)',
                              color:
                                lead.status === 'NEW' ? 'var(--navy)' :
                                lead.status === 'CALLED' ? '#7a6000' :
                                lead.status === 'PENDING' ? '#a05000' :
                                lead.status === 'CLOSED' ? 'var(--green)' :
                                'var(--red)',
                            }}
                          >
                            <option value="NEW">Mới</option>
                            <option value="CALLED">Đã gọi</option>
                            <option value="PENDING">Chờ xử lý</option>
                            <option value="CLOSED">Đã chốt</option>
                            <option value="LOST">Mất lead</option>
                          </select>
                        </td>
                        <td style={{ color: 'var(--admin-muted)', fontSize: 12, whiteSpace: 'nowrap' }}>
                          {new Date(lead.created_at).toLocaleString('vi-VN')}
                        </td>
                        <td>
                          <a
                            href={`tel:${lead.phone}`}
                            className="abtn abtn--primary abtn--sm"
                            style={{ textDecoration: 'none' }}
                          >
                            Gọi
                          </a>
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

      {/* Toast notification */}
      {toast && (
        <div className="toast-wrap">
          <div className={`toast ${toast.includes('Lỗi') ? 'toast--error' : 'toast--success'}`}>
            {toast.includes('Lỗi') ? '⚠️' : '✓'} {toast}
          </div>
        </div>
      )}
    </>
  )
}
