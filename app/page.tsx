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

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <UrgencyForm />
        <GiftBox />
        <PainPoints />
        <Benefits />
        <Subjects />
        <SchedulePricing />
        <Gallery />
        <Faq />
        <Organization />
        <FinalCta />
      </main>
      <SiteFooter />
      <FloatingElements />
    </>
  )
}
