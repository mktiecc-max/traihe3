import type { FooterContent } from '@/lib/content'

export default function SiteFooter({ content }: { content: FooterContent }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col">
          <div className="footer__logo">
            <span className="logo-mark">U</span>
            <div>
              <strong>UCMAS Việt Nam</strong>
              <small>{content.tagline}</small>
            </div>
          </div>
          <p className="footer__company">{content.company}</p>
        </div>

        <div className="footer__col">
          <h4>Liên hệ</h4>
          <p>📍 {content.address}</p>
          <p>
            📞 <a href={`tel:${content.phone}`}>{content.phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3')}</a>
          </p>
          <p>
            🌐{' '}
            <a href={content.website} target="_blank" rel="noopener noreferrer">
              {content.website.replace('https://', '')}
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
        {content.copyright}
      </div>
    </footer>
  )
}
