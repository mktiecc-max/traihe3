export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="blob blob--1" />
        <div className="blob blob--2" />
        <div className="blob blob--3" />
      </div>
      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="hero__eyebrow">
            <span className="eyebrow-dot" /> Mùa hè trải nghiệm 2026 · Hà Nội
          </div>
          <h1 className="hero__title">
            Tăng <span className="tx-red">Thể chất</span>,<br />
            Bật <span className="tx-green">Tư duy</span>
          </h1>
          <p className="hero__sub">
            Chương trình <strong>trại hè bán trú UCMAS</strong> dành cho trẻ{' '}
            <strong>6 – 15 tuổi</strong>. 14 môn học phát triển toàn diện · Lịch sinh hoạt có cấu
            trúc · Xe đưa đón tận nhà.
          </p>
          <div className="hero__ctas">
            <a href="#form" className="btn btn--primary btn--lg btn--pulse">
              Đăng ký nhận ưu đãi 25%
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a href="tel:0967868623" className="btn btn--ghost btn--lg">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.07 15.07 0 0 1-6.59-6.59l2.2-2.21a1 1 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1Z" />
              </svg>
              Tư vấn miễn phí
            </a>
          </div>
          <ul className="hero__trust">
            <li><strong>18+</strong><span>Năm kinh nghiệm</span></li>
            <li><strong>06</strong><span>Mùa trại hè</span></li>
            <li><strong>1.000+</strong><span>Học sinh / kỳ</span></li>
            <li><strong>14</strong><span>Môn học</span></li>
          </ul>
        </div>

        <aside className="hero__panel">
          <div className="hero__media">
            <div className="ph ph--hero" role="img" aria-label="Trẻ em vui chơi tại trại hè UCMAS">
              <span className="ph__chip">Ảnh hero · trẻ em vui chơi</span>
            </div>
            <div className="float-tag float-tag--tl">
              <span className="dot dot--green" /> Đang nhận đăng ký Kỳ 1 · Tháng 6
            </div>
            <div className="float-tag float-tag--br">
              <strong>⭐ 4.9/5</strong> · 1.000+ phụ huynh
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
