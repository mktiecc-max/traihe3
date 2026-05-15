const pains = [
  { icon: '😰', title: 'Nghiện màn hình', desc: 'Con "dính" iPad, TV, Games suốt ngày — giảm tập trung, mất kiên nhẫn, khó học lại khi vào năm học mới.' },
  { icon: '😤', title: 'Mất nề nếp', desc: 'Con ngủ muộn, dậy trễ, ăn uống thất thường. Cơ thể uể oải, khó vào guồng học tập sau hè.' },
  { icon: '😩', title: 'Lười vận động', desc: 'Con ít chạy nhảy, sức bền kém, dễ cáu gắt. Thiếu năng lượng để học và chơi với bạn bè.' },
  { icon: '😟', title: 'Ngại giao tiếp', desc: 'Con mất cơ hội kết bạn, rụt rè, khó hòa nhập. Thiếu kỹ năng sống cần thiết cho tương lai.' },
]

export default function PainPoints() {
  return (
    <section className="pain" id="chuong-trinh">
      <div className="container">
        <header className="section-head section-head--center">
          <span className="section-eyebrow">Bố mẹ có đang lo lắng…</span>
          <h2>
            Đừng để mùa hè của con trôi qua <span className="tx-red">&ldquo;vô nghĩa&rdquo;</span>
          </h2>
          <p>
            Hè đáng lẽ là thời điểm để con khám phá. Nhưng nhiều bạn nhỏ lại bị &ldquo;giam&rdquo; trong 4 bức
            tường với chiếc iPad.
          </p>
        </header>

        <div className="pain__grid">
          {pains.map((p) => (
            <article className="pain-card" key={p.title}>
              <div className="pain-card__icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </article>
          ))}
        </div>

        <div className="pain__bridge">
          <p>
            Hãy để con{' '}
            <span className="tx-red">
              <strong>thỏa sức</strong>
            </span>{' '}
            trong một mùa hè{' '}
            <span className="tx-green">
              <strong>có cấu trúc, có niềm vui và có giá trị</strong>
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
