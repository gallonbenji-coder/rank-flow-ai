import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { SocialProofSection } from "@/components/landing/social-proof-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { DashboardPreviewSection } from "@/components/landing/dashboard-preview-section"
import { BenefitsSection } from "@/components/landing/benefits-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { FAQSection } from "@/components/landing/faq-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SocialProofSection />
      <section id="features">
        <FeaturesSection />
      </section>
      <DashboardPreviewSection />
      <BenefitsSection />
      <section id="pricing">
        <PricingSection />
      </section>
      <TestimonialsSection />
      <section id="faq">
        <FAQSection />
      </section>
      <CTASection />
      <Footer />
    </main>
  )
}
