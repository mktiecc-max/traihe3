'use client'

import { useState, useEffect, useCallback } from 'react'
import { defaultContent, sectionLabels, type SiteContent } from '@/lib/content'

type SectionKey = keyof SiteContent

// ===== Sub-components trích xuất ra ngoài để tránh re-mount khi state thay đổi =====

function CmsTextField({ label, value, onChange }: {
  label: string; value: string; onChange: (v: string) => void
}) {
  return (
    <div className="afield">
      <label>{label}</label>
      <input type="text" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

function CmsTextArea({ label, value, onChange, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number
}) {
  return (
    <div className="afield">
      <label>{label}</label>
      <textarea rows={rows} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

function CmsNumberField({ label, value, onChange }: {
  label: string; value: number; onChange: (v: number) => void
}) {
  return (
    <div className="afield">
      <label>{label}</label>
      <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  )
}

function CmsObjectArray({ items, keys, labels, addLabel, onUpdate, onAdd, onRemove }: {
  items: Record<string, string>[]
  keys: string[]
  labels: string[]
  addLabel: string
  onUpdate: (index: number, key: string, value: string) => void
  onAdd: () => void
  onRemove: (index: number) => void
}) {
  return (
    <div className="cms-array">
      {items.map((item, i) => (
        <div key={i} className="cms-array__item">
          <div className="cms-array__row">
            {keys.map((k, ki) => (
              <div className="afield" key={k} style={{ flex: ki === keys.length - 1 ? 2 : 1 }}>
                <label>{labels[ki]} #{i + 1}</label>
                {k === 'desc' || k === 'a' || k === 'text' ? (
                  <textarea rows={2} value={item[k] ?? ''} onChange={(e) => onUpdate(i, k, e.target.value)} />
                ) : (
                  <input type="text" value={item[k] ?? ''} onChange={(e) => onUpdate(i, k, e.target.value)} />
                )}
              </div>
            ))}
          </div>
          <button type="button" className="abtn abtn--danger abtn--sm" onClick={() => onRemove(i)}>✕ Xóa</button>
        </div>
      ))}
      <button type="button" className="abtn abtn--outline abtn--sm" onClick={onAdd}>
        + {addLabel}
      </button>
    </div>
  )
}

function CmsStringArray({ items, label, addLabel, onUpdate, onAdd, onRemove }: {
  items: string[]
  label: string
  addLabel: string
  onUpdate: (index: number, value: string) => void
  onAdd: () => void
  onRemove: (index: number) => void
}) {
  return (
    <div className="cms-array">
      <label style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>{label}</label>
      {items.map((item, i) => (
        <div key={i} className="cms-array__item" style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <input type="text" value={item} onChange={(e) => onUpdate(i, e.target.value)} style={{ flex: 1 }} />
          <button type="button" className="abtn abtn--danger abtn--sm" onClick={() => onRemove(i)}>✕</button>
        </div>
      ))}
      <button type="button" className="abtn abtn--outline abtn--sm" onClick={onAdd}>
        + {addLabel}
      </button>
    </div>
  )
}

// ===== Main Editor =====

export default function ContentEditor() {
  const [content, setContent] = useState<SiteContent>(defaultContent)
  const [activeSection, setActiveSection] = useState<SectionKey>('hero')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((json) => {
        if (json.ok && json.content) setContent(json.content)
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  async function saveSection(section: SectionKey) {
    setSaving(true)
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, content: content[section] }),
      })
      const json = await res.json()
      showToast(json.ok ? `✓ Đã lưu "${sectionLabels[section]}"` : '⚠️ Lỗi lưu dữ liệu')
    } catch {
      showToast('⚠️ Lỗi kết nối server')
    }
    setSaving(false)
  }

  // Hàm cập nhật field đơn
  const updateField = useCallback((section: SectionKey, field: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }))
  }, [])

  // Hàm cập nhật item trong array of objects
  const updateArrayItem = useCallback((section: SectionKey, field: string, index: number, key: string, value: string) => {
    setContent((prev) => {
      const arr = [...(prev[section] as any)[field]]
      arr[index] = { ...arr[index], [key]: value }
      return { ...prev, [section]: { ...prev[section], [field]: arr } }
    })
  }, [])

  // Thêm item vào array of objects
  const addArrayItem = useCallback((section: SectionKey, field: string, template: Record<string, string>) => {
    setContent((prev) => {
      const arr = [...(prev[section] as any)[field], template]
      return { ...prev, [section]: { ...prev[section], [field]: arr } }
    })
  }, [])

  // Xóa item từ array of objects
  const removeArrayItem = useCallback((section: SectionKey, field: string, index: number) => {
    setContent((prev) => {
      const arr = [...(prev[section] as any)[field]]
      arr.splice(index, 1)
      return { ...prev, [section]: { ...prev[section], [field]: arr } }
    })
  }, [])

  // Cập nhật item trong string array
  const updateStringArray = useCallback((section: SectionKey, field: string, index: number, value: string) => {
    setContent((prev) => {
      const arr = [...(prev[section] as any)[field]]
      arr[index] = value
      return { ...prev, [section]: { ...prev[section], [field]: arr } }
    })
  }, [])

  // Thêm string vào array
  const addStringItem = useCallback((section: SectionKey, field: string) => {
    setContent((prev) => {
      const arr = [...(prev[section] as any)[field], '']
      return { ...prev, [section]: { ...prev[section], [field]: arr } }
    })
  }, [])

  // Xóa string từ array
  const removeStringItem = useCallback((section: SectionKey, field: string, index: number) => {
    setContent((prev) => {
      const arr = [...(prev[section] as any)[field]]
      arr.splice(index, 1)
      return { ...prev, [section]: { ...prev[section], [field]: arr } }
    })
  }, [])

  // Helper: lấy giá trị field
  function getField(section: SectionKey, field: string): any {
    return (content[section] as any)[field]
  }

  // Helper: render ObjectArray với callbacks bound
  function renderObjArray(section: SectionKey, field: string, keys: string[], labels: string[], addLabel: string) {
    const items = getField(section, field) as Record<string, string>[]
    const template: Record<string, string> = {}
    keys.forEach((k) => (template[k] = ''))
    return (
      <CmsObjectArray
        items={items}
        keys={keys}
        labels={labels}
        addLabel={addLabel}
        onUpdate={(i, k, v) => updateArrayItem(section, field, i, k, v)}
        onAdd={() => addArrayItem(section, field, template)}
        onRemove={(i) => removeArrayItem(section, field, i)}
      />
    )
  }

  function renderStrArray(section: SectionKey, field: string, label: string, addLabel: string) {
    const items = getField(section, field) as string[]
    return (
      <CmsStringArray
        items={items}
        label={label}
        addLabel={addLabel}
        onUpdate={(i, v) => updateStringArray(section, field, i, v)}
        onAdd={() => addStringItem(section, field)}
        onRemove={(i) => removeStringItem(section, field, i)}
      />
    )
  }

  function renderSection() {
    const s = activeSection
    switch (s) {
      case 'hero':
        return (
          <>
            <CmsTextField label="Eyebrow" value={getField(s, 'eyebrow')} onChange={(v) => updateField(s, 'eyebrow', v)} />
            <div className="settings-grid">
              <CmsTextField label="Dòng 1" value={getField(s, 'titleLine1')} onChange={(v) => updateField(s, 'titleLine1', v)} />
              <CmsTextField label="Highlight 1 (đỏ)" value={getField(s, 'titleHighlight1')} onChange={(v) => updateField(s, 'titleHighlight1', v)} />
              <CmsTextField label="Dòng 2" value={getField(s, 'titleLine2')} onChange={(v) => updateField(s, 'titleLine2', v)} />
              <CmsTextField label="Highlight 2 (xanh)" value={getField(s, 'titleHighlight2')} onChange={(v) => updateField(s, 'titleHighlight2', v)} />
            </div>
            <CmsTextArea label="Mô tả" value={getField(s, 'description')} onChange={(v) => updateField(s, 'description', v)} />
            <div className="settings-grid">
              <CmsTextField label="CTA chính" value={getField(s, 'ctaPrimary')} onChange={(v) => updateField(s, 'ctaPrimary', v)} />
              <CmsTextField label="Số điện thoại" value={getField(s, 'phone')} onChange={(v) => updateField(s, 'phone', v)} />
              <CmsTextField label="Label nút gọi" value={getField(s, 'phoneLabel')} onChange={(v) => updateField(s, 'phoneLabel', v)} />
            </div>
            <div className="settings-grid">
              <CmsTextField label="Float tag 1" value={getField(s, 'floatTag1')} onChange={(v) => updateField(s, 'floatTag1', v)} />
              <CmsTextField label="Float tag 2" value={getField(s, 'floatTag2')} onChange={(v) => updateField(s, 'floatTag2', v)} />
            </div>
            <h4 style={{ margin: '16px 0 8px' }}>Thống kê</h4>
            {renderObjArray(s, 'stats', ['value', 'label'], ['Giá trị', 'Nhãn'], 'Thêm stat')}
          </>
        )
      case 'urgency':
        return (
          <>
            <CmsTextField label="Ribbon" value={getField(s, 'ribbon')} onChange={(v) => updateField(s, 'ribbon', v)} />
            <CmsTextField label="Tiêu đề" value={getField(s, 'title')} onChange={(v) => updateField(s, 'title', v)} />
            <CmsTextField label="Deadline (ISO)" value={getField(s, 'deadline')} onChange={(v) => updateField(s, 'deadline', v)} />
            <CmsTextArea label="Mô tả" value={getField(s, 'description')} onChange={(v) => updateField(s, 'description', v)} />
            <div className="settings-grid">
              <CmsTextField label="Badge form" value={getField(s, 'formBadge')} onChange={(v) => updateField(s, 'formBadge', v)} />
              <CmsTextField label="Tiêu đề form" value={getField(s, 'formTitle')} onChange={(v) => updateField(s, 'formTitle', v)} />
              <CmsTextField label="Nút submit" value={getField(s, 'submitText')} onChange={(v) => updateField(s, 'submitText', v)} />
            </div>
            <CmsTextArea label="Thông báo thành công" value={getField(s, 'successMsg')} onChange={(v) => updateField(s, 'successMsg', v)} />
            {renderStrArray(s, 'checkmarks', 'Checkmarks', 'Thêm')}
            <h4 style={{ margin: '16px 0 8px' }}>Các kỳ đăng ký</h4>
            {renderObjArray(s, 'sessions', ['value', 'label'], ['Giá trị', 'Hiển thị'], 'Thêm kỳ')}
          </>
        )
      case 'gift':
        return (
          <>
            <CmsTextField label="Badge" value={getField(s, 'badge')} onChange={(v) => updateField(s, 'badge', v)} />
            <CmsTextField label="Tiêu đề" value={getField(s, 'title')} onChange={(v) => updateField(s, 'title', v)} />
            <CmsTextArea label="Mô tả" value={getField(s, 'description')} onChange={(v) => updateField(s, 'description', v)} />
            <CmsTextField label="CTA" value={getField(s, 'ctaText')} onChange={(v) => updateField(s, 'ctaText', v)} />
            {renderStrArray(s, 'gifts', 'Danh sách quà', 'Thêm quà')}
          </>
        )
      case 'painPoints':
        return (
          <>
            <CmsTextField label="Eyebrow" value={getField(s, 'eyebrow')} onChange={(v) => updateField(s, 'eyebrow', v)} />
            <CmsTextField label="Tiêu đề" value={getField(s, 'title')} onChange={(v) => updateField(s, 'title', v)} />
            <CmsTextArea label="Mô tả" value={getField(s, 'description')} onChange={(v) => updateField(s, 'description', v)} />
            <CmsTextArea label="Bridge text" value={getField(s, 'bridgeText')} onChange={(v) => updateField(s, 'bridgeText', v)} />
            <h4 style={{ margin: '16px 0 8px' }}>Các nỗi lo</h4>
            {renderObjArray(s, 'pains', ['icon', 'title', 'desc'], ['Icon', 'Tiêu đề', 'Mô tả'], 'Thêm')}
          </>
        )
      case 'benefits':
        return (
          <>
            <CmsTextField label="Eyebrow" value={getField(s, 'eyebrow')} onChange={(v) => updateField(s, 'eyebrow', v)} />
            <CmsTextField label="Tiêu đề" value={getField(s, 'title')} onChange={(v) => updateField(s, 'title', v)} />
            <h4 style={{ margin: '16px 0 8px' }}>Danh sách lợi ích</h4>
            {renderObjArray(s, 'benefits', ['num', 'title', 'desc'], ['Số', 'Tiêu đề', 'Mô tả'], 'Thêm lợi ích')}
          </>
        )
      case 'subjects':
        return (
          <>
            <CmsTextField label="Eyebrow" value={getField(s, 'eyebrow')} onChange={(v) => updateField(s, 'eyebrow', v)} />
            <CmsTextField label="Tiêu đề" value={getField(s, 'title')} onChange={(v) => updateField(s, 'title', v)} />
            <CmsTextArea label="Mô tả" value={getField(s, 'description')} onChange={(v) => updateField(s, 'description', v)} />
            <h4 style={{ margin: '16px 0 8px' }}>🏃 Thể chất</h4>
            {renderObjArray(s, 'physical', ['icon', 'title', 'desc'], ['Icon', 'Tên môn', 'Mô tả'], 'Thêm môn')}
            <h4 style={{ margin: '16px 0 8px' }}>🧠 Tư duy</h4>
            {renderObjArray(s, 'mental', ['icon', 'title', 'desc'], ['Icon', 'Tên môn', 'Mô tả'], 'Thêm môn')}
          </>
        )
      case 'schedule':
        return (
          <>
            <CmsTextField label="Eyebrow" value={getField(s, 'eyebrow')} onChange={(v) => updateField(s, 'eyebrow', v)} />
            <CmsTextField label="Tiêu đề" value={getField(s, 'title')} onChange={(v) => updateField(s, 'title', v)} />
            <CmsTextArea label="Mô tả" value={getField(s, 'description')} onChange={(v) => updateField(s, 'description', v)} />
            <h4 style={{ margin: '16px 0 8px' }}>Lịch trình</h4>
            {renderObjArray(s, 'timeline', ['time', 'title', 'desc'], ['Giờ', 'Hoạt động', 'Chi tiết'], 'Thêm mốc')}
            <CmsTextField label="Tiêu đề bảng giá" value={getField(s, 'pricingTitle')} onChange={(v) => updateField(s, 'pricingTitle', v)} />
            <h4 style={{ margin: '16px 0 8px' }}>Gói giá</h4>
            {renderObjArray(s, 'priceCards', ['tag', 'period', 'priceOld', 'priceNew', 'ctaText'], ['Tag', 'Thời gian', 'Giá cũ', 'Giá mới', 'CTA'], 'Thêm gói')}
            <h4 style={{ margin: '16px 0 8px' }}>Chính sách</h4>
            {renderObjArray(s, 'policies', ['icon', 'text'], ['Icon', 'Nội dung'], 'Thêm')}
          </>
        )
      case 'gallery':
        return (
          <>
            <CmsTextField label="Eyebrow" value={getField(s, 'eyebrow')} onChange={(v) => updateField(s, 'eyebrow', v)} />
            <CmsTextField label="Tiêu đề" value={getField(s, 'title')} onChange={(v) => updateField(s, 'title', v)} />
            <h4 style={{ margin: '16px 0 8px' }}>Nhận xét phụ huynh</h4>
            {renderObjArray(s, 'testimonials', ['initial', 'name', 'role', 'text'], ['Chữ cái', 'Tên', 'Vai trò', 'Nội dung'], 'Thêm nhận xét')}
          </>
        )
      case 'faq':
        return (
          <>
            <CmsTextField label="Eyebrow" value={getField(s, 'eyebrow')} onChange={(v) => updateField(s, 'eyebrow', v)} />
            <CmsTextField label="Tiêu đề" value={getField(s, 'title')} onChange={(v) => updateField(s, 'title', v)} />
            <h4 style={{ margin: '16px 0 8px' }}>Câu hỏi thường gặp</h4>
            {renderObjArray(s, 'faqs', ['q', 'a'], ['Câu hỏi', 'Trả lời'], 'Thêm FAQ')}
          </>
        )
      case 'organization':
        return (
          <>
            <CmsTextField label="Tên tổ chức" value={getField(s, 'name')} onChange={(v) => updateField(s, 'name', v)} />
            <CmsTextField label="Slogan" value={getField(s, 'slogan')} onChange={(v) => updateField(s, 'slogan', v)} />
            <CmsTextArea label="Mô tả" value={getField(s, 'description')} onChange={(v) => updateField(s, 'description', v)} />
            {renderObjArray(s, 'stats', ['value', 'label'], ['Giá trị', 'Nhãn'], 'Thêm stat')}
          </>
        )
      case 'finalCta':
        return (
          <>
            <CmsTextField label="Tiêu đề" value={getField(s, 'title')} onChange={(v) => updateField(s, 'title', v)} />
            <CmsTextField label="Mô tả (dùng {seats} cho số suất)" value={getField(s, 'description')} onChange={(v) => updateField(s, 'description', v)} />
            <CmsTextField label="CTA" value={getField(s, 'ctaText')} onChange={(v) => updateField(s, 'ctaText', v)} />
            <div className="settings-grid">
              <CmsTextField label="Số điện thoại" value={getField(s, 'phone')} onChange={(v) => updateField(s, 'phone', v)} />
              <CmsNumberField label="Tổng số suất" value={content.finalCta.totalSeats} onChange={(v) => updateField(s, 'totalSeats', v)} />
            </div>
          </>
        )
      case 'footer':
        return (
          <>
            <CmsTextField label="Tagline" value={getField(s, 'tagline')} onChange={(v) => updateField(s, 'tagline', v)} />
            <CmsTextField label="Tên công ty" value={getField(s, 'company')} onChange={(v) => updateField(s, 'company', v)} />
            <CmsTextField label="Địa chỉ" value={getField(s, 'address')} onChange={(v) => updateField(s, 'address', v)} />
            <CmsTextField label="Số điện thoại" value={getField(s, 'phone')} onChange={(v) => updateField(s, 'phone', v)} />
            <CmsTextField label="Website" value={getField(s, 'website')} onChange={(v) => updateField(s, 'website', v)} />
            <CmsTextField label="Copyright" value={getField(s, 'copyright')} onChange={(v) => updateField(s, 'copyright', v)} />
          </>
        )
      case 'contact':
        return (
          <>
            <CmsTextField label="Số điện thoại (raw)" value={getField(s, 'phone')} onChange={(v) => updateField(s, 'phone', v)} />
            <CmsTextField label="Số điện thoại (hiển thị)" value={getField(s, 'phoneFormatted')} onChange={(v) => updateField(s, 'phoneFormatted', v)} />
            <CmsTextField label="Zalo URL" value={getField(s, 'zaloUrl')} onChange={(v) => updateField(s, 'zaloUrl', v)} />
            <CmsTextField label="Messenger URL" value={getField(s, 'messengerUrl')} onChange={(v) => updateField(s, 'messengerUrl', v)} />
            <CmsTextField label="Promo text (header)" value={getField(s, 'promoText')} onChange={(v) => updateField(s, 'promoText', v)} />
          </>
        )
      default:
        return null
    }
  }

  if (!loaded) {
    return <p style={{ padding: 20 }}>Đang tải nội dung...</p>
  }

  return (
    <>
      <div className="cms-layout">
        {/* Section nav */}
        <div className="cms-nav">
          {(Object.keys(sectionLabels) as SectionKey[]).map((key) => (
            <button
              key={key}
              className={`cms-nav__item${activeSection === key ? ' is-active' : ''}`}
              onClick={() => setActiveSection(key)}
            >
              {sectionLabels[key]}
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="cms-editor">
          <div className="acard">
            <div className="acard__head">
              <h3>{sectionLabels[activeSection]}</h3>
            </div>
            <div className="acard__body">
              {renderSection()}
              <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                <button className="abtn abtn--primary" onClick={() => saveSection(activeSection)} disabled={saving}>
                  {saving ? 'Đang lưu...' : 'Lưu section này'}
                </button>
                <button
                  className="abtn abtn--outline"
                  onClick={() => {
                    setContent((prev) => ({ ...prev, [activeSection]: defaultContent[activeSection] }))
                    showToast('Đã reset về mặc định (chưa lưu)')
                  }}
                >
                  Reset mặc định
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="toast-wrap">
          <div className={`toast ${toast.includes('⚠️') ? 'toast--error' : 'toast--success'}`}>
            {toast}
          </div>
        </div>
      )}
    </>
  )
}
