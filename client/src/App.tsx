import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Auth from "./pages/auth";
import LogoManagement from "./pages/admin/logo-management";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { ThemeProvider } from "./contexts/theme-context";

// Re-export useTheme for convenience
export { useTheme } from "./contexts/theme-context";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/admin/logos" component={LogoManagement} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Use to determine if we're on the auth or admin page
  const [location] = useLocation();
  const isAuthPage = location === '/auth';
  const isAdminPage = location.startsWith('/admin');

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen">
          {!isAuthPage && <Header />}
          <main className={`flex-grow ${isAuthPage ? 'bg-background dark:bg-background' : ''}`}>
            <Router />
          </main>
          {!isAuthPage && !isAdminPage && <Footer />}
        </div>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
