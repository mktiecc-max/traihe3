'use client'

import { useState, useEffect } from 'react'

export default function SettingsForm() {
  const [toast, setToast] = useState<string | null>(null)
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [sheetsUrl, setSheetsUrl] = useState('')
  const [urlSource, setUrlSource] = useState<'env' | 'db' | null>(null)
  const [saving, setSaving] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState<{ synced: number; failed: number; total: number } | null>(null)

  useEffect(() => {
    fetch('/api/settings/sheets')
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) {
          setSheetsUrl(d.url ?? '')
          setUrlSource(d.source)
        }
      })
      .catch(() => {})
  }, [])

  function showToast(msg: string, type: 'success' | 'error' = 'success') {
    setToastType(type)
    setToast(msg)
    setTimeout(() => setToast(null), 4000)
  }

  const isConfigured = sheetsUrl && !sheetsUrl.includes('REPLACE')

  async function handleSave() {
    if (!sheetsUrl) return
    setSaving(true)
    try {
      const res = await fetch('/api/settings/sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: sheetsUrl }),
      })
      const json = await res.json()
      if (json.ok) {
        showToast('✓ Đã lưu URL Google Sheets thành công!')
        setUrlSource('db')
      } else {
        showToast('Lỗi: ' + (json.error ?? 'Không lưu được'), 'error')
      }
    } catch {
      showToast('Lỗi kết nối khi lưu', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleTest() {
    if (!sheetsUrl) return
    try {
      const res = await fetch('/api/settings/test-sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: sheetsUrl }),
      })
      const json = await res.json()
      if (json.ok) showToast('✓ Kết nối Google Sheets thành công!')
      else showToast('Lỗi kết nối: ' + (json.error ?? 'Sheets không phản hồi'), 'error')
    } catch {
      showToast('Lỗi kết nối. Kiểm tra URL và thử lại.', 'error')
    }
  }

  async function handleSyncAll() {
    if (!isConfigured) {
      showToast('Vui lòng lưu URL Google Sheets trước', 'error')
      return
    }
    setSyncing(true)
    setSyncResult(null)
    try {
      const res = await fetch('/api/leads/sync-sheets', { method: 'POST' })
      const json = await res.json()
      if (json.ok) {
        setSyncResult({ synced: json.synced, failed: json.failed, total: json.total })
        showToast(`✓ Đã đồng bộ ${json.synced}/${json.total} leads lên Google Sheets!`)
      } else {
        showToast('Lỗi đồng bộ: ' + (json.error ?? 'Không xác định'), 'error')
      }
    } catch {
      showToast('Lỗi kết nối khi đồng bộ', 'error')
    } finally {
      setSyncing(false)
    }
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
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: '3px 9px',
                borderRadius: 999,
                background: isConfigured ? 'rgba(0,102,52,.12)' : 'rgba(212,15,0,.08)',
                color: isConfigured ? 'var(--green)' : 'var(--red)',
              }}
            >
              {isConfigured ? '● Đã kết nối' : '● Chưa cấu hình'}
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
              style={{ fontFamily: 'monospace', fontSize: 13 }}
            />
          </div>
          {urlSource === 'env' && (
            <p style={{ fontSize: 12, color: 'var(--admin-muted)', margin: '-4px 0 12px', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span> Đọc từ biến môi trường <code>GOOGLE_SHEETS_WEBAPP_URL</code>
            </p>
          )}
          {urlSource === 'db' && (
            <p style={{ fontSize: 12, color: 'var(--admin-muted)', margin: '-4px 0 12px', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span> Đọc từ cài đặt đã lưu
            </p>
          )}
          <p style={{ fontSize: 12, color: 'var(--admin-muted)', margin: '0 0 14px' }}>
            Dán URL Web App từ Google Apps Script. Nhấn <strong>Lưu URL</strong> để kích hoạt tự đồng bộ,
            sau đó <strong>Test kết nối</strong> để kiểm tra. Xem hướng dẫn trong <code>google-sheets-setup.md</code>.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              className="abtn abtn--primary"
              onClick={handleSave}
              disabled={saving || !sheetsUrl}
            >
              {saving ? 'Đang lưu...' : '💾 Lưu URL'}
            </button>
            <button
              className="abtn"
              onClick={handleTest}
              disabled={!isConfigured}
            >
              🔗 Test kết nối
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Sync */}
      <div className="acard" style={{ marginBottom: 20 }}>
        <div className="acard__head">
          <div>
            <h3>Đồng bộ dữ liệu lên Google Sheets</h3>
            <p>Đẩy toàn bộ lead hiện có trong hệ thống lên Google Sheets</p>
          </div>
        </div>
        <div className="acard__body">
          <p style={{ fontSize: 13, color: 'var(--admin-muted)', margin: '0 0 14px' }}>
            Dùng tính năng này để đồng bộ tất cả lead đã lưu (bao gồm cả lead cũ trước khi cài đặt Sheets) lên Google Sheet.
            Mỗi lead được gửi tuần tự, có thể mất vài giây nếu có nhiều lead.
          </p>
          {syncResult && (
            <div
              style={{
                marginBottom: 14,
                padding: '10px 14px',
                borderRadius: 8,
                background: syncResult.failed === 0 ? 'rgba(0,102,52,.08)' : 'rgba(212,100,0,.08)',
                color: syncResult.failed === 0 ? 'var(--green)' : 'var(--orange, #c96a00)',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {syncResult.failed === 0
                ? `✓ Đã đồng bộ thành công ${syncResult.synced}/${syncResult.total} leads`
                : `⚠ Đã đồng bộ ${syncResult.synced}/${syncResult.total} leads (${syncResult.failed} lỗi)`}
            </div>
          )}
          <button
            className="abtn abtn--primary"
            onClick={handleSyncAll}
            disabled={syncing || !isConfigured}
          >
            {syncing ? '⏳ Đang đồng bộ...' : '🔄 Đồng bộ tất cả lead'}
          </button>
          {!isConfigured && (
            <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 8 }}>
              ⚠ Cần lưu URL Google Sheets trước khi đồng bộ
            </p>
          )}
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
          <div className={`toast ${toastType === 'error' ? 'toast--error' : 'toast--success'}`}>
            {toast}
          </div>
        </div>
      )}
    </>
  )
}
