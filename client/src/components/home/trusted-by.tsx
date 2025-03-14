import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function TrustedBy() {
  // Industry logos - doubled for a continuous effect
  const logos = [
    { name: "baldor", src: "/images/logos/baldor.png" },
    { name: "lafert", src: "/images/logos/lafert.png" },
    { name: "nae", src: "/images/logos/nae.png" },
    { name: "nidec", src: "/images/logos/nidec.png" },
    { name: "teco", src: "/images/logos/teco.png" },
    { name: "toshiba", src: "/images/logos/toshiba.png" },
    { name: "weg", src: "/images/logos/weg.png" },
    { name: "worldwide", src: "/images/logos/worldwide.png" },
    // Duplicate logos for seamless scrolling
    { name: "baldor-2", src: "/images/logos/baldor.png" },
    { name: "lafert-2", src: "/images/logos/lafert.png" },
    { name: "nae-2", src: "/images/logos/nae.png" },
    { name: "nidec-2", src: "/images/logos/nidec.png" },
    { name: "teco-2", src: "/images/logos/teco.png" },
    { name: "toshiba-2", src: "/images/logos/toshiba.png" }
  ];

  return (
    <section className="py-12 bg-card overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Trusted by industry leaders</p>
          <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
        </div>
        
        <div className="relative w-full">
          {/* Gradient fade effect on the left side */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-card to-transparent"></div>
          
          {/* Continuous scrolling logos */}
          <motion.div 
            className="flex items-center gap-12 py-4"
            animate={{ x: [0, -1800] }}
            transition={{ 
              repeat: Infinity, 
              duration: 30, 
              ease: "linear"
            }}
          >
            {logos.map((logo) => (
              <div key={logo.name} className="flex-shrink-0 h-16 w-36 flex items-center justify-center">
                <img 
                  src={logo.src} 
                  alt={`${logo.name} logo`} 
                  className="h-full w-auto object-contain filter dark:invert-0 invert" 
                />
              </div>
            ))}
          </motion.div>
          
          {/* Gradient fade effect on the right side */}
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-card to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
