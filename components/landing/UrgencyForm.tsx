'use client'

import { useState, useEffect, useRef } from 'react'
import type { UrgencyContent } from '@/lib/content'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function useCountdown(deadline: string) {
  const [time, setTime] = useState({ d: '00', h: '00', m: '00', s: '00' })
  useEffect(() => {
    const deadlineMs = new Date(deadline).getTime()
    function tick() {
      let diff = Math.max(0, deadlineMs - Date.now())
      const d = Math.floor(diff / (1000 * 60 * 60 * 24))
      diff -= d * 1000 * 60 * 60 * 24
      const h = Math.floor(diff / (1000 * 60 * 60))
      diff -= h * 1000 * 60 * 60
      const m = Math.floor(diff / (1000 * 60))
      diff -= m * 1000 * 60
      const s = Math.floor(diff / 1000)
      setTime({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) })
    }
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [deadline])
  return time
}

function validatePhone(v: string) {
  return /^(0|\+84)[0-9]{9,10}$/.test(v.replace(/\s+/g, ''))
}

export default function UrgencyForm({ content }: { content: UrgencyContent }) {
  const { d, h, m, s } = useCountdown(content.deadline)

  const [phoneErr, setPhoneErr] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  // Build birth year options
  const birthYears: number[] = []
  for (let y = 2021; y >= 2010; y--) birthYears.push(y)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value.trim()

    if (!validatePhone(phone)) {
      setPhoneErr(true)
      ;(form.elements.namedItem('phone') as HTMLInputElement).focus()
      return
    }
    setPhoneErr(false)
    setStatus('loading')

    const data = {
      childName: (form.elements.namedItem('childName') as HTMLInputElement).value.trim(),
      phone,
      birthYear: (form.elements.namedItem('birthYear') as HTMLSelectElement).value,
      session: (form.elements.namedItem('session') as HTMLSelectElement).value,
      address: (form.elements.namedItem('address') as HTMLInputElement)?.value?.trim() ?? '',
      notes: (form.elements.namedItem('notes') as HTMLTextAreaElement)?.value?.trim() ?? '',
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error?.message || 'Lỗi server')

      setStatus('success')
      form.reset()

      // FB Pixel
      if (typeof window !== 'undefined' && (window as any).fbq) {
        ;(window as any).fbq('track', 'CompleteRegistration', { content_name: 'UCMAS Summer Camp 2026' })
      }
      // Google Ads
      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('event', 'conversion', {
          send_to: `${process.env.NEXT_PUBLIC_GA_CONVERSION_ID}/${process.env.NEXT_PUBLIC_GA_CONVERSION_LABEL}`,
        })
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="urgency" id="form">
      <div className="container urgency__inner">
        <div className="urgency__copy">
          <div className="ribbon">{content.ribbon}</div>
          <h2 className="urgency__title">{content.title}</h2>
          <p className="urgency__desc">{content.description}</p>

          <div className="countdown" aria-live="polite">
            <div className="count-cell"><span>{d}</span><small>Ngày</small></div>
            <div className="count-sep">:</div>
            <div className="count-cell"><span>{h}</span><small>Giờ</small></div>
            <div className="count-sep">:</div>
            <div className="count-cell"><span>{m}</span><small>Phút</small></div>
            <div className="count-sep">:</div>
            <div className="count-cell"><span>{s}</span><small>Giây</small></div>
          </div>

          <ul className="urgency__list">
            {content.checkmarks.map((item) => (
              <li key={item}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* FORM CARD */}
        <form className="lead-form" id="leadForm" ref={formRef} onSubmit={handleSubmit} noValidate>
          <div className="lead-form__head">
            <span className="badge-green">{content.formBadge}</span>
            <h3>{content.formTitle}</h3>
          </div>

          <div className="field">
            <label htmlFor="childName">Tên của con <span>*</span></label>
            <input type="text" id="childName" name="childName" required placeholder="VD: Nguyễn Minh Anh" />
          </div>

          <div className={`field${phoneErr ? ' is-invalid' : ''}`}>
            <label htmlFor="phone">Số điện thoại bố/mẹ <span>*</span></label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              inputMode="tel"
              placeholder="VD: 0987 654 321"
              onBlur={(e) => {
                if (e.target.value && !validatePhone(e.target.value)) setPhoneErr(true)
                else setPhoneErr(false)
              }}
              onChange={() => setPhoneErr(false)}
            />
            <small className="field__error">Vui lòng nhập số điện thoại hợp lệ</small>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="birthYear">Năm sinh của con <span>*</span></label>
              <select id="birthYear" name="birthYear" required defaultValue="">
                <option value="" disabled>— Chọn năm —</option>
                {birthYears.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="session">Đăng ký kỳ <span>*</span></label>
              <select id="session" name="session" required defaultValue="">
                <option value="" disabled>— Chọn kỳ —</option>
                {content.sessions.map((sess) => (
                  <option key={sess.value} value={sess.value}>{sess.label}</option>
                ))}
              </select>
            </div>
          </div>

          <details className="field-more">
            <summary>+ Thêm địa chỉ &amp; mong muốn của bố mẹ (tùy chọn)</summary>
            <div className="field">
              <label htmlFor="address">Địa chỉ</label>
              <input type="text" id="address" name="address" placeholder="VD: Cầu Giấy, Hà Nội" />
            </div>
            <div className="field">
              <label htmlFor="notes">Mong muốn của bố mẹ</label>
              <textarea id="notes" name="notes" rows={3} placeholder="VD: Mong con tự tin giao tiếp, năng động hơn..." />
            </div>
          </details>

          {/* Honeypot */}
          <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          <button
            type="submit"
            className={`btn btn--primary btn--block btn--xl${status !== 'loading' ? ' btn--pulse' : ''}`}
            disabled={status === 'loading'}
          >
            <span className="btn__label">{content.submitText}</span>
            {status === 'loading' && <span className="btn__spinner" aria-hidden="true" style={{ display: 'inline-block' }} />}
          </button>

          <ul className="lead-form__micro">
            <li>📞 Tư vấn trong <strong>15 phút</strong></li>
            <li>🔒 Bảo mật thông tin</li>
            <li>⭐ <strong>1.000+</strong> PH tin tưởng</li>
          </ul>

          {status === 'success' && (
            <p className="form-msg form-msg--success">
              {content.successMsg}
            </p>
          )}
          {status === 'error' && (
            <p className="form-msg form-msg--error">
              ⚠️ Có lỗi xảy ra. Vui lòng thử lại hoặc gọi{' '}
              <a href="tel:0967868623">0967.868.623</a>.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
