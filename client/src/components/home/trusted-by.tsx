import { MotionDiv } from "@/components/ui/motion-div";

export default function TrustedBy() {
  return (
    <section className="py-12 bg-card">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Trusted by industry leaders</p>
          <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center items-center opacity-60">
          <MotionDiv delay={0.1} className="flex justify-center">
            <svg className="h-8 text-muted-foreground" viewBox="0 0 100 30" fill="currentColor">
              <path d="M15 5h70v5H15zM15 15h40v5H15zM15 25h55v5H15z" />
            </svg>
          </MotionDiv>
          <MotionDiv delay={0.2} className="flex justify-center">
            <svg className="h-8 text-muted-foreground" viewBox="0 0 100 30" fill="currentColor">
              <circle cx="50" cy="15" r="15" />
            </svg>
          </MotionDiv>
          <MotionDiv delay={0.3} className="flex justify-center">
            <svg className="h-8 text-muted-foreground" viewBox="0 0 100 30" fill="currentColor">
              <path d="M20 5l30 25h30L50 5z" />
            </svg>
          </MotionDiv>
          <MotionDiv delay={0.4} className="flex justify-center">
            <svg className="h-8 text-muted-foreground" viewBox="0 0 100 30" fill="currentColor">
              <rect x="20" y="5" width="60" height="20" rx="10" />
            </svg>
          </MotionDiv>
          <MotionDiv delay={0.5} className="flex justify-center">
            <svg className="h-8 text-muted-foreground" viewBox="0 0 100 30" fill="currentColor">
              <polygon points="50,5 20,25 35,25 50,15 65,25 80,25" />
            </svg>
          </MotionDiv>
          <MotionDiv delay={0.6} className="flex justify-center">
            <svg className="h-8 text-muted-foreground" viewBox="0 0 100 30" fill="currentColor">
              <path d="M15,15 Q50,5 85,15 Q50,25 15,15" />
            </svg>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
