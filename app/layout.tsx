import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'

const font = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Trại hè bán trú UCMAS 2026 — Tăng Thể chất, Bật Tư duy',
  description:
    'Chương trình trại hè bán trú UCMAS 2026 cho trẻ 6-15 tuổi. 14 môn học phát triển toàn diện. Ưu đãi đăng ký sớm tới 25% + Bộ 8 quà tặng.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://traihe.ucmasvietnam.com'),
  openGraph: {
    title: 'Trại hè bán trú UCMAS 2026',
    description: 'Tăng Thể chất, Bật Tư duy — 14 môn học · Xe đưa đón · Bộ 8 quà tặng',
    type: 'website',
    locale: 'vi_VN',
  },
  robots: { index: true, follow: true },
  other: {
    'theme-color': '#001f86',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={font.variable}>
      <body>{children}</body>
    </html>
  )
}
