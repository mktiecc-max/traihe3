import type { BenefitContent } from '@/lib/content'

export default function Benefits({ content }: { content: BenefitContent }) {
  return (
    <section className="benefits">
      <div className="container">
        <header className="section-head section-head--center section-head--light">
          <span className="section-eyebrow section-eyebrow--light">{content.eyebrow}</span>
          <h2>{content.title}</h2>
        </header>

        <div className="benefits__grid">
          {content.benefits.map((b) => (
            <div className="benefit" key={b.num}>
              <span className="benefit__num">{b.num}</span>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
