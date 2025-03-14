import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/ui/motion-div";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PricingSection() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams just getting started",
      price: "$29",
      featured: false,
      features: [
        "Up to 5 users",
        "Basic form builder",
        "Data export (CSV, Excel)",
        "Mobile app access",
        "5GB storage"
      ],
      cta: "Start Free Trial",
      ctaVariant: "outline" as const
    },
    {
      name: "Professional",
      description: "Ideal for growing teams with advanced needs",
      price: "$59",
      featured: true,
      features: [
        "Up to 20 users",
        "Advanced form builder",
        "Custom dashboards",
        "API access",
        "20GB storage",
        "Priority support"
      ],
      cta: "Start Free Trial",
      ctaVariant: "default" as const
    },
    {
      name: "Enterprise",
      description: "For organizations with complex requirements",
      price: "$99",
      featured: false,
      features: [
        "Unlimited users",
        "All Professional features",
        "Advanced analytics",
        "Custom integrations",
        "Unlimited storage",
        "24/7 dedicated support",
        "Custom training"
      ],
      cta: "Contact Sales",
      ctaVariant: "outline" as const
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6">
        <MotionDiv className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1">Pricing</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground">Choose the plan that works best for your team. All plans include access to our core features.</p>
        </MotionDiv>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <MotionDiv 
              key={index} 
              delay={index * 0.1} 
              className={cn(
                "bg-background border rounded-xl p-8 transition-transform hover:scale-105",
                plan.featured ? "border-primary shadow-lg shadow-primary/20 scale-105" : "border-border"
              )}
            >
              {plan.featured && (
                <div className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4 font-bold">Most Popular</div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-foreground mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-foreground">/month per user</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="text-teal-500 mt-1 mr-3 h-4 w-4" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant={plan.ctaVariant} 
                className="w-full justify-center"
              >
                {plan.cta}
              </Button>
            </MotionDiv>
          ))}
        </div>
        
        <MotionDiv delay={0.4} className="mt-12 text-center">
          <p className="text-foreground mb-4">Need a custom solution? We've got you covered.</p>
          <a href="#" className="inline-flex items-center text-primary hover:underline">
            Contact our sales team <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </MotionDiv>
      </div>
    </section>
  );
}
