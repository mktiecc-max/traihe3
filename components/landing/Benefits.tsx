const benefits = [
  { num: '01', title: 'Tăng cường thể chất', desc: 'Vận động đa dạng giúp con khỏe mạnh, dẻo dai.' },
  { num: '02', title: 'Kích hoạt tư duy', desc: 'Nhanh nhạy, sáng tạo, phản xạ tốt.' },
  { num: '03', title: 'Giảm phụ thuộc thiết bị', desc: 'Cai nghiện iPad, TV một cách tự nhiên.' },
  { num: '04', title: 'Tự tin giao tiếp', desc: 'Mạnh dạn thể hiện bản thân, kết bạn mới.' },
  { num: '05', title: 'Kỹ năng sống', desc: 'Tự lập, tự chăm sóc, biết ứng xử.' },
  { num: '06', title: 'Cân bằng cảm xúc', desc: 'Tâm lý ổn định, vui vẻ, tích cực.' },
  { num: '07', title: 'Khơi gợi sáng tạo', desc: 'Trí tưởng tượng phong phú qua nghệ thuật.' },
  { num: '08', title: 'Làm việc nhóm', desc: 'Hợp tác, lãnh đạo, chia sẻ trách nhiệm.' },
  { num: '09', title: 'Môi trường an toàn', desc: 'Xe đưa đón + giáo viên chuyên trách.' },
  { num: '10', title: '"Sạc pin" cho năm học', desc: 'Sẵn sàng vào năm học mới đầy năng lượng.' },
]

export default function Benefits() {
  return (
    <section className="benefits">
      <div className="container">
        <header className="section-head section-head--center section-head--light">
          <span className="section-eyebrow section-eyebrow--light">10 Lợi ích</span>
          <h2>
            Tại sao bố mẹ chọn <span className="tx-yellow">Trại hè UCMAS</span>?
          </h2>
        </header>

        <div className="benefits__grid">
          {benefits.map((b) => (
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
