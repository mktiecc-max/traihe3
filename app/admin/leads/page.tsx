import { createAdminClient } from '@/lib/supabase-admin'
import LeadsTable from '@/components/admin/LeadsTable'

async function getLeads(status?: string, q?: string) {
  try {
    const db = createAdminClient()
    let query = db
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (status && status !== 'ALL') {
      query = query.eq('status', status)
    }
    if (q) {
      query = query.or(`child_name.ilike.%${q}%,phone.ilike.%${q}%`)
    }

    const { data, error } = await query
    if (error) throw error
    return data ?? []
  } catch {
    return []
  }
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: { status?: string; q?: string }
}) {
  const leads = await getLeads(searchParams.status, searchParams.q)

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Leads đăng ký</h1>
          <p>Danh sách phụ huynh đăng ký tư vấn</p>
        </div>
        <div className="page-head__actions">
          <a
            href="/admin/leads/export"
            className="abtn abtn--ghost"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Xuất CSV
          </a>
        </div>
      </div>

      <LeadsTable leads={leads} currentStatus={searchParams.status} currentQ={searchParams.q} />
    </>
  )
}
