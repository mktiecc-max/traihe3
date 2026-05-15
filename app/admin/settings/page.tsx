import SettingsForm from '@/components/admin/SettingsForm'

export default function SettingsPage() {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Cài đặt</h1>
          <p>Cấu hình tích hợp và thông tin liên hệ</p>
        </div>
      </div>
      <SettingsForm />
    </>
  )
}
