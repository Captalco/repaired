import { Link } from "wouter";
import { Settings, Cog } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Settings className="text-primary-foreground text-xl" />
              </div>
              <span className="text-xl font-bold font-sans text-foreground">
                repaired<span className="text-teal-500">.co</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6">
              The first software platform built specifically for re-manufacturing facilities, with AI-powered computer vision to optimize your core restoration processes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Product</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Features</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Case Studies</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Integrations</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Webinars</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Support Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Training</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Press</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">Partners</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} repaired.co. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
