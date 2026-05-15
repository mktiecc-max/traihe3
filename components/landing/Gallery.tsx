const gallery = [
  { cls: 'a', label: 'Khai giảng' },
  { cls: 'b', label: 'Bơi lội' },
  { cls: 'c', label: 'Đầu bếp nhí' },
  { cls: 'd', label: 'Dã ngoại' },
  { cls: 'e', label: 'Nhảy hiện đại' },
  { cls: 'f', label: 'Roborobo' },
  { cls: 'g', label: 'Tiếng Anh' },
  { cls: 'h', label: 'Nghệ thuật' },
]

const testimonials = [
  {
    initial: 'N',
    text: '"Con mình năm ngoái đi trại hè UCMAS, về nhà tự giác hơn hẳn — bớt iPad, biết phụ mẹ làm bếp. Năm nay đăng ký tiếp luôn!"',
    name: 'Chị Nguyễn Thu Hà',
    role: 'Phụ huynh bé Minh Anh · Cầu Giấy',
  },
  {
    initial: 'T',
    text: '"Bé nhà mình nhút nhát lắm, sau 1 tháng ở UCMAS đã dám tự lên sân khấu ảo thuật. Cảm ơn các cô!"',
    name: 'Anh Trần Quốc Bảo',
    role: 'Phụ huynh bé Bảo Nam · Đống Đa',
  },
  {
    initial: 'L',
    text: '"Lịch sinh hoạt rất khoa học, xe đưa đón đúng giờ. Con khỏe ra trông thấy sau 2 tháng hè."',
    name: 'Chị Lê Minh Châu',
    role: 'Phụ huynh bé Khánh An · Hà Đông',
  },
]

export default function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <header className="section-head section-head--center section-head--light">
          <span className="section-eyebrow section-eyebrow--light">Khoảnh khắc</span>
          <h2>Sự hào hứng của các con &amp; sự hài lòng của bố mẹ</h2>
        </header>

        <div className="gallery__grid">
          {gallery.map((g) => (
            <div key={g.cls} className={`ph ph--gal ${g.cls}`} role="img" aria-label={g.label}>
              <span className="ph__chip">{g.label}</span>
            </div>
          ))}
        </div>

        <div className="testimonials">
          {testimonials.map((t) => (
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
