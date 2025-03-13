import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/ui/motion-div";
import { fadeIn, slideUp } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 md:pb-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="w-full md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-10"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Built For <span className="text-primary">Re-Manufacturing</span>, Not Production Lines
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              While most software focuses on traditional manufacturing, repaired.co is specifically engineered for re-manufacturing facilities, using advanced computer vision and AI to revolutionize core restoration workflows.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="px-8">
                Start Your Free Trial
              </Button>
              <Button size="lg" variant="outline" className="px-8 border-primary/30 hover:border-primary">
                Schedule Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-background bg-gray-800"></div>
                <div className="w-8 h-8 rounded-full border-2 border-background bg-gray-700"></div>
                <div className="w-8 h-8 rounded-full border-2 border-background bg-gray-600"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground"><span className="text-foreground font-medium">4.9/5</span> from over 2,000 reviews</p>
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
              <div className="relative rounded-xl overflow-hidden shadow-[0_0_15px_rgba(106,77,255,0.3)] z-10">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-primary to-teal-500 rounded-[calc(0.5rem+1px)]"></div>
                <div className="relative bg-card rounded-xl overflow-hidden p-[1px]">
                  <svg width="100%" height="auto" viewBox="0 0 800 460" className="w-full">
                    <rect width="800" height="460" fill="#1E1E1E" rx="8" />
                    
                    {/* Top navigation bar */}
                    <rect x="0" y="0" width="800" height="40" fill="#252525" rx="8 8 0 0" />
                    <circle cx="20" cy="20" r="6" fill="#FF5F56" />
                    <circle cx="40" cy="20" r="6" fill="#FFBD2E" />
                    <circle cx="60" cy="20" r="6" fill="#27C93F" />
                    
                    {/* Dashboard content */}
                    <rect x="20" y="60" width="180" height="25" fill="#333333" rx="4" />
                    <rect x="20" y="95" width="160" height="15" fill="#444444" rx="4" />
                    <rect x="20" y="120" width="140" height="15" fill="#444444" rx="4" />
                    <rect x="20" y="145" width="120" height="15" fill="#444444" rx="4" />
                    
                    {/* Main content area */}
                    <rect x="220" y="60" width="560" height="380" fill="#252525" rx="8" />
                    
                    {/* Chart */}
                    <rect x="240" y="80" width="520" height="200" fill="#2A2A2A" rx="6" />
                    <path d="M240,220 Q350,150 450,220 T650,160" stroke="#6A4DFF" strokeWidth="3" fill="none" />
                    <path d="M240,260 Q380,230 500,250 T750,210" stroke="#00BFA5" strokeWidth="3" fill="none" />
                    
                    {/* Data cards */}
                    <rect x="240" y="300" width="160" height="120" fill="#2A2A2A" rx="6" />
                    <rect x="420" y="300" width="160" height="120" fill="#2A2A2A" rx="6" />
                    <rect x="600" y="300" width="160" height="120" fill="#2A2A2A" rx="6" />
                    
                    {/* Card content */}
                    <rect x="260" y="320" width="120" height="10" fill="#444444" rx="2" />
                    <rect x="260" y="340" width="90" height="8" fill="#333333" rx="2" />
                    <rect x="260" y="360" width="120" height="40" fill="#333333" rx="4" />
                    
                    <rect x="440" y="320" width="120" height="10" fill="#444444" rx="2" />
                    <rect x="440" y="340" width="90" height="8" fill="#333333" rx="2" />
                    <rect x="440" y="360" width="120" height="40" fill="#333333" rx="4" />
                    
                    <rect x="620" y="320" width="120" height="10" fill="#444444" rx="2" />
                    <rect x="620" y="340" width="90" height="8" fill="#333333" rx="2" />
                    <rect x="620" y="360" width="120" height="40" fill="#333333" rx="4" />
                  </svg>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-background p-3 rounded-lg shadow-lg border border-border">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="text-white" />
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
