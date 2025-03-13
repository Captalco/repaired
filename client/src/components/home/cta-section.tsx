import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/ui/motion-div";

export default function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-teal-500/30 opacity-10"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <MotionDiv className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Field Operations?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">Join thousands of teams using repaired.co to streamline data collection, enhance collaboration, and drive better insights.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="px-8">
              Start Your Free Trial
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Schedule Demo
            </Button>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
