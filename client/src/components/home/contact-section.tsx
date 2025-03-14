import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MotionDiv } from "@/components/ui/motion-div";
import { MapPin, Mail, Phone } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().min(1, { message: "Company name is required." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  function onSubmit(data: FormValues) {
    // In a real application, this would send the form data to the server
    console.log(data);
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row">
            <MotionDiv className="w-full md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-10">
              <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30 px-3 py-1 font-bold">Contact Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Let's Start a Conversation</h2>
              <p className="text-foreground mb-8">Have questions about how repaired.co can help your team? We're here to help you find the perfect solution for your needs.</p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-foreground">Location</h4>
                    <p className="text-foreground">123 Innovation Drive, Suite 400<br />San Francisco, CA 94103</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-foreground">Email</h4>
                    <p className="text-foreground">info@repaired.co<br />support@repaired.co</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-foreground">Phone</h4>
                    <p className="text-foreground">(555) 123-4567<br />Mon-Fri, 8am-6pm PT</p>
                  </div>
                </div>
              </div>
            </MotionDiv>
            
            <MotionDiv delay={0.2} className="w-full md:w-1/2">
              <div className="bg-card p-8 rounded-xl">
                <h3 className="text-xl font-bold mb-6 text-foreground">Send us a message</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-foreground">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              className="bg-background border-border focus:ring-primary" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-foreground">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your.email@example.com" 
                              className="bg-background border-border focus:ring-primary" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-foreground">Company</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your company" 
                              className="bg-background border-border focus:ring-primary" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-foreground">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?" 
                              className="bg-background border-border focus:ring-primary" 
                              rows={4} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </Form>
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
