import { Badge } from "@/components/ui/badge";
import { MotionDiv } from "@/components/ui/motion-div";

export default function ScreenshotGallery() {
  const screenshots = [
    {
      title: "Comprehensive Dashboard",
      svg: (
        <svg viewBox="0 0 800 500" className="w-full h-auto">
          <rect width="800" height="500" fill="#1E1E1E" rx="8" />
          <rect x="20" y="20" width="760" height="60" fill="#252525" rx="6" />
          <rect x="40" y="40" width="200" height="20" fill="#333333" rx="4" />
          <circle cx="740" cy="50" r="15" fill="#333333" />
          <rect x="20" y="100" width="370" height="180" fill="#252525" rx="6" />
          <path d="M40,220 Q120,160 200,220 T360,180" stroke="#6A4DFF" strokeWidth="3" fill="none" />
          <rect x="410" y="100" width="370" height="180" fill="#252525" rx="6" />
          <rect x="430" y="130" width="80" height="120" fill="#6A4DFF" rx="4" />
          <rect x="520" y="160" width="80" height="90" fill="#6A4DFF" rx="4" />
          <rect x="610" y="140" width="80" height="110" fill="#6A4DFF" rx="4" />
          <rect x="700" y="120" width="60" height="130" fill="#6A4DFF" rx="4" />
          <rect x="20" y="300" width="760" height="180" fill="#252525" rx="6" />
          <rect x="40" y="320" width="720" height="1" fill="#444444" />
          <rect x="40" y="360" width="720" height="1" fill="#444444" />
          <rect x="40" y="400" width="720" height="1" fill="#444444" />
          <rect x="40" y="440" width="720" height="1" fill="#444444" />
        </svg>
      )
    },
    {
      title: "Intuitive Form Builder",
      svg: (
        <svg viewBox="0 0 800 500" className="w-full h-auto">
          <rect width="800" height="500" fill="#1E1E1E" rx="8" />
          <rect x="20" y="20" width="200" height="460" fill="#252525" rx="6" />
          <rect x="35" y="40" width="170" height="25" fill="#333333" rx="4" />
          <rect x="35" y="80" width="170" height="40" fill="#333333" rx="4" />
          <rect x="35" y="135" width="170" height="40" fill="#333333" rx="4" />
          <rect x="35" y="190" width="170" height="40" fill="#333333" rx="4" />
          <rect x="35" y="245" width="170" height="40" fill="#333333" rx="4" />
          <rect x="240" y="20" width="540" height="460" fill="#252525" rx="6" />
          <rect x="270" y="50" width="300" height="30" fill="#333333" rx="4" />
          <rect x="270" y="100" width="480" height="50" fill="#333333" rx="4" />
          <rect x="270" y="170" width="480" height="50" fill="#333333" rx="4" />
          <rect x="270" y="240" width="480" height="50" fill="#333333" rx="4" />
          <rect x="270" y="310" width="480" height="80" fill="#333333" rx="4" />
          <rect x="270" y="410" width="120" height="40" fill="#6A4DFF" rx="4" />
        </svg>
      )
    },
    {
      title: "Advanced Data Analysis",
      svg: (
        <svg viewBox="0 0 800 500" className="w-full h-auto">
          <rect width="800" height="500" fill="#1E1E1E" rx="8" />
          <rect x="20" y="20" width="760" height="60" fill="#252525" rx="6" />
          <rect x="40" y="40" width="120" height="20" fill="#333333" rx="4" />
          <rect x="20" y="100" width="760" height="380" fill="#252525" rx="6" />
          <rect x="40" y="120" width="200" height="20" fill="#333333" rx="4" />
          <rect x="40" y="160" width="720" height="300" fill="#1A1A1A" rx="4" />
          <path d="M60,400 C100,300 200,350 300,280 S400,200 500,250 S600,300 700,200" stroke="#6A4DFF" strokeWidth="3" fill="none" />
          <path d="M60,450 C150,400 250,420 350,380 S450,350 550,370 S650,340 700,300" stroke="#00BFA5" strokeWidth="3" fill="none" />
          <circle cx="300" cy="280" r="6" fill="#6A4DFF" />
          <circle cx="500" cy="250" r="6" fill="#6A4DFF" />
          <circle cx="350" cy="380" r="6" fill="#00BFA5" />
          <circle cx="550" cy="370" r="6" fill="#00BFA5" />
        </svg>
      )
    },
    {
      title: "Mobile Data Collection",
      svg: (
        <svg viewBox="0 0 800 500" className="w-full h-auto">
          <rect width="800" height="500" fill="#1E1E1E" rx="8" />
          <rect x="300" y="50" width="200" height="400" rx="20" fill="#252525" />
          <rect x="310" y="70" width="180" height="320" rx="4" fill="#111111" />
          <rect x="330" y="90" width="140" height="20" rx="4" fill="#333333" />
          <rect x="330" y="130" width="140" height="40" rx="4" fill="#333333" />
          <rect x="330" y="190" width="140" height="40" rx="4" fill="#333333" />
          <rect x="330" y="250" width="140" height="40" rx="4" fill="#333333" />
          <rect x="330" y="310" width="70" height="40" rx="4" fill="#6A4DFF" />
          <circle cx="400" cy="410" r="15" fill="#333333" />
        </svg>
      )
    },
    {
      title: "Team Collaboration Tools",
      svg: (
        <svg viewBox="0 0 800 500" className="w-full h-auto">
          <rect width="800" height="500" fill="#1E1E1E" rx="8" />
          <rect x="20" y="20" width="240" height="460" fill="#252525" rx="6" />
          <rect x="35" y="40" width="210" height="25" fill="#333333" rx="4" />
          <circle cx="55" cy="100" r="20" fill="#333333" />
          <rect x="85" y="85" width="160" height="30" fill="#444444" rx="4" />
          <circle cx="55" cy="150" r="20" fill="#333333" />
          <rect x="85" y="135" width="160" height="30" fill="#444444" rx="4" />
          <circle cx="55" cy="200" r="20" fill="#333333" />
          <rect x="85" y="185" width="160" height="30" fill="#444444" rx="4" />
          <circle cx="55" cy="250" r="20" fill="#6A4DFF" />
          <rect x="85" y="235" width="160" height="30" fill="#6A4DFF" opacity="0.7" rx="4" />
          <rect x="35" y="300" width="210" height="40" fill="#333333" rx="4" />
          <rect x="280" y="20" width="500" height="460" fill="#252525" rx="6" />
          <rect x="300" y="40" width="200" height="30" fill="#333333" rx="4" />
          <circle cx="340" cy="120" r="30" fill="#444444" />
          <rect x="320" y="160" width="40" height="10" fill="#333333" rx="2" />
          <circle cx="440" cy="120" r="30" fill="#444444" />
          <rect x="420" y="160" width="40" height="10" fill="#333333" rx="2" />
          <circle cx="540" cy="120" r="30" fill="#444444" />
          <rect x="520" y="160" width="40" height="10" fill="#333333" rx="2" />
          <circle cx="640" cy="120" r="30" fill="#444444" />
          <rect x="620" y="160" width="40" height="10" fill="#333333" rx="2" />
        </svg>
      )
    },
    {
      title: "Custom Report Builder",
      svg: (
        <svg viewBox="0 0 800 500" className="w-full h-auto">
          <rect width="800" height="500" fill="#1E1E1E" rx="8" />
          <rect x="20" y="20" width="760" height="60" fill="#252525" rx="6" />
          <rect x="40" y="40" width="150" height="20" fill="#333333" rx="4" />
          <rect x="700" y="35" width="60" height="30" fill="#6A4DFF" rx="4" />
          <rect x="20" y="100" width="200" height="380" fill="#252525" rx="6" />
          <rect x="35" y="120" width="170" height="25" fill="#333333" rx="4" />
          <rect x="35" y="160" width="170" height="25" fill="#333333" rx="4" />
          <rect x="35" y="200" width="170" height="25" fill="#333333" rx="4" />
          <rect x="35" y="240" width="170" height="25" fill="#333333" rx="4" />
          <rect x="35" y="280" width="170" height="25" fill="#333333" rx="4" />
          <rect x="240" y="100" width="540" height="380" fill="#252525" rx="6" />
          <rect x="260" y="120" width="500" height="30" fill="#333333" rx="4" />
          <rect x="260" y="170" width="500" height="290" fill="#1A1A1A" rx="4" />
          <rect x="280" y="190" width="460" height="80" fill="#252525" rx="4" />
          <rect x="280" y="290" width="460" height="80" fill="#252525" rx="4" />
          <rect x="280" y="390" width="130" height="40" fill="#6A4DFF" rx="4" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6">
        <MotionDiv className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1">Platform Overview</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Designed for Productivity</h2>
          <p className="text-lg text-muted-foreground">Explore how repaired.co transforms your workflow with intuitive interfaces and powerful functionality.</p>
        </MotionDiv>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {screenshots.map((screenshot, index) => (
            <MotionDiv key={index} delay={index * 0.1} className="flex flex-col items-center">
              <div className="relative rounded-xl overflow-hidden group transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-[0_5px_20px_rgba(106,77,255,0.4)]">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-primary to-teal-500 rounded-[calc(0.5rem+1px)]"></div>
                <div className="relative bg-card rounded-xl overflow-hidden p-[1px]">
                  {screenshot.svg}
                </div>
              </div>
              <p className="mt-3 text-center text-muted-foreground">{screenshot.title}</p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
