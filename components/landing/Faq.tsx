const faqs = [
  { q: 'Trại hè dành cho độ tuổi nào?', a: 'Chương trình dành cho trẻ từ 6 đến 15 tuổi, chia thành các nhóm tuổi phù hợp để hoạt động.' },
  { q: 'Có xe đưa đón tận nhà không?', a: 'Có, UCMAS có dịch vụ xe đưa đón phủ các quận nội thành Hà Nội. Bố mẹ chỉ cần đăng ký địa chỉ, chúng tôi sẽ sắp xếp tuyến gần nhất.' },
  { q: 'Con có cần biết bơi trước không?', a: 'Không cần. Môn "Kỹ năng bơi" sẽ dạy con từ cơ bản với huấn luyện viên chuyên nghiệp tại bể bơi đạt chuẩn.' },
  { q: 'Học phí có hỗ trợ trả góp không?', a: 'Có. Bố mẹ có thể chia thành 2-3 đợt thanh toán. Liên hệ hotline để được tư vấn cụ thể.' },
  { q: 'Nếu con nghỉ học có được bảo lưu không?', a: 'Nếu con nghỉ do ốm có giấy của bác sĩ, UCMAS sẽ học bù hoặc hoàn phí theo chính sách.' },
  { q: 'Có thể tham quan trung tâm trước khi đăng ký không?', a: 'Hoàn toàn được! Bố mẹ có thể đặt lịch tham quan miễn phí qua hotline 0967.868.623.' },
]

export default function Faq() {
  return (
    <section className="faq" id="faq">
      <div className="container">
        <header className="section-head section-head--center">
          <span className="section-eyebrow">FAQ</span>
          <h2>
            Giải đáp câu hỏi của <span className="tx-red">phụ huynh</span>
          </h2>
        </header>

        <div className="faq__list">
          {faqs.map((faq) => (
            <details key={faq.q}>
              <summary>
                {faq.q} <span className="chev">+</span>
              </summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
