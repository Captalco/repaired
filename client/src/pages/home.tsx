import HeroSection from "@/components/home/hero-section";
import TrustedBy from "@/components/home/trusted-by";
import FeaturesSection from "@/components/home/features-section";
import ScreenshotGallery from "@/components/home/screenshot-gallery";
import TestimonialsSection from "@/components/home/testimonials-section";
import PricingSection from "@/components/home/pricing-section";
import CTASection from "@/components/home/cta-section";
import AboutSection from "@/components/home/about-section";
import ContactSection from "@/components/home/contact-section";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Set page title
    document.title = "repaired.co | Streamline Your Project Management";
    
    // Smooth scroll behavior for section navigation
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = (link as HTMLAnchorElement).getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId as string);
        if (targetElement) {
          window.scrollTo({
            top: (targetElement as HTMLElement).offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <>
      <HeroSection />
      <TrustedBy />
      <FeaturesSection />
      <ScreenshotGallery />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
