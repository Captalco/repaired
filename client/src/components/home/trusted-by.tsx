import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { CompanyLogo } from "@shared/schema";
import { useTheme } from "@/contexts/theme-context";

export default function TrustedBy() {
  const [logos, setLogos] = useState<CompanyLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/logos/active');
        if (!response.ok) {
          throw new Error('Failed to fetch logos');
        }
        const data = await response.json();
        setLogos(data.logos);
        setError(null);
      } catch (err) {
        console.error('Error fetching logos:', err);
        setError('Failed to load partner logos');
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  // Create a duplicate set for seamless scrolling
  const displayLogos = logos.length ? [...logos, ...logos.map(logo => ({...logo, id: logo.id + 1000}))] : [];

  if (loading) {
    return (
      <section className="py-12 bg-card overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 flex justify-center items-center min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-card overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 text-center min-h-[200px] flex flex-col justify-center">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Trusted by industry leaders</p>
          <div className="w-20 h-1 bg-teal-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Our partners' information is temporarily unavailable.</p>
        </div>
      </section>
    );
  }

  if (!logos.length) {
    return null;
  }

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
            animate={{ x: [0, -2400] }}
            transition={{ 
              repeat: Infinity, 
              duration: 25, 
              ease: "linear"
            }}
          >
            {displayLogos.map((logo) => (
              <div key={logo.id} className="flex-shrink-0 h-16 w-36 flex items-center justify-center">
                <img 
                  src={theme === 'dark' && logo.darkModeUrl ? logo.darkModeUrl : logo.imageUrl} 
                  alt={logo.altText || `${logo.name} logo`} 
                  className="h-full w-auto object-contain" 
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
