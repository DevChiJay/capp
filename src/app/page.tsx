import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { HeroSection } from "@/components/sections/HeroSection"
import { DashboardPreviewSection } from "@/components/sections/DashboardPreviewSection"
import { MobileAppSection } from "@/components/sections/MobileAppSection"
import { CTASection } from "@/components/sections/CTASection"
import { ContactSection } from "@/components/sections/ContactSection"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <DashboardPreviewSection />
        <MobileAppSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
