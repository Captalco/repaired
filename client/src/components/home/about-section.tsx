import { Badge } from "@/components/ui/badge";
import { MotionDiv } from "@/components/ui/motion-div";

export default function AboutSection() {
  const team = [
    {
      name: "Alex Rodriguez",
      title: "CEO & Founder",
      bio: "Former field engineer with 15+ years experience in construction management."
    },
    {
      name: "Maya Patel",
      title: "CTO",
      bio: "Software architect specializing in mobile and offline-first applications."
    },
    {
      name: "David Kim",
      title: "Head of Product",
      bio: "User experience expert with background in industrial engineering."
    },
    {
      name: "Sophie Williams",
      title: "Customer Success",
      bio: "Dedicated to ensuring customers achieve their goals with our platform."
    }
  ];

  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6">
        <MotionDiv className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1">About Us</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet the Team Behind repaired.co</h2>
          <p className="text-lg text-muted-foreground">We're a passionate team of engineers, designers, and field experts committed to simplifying complex data collection challenges.</p>
        </MotionDiv>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <MotionDiv key={index} delay={index * 0.1} className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 rounded-xl overflow-hidden bg-gray-800"></div>
              <h4 className="text-xl font-bold mb-1">{member.name}</h4>
              <p className="text-primary mb-2">{member.title}</p>
              <p className="text-muted-foreground text-sm">{member.bio}</p>
            </MotionDiv>
          ))}
        </div>
        
        <MotionDiv delay={0.5} className="mt-20">
          <div className="bg-background p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Our Mission</h3>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
              At repaired.co, we believe that the future of field operations lies in accessible, reliable technology that works the way you do. Our mission is to empower teams with intuitive tools that eliminate data silos, reduce manual work, and provide actionable insights—no matter where your work takes you.
            </p>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
