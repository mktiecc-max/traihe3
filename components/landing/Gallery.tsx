import type { GalleryContent } from '@/lib/content'

const galClasses = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

export default function Gallery({ content }: { content: GalleryContent }) {
  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <header className="section-head section-head--center section-head--light">
          <span className="section-eyebrow section-eyebrow--light">{content.eyebrow}</span>
          <h2>{content.title}</h2>
        </header>

        <div className="gallery__grid">
          {content.items.map((g, i) => (
            <div key={g.label} className={`ph ph--gal ${galClasses[i] || ''}`} role="img" aria-label={g.label}>
              <span className="ph__chip">{g.label}</span>
            </div>
          ))}
        </div>

        <div className="testimonials">
          {content.testimonials.map((t) => (
            <article className="t-card" key={t.name}>
              <div className="t-stars">★★★★★</div>
              <p>{t.text}</p>
              <footer>
                <span className="t-avatar">{t.initial}</span>
                <div>
                  <strong>{t.name}</strong>
                  <small>{t.role}</small>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
