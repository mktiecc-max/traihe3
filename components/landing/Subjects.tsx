'use client'

import { useState } from 'react'
import type { SubjectContent } from '@/lib/content'

export default function Subjects({ content }: { content: SubjectContent }) {
  const [tab, setTab] = useState<'physical' | 'mental'>('physical')
  const subjects = tab === 'physical' ? content.physical : content.mental

  return (
    <section className="subjects" id="mon-hoc">
      <div className="container">
        <header className="section-head section-head--center">
          <span className="section-eyebrow">{content.eyebrow}</span>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </header>

        <div className="subj-tabs">
          <button
            className={`subj-tab${tab === 'physical' ? ' is-active' : ''}`}
            data-tab="physical"
            onClick={() => setTab('physical')}
          >
            🏃 Thể chất
          </button>
          <button
            className={`subj-tab${tab === 'mental' ? ' is-active' : ''}`}
            data-tab="mental"
            onClick={() => setTab('mental')}
          >
            🧠 Tư duy
          </button>
        </div>

        <div className="subj-panel is-active">
          <div className="subj-grid">
            {subjects.map((s) => (
              <article className="subj-card" key={s.title}>
                <div className="subj-card__icon">{s.icon}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
