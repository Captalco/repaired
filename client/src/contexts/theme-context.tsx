import React, { createContext, useContext, useEffect, useState } from "react";

// Define Theme type and context
export type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

// Create a provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
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

// Create a custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}