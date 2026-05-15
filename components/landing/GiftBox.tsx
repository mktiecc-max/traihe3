export default function GiftBox() {
  const gifts = [
    '🎒 Ba lô UCMAS',
    '👕 Áo đồng phục',
    '🧢 Nón trại hè',
    '💧 Bình nước thể thao',
    '📔 Sổ tay nhật ký',
    '✏️ Bộ dụng cụ học tập',
    '🎖️ Huy hiệu UCMAS',
    '🎁 Voucher học thử miễn phí',
  ]

  return (
    <section className="gift">
      <div className="container gift__inner">
        <div className="gift__copy">
          <span className="badge-green">BỘ 8 QUÀ TẶNG ĐẶC BIỆT</span>
          <h2>
            Quà gửi tận nhà <em>ngay khi bố mẹ đăng ký</em>
          </h2>
          <p>
            Bộ phụ kiện trại hè UCMAS giúp con sẵn sàng cho mùa hè trải nghiệm — từ ba lô, áo đồng
            phục, bình nước đến sổ tay học tập.
          </p>
          <ul className="gift__list">
            {gifts.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <a href="#form" className="btn btn--green btn--lg" style={{ color: '#fff' }}>
            Nhận quà cho con ngay
          </a>
        </div>
        <div className="gift__media">
          <div className="ph ph--gift" role="img" aria-label="Bộ 8 quà tặng UCMAS">
            <span className="ph__chip">Ảnh sản phẩm · 8 món quà</span>
          </div>
        </div>
      </div>
    </section>
  )
}
