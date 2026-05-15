'use client'

import { useState, useEffect } from 'react'

function calcSeats() {
  const start = new Date('2026-02-01T00:00:00+07:00').getTime()
  const now = Date.now()
  const elapsedHours = Math.max(0, (now - start) / (1000 * 60 * 60))
  let seats = Math.max(11, Math.round(50 - elapsedHours * 0.039))
  const nudge = Math.floor(now / 60000) % 3 - 1
  return Math.max(11, Math.min(50, seats + nudge))
}

export default function FinalCta() {
  const [seats, setSeats] = useState(37)
  useEffect(() => {
    setSeats(calcSeats())
    const t = setInterval(() => setSeats(calcSeats()), 30000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="final-cta">
      <div className="container final-cta__inner">
        <h2>
          Sẵn sàng cho mùa hè <span className="tx-yellow">khác biệt</span> của con?
        </h2>
        <p>
          Chỉ còn <strong>{seats}</strong>/50 suất ưu đãi 25% · Đăng ký trước 15/03/2026
        </p>
        <a href="#form" className="btn btn--primary btn--xl btn--pulse" style={{ color: '#fff' }}>
          Đăng ký nhận tư vấn miễn phí
        </a>
        <p className="final-cta__phone">
          Hoặc gọi ngay: <a href="tel:0967868623">0967.868.623</a>
        </p>
      </div>
    </section>
  )
}
