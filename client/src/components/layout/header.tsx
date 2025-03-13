import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, setLocation] = useLocation();

  const handleScroll = () => {
    setScrolled(window.scrollY > 20);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className={cn(
      "fixed w-full bg-background/95 z-50 border-b transition-all duration-300",
      scrolled ? "border-border/50 backdrop-blur-sm py-3" : "border-transparent py-4"
    )}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center overflow-hidden relative">
              <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full">
                {/* Asymmetrical geometric logo */}
                <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="#6A4DFF" />
                <path d="M10 5 L30 5 L35 35 L5 30 Z" fill="#4A2EF7" />
                <path d="M15 10 L35 15 L25 30 L10 25 Z" fill="#8A6DFF" />
                <path d="M12 12 L28 18 L20 28 L8 22 Z" fill="#3A1EE7" />
                <circle cx="18" cy="20" r="5" fill="#00BFA5" />
              </svg>
            </div>
            <span className="text-xl font-bold font-sans text-foreground">
              repaired<span className="text-teal-500">.co</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <button 
              onClick={() => scrollToSection("features")}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection("pricing")}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Contact
            </button>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="link" className="text-muted-foreground hover:text-foreground">
              Login
            </Button>
            <Button>Get Started</Button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
                <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-4 space-y-4">
            <button 
              onClick={() => scrollToSection("features")}
              className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection("pricing")}
              className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Contact
            </button>
            <div className="pt-2 flex space-x-4">
              <Button variant="link" className="text-muted-foreground px-0 hover:text-foreground">
                Login
              </Button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
