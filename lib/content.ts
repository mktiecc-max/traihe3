import { createClient } from '@supabase/supabase-js'

// ==================== TYPES ====================
export type HeroContent = {
  eyebrow: string
  titleLine1: string
  titleHighlight1: string
  titleLine2: string
  titleHighlight2: string
  description: string
  ctaPrimary: string
  phone: string
  phoneLabel: string
  floatTag1: string
  floatTag2: string
  stats: Array<{ value: string; label: string }>
}

export type UrgencyContent = {
  ribbon: string
  title: string
  deadline: string
  discount: string
  description: string
  formBadge: string
  formTitle: string
  submitText: string
  successMsg: string
  checkmarks: string[]
  sessions: Array<{ value: string; label: string }>
}

export type GiftContent = {
  badge: string
  title: string
  description: string
  gifts: string[]
  ctaText: string
}

export type PainContent = {
  eyebrow: string
  title: string
  description: string
  pains: Array<{ icon: string; title: string; desc: string }>
  bridgeText: string
}

export type BenefitContent = {
  eyebrow: string
  title: string
  benefits: Array<{ num: string; title: string; desc: string }>
}

export type SubjectContent = {
  eyebrow: string
  title: string
  description: string
  physical: Array<{ icon: string; title: string; desc: string }>
  mental: Array<{ icon: string; title: string; desc: string }>
}

export type ScheduleContent = {
  eyebrow: string
  title: string
  description: string
  timeline: Array<{ time: string; title: string; desc: string }>
  pricingTitle: string
  priceCards: Array<{
    tag: string
    period: string
    priceOld: string
    priceNew: string
    features: string[]
    ctaText: string
    featured?: boolean
    ribbon?: string
  }>
  policies: Array<{ icon: string; text: string }>
}

export type GalleryContent = {
  eyebrow: string
  title: string
  items: Array<{ label: string }>
  testimonials: Array<{ initial: string; text: string; name: string; role: string }>
}

export type FaqContent = {
  eyebrow: string
  title: string
  faqs: Array<{ q: string; a: string }>
}

export type OrgContent = {
  name: string
  slogan: string
  description: string
  stats: Array<{ value: string; label: string }>
}

export type FinalCtaContent = {
  title: string
  description: string
  ctaText: string
  phone: string
  totalSeats: number
}

export type FooterContent = {
  tagline: string
  company: string
  address: string
  phone: string
  website: string
  copyright: string
}

export type ContactContent = {
  phone: string
  phoneFormatted: string
  zaloUrl: string
  messengerUrl: string
  promoText: string
}

export type SiteContent = {
  hero: HeroContent
  urgency: UrgencyContent
  gift: GiftContent
  painPoints: PainContent
  benefits: BenefitContent
  subjects: SubjectContent
  schedule: ScheduleContent
  gallery: GalleryContent
  faq: FaqContent
  organization: OrgContent
  finalCta: FinalCtaContent
  footer: FooterContent
  contact: ContactContent
}

