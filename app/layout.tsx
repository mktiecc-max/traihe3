import type { Metadata } from 'next'
import './globals.css'
import SessionProvider from '@/components/admin/SessionProvider'

export const metadata: Metadata = {
  title: 'Trại hè bán trú UCMAS 2026 — Tăng Thể chất, Bật Tư duy',
  description:
    'Chương trình trại hè bán trú UCMAS 2026 cho trẻ 6-15 tuổi. 14 môn học phát triển toàn diện. Ưu đãi đăng ký sớm tới 25% + Bộ 8 quà tặng.',
  openGraph: {
    title: 'Trại hè bán trú UCMAS 2026',
    description: 'Tăng Thể chất, Bật Tư duy — 14 môn học · Xe đưa đón · Bộ 8 quà tặng',
    type: 'website',
    locale: 'vi_VN',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
