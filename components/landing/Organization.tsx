import type { OrgContent } from '@/lib/content'

export default function Organization({ content }: { content: OrgContent }) {
  return (
    <section className="org">
      <div className="container org__inner">
        <div className="org__card">
          <div className="org__logo"><span>U</span></div>
          <h3>{content.name}</h3>
          <p className="org__slogan">{content.slogan}</p>
          <div className="org__stats">
            {content.stats.map((s) => (
              <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>
            ))}
          </div>
          <p className="org__desc">{content.description}</p>
        </div>
      </div>
    </section>
  )
}
