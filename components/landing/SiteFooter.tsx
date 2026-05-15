export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col">
          <div className="footer__logo">
            <span className="logo-mark">U</span>
            <div>
              <strong>UCMAS Việt Nam</strong>
              <small>18 năm hành trình vì những bộ não Việt khỏe mạnh</small>
            </div>
          </div>
          <p className="footer__company">CÔNG TY CP PHÁT TRIỂN GIÁO DỤC IECC</p>
        </div>

        <div className="footer__col">
          <h4>Liên hệ</h4>
          <p>📍 Số 37 ngõ 80 Trung Kính, Yên Hòa, Hà Nội</p>
          <p>
            📞 <a href="tel:0967868623">0967.868.623</a>
          </p>
          <p>
            🌐{' '}
            <a href="https://www.ucmasvietnam.com" target="_blank" rel="noopener noreferrer">
              www.ucmasvietnam.com
            </a>
          </p>
        </div>

        <div className="footer__col">
          <h4>Liên kết</h4>
          <a href="#chuong-trinh">Về chương trình</a>
          <a href="#mon-hoc">14 môn học</a>
          <a href="#hoc-phi">Học phí</a>
          <a href="#faq">Câu hỏi thường gặp</a>
        </div>
      </div>
      <div className="footer__bottom container">
        © 2026 UCMAS Việt Nam · IECC. Mọi quyền được bảo lưu.
      </div>
    </footer>
  )
}
