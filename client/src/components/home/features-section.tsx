import { CheckCircle, MapPin, Cpu, Lock, Scan } from "lucide-react";
import { MotionDiv } from "@/components/ui/motion-div";

// Custom badge component with neumorphic styling
const Badge = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={`gold-effect px-3 py-1 rounded-xl text-background font-bold ${className}`}>
      {children}
    </span>
  );
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <MotionDiv className="text-center max-w-3xl mx-auto mb-16 neu-card p-8 rounded-xl">
          <Badge className="mb-4 font-bold">Features</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Re-Manufacturing Requires Different Tools</h2>
          <p className="text-lg text-foreground">Unlike generic manufacturing solutions, our AI-powered platform is built specifically for re-manufacturing workflows, with computer vision technology that understands core restoration processes.</p>
        </MotionDiv>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-20">
          <MotionDiv>
            <div className="neu-card p-1 rounded-xl overflow-hidden group transition-transform duration-300 hover:translate-y-[-5px]">
              <svg viewBox="0 0 800 500" className="w-full h-auto">
                {/* Background */}
                <rect width="800" height="500" fill="hsl(220 10% 18%)" rx="12" />
                
                {/* Form builder interface with gold accent */}
                <rect x="20" y="20" width="200" height="460" fill="hsl(220 10% 20%)" rx="8" />
                <rect x="20" y="20" width="200" height="4" fill="hsl(45 80% 80%)" rx="2" />
                <rect x="35" y="40" width="170" height="25" fill="hsl(220 10% 25%)" rx="4" />
                <rect x="35" y="80" width="170" height="40" fill="hsl(220 10% 22%)" rx="4" />
                <rect x="35" y="135" width="170" height="40" fill="hsl(220 10% 22%)" rx="4" />
                <rect x="35" y="190" width="170" height="40" fill="hsl(220 10% 22%)" rx="4" />
                <rect x="35" y="245" width="170" height="40" fill="hsl(220 10% 22%)" rx="4" />
                <rect x="35" y="300" width="170" height="40" fill="hsl(220 10% 22%)" rx="4" />
                <rect x="35" y="355" width="170" height="40" fill="hsl(220 10% 22%)" rx="4" />
                <rect x="35" y="410" width="170" height="40" fill="hsl(220 10% 22%)" rx="4" />
                
                {/* Form preview with silver accent */}
                <rect x="240" y="20" width="540" height="460" fill="hsl(220 10% 16%)" rx="8" />
                <rect x="240" y="20" width="540" height="4" fill="hsl(220 20% 70%)" rx="2" />
                <rect x="270" y="50" width="300" height="30" fill="hsl(220 10% 22%)" rx="4" />
                <rect x="270" y="100" width="480" height="50" fill="hsl(220 10% 22%)" rx="4" />
                <rect x="270" y="170" width="480" height="50" fill="hsl(220 10% 22%)" rx="4" />
                <rect x="270" y="240" width="480" height="50" fill="hsl(220 10% 22%)" rx="4" />
                <rect x="270" y="310" width="480" height="80" fill="hsl(220 10% 22%)" rx="4" />
                <rect x="270" y="410" width="120" height="40" fill="hsl(45 80% 80%)" rx="4" />
              </svg>
            </div>
          </MotionDiv>
          <MotionDiv className="flex flex-col justify-center">
            <div className="neu-card p-6 rounded-xl">
              <span className="gold-effect px-2 py-1 rounded font-medium inline-block mb-2">Computer Vision Technology</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Automated Core Analysis & Inspection</h3>
              <p className="text-foreground mb-6">Our advanced computer vision system can detect defects, measure wear, and assess restoration potential with unprecedented accuracy - far beyond what traditional manufacturing software can provide.</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="gold-effect w-6 h-6 flex items-center justify-center rounded-full mr-3">
                    <CheckCircle className="text-background h-4 w-4" />
                  </span>
                  <span>Identifies 92% of defects that human inspectors miss</span>
                </li>
                <li className="flex items-start">
                  <span className="gold-effect w-6 h-6 flex items-center justify-center rounded-full mr-3">
                    <CheckCircle className="text-background h-4 w-4" />
                  </span>
                  <span>Automatic part categorization and restoration potential scoring</span>
                </li>
                <li className="flex items-start">
                  <span className="gold-effect w-6 h-6 flex items-center justify-center rounded-full mr-3">
                    <CheckCircle className="text-background h-4 w-4" />
                  </span>
                  <span>Learns from your technicians' expertise over time</span>
                </li>
              </ul>
            </div>
          </MotionDiv>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-20 md:flex-row-reverse">
          <MotionDiv className="md:order-2">
            <div className="neu-card p-1 rounded-xl overflow-hidden group transition-transform duration-300 hover:translate-y-[-5px]">
              <svg viewBox="0 0 800 500" className="w-full h-auto">
                {/* Background */}
                <rect width="800" height="500" fill="hsl(220 10% 18%)" rx="12" />
                
                {/* Dashboard header with silver accent */}
                <rect x="20" y="20" width="760" height="60" fill="hsl(220 10% 22%)" rx="8" />
                <rect x="20" y="20" width="760" height="4" fill="hsl(220 20% 70%)" rx="2" />
                <rect x="40" y="40" width="120" height="20" fill="hsl(220 10% 25%)" rx="4" />
                <circle cx="740" cy="50" r="15" fill="hsl(220 10% 25%)" />
                
                {/* Charts */}
                <rect x="20" y="100" width="370" height="180" fill="hsl(220 10% 20%)" rx="8" />
                <path d="M40,220 Q120,160 200,220 T360,180" stroke="hsl(45 80% 80%)" strokeWidth="3" fill="none" />
                <path d="M40,250 Q150,220 260,230 T360,210" stroke="hsl(20 60% 70%)" strokeWidth="3" fill="none" />
                
                <rect x="410" y="100" width="370" height="180" fill="hsl(220 10% 20%)" rx="8" />
                <rect x="430" y="130" width="80" height="120" fill="hsl(45 80% 80%)" rx="4" />
                <rect x="520" y="160" width="80" height="90" fill="hsl(220 20% 70%)" rx="4" />
                <rect x="610" y="140" width="80" height="110" fill="hsl(45 80% 80%)" rx="4" />
                <rect x="700" y="120" width="60" height="130" fill="hsl(20 60% 70%)" rx="4" />
                
                {/* Data tables */}
                <rect x="20" y="300" width="760" height="180" fill="hsl(220 10% 20%)" rx="8" />
                <rect x="40" y="320" width="720" height="1" fill="hsl(220 10% 30%)" />
                <rect x="40" y="360" width="720" height="1" fill="hsl(220 10% 30%)" />
                <rect x="40" y="400" width="720" height="1" fill="hsl(220 10% 30%)" />
                <rect x="40" y="440" width="720" height="1" fill="hsl(220 10% 30%)" />
              </svg>
            </div>
          </MotionDiv>
          <MotionDiv className="flex flex-col justify-center md:order-1">
            <div className="neu-card p-6 rounded-xl">
              <span className="silver-effect px-2 py-1 rounded font-medium inline-block mb-2">Re-Manufacturing Intelligence</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Optimize Your Restoration Process</h3>
              <p className="text-foreground mb-6">Purpose-built analytics for re-manufacturing that track core recovery rates, restoration costs, and inventory forecasts - metrics that general manufacturing systems simply can't provide.</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="silver-effect w-6 h-6 flex items-center justify-center rounded-full mr-3">
                    <CheckCircle className="text-background h-4 w-4" />
                  </span>
                  <span>Core-specific KPIs like reclamation rate and restoration ROI</span>
                </li>
                <li className="flex items-start">
                  <span className="silver-effect w-6 h-6 flex items-center justify-center rounded-full mr-3">
                    <CheckCircle className="text-background h-4 w-4" />
                  </span>
                  <span>Predictive analytics for core supply forecasting</span>
                </li>
                <li className="flex items-start">
                  <span className="silver-effect w-6 h-6 flex items-center justify-center rounded-full mr-3">
                    <CheckCircle className="text-background h-4 w-4" />
                  </span>
                  <span>Quality trend analysis by supplier and component type</span>
                </li>
              </ul>
            </div>
          </MotionDiv>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <MotionDiv>
            <div className="neu-card p-1 rounded-xl overflow-hidden group transition-transform duration-300 hover:translate-y-[-5px]">
              <svg viewBox="0 0 800 500" className="w-full h-auto">
                {/* Background */}
                <rect width="800" height="500" fill="hsl(220 10% 18%)" rx="12" />
                
                {/* Chat/collaboration interface with copper accent */}
                <rect x="20" y="20" width="240" height="460" fill="hsl(220 10% 20%)" rx="8" />
                <rect x="20" y="20" width="240" height="4" fill="hsl(20 60% 70%)" rx="2" />
                <rect x="35" y="40" width="210" height="25" fill="hsl(220 10% 25%)" rx="4" />
                <circle cx="55" cy="100" r="20" fill="hsl(220 10% 25%)" />
                <rect x="85" y="85" width="160" height="30" fill="hsl(220 10% 30%)" rx="4" />
                <circle cx="55" cy="150" r="20" fill="hsl(220 10% 25%)" />
                <rect x="85" y="135" width="160" height="30" fill="hsl(220 10% 30%)" rx="4" />
                <circle cx="55" cy="200" r="20" fill="hsl(220 10% 25%)" />
                <rect x="85" y="185" width="160" height="30" fill="hsl(220 10% 30%)" rx="4" />
                <circle cx="55" cy="250" r="20" fill="hsl(45 80% 80%)" />
                <rect x="85" y="235" width="160" height="30" fill="hsl(45 80% 80%)" opacity="0.7" rx="4" />
                <rect x="35" y="300" width="210" height="40" fill="hsl(220 10% 25%)" rx="4" />
                <rect x="35" y="360" width="210" height="40" fill="hsl(220 10% 25%)" rx="4" />
                <rect x="35" y="420" width="210" height="40" fill="hsl(220 10% 25%)" rx="4" />
                
                {/* Team dashboard */}
                <rect x="280" y="20" width="500" height="460" fill="hsl(220 10% 16%)" rx="8" />
                <rect x="300" y="40" width="200" height="30" fill="hsl(220 10% 22%)" rx="4" />
                
                {/* Team members */}
                <circle cx="340" cy="120" r="30" fill="hsl(45 80% 80%)" />
                <rect x="320" y="160" width="40" height="10" fill="hsl(220 10% 25%)" rx="2" />
                
                <circle cx="440" cy="120" r="30" fill="hsl(220 20% 70%)" />
                <rect x="420" y="160" width="40" height="10" fill="hsl(220 10% 25%)" rx="2" />
                
                <circle cx="540" cy="120" r="30" fill="hsl(20 60% 70%)" />
                <rect x="520" y="160" width="40" height="10" fill="hsl(220 10% 25%)" rx="2" />
                
                <circle cx="640" cy="120" r="30" fill="hsl(220 10% 30%)" />
                <rect x="620" y="160" width="40" height="10" fill="hsl(220 10% 25%)" rx="2" />
                
                {/* Team task board */}
                <rect x="300" y="200" width="140" height="260" fill="hsl(220 10% 22%)" rx="4" />
                <rect x="310" y="210" width="120" height="20" fill="hsl(220 10% 25%)" rx="2" />
                <rect x="310" y="240" width="120" height="50" fill="hsl(220 10% 25%)" rx="2" />
                <rect x="310" y="300" width="120" height="50" fill="hsl(220 10% 25%)" rx="2" />
                <rect x="310" y="360" width="120" height="50" fill="hsl(220 10% 25%)" rx="2" />
                
                <rect x="460" y="200" width="140" height="260" fill="hsl(220 10% 22%)" rx="4" />
                <rect x="470" y="210" width="120" height="20" fill="hsl(220 10% 25%)" rx="2" />
                <rect x="470" y="240" width="120" height="50" fill="hsl(220 10% 25%)" rx="2" />
                <rect x="470" y="300" width="120" height="50" fill="hsl(220 10% 25%)" rx="2" />
                
                <rect x="620" y="200" width="140" height="260" fill="hsl(220 10% 22%)" rx="4" />
                <rect x="630" y="210" width="120" height="20" fill="hsl(220 10% 25%)" rx="2" />
                <rect x="630" y="240" width="120" height="50" fill="hsl(220 10% 25%)" rx="2" />
              </svg>
            </div>
          </MotionDiv>
          <MotionDiv className="flex flex-col justify-center">
            <div className="neu-card p-6 rounded-xl">
              <span className="copper-effect px-2 py-1 rounded font-medium inline-block mb-2">Cross-Department Integration</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Connect Your Entire Re-Manufacturing Ecosystem</h3>
              <p className="text-foreground mb-6">Bridge the unique gap between core acquisition, disassembly, cleaning, inspection, re-engineering, and quality assurance departments with specialized workflows for each stage of the restoration process.</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="copper-effect w-6 h-6 flex items-center justify-center rounded-full mr-3">
                    <CheckCircle className="text-background h-4 w-4" />
                  </span>
                  <span>Specialized tools for each re-manufacturing department</span>
                </li>
                <li className="flex items-start">
                  <span className="copper-effect w-6 h-6 flex items-center justify-center rounded-full mr-3">
                    <CheckCircle className="text-background h-4 w-4" />
                  </span>
                  <span>Core tracking from acquisition through restoration</span>
                </li>
                <li className="flex items-start">
                  <span className="copper-effect w-6 h-6 flex items-center justify-center rounded-full mr-3">
                    <CheckCircle className="text-background h-4 w-4" />
                  </span>
                  <span>Quality verification checkpoints throughout process</span>
                </li>
              </ul>
            </div>
          </MotionDiv>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <MotionDiv delay={0.1} className="neu-card p-6 rounded-xl">
            <div className="w-12 h-12 gold-effect rounded-lg flex items-center justify-center mb-4">
              <MapPin className="text-background" />
            </div>
            <h4 className="text-xl font-bold mb-3">Core Supplier Network</h4>
            <p className="text-foreground">Manage your core supplier relationships with geographic tracking, quality metrics, and automated ordering based on inventory needs and supplier performance.</p>
          </MotionDiv>
          <MotionDiv delay={0.2} className="neu-card p-6 rounded-xl">
            <div className="w-12 h-12 silver-effect rounded-lg flex items-center justify-center mb-4">
              <Cpu className="text-background" />
            </div>
            <h4 className="text-xl font-bold mb-3">Part Recognition AI</h4>
            <p className="text-foreground">Our proprietary computer vision technology automatically identifies components, assesses condition, and catalogs parts for efficient inventory management and processing.</p>
          </MotionDiv>
          <MotionDiv delay={0.3} className="neu-card p-6 rounded-xl">
            <div className="w-12 h-12 copper-effect rounded-lg flex items-center justify-center mb-4">
              <Scan className="text-background" />
            </div>
            <h4 className="text-xl font-bold mb-3">3D Inspection</h4>
            <p className="text-foreground">Advanced optical scanning technology creates digital twins of cores and components, allowing for precise measurement and comparison against OEM specifications.</p>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
