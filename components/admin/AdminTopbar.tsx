'use client'

import { usePathname } from 'next/navigation'

const breadcrumbs: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/leads': 'Leads đăng ký',
  '/admin/settings': 'Cài đặt',
}

export default function AdminTopbar() {
  const pathname = usePathname()
  const current = breadcrumbs[pathname] ?? 'Trang'

  return (
    <div className="admin-topbar">
      <div className="crumb">
        Admin <span style={{ margin: '0 4px', opacity: 0.4 }}>/</span>
        <span>{current}</span>
      </div>

      <div className="topbar-search" style={{ display: 'none' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input type="search" placeholder="Tìm kiếm..." />
      </div>

      <div className="topbar-actions">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="abtn abtn--ghost abtn--sm"
          style={{ textDecoration: 'none' }}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
          </svg>
          Xem landing
        </a>
      </div>
    </div>
  )
}
