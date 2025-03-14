import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  StackIcon, 
  CubeIcon, 
  InfoCircledIcon, 
  MobileIcon,
  EnterIcon,
  RocketIcon,
  Cross2Icon,
  HamburgerMenuIcon,
  LightningBoltIcon,
  SunIcon,
  MoonIcon
} from "@radix-ui/react-icons";
import { useTheme } from "../../contexts/theme-context";

// Simple utility function to combine class names
const cn = (...classes: (string | boolean | undefined)[]) => 
  classes.filter(Boolean).join(' ');

// Simple button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'gold' | 'silver' | 'copper';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Button = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none disabled:opacity-50";
  
  const variantStyles = {
    default: "neu-button text-primary-foreground",
    outline: "neu-card border-2 border-border hover:border-primary/50",
    ghost: "hover:bg-primary/10",
    gold: "gold-effect text-primary-foreground",
    silver: "silver-effect text-primary-foreground",
    copper: "copper-effect text-primary-foreground"
  };
  
  const sizeStyles = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base"
  };
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, setLocation] = useLocation();
  
  // Get theme context
  const { theme, toggleTheme } = useTheme();

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
      "fixed w-full z-50 transition-all duration-300 backdrop-blur-sm neu-card",
      scrolled ? "py-3" : "py-4"
    )}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center overflow-hidden relative">
            </div>
            <span className="text-xl font-bold font-sans text-foreground">
              repaired.co
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <button 
              onClick={() => scrollToSection("features")}
              className="flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 group bg-primary px-4 py-2 rounded-xl"
            >
              <StackIcon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              <span>Features</span>
            </button>
            <button 
              onClick={() => scrollToSection("pricing")}
              className="flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 group bg-primary px-4 py-2 rounded-xl"
            >
              <CubeIcon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              <span>Pricing</span>
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 group bg-primary px-4 py-2 rounded-xl"
            >
              <InfoCircledIcon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              <span>About</span>
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 group bg-primary px-4 py-2 rounded-xl"
            >
              <MobileIcon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              <span>Contact</span>
            </button>
          </nav>
          
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={() => {
                console.log("Desktop theme toggle clicked, current theme:", theme);
                toggleTheme();
              }} 
              className="neu-button p-2 rounded-full flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <span className="gold-effect w-7 h-7 flex items-center justify-center rounded-full">
                  <SunIcon className="w-4 h-4 text-white" />
                </span>
              ) : (
                <span className="silver-effect w-7 h-7 flex items-center justify-center rounded-full">
                  <MoonIcon className="w-4 h-4 text-gray-800" />
                </span>
              )}
            </button>
            
            <Button 
              onClick={() => setLocation("/auth")}
              variant="outline" 
              className="text-muted-foreground hover:text-foreground" 
              size="sm"
            >
              <EnterIcon className="w-4 h-4 mr-1.5" />
              Login
            </Button>
            
            <Button variant="copper" className="text-primary-foreground px-4 py-2" size="sm">
              <RocketIcon className="w-4 h-4 mr-1.5" />
              Get Started
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button 
              onClick={toggleTheme} 
              className="neu-button p-2 rounded-full flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <span className="gold-effect w-7 h-7 flex items-center justify-center rounded-full">
                  <SunIcon className="w-4 h-4 text-white" />
                </span>
              ) : (
                <span className="silver-effect w-7 h-7 flex items-center justify-center rounded-full">
                  <MoonIcon className="w-4 h-4 text-gray-800" />
                </span>
              )}
            </button>
            
            <button 
              className="text-foreground p-2 neu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <Cross2Icon className="w-5 h-5" />
              ) : (
                <HamburgerMenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation - Fly-out Box */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 mt-2 neu-card-inset backdrop-blur-md p-4 transform transition-all duration-200 ease-out">
            <div className="space-y-3">
              <button 
                onClick={() => scrollToSection("features")}
                className="flex items-center w-full px-3 py-2 text-left text-foreground hover:bg-primary/10 rounded-md transition-colors duration-200"
              >
                <StackIcon className="w-5 h-5 mr-3" />
                <span>Features</span>
              </button>
              <button 
                onClick={() => scrollToSection("pricing")}
                className="flex items-center w-full px-3 py-2 text-left text-foreground hover:bg-primary/10 rounded-md transition-colors duration-200"
              >
                <CubeIcon className="w-5 h-5 mr-3" />
                <span>Pricing</span>
              </button>
              <button 
                onClick={() => scrollToSection("about")}
                className="flex items-center w-full px-3 py-2 text-left text-foreground hover:bg-primary/10 rounded-md transition-colors duration-200"
              >
                <InfoCircledIcon className="w-5 h-5 mr-3" />
                <span>About</span>
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="flex items-center w-full px-3 py-2 text-left text-foreground hover:bg-primary/10 rounded-md transition-colors duration-200"
              >
                <MobileIcon className="w-5 h-5 mr-3" />
                <span>Contact</span>
              </button>
              <div className="pt-2 grid grid-cols-2 gap-2">
                <Button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLocation("/auth");
                  }}
                  variant="outline" 
                  className="w-full text-foreground" 
                  size="sm"
                >
                  <EnterIcon className="w-4 h-4 mr-1.5" />
                  Login
                </Button>
                <Button variant="copper" className="w-full text-primary-foreground" size="sm">
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