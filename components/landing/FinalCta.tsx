'use client'

import { useState, useEffect } from 'react'
import type { FinalCtaContent } from '@/lib/content'

function calcSeats(totalSeats: number) {
  const start = new Date('2026-02-01T00:00:00+07:00').getTime()
  const now = Date.now()
  const elapsedHours = Math.max(0, (now - start) / (1000 * 60 * 60))
  let seats = Math.max(11, Math.round(totalSeats - elapsedHours * 0.039))
  const nudge = Math.floor(now / 60000) % 3 - 1
  return Math.max(11, Math.min(totalSeats, seats + nudge))
}

export default function FinalCta({ content }: { content: FinalCtaContent }) {
  const [seats, setSeats] = useState(37)
  useEffect(() => {
    setSeats(calcSeats(content.totalSeats))
    const t = setInterval(() => setSeats(calcSeats(content.totalSeats)), 30000)
    return () => clearInterval(t)
  }, [content.totalSeats])

  return (
    <section className="final-cta">
      <div className="container final-cta__inner">
        <h2>{content.title}</h2>
        <p>
          {content.description.replace('{seats}', String(seats))}
        </p>
        <a href="#form" className="btn btn--primary btn--xl btn--pulse" style={{ color: '#fff' }}>
          {content.ctaText}
        </a>
        <p className="final-cta__phone">
          Hoặc gọi ngay: <a href={`tel:${content.phone}`}>{content.phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3')}</a>
        </p>
      </div>
    </section>
  )
}