// ==================== DEFAULTS ====================
export const defaultContent: SiteContent = {
  hero: {
    eyebrow: 'Mùa hè trải nghiệm 2026 · Hà Nội',
    titleLine1: 'Tăng',
    titleHighlight1: 'Thể chất',
    titleLine2: 'Bật',
    titleHighlight2: 'Tư duy',
    description: 'Chương trình trại hè bán trú UCMAS dành cho trẻ 6 – 15 tuổi. 14 môn học phát triển toàn diện · Lịch sinh hoạt có cấu trúc · Xe đưa đón tận nhà.',
    ctaPrimary: 'Đăng ký nhận ưu đãi 25%',
    phone: '0967868623',
    phoneLabel: 'Tư vấn miễn phí',
    floatTag1: 'Đang nhận đăng ký Kỳ 1 · Tháng 6',
    floatTag2: '⭐ 4.9/5 · 1.000+ phụ huynh',
    stats: [
      { value: '18+', label: 'Năm kinh nghiệm' },
      { value: '06', label: 'Mùa trại hè' },
      { value: '1.000+', label: 'Học sinh / kỳ' },
      { value: '14', label: 'Môn học' },
    ],
  },
  urgency: {
    ribbon: '🔥 50 suất đăng ký sớm',
    title: 'Đăng ký trước 15/03/2026 để nhận ưu đãi 25%',
    deadline: '2026-03-15T23:59:59+07:00',
    discount: '25',
    description: 'Hoàn tất 30 giây — Cô Yến của UCMAS sẽ gọi tư vấn trong vòng 15 phút. Bố mẹ nhận ngay bảng học phí chi tiết + lịch trình 14 môn học.',
    formBadge: 'CON NHẬN QUÀ NGAY KHI BỐ MẸ ĐĂNG KÝ',
    formTitle: 'Nhận ưu đãi 25% + Bộ 8 quà tặng',
    submitText: 'Đăng ký nhận ưu đãi',
    successMsg: '🎉 Đăng ký thành công! Cô Yến của UCMAS sẽ liên hệ với bố mẹ trong ít phút.',
    checkmarks: [
      'Bộ 8 quà tặng giao tận nhà',
      'Giảm thêm khi đăng ký nhóm 2-3 bạn',
      'Cam kết bảo mật thông tin',
    ],
    sessions: [
      { value: 'Kỳ 1 - Tháng 6', label: 'Kỳ 1 · Tháng 6' },
      { value: 'Kỳ 2 - Tháng 7', label: 'Kỳ 2 · Tháng 7' },
      { value: 'Cả 2 kỳ', label: 'Cả 2 kỳ (ưu đãi thêm)' },
    ],
  },
  gift: {
    badge: 'BỘ 8 QUÀ TẶNG ĐẶC BIỆT',
    title: 'Quà gửi tận nhà ngay khi bố mẹ đăng ký',
    description: 'Bộ phụ kiện trại hè UCMAS giúp con sẵn sàng cho mùa hè trải nghiệm — từ ba lô, áo đồng phục, bình nước đến sổ tay học tập.',
    gifts: ['🎒 Ba lô UCMAS', '👕 Áo đồng phục', '🧢 Nón trại hè', '💧 Bình nước thể thao', '📔 Sổ tay nhật ký', '✏️ Bộ dụng cụ học tập', '🎖️ Huy hiệu UCMAS', '🎁 Voucher học thử miễn phí'],
    ctaText: 'Nhận quà cho con ngay',
  },
  painPoints: {
    eyebrow: 'Bố mẹ có đang lo lắng…',
    title: 'Đừng để mùa hè của con trôi qua "vô nghĩa"',
    description: 'Hè đáng lẽ là thời điểm để con khám phá. Nhưng nhiều bạn nhỏ lại bị "giam" trong 4 bức tường với chiếc iPad.',
    pains: [
      { icon: '😰', title: 'Nghiện màn hình', desc: 'Con "dính" iPad, TV, Games suốt ngày — giảm tập trung, mất kiên nhẫn, khó học lại khi vào năm học mới.' },
      { icon: '😤', title: 'Mất nề nếp', desc: 'Con ngủ muộn, dậy trễ, ăn uống thất thường. Cơ thể uể oải, khó vào guồng học tập sau hè.' },
      { icon: '😩', title: 'Lười vận động', desc: 'Con ít chạy nhảy, sức bền kém, dễ cáu gắt. Thiếu năng lượng để học và chơi với bạn bè.' },
      { icon: '😟', title: 'Ngại giao tiếp', desc: 'Con mất cơ hội kết bạn, rụt rè, khó hòa nhập. Thiếu kỹ năng sống cần thiết cho tương lai.' },
    ],
    bridgeText: 'Hãy để con thỏa sức trong một mùa hè có cấu trúc, có niềm vui và có giá trị.',
  },
  benefits: {
    eyebrow: '10 Lợi ích',
    title: 'Tại sao bố mẹ chọn Trại hè UCMAS?',
    benefits: [
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
    ],
  },
  subjects: {
    eyebrow: '14 môn học',
    title: 'Giúp con phát triển toàn diện trong mùa hè',
    description: 'Chương trình cân bằng giữa Thể chất và Tư duy — không học thêm, không áp lực.',
    physical: [
      { icon: '💃', title: 'Nhảy hiện đại', desc: 'Tự tin biểu diễn, nâng cao sức bền.' },
      { icon: '🏊', title: 'Kỹ năng bơi', desc: 'An toàn dưới nước, phát triển cơ.' },
      { icon: '🤸', title: 'Thể dục tăng chiều cao', desc: 'Bài tập khoa học, hiệu quả.' },
      { icon: '👨‍🍳', title: 'Đầu bếp nhí', desc: 'Tự lập, sáng tạo trong bếp.' },
      { icon: '🪁', title: 'Trò chơi dân gian', desc: 'Khám phá văn hóa Việt.' },
      { icon: '🏕️', title: 'Kỹ năng sinh tồn', desc: 'Tự bảo vệ, ứng phó tình huống.' },
      { icon: '🌳', title: 'Dã ngoại', desc: 'Khám phá thiên nhiên, kết bạn.' },
    ],
    mental: [
      { icon: '🎩', title: 'Trình diễn ảo thuật', desc: 'Tự tin biểu diễn trước đám đông.' },
      { icon: '🗣️', title: 'Tiếng Anh giao tiếp', desc: 'Phản xạ ngôn ngữ tự nhiên.' },
      { icon: '🧩', title: 'Thử thách siêu trí tuệ', desc: 'Tư duy logic, phản xạ nhanh.' },
      { icon: '🎨', title: 'Xưởng nghệ thuật xanh', desc: 'Sáng tạo từ vật liệu tái chế.' },
      { icon: '🤝', title: 'Văn hóa ứng xử', desc: 'Lễ phép, biết cách giao tiếp.' },
      { icon: '🔬', title: 'Khoa học kỳ thú', desc: 'Thí nghiệm trực quan, dễ hiểu.' },
      { icon: '🤖', title: 'Roborobo', desc: 'Lắp ráp robot, lập trình cơ bản.' },
    ],
  },
  schedule: {
    eyebrow: 'Lịch & học phí',
    title: 'Một ngày tại trại hè UCMAS',
    description: 'Lịch sinh hoạt cân bằng — giúp con khỏe, vui và học mỗi ngày.',
    timeline: [
      { time: '07:30', title: 'Xe đón tại nhà', desc: 'Tuyến xe phủ các quận nội thành Hà Nội.' },
      { time: '08:30', title: 'Khai mạc + Vận động sáng', desc: 'Năng lượng tích cực cho cả ngày.' },
      { time: '09:00', title: 'Môn Thể chất', desc: 'Bơi, nhảy, thể dục tăng chiều cao…' },
      { time: '11:30', title: 'Ăn trưa + Nghỉ trưa', desc: 'Thực đơn đủ dinh dưỡng, ngủ trưa 1h.' },
      { time: '14:00', title: 'Môn Tư duy', desc: 'Tiếng Anh, Khoa học, Roborobo…' },
      { time: '16:00', title: 'Bữa xế + Hoạt động nhóm', desc: 'Trò chơi, dã ngoại, nghệ thuật.' },
      { time: '17:30', title: 'Xe đưa về nhà', desc: 'An toàn, đúng giờ.' },
    ],
    pricingTitle: 'Học phí ưu đãi đăng ký sớm',
    priceCards: [
      { tag: 'Kỳ 1', period: 'Tháng 6 · 4 tuần', priceOld: '9.800.000 ₫', priceNew: '7.350.000', features: ['✓ 14 môn học · 20 ngày', '✓ Xe đưa đón', '✓ 3 bữa ăn / ngày', '✓ Bộ 8 quà tặng'], ctaText: 'Chọn Kỳ 1' },
      { tag: 'Combo 2 kỳ', period: 'Tháng 6 + 7 · 8 tuần', priceOld: '19.600.000 ₫', priceNew: '14.700.000', features: ['✓ Tất cả quyền lợi Kỳ 1', '✓ Tặng kèm Kỳ 2', '✓ Quà tặng đặc biệt cuối khóa', '✓ Ưu tiên giữ chỗ năm sau'], ctaText: 'Chọn Combo', featured: true, ribbon: 'Tiết kiệm 25%' },
      { tag: 'Kỳ 2', period: 'Tháng 7 · 4 tuần', priceOld: '9.800.000 ₫', priceNew: '7.350.000', features: ['✓ 14 môn học · 20 ngày', '✓ Xe đưa đón', '✓ 3 bữa ăn / ngày', '✓ Bộ 8 quà tặng'], ctaText: 'Chọn Kỳ 2' },
    ],
    policies: [
      { icon: '👥', text: 'Nhóm 2-3 bạn: giảm thêm 5-10%' },
      { icon: '🎁', text: 'Giới thiệu bạn: tặng voucher 500K' },
      { icon: '🏅', text: 'Học viên cũ: ưu đãi riêng 15%' },
    ],
  },
  gallery: {
    eyebrow: 'Khoảnh khắc',
    title: 'Sự hào hứng của các con & sự hài lòng của bố mẹ',
    items: [
      { label: 'Khai giảng' }, { label: 'Bơi lội' }, { label: 'Đầu bếp nhí' }, { label: 'Dã ngoại' },
      { label: 'Nhảy hiện đại' }, { label: 'Roborobo' }, { label: 'Tiếng Anh' }, { label: 'Nghệ thuật' },
    ],
    testimonials: [
      { initial: 'N', text: '"Con mình năm ngoái đi trại hè UCMAS, về nhà tự giác hơn hẳn — bớt iPad, biết phụ mẹ làm bếp. Năm nay đăng ký tiếp luôn!"', name: 'Chị Nguyễn Thu Hà', role: 'Phụ huynh bé Minh Anh · Cầu Giấy' },
      { initial: 'T', text: '"Bé nhà mình nhút nhát lắm, sau 1 tháng ở UCMAS đã dám tự lên sân khấu ảo thuật. Cảm ơn các cô!"', name: 'Anh Trần Quốc Bảo', role: 'Phụ huynh bé Bảo Nam · Đống Đa' },
      { initial: 'L', text: '"Lịch sinh hoạt rất khoa học, xe đưa đón đúng giờ. Con khỏe ra trông thấy sau 2 tháng hè."', name: 'Chị Lê Minh Châu', role: 'Phụ huynh bé Khánh An · Hà Đông' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Giải đáp câu hỏi của phụ huynh',
    faqs: [
      { q: 'Trại hè dành cho độ tuổi nào?', a: 'Chương trình dành cho trẻ từ 6 đến 15 tuổi, chia thành các nhóm tuổi phù hợp để hoạt động.' },
      { q: 'Có xe đưa đón tận nhà không?', a: 'Có, UCMAS có dịch vụ xe đưa đón phủ các quận nội thành Hà Nội. Bố mẹ chỉ cần đăng ký địa chỉ, chúng tôi sẽ sắp xếp tuyến gần nhất.' },
      { q: 'Con có cần biết bơi trước không?', a: 'Không cần. Môn "Kỹ năng bơi" sẽ dạy con từ cơ bản với huấn luyện viên chuyên nghiệp tại bể bơi đạt chuẩn.' },
      { q: 'Học phí có hỗ trợ trả góp không?', a: 'Có. Bố mẹ có thể chia thành 2-3 đợt thanh toán. Liên hệ hotline để được tư vấn cụ thể.' },
      { q: 'Nếu con nghỉ học có được bảo lưu không?', a: 'Nếu con nghỉ do ốm có giấy của bác sĩ, UCMAS sẽ học bù hoặc hoàn phí theo chính sách.' },
      { q: 'Có thể tham quan trung tâm trước khi đăng ký không?', a: 'Hoàn toàn được! Bố mẹ có thể đặt lịch tham quan miễn phí qua hotline 0967.868.623.' },
    ],
  },
  organization: {
    name: 'UCMAS Việt Nam',
    slogan: 'UY TÍN · CHUYÊN NGHIỆP · CHẤT LƯỢNG',
    description: '18 năm hành trình vì những bộ não Việt khỏe mạnh. UCMAS Việt Nam — đơn vị tiên phong phát triển phương pháp UCMAS toàn diện cho trẻ em Việt Nam.',
    stats: [
      { value: '18+', label: 'Năm kinh nghiệm' },
      { value: '06', label: 'Mùa trại hè' },
      { value: '1.000+', label: 'Học sinh/kỳ' },
    ],
  },
  finalCta: {
    title: 'Sẵn sàng cho mùa hè khác biệt của con?',
    description: 'Chỉ còn {seats}/50 suất ưu đãi 25% · Đăng ký trước 15/03/2026',
    ctaText: 'Đăng ký nhận tư vấn miễn phí',
    phone: '0967868623',
    totalSeats: 50,
  },
  footer: {
    tagline: '18 năm hành trình vì những bộ não Việt khỏe mạnh',
    company: 'CÔNG TY CP PHÁT TRIỂN GIÁO DỤC IECC',
    address: 'Số 37 ngõ 80 Trung Kính, Yên Hòa, Hà Nội',
    phone: '0967868623',
    website: 'https://www.ucmasvietnam.com',
    copyright: '© 2026 UCMAS Việt Nam · IECC. Mọi quyền được bảo lưu.',
  },
  contact: {
    phone: '0967868623',
    phoneFormatted: '0967.868.623',
    zaloUrl: 'https://zalo.me/0967868623',
    messengerUrl: 'https://m.me/ucmasvietnam',
    promoText: 'ƯU ĐÃI ĐĂNG KÝ SỚM TỚI 25% · Bộ 8 quà tặng gửi tận nhà',
  },
}

// ==================== SECTION LABELS (for admin UI) ====================
export const sectionLabels: Record<keyof SiteContent, string> = {
  hero: '🏠 Hero Banner',
  urgency: '⏰ Form đăng ký & Countdown',
  gift: '🎁 Bộ quà tặng',
  painPoints: '😰 Nỗi lo phụ huynh',
  benefits: '✅ 10 Lợi ích',
  subjects: '📚 14 Môn học',
  schedule: '📅 Lịch & Học phí',
  gallery: '📸 Hình ảnh & Nhận xét',
  faq: '❓ FAQ',
  organization: '🏢 Giới thiệu tổ chức',
  finalCta: '🚀 CTA cuối trang',
  footer: '📋 Footer',
  contact: '📞 Thông tin liên hệ chung',
}

// ==================== FETCH / SAVE ====================
function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function fetchSiteContent(): Promise<SiteContent> {
  try {
    const db = getSupabaseClient()
    const { data, error } = await db
      .from('site_content')
      .select('section, content')

    if (error || !data || data.length === 0) {
      return { ...defaultContent }
    }

    const content = { ...defaultContent }
    for (const row of data) {
      const key = row.section as keyof SiteContent
      if (key in content) {
        content[key] = { ...content[key], ...row.content }
      }
    }
    return content
  } catch {
    return { ...defaultContent }
  }
}
