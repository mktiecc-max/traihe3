import type { Metadata } from 'next'
import SessionProvider from '@/components/admin/SessionProvider'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminTopbar from '@/components/admin/AdminTopbar'

export const metadata: Metadata = {
  title: 'UCMAS Admin — Quản trị Trại hè 2026',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="admin-body">
        <div className="admin-app">
          <AdminSidebar />
          <div className="admin-main">
            <AdminTopbar />
            <div className="admin-content">{children}</div>
          </div>
        </div>
      </div>
    </SessionProvider>
  )
}
