import type { GiftContent } from '@/lib/content'

export default function GiftBox({ content }: { content: GiftContent }) {
  return (
    <section className="gift">
      <div className="container gift__inner">
        <div className="gift__copy">
          <span className="badge-green">{content.badge}</span>
          <h2>
            {content.title}
          </h2>
          <p>{content.description}</p>
          <ul className="gift__list">
            {content.gifts.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <a href="#form" className="btn btn--green btn--lg" style={{ color: '#fff' }}>
            {content.ctaText}
          </a>
        </div>
        <div className="gift__media">
          <div className="ph ph--gift" role="img" aria-label="Bộ 8 quà tặng UCMAS">
            <span className="ph__chip">Ảnh sản phẩm · 8 món quà</span>
          </div>
        </div>
      </div>
    </section>
  )
}
