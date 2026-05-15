const timeline = [
  { time: '07:30', title: 'Xe đón tại nhà', desc: 'Tuyến xe phủ các quận nội thành Hà Nội.' },
  { time: '08:30', title: 'Khai mạc + Vận động sáng', desc: 'Năng lượng tích cực cho cả ngày.' },
  { time: '09:00', title: 'Môn Thể chất', desc: 'Bơi, nhảy, thể dục tăng chiều cao…' },
  { time: '11:30', title: 'Ăn trưa + Nghỉ trưa', desc: 'Thực đơn đủ dinh dưỡng, ngủ trưa 1h.' },
  { time: '14:00', title: 'Môn Tư duy', desc: 'Tiếng Anh, Khoa học, Roborobo…' },
  { time: '16:00', title: 'Bữa xế + Hoạt động nhóm', desc: 'Trò chơi, dã ngoại, nghệ thuật.' },
  { time: '17:30', title: 'Xe đưa về nhà', desc: 'An toàn, đúng giờ.' },
]

export default function SchedulePricing() {
  return (
    <section className="schedule" id="hoc-phi">
      <div className="container schedule__inner">
        {/* Timeline */}
        <div className="schedule__col">
          <header className="section-head">
            <span className="section-eyebrow">Lịch &amp; học phí</span>
            <h2>Một ngày tại trại hè UCMAS</h2>
            <p>Lịch sinh hoạt cân bằng — giúp con khỏe, vui và học mỗi ngày.</p>
          </header>
          <ul className="timeline">
            {timeline.map((t) => (
              <li key={t.time}>
                <span className="time">{t.time}</span>
                <div>
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing */}
        <div className="schedule__col">
          <h3 className="pricing__head">Học phí ưu đãi đăng ký sớm</h3>
          <div className="pricing">
            <article className="price-card">
              <div className="price-card__tag">Kỳ 1</div>
              <h4>Tháng 6 · 4 tuần</h4>
              <div className="price-old">9.800.000 ₫</div>
              <div className="price-new"><strong>7.350.000</strong> ₫</div>
              <ul>
                <li>✓ 14 môn học · 20 ngày</li>
                <li>✓ Xe đưa đón</li>
                <li>✓ 3 bữa ăn / ngày</li>
                <li>✓ Bộ 8 quà tặng</li>
              </ul>
              <a href="#form" className="btn btn--outline btn--block">Chọn Kỳ 1</a>
            </article>

            <article className="price-card price-card--featured">
              <div className="price-card__ribbon">Tiết kiệm 25%</div>
              <div className="price-card__tag">Combo 2 kỳ</div>
              <h4>Tháng 6 + 7 · 8 tuần</h4>
              <div className="price-old">19.600.000 ₫</div>
              <div className="price-new"><strong>14.700.000</strong> ₫</div>
              <ul>
                <li>✓ Tất cả quyền lợi Kỳ 1</li>
                <li>✓ Tặng kèm Kỳ 2</li>
                <li>✓ Quà tặng đặc biệt cuối khóa</li>
                <li>✓ Ưu tiên giữ chỗ năm sau</li>
              </ul>
              <a href="#form" className="btn btn--primary btn--block">Chọn Combo</a>
            </article>

            <article className="price-card">
              <div className="price-card__tag">Kỳ 2</div>
              <h4>Tháng 7 · 4 tuần</h4>
              <div className="price-old">9.800.000 ₫</div>
              <div className="price-new"><strong>7.350.000</strong> ₫</div>
              <ul>
                <li>✓ 14 môn học · 20 ngày</li>
                <li>✓ Xe đưa đón</li>
                <li>✓ 3 bữa ăn / ngày</li>
                <li>✓ Bộ 8 quà tặng</li>
              </ul>
              <a href="#form" className="btn btn--outline btn--block">Chọn Kỳ 2</a>
            </article>
          </div>

          <div className="policies">
            <h4>3 chính sách ưu đãi cộng dồn</h4>
            <ul>
              <li><strong>👥 Nhóm 2-3 bạn:</strong> giảm thêm 5-10%</li>
              <li><strong>🎁 Giới thiệu bạn:</strong> tặng voucher 500K</li>
              <li><strong>🏅 Học viên cũ:</strong> ưu đãi riêng 15%</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
