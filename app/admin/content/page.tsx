import ContentEditor from '@/components/admin/ContentEditor'

export default function ContentPage() {
  return (
    <>
      <h2 style={{ marginBottom: 4 }}>Quản lý nội dung</h2>
      <p style={{ color: 'var(--admin-muted)', marginTop: 0, marginBottom: 20 }}>
        Chỉnh sửa nội dung tất cả các section trên landing page. Thay đổi sẽ hiện trên website sau khi lưu.
      </p>
      <ContentEditor />
    </>
  )
}
