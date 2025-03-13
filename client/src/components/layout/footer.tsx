import { Link } from "wouter";
import { Settings, Cog, LucideTwitter, Linkedin, Facebook, Instagram } from "lucide-react";
import { LightningBoltIcon } from "@radix-ui/react-icons";

export default function Footer() {
  return (
    <footer className="neu-card-inset px-6 py-12 mt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-full gold-effect flex items-center justify-center overflow-hidden relative">
                <div className="w-5 h-5 rounded-full bg-background flex items-center justify-center">
                  <LightningBoltIcon className="w-3 h-3 text-foreground" />
                </div>
              </div>
              <span className="text-xl font-bold font-sans text-foreground">
                repaired<span className="silver-effect px-1 py-0.5 rounded text-background">.co</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6">
              The first software platform built specifically for re-manufacturing facilities, with AI-powered computer vision to optimize your core restoration processes.
            </p>
            <div className="flex space-x-4">
              {/* Social icons with neumorphic styling */}
              <a href="#" className="p-2 neu-button text-muted-foreground hover:text-foreground transition-colors duration-200">
                <LucideTwitter size={16} />
              </a>
              <a href="#" className="p-2 neu-button text-muted-foreground hover:text-foreground transition-colors duration-200">
                <Linkedin size={16} />
              </a>
              <a href="#" className="p-2 neu-button text-muted-foreground hover:text-foreground transition-colors duration-200">
                <Facebook size={16} />
              </a>
              <a href="#" className="p-2 neu-button text-muted-foreground hover:text-foreground transition-colors duration-200">
                <Instagram size={16} />
              </a>
            </div>
          </div>
          
          <div className="p-6 neu-card rounded-xl">
            <h4 className="text-lg font-bold mb-6 gold-effect px-2 py-1 inline-block rounded">Product</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 copper-effect rounded-full mr-2"></span>Features
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 copper-effect rounded-full mr-2"></span>Pricing
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 copper-effect rounded-full mr-2"></span>Case Studies
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 copper-effect rounded-full mr-2"></span>Integrations
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 copper-effect rounded-full mr-2"></span>API
              </a></li>
            </ul>
          </div>
          
          <div className="p-6 neu-card rounded-xl">
            <h4 className="text-lg font-bold mb-6 silver-effect px-2 py-1 inline-block rounded">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 silver-effect rounded-full mr-2"></span>Documentation
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 silver-effect rounded-full mr-2"></span>Blog
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 silver-effect rounded-full mr-2"></span>Webinars
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 silver-effect rounded-full mr-2"></span>Support Center
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 silver-effect rounded-full mr-2"></span>Training
              </a></li>
            </ul>
          </div>
          
          <div className="p-6 neu-card rounded-xl">
            <h4 className="text-lg font-bold mb-6 copper-effect px-2 py-1 inline-block rounded">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 gold-effect rounded-full mr-2"></span>About Us
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 gold-effect rounded-full mr-2"></span>Careers
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 gold-effect rounded-full mr-2"></span>Press
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 gold-effect rounded-full mr-2"></span>Contact
              </a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 gold-effect rounded-full mr-2"></span>Partners
              </a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="neu-card px-4 py-2 rounded-full mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} repaired.co. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 neu-button px-3 py-1">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 neu-button px-3 py-1">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 neu-button px-3 py-1">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
