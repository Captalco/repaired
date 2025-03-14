import { Badge } from "@/components/ui/badge";
import { MotionDiv } from "@/components/ui/motion-div";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Repaired.co has completely transformed how we manage field inspections. The ability to work offline and sync automatically has eliminated data loss issues we struggled with for years.",
      name: "David Chen",
      title: "Operations Director, BuildTech"
    },
    {
      quote: "The analytics capabilities are phenomenal. We've cut reporting time by 70% and gained insights that have helped us improve efficiency across all our project sites.",
      name: "Sarah Johnson",
      title: "Project Manager, EnviroSurvey"
    },
    {
      quote: "The custom form builder is incredibly flexible. We've been able to digitize all our complex inspection workflows while maintaining compliance with industry regulations.",
      name: "Michael Torres",
      title: "Quality Manager, InfraInspect"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <MotionDiv className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30 px-3 py-1 font-bold">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">What Our Customers Say</h2>
          <p className="text-lg text-foreground">Organizations of all sizes trust repaired.co to transform their field operations.</p>
        </MotionDiv>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <MotionDiv key={index} delay={index * 0.1} className="bg-card p-8 rounded-xl relative">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>
              <p className="text-foreground mb-6">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-700 mr-4"></div>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-foreground">{testimonial.title}</p>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
