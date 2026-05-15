'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const navItems = [
  {
    group: 'TỔNG QUAN',
    items: [
      {
        href: '/admin',
        label: 'Dashboard',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
          </svg>
        ),
      },
    ],
  },
  {
    group: 'QUẢN LÝ',
    items: [
      {
        href: '/admin/leads',
        label: 'Leads đăng ký',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
    ],
  },
  {
    group: 'HỆ THỐNG',
    items: [
      {
        href: '/admin/settings',
        label: 'Cài đặt',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        ),
      },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  const initials = session?.user?.name
    ? session.user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'A'

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="brand-mark">U</div>
        <div className="brand-info">
          <strong>UCMAS Admin</strong>
          <small>Trại hè 2026</small>
        </div>
      </div>

      {navItems.map((group) => (
        <div className="sidebar__group" key={group.group}>
          <h6>{group.group}</h6>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item${isActive(item.href) ? ' is-active' : ''}`}
            >
              <span className="icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      ))}

      <div style={{ flex: 1 }} />

      <div className="sidebar__footer">
        <div className="admin-avatar">{initials}</div>
        <div className="user-info">
          <strong>{session?.user?.name ?? 'Admin'}</strong>
          <small>{session?.user?.email ?? ''}</small>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/auth/signin' })}
          style={{ marginLeft: 'auto', background: 'transparent', border: 0, color: 'rgba(255,255,255,.5)', cursor: 'pointer', padding: 4 }}
          title="Đăng xuất"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
        </button>
      </div>
    </aside>
  )
}
