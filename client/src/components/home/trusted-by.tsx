import { MotionDiv } from "@/components/ui/motion-div";

export default function TrustedBy() {
  // Industry logos
  const logos = [
    { name: "baldor", src: "/images/logos/baldor.png", delay: 0.1 },
    { name: "lafert", src: "/images/logos/lafert.png", delay: 0.2 },
    { name: "nae", src: "/images/logos/nae.png", delay: 0.3 },
    { name: "nidec", src: "/images/logos/nidec.png", delay: 0.4 },
    { name: "teco", src: "/images/logos/teco.png", delay: 0.5 },
    { name: "toshiba", src: "/images/logos/toshiba.png", delay: 0.6 },
    { name: "weg", src: "/images/logos/weg.png", delay: 0.7 },
    { name: "worldwide", src: "/images/logos/worldwide.png", delay: 0.8 }
  ];

  return (
    <section className="py-12 bg-card">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Trusted by industry leaders</p>
          <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center items-center">
          {logos.map((logo) => (
            <MotionDiv key={logo.name} delay={logo.delay} className="flex justify-center h-12 w-full">
              <img 
                src={logo.src} 
                alt={`${logo.name} logo`} 
                className="h-full object-contain filter dark:brightness-100 brightness-0" 
              />
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
