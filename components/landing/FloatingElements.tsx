import type { ContactContent } from '@/lib/content'

export default function FloatingElements({ content }: { content: ContactContent }) {
  return (
    <>
      {/* Mobile Sticky CTA */}
      <div className="m-cta">
        <a href={`tel:${content.phone}`} className="m-cta__phone" aria-label="Gọi hotline">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.07 15.07 0 0 1-6.59-6.59l2.2-2.21a1 1 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1Z" />
          </svg>
        </a>
        <a href="#form" className="m-cta__primary">
          Đăng ký ngay · Nhận ưu đãi 25%
        </a>
      </div>

      {/* Floating Social */}
      <div className="float-social">
        <a
          href={content.messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Messenger"
          className="fs-btn fs-btn--msg"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.5 5.5 3.8 7.2v3.5l3.5-1.9c.9.3 1.8.4 2.7.4 5.5 0 10-4.1 10-9.2S17.5 2 12 2Zm1 12.4-2.5-2.7-4.9 2.7 5.4-5.7 2.6 2.7 4.8-2.7L13 14.4Z" />
          </svg>
        </a>
        <a
          href={content.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Zalo"
          className="fs-btn fs-btn--zalo"
        >
          Z
        </a>
      </div>
    </>
  )
}
