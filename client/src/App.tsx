import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Auth from "./pages/auth";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { createContext, useContext, useEffect, useState } from "react";

// Define Theme context and provider
type Theme = 'dark' | 'light';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  // Function to toggle theme
  const toggleTheme = () => {
    console.log("Toggle theme function called");
    
    // Determine the new theme (if currently dark, switch to light, and vice versa)
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    // Apply theme to document
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save theme preference to local storage
    localStorage.setItem('theme', newTheme);
    
    // Update state after DOM changes to ensure they're in sync
    setTheme(newTheme);
    
    console.log("Theme toggled to:", newTheme);
  };

  // Initialize theme from local storage or system preference on component mount
  useEffect(() => {
    console.log("Theme provider useEffect running");
    
    // By default, always use dark mode
    const defaultTheme: Theme = 'dark';
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    let initialTheme: Theme;
    
    // If user has saved theme preference, use that
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      initialTheme = savedTheme;
    } else {
      // Otherwise use default (dark)
      initialTheme = defaultTheme;
    }
    
    // Set theme class on document
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Update state
    setTheme(initialTheme);
    
    console.log("Theme initialized to:", initialTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Use to determine if we're on the auth page
  const [location] = useLocation();
  const isAuthPage = location === '/auth';

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen">
          {!isAuthPage && <Header />}
          <main className={`flex-grow ${isAuthPage ? 'bg-background dark:bg-background' : ''}`}>
            <Router />
          </main>
          {!isAuthPage && <Footer />}
        </div>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
