'use client'

import { useState, useEffect } from 'react'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function calcSeats() {
  const start = new Date('2026-02-01T00:00:00+07:00').getTime()
  const now = Date.now()
  const elapsedHours = Math.max(0, (now - start) / (1000 * 60 * 60))
  let seats = Math.max(11, Math.round(50 - elapsedHours * 0.039))
  const nudge = Math.floor(now / 60000) % 3 - 1
  return Math.max(11, Math.min(50, seats + nudge))
}

export default function SiteHeader() {
  const [navOpen, setNavOpen] = useState(false)
  const [seats, setSeats] = useState(37)

  useEffect(() => {
    setSeats(calcSeats())
    const t = setInterval(() => setSeats(calcSeats()), 30000)
    return () => clearInterval(t)
  }, [])

  return (
    <header className="header" id="topHeader">
      <div className="header__inner">
        <a href="#" className="header__logo" aria-label="UCMAS Việt Nam">
          <span className="logo-mark">U</span>
          <span className="logo-text">
            UCMAS<small>Việt Nam</small>
          </span>
        </a>

        <nav className={`header__nav${navOpen ? ' is-open' : ''}`}>
          <a href="#chuong-trinh" className="nav-link" onClick={() => setNavOpen(false)}>Chương trình</a>
          <a href="#mon-hoc" className="nav-link" onClick={() => setNavOpen(false)}>Môn học</a>
          <a href="#hoc-phi" className="nav-link" onClick={() => setNavOpen(false)}>Học phí</a>
          <a href="#gallery" className="nav-link" onClick={() => setNavOpen(false)}>Hình ảnh</a>
          <a href="#faq" className="nav-link" onClick={() => setNavOpen(false)}>FAQ</a>
        </nav>

        <div className="header__actions">
          <a href="tel:0967868623" className="btn-phone" aria-label="Gọi hotline">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.07 15.07 0 0 1-6.59-6.59l2.2-2.21a1 1 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1Z" />
            </svg>
            0967.868.623
          </a>
          <a href="#form" className="btn-cta-small">Đăng ký ngay</a>
        </div>

        <button
          className="header__menu"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Menu"
          aria-expanded={navOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className="header__promo">
        <span className="promo-dot" />
        <span>
          <strong>ƯU ĐÃI ĐĂNG KÝ SỚM TỚI 25%</strong> · Bộ 8 quà tặng gửi tận nhà · Còn{' '}
          <span id="seatCount">{seats}</span>/50 suất
        </span>
      </div>
    </header>
  )
}
