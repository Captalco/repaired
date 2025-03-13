import { motion } from "framer-motion";
import { ArrowRight, Check, ArrowUpRight } from "lucide-react";
import { fadeIn, slideUp } from "@/lib/animations";

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
  className = '',
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
  
  // Combine class names, filtering out undefined values
  const cn = (...classes: (string | boolean | undefined)[]) => 
    classes.filter(Boolean).join(' ');
    
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

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 md:pb-32 relative overflow-hidden">
      {/* Neumorphic background elements */}
      <div className="absolute top-40 right-10 w-40 h-40 rounded-full bg-transparent neu-card opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-transparent neu-card opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="w-full md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-10"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="neu-card p-8 rounded-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold leading-tight mb-6">
                Built For <span className="gold-effect px-2 py-1 rounded text-foreground">Re-Manufacturing</span>, Not Production Lines
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                While most software focuses on traditional manufacturing, repaired.co is specifically engineered for re-manufacturing facilities, using advanced computer vision and AI to revolutionize core restoration workflows.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button variant="gold" size="lg" className="px-8">
                  Start Your Free Trial <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="px-8">
                  Schedule Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="mt-8 flex items-center neu-card-inset p-4 rounded-xl">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 silver-effect rounded-full flex items-center justify-center overflow-hidden"></div>
                  <div className="w-8 h-8 gold-effect rounded-full flex items-center justify-center overflow-hidden"></div>
                  <div className="w-8 h-8 copper-effect rounded-full flex items-center justify-center overflow-hidden"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">4.9/5</span> from over 2,000 reviews
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2"
            initial="hidden"
            animate="visible"
            variants={slideUp}
          >
            <div className="relative">
              {/* Main dashboard display with neumorphic styling */}
              <div className="neu-card rounded-xl overflow-hidden z-10 p-4">
                <div className="bg-card rounded-lg overflow-hidden">
                  <svg width="100%" height="auto" viewBox="0 0 800 460" className="w-full">
                    {/* Background */}
                    <rect width="800" height="460" fill="hsl(220 10% 18%)" rx="12" />
                    
                    {/* Top navigation bar */}
                    <rect x="0" y="0" width="800" height="40" fill="hsl(220 10% 22%)" rx="12 12 0 0" />
                    <circle cx="20" cy="20" r="6" fill="#FF5F56" />
                    <circle cx="40" cy="20" r="6" fill="#FFBD2E" />
                    <circle cx="60" cy="20" r="6" fill="#27C93F" />
                    
                    {/* Sidebar navigation - with gold effect */}
                    <rect x="20" y="60" width="180" height="380" fill="hsl(220 10% 20%)" rx="8" />
                    
                    {/* Gold effect line at top of sidebar */}
                    <rect x="20" y="60" width="180" height="4" fill="hsl(45 80% 80%)" rx="2" />
                    
                    {/* Navigation items */}
                    <rect x="35" y="85" width="150" height="12" fill="hsl(220 10% 25%)" rx="2" />
                    <rect x="35" y="115" width="150" height="12" fill="hsl(220 10% 25%)" rx="2" />
                    <rect x="35" y="145" width="150" height="12" fill="hsl(220 10% 25%)" rx="2" />
                    <rect x="35" y="175" width="150" height="12" fill="hsl(220 10% 25%)" rx="2" />
                    <rect x="35" y="205" width="150" height="12" fill="hsl(220 10% 25%)" rx="2" />
                    
                    {/* Silver effect item */}
                    <rect x="35" y="235" width="150" height="30" fill="hsl(220 20% 65%)" rx="4" />
                    
                    {/* Main content area */}
                    <rect x="220" y="60" width="560" height="380" fill="hsl(220 10% 16%)" rx="8" />
                    
                    {/* Chart title */}
                    <rect x="240" y="80" width="150" height="16" fill="hsl(220 10% 25%)" rx="2" />
                    
                    {/* Chart */}
                    <rect x="240" y="110" width="520" height="160" fill="hsl(220 10% 20%)" rx="6" />
                    
                    {/* Gold line chart */}
                    <path d="M240,190 Q350,150 450,190 T650,140" stroke="hsl(45 80% 80%)" strokeWidth="3" fill="none" />
                    
                    {/* Silver line chart */}
                    <path d="M240,220 Q380,200 500,210 T750,180" stroke="hsl(220 20% 70%)" strokeWidth="3" fill="none" />
                    
                    {/* Copper line chart */}
                    <path d="M240,170 Q400,230 500,150 T750,200" stroke="hsl(20 60% 70%)" strokeWidth="3" fill="none" />
                    
                    {/* Data cards */}
                    <rect x="240" y="290" width="160" height="130" fill="hsl(220 10% 22%)" rx="6" />
                    <rect x="420" y="290" width="160" height="130" fill="hsl(220 10% 22%)" rx="6" />
                    <rect x="600" y="290" width="160" height="130" fill="hsl(220 10% 22%)" rx="6" />
                    
                    {/* Card content */}
                    <rect x="260" y="310" width="120" height="16" fill="hsl(220 10% 30%)" rx="2" />
                    <rect x="260" y="340" width="60" height="40" fill="hsl(45 80% 80%)" rx="4" />
                    <rect x="330" y="340" width="50" height="40" fill="hsl(220 10% 25%)" rx="4" />
                    <rect x="260" y="390" width="120" height="10" fill="hsl(220 10% 25%)" rx="2" />
                    
                    <rect x="440" y="310" width="120" height="16" fill="hsl(220 10% 30%)" rx="2" />
                    <rect x="440" y="340" width="60" height="40" fill="hsl(220 20% 70%)" rx="4" />
                    <rect x="510" y="340" width="50" height="40" fill="hsl(220 10% 25%)" rx="4" />
                    <rect x="440" y="390" width="120" height="10" fill="hsl(220 10% 25%)" rx="2" />
                    
                    <rect x="620" y="310" width="120" height="16" fill="hsl(220 10% 30%)" rx="2" />
                    <rect x="620" y="340" width="60" height="40" fill="hsl(20 60% 70%)" rx="4" />
                    <rect x="690" y="340" width="50" height="40" fill="hsl(220 10% 25%)" rx="4" />
                    <rect x="620" y="390" width="120" height="10" fill="hsl(220 10% 25%)" rx="2" />
                  </svg>
                </div>
              </div>
              
              {/* Notification popup with neumorphic styling */}
              <div className="absolute -bottom-6 -right-6 neu-card p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 gold-effect rounded-full flex items-center justify-center">
                    <Check className="text-background" size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Project completed</p>
                    <p className="text-xs text-muted-foreground">2 hours ahead of schedule</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
