import type { PainContent } from '@/lib/content'

export default function PainPoints({ content }: { content: PainContent }) {
  return (
    <section className="pain" id="chuong-trinh">
      <div className="container">
        <header className="section-head section-head--center">
          <span className="section-eyebrow">{content.eyebrow}</span>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </header>

        <div className="pain__grid">
          {content.pains.map((p) => (
            <article className="pain-card" key={p.title}>
              <div className="pain-card__icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </article>
          ))}
        </div>

        <div className="pain__bridge">
          <p>{content.bridgeText}</p>
        </div>
      </div>
    </section>
  )
}
