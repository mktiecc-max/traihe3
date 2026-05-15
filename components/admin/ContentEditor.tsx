'use client'

import { useState, useEffect } from 'react'
import { defaultContent, sectionLabels, type SiteContent } from '@/lib/content'

type SectionKey = keyof SiteContent

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

  function updateField(section: SectionKey, field: string, value: any) {
    setContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }))
  }

  function updateArrayItem(section: SectionKey, field: string, index: number, key: string, value: string) {
    setContent((prev) => {
      const arr = [...(prev[section] as any)[field]]
      arr[index] = { ...arr[index], [key]: value }
      return { ...prev, [section]: { ...prev[section], [field]: arr } }
    })
  }

  function addArrayItem(section: SectionKey, field: string, template: Record<string, string>) {
    setContent((prev) => {
      const arr = [...(prev[section] as any)[field], template]
      return { ...prev, [section]: { ...prev[section], [field]: arr } }
    })
  }

  function removeArrayItem(section: SectionKey, field: string, index: number) {
    setContent((prev) => {
      const arr = [...(prev[section] as any)[field]]
      arr.splice(index, 1)
      return { ...prev, [section]: { ...prev[section], [field]: arr } }
    })
  }

  function updateStringArray(section: SectionKey, field: string, index: number, value: string) {
    setContent((prev) => {
      const arr = [...(prev[section] as any)[field]]
      arr[index] = value
      return { ...prev, [section]: { ...prev[section], [field]: arr } }
    })
  }

  function addStringItem(section: SectionKey, field: string) {
    setContent((prev) => {
      const arr = [...(prev[section] as any)[field], '']
      return { ...prev, [section]: { ...prev[section], [field]: arr } }
    })
  }

  function removeStringItem(section: SectionKey, field: string, index: number) {
    setContent((prev) => {
      const arr = [...(prev[section] as any)[field]]
      arr.splice(index, 1)
      return { ...prev, [section]: { ...prev[section], [field]: arr } }
    })
  }

  // Render a simple text field
  function TextField({ label, section, field }: { label: string; section: SectionKey; field: string }) {
    return (
      <div className="afield">
        <label>{label}</label>
        <input
          type="text"
          value={(content[section] as any)[field] ?? ''}
          onChange={(e) => updateField(section, field, e.target.value)}
        />
      </div>
    )
  }

  function TextArea({ label, section, field }: { label: string; section: SectionKey; field: string }) {
    return (
      <div className="afield">
        <label>{label}</label>
        <textarea
          rows={3}
          value={(content[section] as any)[field] ?? ''}
          onChange={(e) => updateField(section, field, e.target.value)}
        />
      </div>
    )
  }

  // Render array of {key: value} objects
  function ObjectArray({ section, field, keys, labels, addLabel }: {
    section: SectionKey; field: string; keys: string[]; labels: string[]; addLabel: string
  }) {
    const items = (content[section] as any)[field] as Record<string, string>[]
    const template: Record<string, string> = {}
    keys.forEach((k) => (template[k] = ''))
    return (
      <div className="cms-array">
        {items.map((item, i) => (
          <div key={i} className="cms-array__item">
            <div className="cms-array__row">
              {keys.map((k, ki) => (
                <div className="afield" key={k} style={{ flex: ki === keys.length - 1 ? 2 : 1 }}>
                  <label>{labels[ki]} #{i + 1}</label>
                  {k === 'desc' || k === 'a' || k === 'text' ? (
                    <textarea rows={2} value={item[k] ?? ''} onChange={(e) => updateArrayItem(section, field, i, k, e.target.value)} />
                  ) : (
                    <input type="text" value={item[k] ?? ''} onChange={(e) => updateArrayItem(section, field, i, k, e.target.value)} />
                  )}
                </div>
              ))}
            </div>
            <button type="button" className="abtn abtn--danger abtn--sm" onClick={() => removeArrayItem(section, field, i)}>✕ Xóa</button>
          </div>
        ))}
        <button type="button" className="abtn abtn--outline abtn--sm" onClick={() => addArrayItem(section, field, template)}>
          + {addLabel}
        </button>
      </div>
    )
  }

  // Render array of strings
  function StringArray({ section, field, label, addLabel }: {
    section: SectionKey; field: string; label: string; addLabel: string
  }) {
    const items = (content[section] as any)[field] as string[]
    return (
      <div className="cms-array">
        <label style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>{label}</label>
        {items.map((item, i) => (
          <div key={i} className="cms-array__item" style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <input type="text" value={item} onChange={(e) => updateStringArray(section, field, i, e.target.value)} style={{ flex: 1 }} />
            <button type="button" className="abtn abtn--danger abtn--sm" onClick={() => removeStringItem(section, field, i)}>✕</button>
          </div>
        ))}
        <button type="button" className="abtn abtn--outline abtn--sm" onClick={() => addStringItem(section, field)}>
          + {addLabel}
        </button>
      </div>
    )
  }

  function renderSection() {
    switch (activeSection) {
      case 'hero':
        return (
          <>
            <TextField label="Eyebrow" section="hero" field="eyebrow" />
            <div className="settings-grid">
              <TextField label="Dòng 1" section="hero" field="titleLine1" />
              <TextField label="Highlight 1 (đỏ)" section="hero" field="titleHighlight1" />
              <TextField label="Dòng 2" section="hero" field="titleLine2" />
              <TextField label="Highlight 2 (xanh)" section="hero" field="titleHighlight2" />
            </div>
            <TextArea label="Mô tả" section="hero" field="description" />
            <div className="settings-grid">
              <TextField label="CTA chính" section="hero" field="ctaPrimary" />
              <TextField label="Số điện thoại" section="hero" field="phone" />
              <TextField label="Label nút gọi" section="hero" field="phoneLabel" />
            </div>
            <div className="settings-grid">
              <TextField label="Float tag 1" section="hero" field="floatTag1" />
              <TextField label="Float tag 2" section="hero" field="floatTag2" />
            </div>
            <h4 style={{ margin: '16px 0 8px' }}>Thống kê</h4>
            <ObjectArray section="hero" field="stats" keys={['value', 'label']} labels={['Giá trị', 'Nhãn']} addLabel="Thêm stat" />
          </>
        )
      case 'urgency':
        return (
          <>
            <TextField label="Ribbon" section="urgency" field="ribbon" />
            <TextField label="Tiêu đề" section="urgency" field="title" />
            <TextField label="Deadline (ISO)" section="urgency" field="deadline" />
            <TextArea label="Mô tả" section="urgency" field="description" />
            <div className="settings-grid">
              <TextField label="Badge form" section="urgency" field="formBadge" />
              <TextField label="Tiêu đề form" section="urgency" field="formTitle" />
              <TextField label="Nút submit" section="urgency" field="submitText" />
            </div>
            <TextArea label="Thông báo thành công" section="urgency" field="successMsg" />
            <StringArray section="urgency" field="checkmarks" label="Checkmarks" addLabel="Thêm" />
            <h4 style={{ margin: '16px 0 8px' }}>Các kỳ đăng ký</h4>
            <ObjectArray section="urgency" field="sessions" keys={['value', 'label']} labels={['Giá trị', 'Hiển thị']} addLabel="Thêm kỳ" />
          </>
        )
      case 'gift':
        return (
          <>
            <TextField label="Badge" section="gift" field="badge" />
            <TextField label="Tiêu đề" section="gift" field="title" />
            <TextArea label="Mô tả" section="gift" field="description" />
            <TextField label="CTA" section="gift" field="ctaText" />
            <StringArray section="gift" field="gifts" label="Danh sách quà" addLabel="Thêm quà" />
          </>
        )
      case 'painPoints':
        return (
          <>
            <TextField label="Eyebrow" section="painPoints" field="eyebrow" />
            <TextField label="Tiêu đề" section="painPoints" field="title" />
            <TextArea label="Mô tả" section="painPoints" field="description" />
            <TextArea label="Bridge text" section="painPoints" field="bridgeText" />
            <h4 style={{ margin: '16px 0 8px' }}>Các nỗi lo</h4>
            <ObjectArray section="painPoints" field="pains" keys={['icon', 'title', 'desc']} labels={['Icon', 'Tiêu đề', 'Mô tả']} addLabel="Thêm" />
          </>
        )
      case 'benefits':
        return (
          <>
            <TextField label="Eyebrow" section="benefits" field="eyebrow" />
            <TextField label="Tiêu đề" section="benefits" field="title" />
            <h4 style={{ margin: '16px 0 8px' }}>Danh sách lợi ích</h4>
            <ObjectArray section="benefits" field="benefits" keys={['num', 'title', 'desc']} labels={['Số', 'Tiêu đề', 'Mô tả']} addLabel="Thêm lợi ích" />
          </>
        )
      case 'subjects':
        return (
          <>
            <TextField label="Eyebrow" section="subjects" field="eyebrow" />
            <TextField label="Tiêu đề" section="subjects" field="title" />
            <TextArea label="Mô tả" section="subjects" field="description" />
            <h4 style={{ margin: '16px 0 8px' }}>🏃 Thể chất</h4>
            <ObjectArray section="subjects" field="physical" keys={['icon', 'title', 'desc']} labels={['Icon', 'Tên môn', 'Mô tả']} addLabel="Thêm môn" />
            <h4 style={{ margin: '16px 0 8px' }}>🧠 Tư duy</h4>
            <ObjectArray section="subjects" field="mental" keys={['icon', 'title', 'desc']} labels={['Icon', 'Tên môn', 'Mô tả']} addLabel="Thêm môn" />
          </>
        )
      case 'schedule':
        return (
          <>
            <TextField label="Eyebrow" section="schedule" field="eyebrow" />
            <TextField label="Tiêu đề" section="schedule" field="title" />
            <TextArea label="Mô tả" section="schedule" field="description" />
            <h4 style={{ margin: '16px 0 8px' }}>Lịch trình</h4>
            <ObjectArray section="schedule" field="timeline" keys={['time', 'title', 'desc']} labels={['Giờ', 'Hoạt động', 'Chi tiết']} addLabel="Thêm mốc" />
            <TextField label="Tiêu đề bảng giá" section="schedule" field="pricingTitle" />
            <h4 style={{ margin: '16px 0 8px' }}>Gói giá</h4>
            <ObjectArray section="schedule" field="priceCards" keys={['tag', 'period', 'priceOld', 'priceNew', 'ctaText']} labels={['Tag', 'Thời gian', 'Giá cũ', 'Giá mới', 'CTA']} addLabel="Thêm gói" />
            <h4 style={{ margin: '16px 0 8px' }}>Chính sách</h4>
            <ObjectArray section="schedule" field="policies" keys={['icon', 'text']} labels={['Icon', 'Nội dung']} addLabel="Thêm" />
          </>
        )
      case 'gallery':
        return (
          <>
            <TextField label="Eyebrow" section="gallery" field="eyebrow" />
            <TextField label="Tiêu đề" section="gallery" field="title" />
            <h4 style={{ margin: '16px 0 8px' }}>Nhận xét phụ huynh</h4>
            <ObjectArray section="gallery" field="testimonials" keys={['initial', 'name', 'role', 'text']} labels={['Chữ cái', 'Tên', 'Vai trò', 'Nội dung']} addLabel="Thêm nhận xét" />
          </>
        )
      case 'faq':
        return (
          <>
            <TextField label="Eyebrow" section="faq" field="eyebrow" />
            <TextField label="Tiêu đề" section="faq" field="title" />
            <h4 style={{ margin: '16px 0 8px' }}>Câu hỏi thường gặp</h4>
            <ObjectArray section="faq" field="faqs" keys={['q', 'a']} labels={['Câu hỏi', 'Trả lời']} addLabel="Thêm FAQ" />
          </>
        )
      case 'organization':
        return (
          <>
            <TextField label="Tên tổ chức" section="organization" field="name" />
            <TextField label="Slogan" section="organization" field="slogan" />
            <TextArea label="Mô tả" section="organization" field="description" />
            <ObjectArray section="organization" field="stats" keys={['value', 'label']} labels={['Giá trị', 'Nhãn']} addLabel="Thêm stat" />
          </>
        )
      case 'finalCta':
        return (
          <>
            <TextField label="Tiêu đề" section="finalCta" field="title" />
            <TextField label="Mô tả (dùng {seats} cho số suất)" section="finalCta" field="description" />
            <TextField label="CTA" section="finalCta" field="ctaText" />
            <div className="settings-grid">
              <TextField label="Số điện thoại" section="finalCta" field="phone" />
              <div className="afield">
                <label>Tổng số suất</label>
                <input type="number" value={content.finalCta.totalSeats} onChange={(e) => updateField('finalCta', 'totalSeats', Number(e.target.value))} />
              </div>
            </div>
          </>
        )
      case 'footer':
        return (
          <>
            <TextField label="Tagline" section="footer" field="tagline" />
            <TextField label="Tên công ty" section="footer" field="company" />
            <TextField label="Địa chỉ" section="footer" field="address" />
            <TextField label="Số điện thoại" section="footer" field="phone" />
            <TextField label="Website" section="footer" field="website" />
            <TextField label="Copyright" section="footer" field="copyright" />
          </>
        )
      case 'contact':
        return (
          <>
            <TextField label="Số điện thoại (raw)" section="contact" field="phone" />
            <TextField label="Số điện thoại (hiển thị)" section="contact" field="phoneFormatted" />
            <TextField label="Zalo URL" section="contact" field="zaloUrl" />
            <TextField label="Messenger URL" section="contact" field="messengerUrl" />
            <TextField label="Promo text (header)" section="contact" field="promoText" />
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
