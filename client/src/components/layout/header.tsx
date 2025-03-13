import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  StackIcon, 
  CubeIcon, 
  InfoCircledIcon, 
  MobileIcon,
  EnterIcon,
  RocketIcon,
  Cross2Icon,
  HamburgerMenuIcon
} from "@radix-ui/react-icons";

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
      "fixed w-full bg-background/70 z-50 border-b transition-all duration-300 backdrop-blur-sm",
      scrolled ? "border-border/50 py-3" : "border-transparent py-4"
    )}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-black border-2 border-white flex items-center justify-center overflow-hidden relative">
              <div className="w-5 h-5 rounded-full bg-white"></div>
            </div>
            <span className="text-xl font-bold font-sans text-white">
              repaired<span className="text-gray-400">.co</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <button 
              onClick={() => scrollToSection("features")}
              className="flex items-center space-x-1.5 text-muted-foreground hover:text-white transition-colors duration-200 group"
            >
              <StackIcon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              <span>Features</span>
            </button>
            <button 
              onClick={() => scrollToSection("pricing")}
              className="flex items-center space-x-1.5 text-muted-foreground hover:text-white transition-colors duration-200 group"
            >
              <CubeIcon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              <span>Pricing</span>
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="flex items-center space-x-1.5 text-muted-foreground hover:text-white transition-colors duration-200 group"
            >
              <InfoCircledIcon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              <span>About</span>
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="flex items-center space-x-1.5 text-muted-foreground hover:text-white transition-colors duration-200 group"
            >
              <MobileIcon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              <span>Contact</span>
            </button>
          </nav>
          
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-white" size="sm">
              <EnterIcon className="w-4 h-4 mr-1.5" />
              Login
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black transition-colors" size="sm">
              <RocketIcon className="w-4 h-4 mr-1.5" />
              Get Started
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <Cross2Icon className="w-5 h-5" />
            ) : (
              <HamburgerMenuIcon className="w-5 h-5" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation - Fly-out Box */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 mt-2 bg-black/90 backdrop-blur-md border border-gray-800 rounded-md shadow-xl p-4 transform transition-all duration-200 ease-out">
            <div className="space-y-3">
              <button 
                onClick={() => scrollToSection("features")}
                className="flex items-center w-full px-3 py-2 text-left text-white hover:bg-white/10 rounded-md transition-colors duration-200"
              >
                <StackIcon className="w-5 h-5 mr-3" />
                <span>Features</span>
              </button>
              <button 
                onClick={() => scrollToSection("pricing")}
                className="flex items-center w-full px-3 py-2 text-left text-white hover:bg-white/10 rounded-md transition-colors duration-200"
              >
                <CubeIcon className="w-5 h-5 mr-3" />
                <span>Pricing</span>
              </button>
              <button 
                onClick={() => scrollToSection("about")}
                className="flex items-center w-full px-3 py-2 text-left text-white hover:bg-white/10 rounded-md transition-colors duration-200"
              >
                <InfoCircledIcon className="w-5 h-5 mr-3" />
                <span>About</span>
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="flex items-center w-full px-3 py-2 text-left text-white hover:bg-white/10 rounded-md transition-colors duration-200"
              >
                <MobileIcon className="w-5 h-5 mr-3" />
                <span>Contact</span>
              </button>
              <div className="pt-2 grid grid-cols-2 gap-2">
                <Button variant="ghost" className="w-full text-white border border-gray-700" size="sm">
                  <EnterIcon className="w-4 h-4 mr-1.5" />
                  Login
                </Button>
                <Button className="w-full bg-white text-black hover:bg-gray-200" size="sm">
                  <RocketIcon className="w-4 h-4 mr-1.5" />
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
