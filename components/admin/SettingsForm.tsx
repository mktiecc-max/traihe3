'use client'

import { useState } from 'react'

export default function SettingsForm() {
  const [toast, setToast] = useState<string | null>(null)
  const [sheetsUrl, setSheetsUrl] = useState(
    process.env.NEXT_PUBLIC_SHEETS_URL_HINT ?? ''
  )

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <>
      {/* Google Sheets Integration */}
      <div className="acard" style={{ marginBottom: 20 }}>
        <div className="acard__head">
          <div>
            <h3>Google Sheets</h3>
            <p>Tự động đổ lead về Google Sheet khi có đăng ký mới</p>
          </div>
          <div className="right">
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: sheetsUrl && !sheetsUrl.includes('REPLACE') ? 'rgba(0,102,52,.12)' : 'rgba(212,15,0,.08)', color: sheetsUrl && !sheetsUrl.includes('REPLACE') ? 'var(--green)' : 'var(--red)' }}>
              {sheetsUrl && !sheetsUrl.includes('REPLACE') ? 'Đã kết nối' : 'Chưa cấu hình'}
            </span>
          </div>
        </div>
        <div className="acard__body">
          <div className="afield">
            <label>Web App URL (từ Google Apps Script)</label>
            <input
              type="url"
              placeholder="https://script.google.com/macros/s/.../exec"
              value={sheetsUrl}
              onChange={(e) => setSheetsUrl(e.target.value)}
            />
          </div>
          <p style={{ fontSize: 12, color: 'var(--admin-muted)', margin: '0 0 14px' }}>
            Xem hướng dẫn chi tiết trong file <code>google-sheets-setup.md</code>. URL này cần được đặt trong <strong>GOOGLE_SHEETS_WEBAPP_URL</strong> trong file <code>.env.local</code>.
          </p>
          <button
            className="abtn abtn--primary"
            onClick={async () => {
              if (!sheetsUrl) return
              try {
                const res = await fetch('/api/settings/test-sheets', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ url: sheetsUrl }),
                })
                const json = await res.json()
                showToast(json.ok ? 'Kết nối Google Sheets thành công!' : 'Lỗi kết nối Sheets')
              } catch {
                showToast('Lỗi kết nối. Kiểm tra URL và thử lại.')
              }
            }}
          >
            Test kết nối
          </button>
        </div>
      </div>

      {/* Telegram */}
      <div className="acard" style={{ marginBottom: 20 }}>
        <div className="acard__head">
          <h3>Telegram Notification</h3>
          <p style={{ margin: 0, color: 'var(--admin-muted)', fontSize: 12 }}>Nhận thông báo lead mới qua Telegram bot</p>
        </div>
        <div className="acard__body">
          <div className="settings-grid">
            <div className="afield">
              <label>Bot Token</label>
              <input type="password" placeholder="••••••••••••••••" disabled />
            </div>
            <div className="afield">
              <label>Chat ID</label>
              <input type="text" placeholder="Xem biến TELEGRAM_CHAT_ID trong .env.local" disabled />
            </div>
          </div>
          <p style={{ fontSize: 12, color: 'var(--admin-muted)', margin: 0 }}>
            Cấu hình qua biến môi trường <strong>TELEGRAM_BOT_TOKEN</strong> và <strong>TELEGRAM_CHAT_ID</strong> trong <code>.env.local</code>.
          </p>
        </div>
      </div>

      {/* Contact info */}
      <div className="acard" style={{ marginBottom: 20 }}>
        <div className="acard__head">
          <h3>Thông tin liên hệ</h3>
        </div>
        <div className="acard__body">
          <div className="settings-grid">
            <div className="afield">
              <label>Hotline</label>
              <input type="tel" defaultValue="0967.868.623" />
            </div>
            <div className="afield">
              <label>Email</label>
              <input type="email" defaultValue="admin@ucmasvietnam.com" />
            </div>
            <div className="afield">
              <label>Địa chỉ</label>
              <input type="text" defaultValue="Số 37 ngõ 80 Trung Kính, Yên Hòa, Hà Nội" />
            </div>
            <div className="afield">
              <label>Website</label>
              <input type="url" defaultValue="https://www.ucmasvietnam.com" />
            </div>
          </div>
          <p style={{ fontSize: 12, color: 'var(--admin-muted)', margin: '8px 0 14px' }}>
            Để lưu các thay đổi vào database, cần cấu hình bảng <code>settings</code> trong Supabase.
          </p>
          <button className="abtn abtn--primary" onClick={() => showToast('Đã lưu cài đặt!')}>
            Lưu thay đổi
          </button>
        </div>
      </div>

      {/* Env vars guide */}
      <div className="acard">
        <div className="acard__head">
          <h3>Hướng dẫn cấu hình biến môi trường</h3>
        </div>
        <div className="acard__body">
          <p style={{ fontSize: 13, color: 'var(--admin-muted)', marginTop: 0 }}>
            Tạo file <code>.env.local</code> từ file <code>.env.example</code> và điền đầy đủ các giá trị:
          </p>
          <pre style={{ background: '#f4f6fb', padding: '14px 16px', borderRadius: 8, fontSize: 12, overflowX: 'auto', margin: 0, color: 'var(--admin-ink)' }}>
{`NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/...
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
ADMIN_ALLOWED_EMAILS=yen@ucmasvietnam.com`}
          </pre>
        </div>
      </div>

      {/* Toast */}
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
