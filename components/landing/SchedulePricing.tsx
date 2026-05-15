import type { ScheduleContent } from '@/lib/content'

export default function SchedulePricing({ content }: { content: ScheduleContent }) {
  return (
    <section className="schedule" id="hoc-phi">
      <div className="container schedule__inner">
        {/* Timeline */}
        <div className="schedule__col">
          <header className="section-head">
            <span className="section-eyebrow">{content.eyebrow}</span>
            <h2>{content.title}</h2>
            <p>{content.description}</p>
          </header>
          <ul className="timeline">
            {content.timeline.map((t) => (
              <li key={t.time}>
                <span className="time">{t.time}</span>
                <div>
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing */}
        <div className="schedule__col">
          <h3 className="pricing__head">{content.pricingTitle}</h3>
          <div className="pricing">
            {content.priceCards.map((card) => (
              <article key={card.tag} className={`price-card${card.featured ? ' price-card--featured' : ''}`}>
                {card.ribbon && <div className="price-card__ribbon">{card.ribbon}</div>}
                <div className="price-card__tag">{card.tag}</div>
                <h4>{card.period}</h4>
                <div className="price-old">{card.priceOld}</div>
                <div className="price-new"><strong>{card.priceNew}</strong> ₫</div>
                <ul>
                  {card.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a href="#form" className={`btn ${card.featured ? 'btn--primary' : 'btn--outline'} btn--block`}>
                  {card.ctaText}
                </a>
              </article>
            ))}
          </div>

          <div className="policies">
            <h4>3 chính sách ưu đãi cộng dồn</h4>
            <ul>
              {content.policies.map((p) => (
                <li key={p.text}><strong>{p.icon}</strong> {p.text}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
