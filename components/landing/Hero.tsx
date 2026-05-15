import type { HeroContent } from '@/lib/content'

export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="blob blob--1" />
        <div className="blob blob--2" />
        <div className="blob blob--3" />
      </div>
      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="hero__eyebrow">
            <span className="eyebrow-dot" /> {content.eyebrow}
          </div>
          <h1 className="hero__title">
            {content.titleLine1} <span className="tx-red">{content.titleHighlight1}</span>,<br />
            {content.titleLine2} <span className="tx-green">{content.titleHighlight2}</span>
          </h1>
          <p className="hero__sub">{content.description}</p>
          <div className="hero__ctas">
            <a href="#form" className="btn btn--primary btn--lg btn--pulse">
              {content.ctaPrimary}
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a href={`tel:${content.phone}`} className="btn btn--ghost btn--lg">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.07 15.07 0 0 1-6.59-6.59l2.2-2.21a1 1 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1Z" />
              </svg>
              {content.phoneLabel}
            </a>
          </div>
          <ul className="hero__trust">
            {content.stats.map((s) => (
              <li key={s.label}><strong>{s.value}</strong><span>{s.label}</span></li>
            ))}
          </ul>
        </div>

        <aside className="hero__panel">
          <div className="hero__media">
            <div className="ph ph--hero" role="img" aria-label="Trẻ em vui chơi tại trại hè UCMAS">
              <span className="ph__chip">Ảnh hero · trẻ em vui chơi</span>
            </div>
            <div className="float-tag float-tag--tl">
              <span className="dot dot--green" /> {content.floatTag1}
            </div>
            <div className="float-tag float-tag--br">
              {content.floatTag2}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
