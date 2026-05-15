import type { FaqContent } from '@/lib/content'

export default function Faq({ content }: { content: FaqContent }) {
  return (
    <section className="faq" id="faq">
      <div className="container">
        <header className="section-head section-head--center">
          <span className="section-eyebrow">{content.eyebrow}</span>
          <h2>{content.title}</h2>
        </header>

        <div className="faq__list">
          {content.faqs.map((faq) => (
            <details key={faq.q}>
              <summary>
                {faq.q} <span className="chev">+</span>
              </summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
