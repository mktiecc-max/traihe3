import dynamic from 'next/dynamic'
import { fetchSiteContent } from '@/lib/content'
import SiteHeader from '@/components/landing/SiteHeader'
import Hero from '@/components/landing/Hero'
import UrgencyForm from '@/components/landing/UrgencyForm'

// Lazy load below-the-fold sections — reduces initial JS bundle
const GiftBox = dynamic(() => import('@/components/landing/GiftBox'))
const PainPoints = dynamic(() => import('@/components/landing/PainPoints'))
const Benefits = dynamic(() => import('@/components/landing/Benefits'))
const Subjects = dynamic(() => import('@/components/landing/Subjects'))
const SchedulePricing = dynamic(() => import('@/components/landing/SchedulePricing'))
const Gallery = dynamic(() => import('@/components/landing/Gallery'))
const Faq = dynamic(() => import('@/components/landing/Faq'))
const Organization = dynamic(() => import('@/components/landing/Organization'))
const FinalCta = dynamic(() => import('@/components/landing/FinalCta'))
const SiteFooter = dynamic(() => import('@/components/landing/SiteFooter'))
const FloatingElements = dynamic(() => import('@/components/landing/FloatingElements'))

export const revalidate = 60 // ISR: revalidate content every 60 seconds

export default async function LandingPage() {
  const content = await fetchSiteContent()

  return (
    <>
      <SiteHeader content={content.contact} />
      <main>
        <Hero content={content.hero} />
        <UrgencyForm content={content.urgency} />
        <GiftBox content={content.gift} />
        <PainPoints content={content.painPoints} />
        <Benefits content={content.benefits} />
        <Subjects content={content.subjects} />
        <SchedulePricing content={content.schedule} />
        <Gallery content={content.gallery} />
        <Faq content={content.faq} />
        <Organization content={content.organization} />
        <FinalCta content={content.finalCta} />
      </main>
      <SiteFooter content={content.footer} />
      <FloatingElements content={content.contact} />
    </>
  )
}
