import { fetchSiteContent } from '@/lib/content'
import SiteHeader from '@/components/landing/SiteHeader'
import Hero from '@/components/landing/Hero'
import UrgencyForm from '@/components/landing/UrgencyForm'
import GiftBox from '@/components/landing/GiftBox'
import PainPoints from '@/components/landing/PainPoints'
import Benefits from '@/components/landing/Benefits'
import Subjects from '@/components/landing/Subjects'
import SchedulePricing from '@/components/landing/SchedulePricing'
import Gallery from '@/components/landing/Gallery'
import Faq from '@/components/landing/Faq'
import Organization from '@/components/landing/Organization'
import FinalCta from '@/components/landing/FinalCta'
import SiteFooter from '@/components/landing/SiteFooter'
import FloatingElements from '@/components/landing/FloatingElements'

export const revalidate = 60 // revalidate content every 60 seconds

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
