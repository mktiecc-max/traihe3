'use client'

import { useState } from 'react'

const physical = [
  { icon: '💃', title: 'Nhảy hiện đại', desc: 'Tự tin biểu diễn, nâng cao sức bền.' },
  { icon: '🏊', title: 'Kỹ năng bơi', desc: 'An toàn dưới nước, phát triển cơ.' },
  { icon: '🤸', title: 'Thể dục tăng chiều cao', desc: 'Bài tập khoa học, hiệu quả.' },
  { icon: '👨‍🍳', title: 'Đầu bếp nhí', desc: 'Tự lập, sáng tạo trong bếp.' },
  { icon: '🪁', title: 'Trò chơi dân gian', desc: 'Khám phá văn hóa Việt.' },
  { icon: '🏕️', title: 'Kỹ năng sinh tồn', desc: 'Tự bảo vệ, ứng phó tình huống.' },
  { icon: '🌳', title: 'Dã ngoại', desc: 'Khám phá thiên nhiên, kết bạn.' },
]

const mental = [
  { icon: '🎩', title: 'Trình diễn ảo thuật', desc: 'Tự tin biểu diễn trước đám đông.' },
  { icon: '🗣️', title: 'Tiếng Anh giao tiếp', desc: 'Phản xạ ngôn ngữ tự nhiên.' },
  { icon: '🧩', title: 'Thử thách siêu trí tuệ', desc: 'Tư duy logic, phản xạ nhanh.' },
  { icon: '🎨', title: 'Xưởng nghệ thuật xanh', desc: 'Sáng tạo từ vật liệu tái chế.' },
  { icon: '🤝', title: 'Văn hóa ứng xử', desc: 'Lễ phép, biết cách giao tiếp.' },
  { icon: '🔬', title: 'Khoa học kỳ thú', desc: 'Thí nghiệm trực quan, dễ hiểu.' },
  { icon: '🤖', title: 'Roborobo', desc: 'Lắp ráp robot, lập trình cơ bản.' },
]

export default function Subjects() {
  const [tab, setTab] = useState<'physical' | 'mental'>('physical')
  const subjects = tab === 'physical' ? physical : mental

  return (
    <section className="subjects" id="mon-hoc">
      <div className="container">
        <header className="section-head section-head--center">
          <span className="section-eyebrow">14 môn học</span>
          <h2>
            Giúp con phát triển <span className="tx-red">toàn diện</span> trong mùa hè
          </h2>
          <p>
            Chương trình cân bằng giữa <strong>Thể chất</strong> và <strong>Tư duy</strong> — không
            học thêm, không áp lực.
          </p>
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
