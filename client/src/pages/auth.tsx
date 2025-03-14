import { useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  EnterIcon, 
  Cross2Icon,
  ChevronLeftIcon,
  CheckIcon,
  ExclamationTriangleIcon
} from "@radix-ui/react-icons";
import { FaGoogle, FaMicrosoft, FaLinkedin } from "react-icons/fa";
import { useTheme } from "../App";
import { motion } from "framer-motion";
import { fadeIn, slideUp } from "../lib/animations";

// Form schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [, setLocation] = useLocation();
  const { theme } = useTheme();
  
  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = () => {
    // Immediately redirect to home on login attempt
    setLocation("/");
  };

  const onRegisterSubmit = () => {
    // Immediately redirect to home on register attempt
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary-50 dark:bg-background">
      {/* Header with back button */}
      <header className="w-full py-4 px-6 flex items-center">
        <button 
          onClick={() => setLocation("/")}
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeftIcon className="mr-1 h-4 w-4" />
          Back to Home
        </button>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          className="w-full max-w-md"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="neu-card p-8 rounded-2xl">
            <div className="text-center mb-6">
              <motion.h1 
                className="text-2xl font-bold mb-2"
                variants={slideUp}
              >
                {mode === "login" ? "Welcome Back" : "Create an Account"}
              </motion.h1>
              <motion.p 
                className="text-foreground"
                variants={slideUp}
              >
                {mode === "login" 
                  ? "Sign in to access your repaired.co dashboard" 
                  : "Join repaired.co to streamline your re-manufacturing workflow"}
              </motion.p>
            </div>

            {/* Auth forms */}
            <div className="mb-6">
              {mode === "login" ? (
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-foreground mb-1">
                        Email
                      </label>
                      <input
                        {...loginForm.register("email")}
                        type="email"
                        id="email"
                        className="w-full p-3 rounded-lg bg-card neu-input-inset"
                        placeholder="your@email.com"
                      />
                      {loginForm.formState.errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          <ExclamationTriangleIcon className="inline-block mr-1 h-3 w-3" />
                          {loginForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="password" className="block text-sm font-bold text-foreground mb-1">
                        Password
                      </label>
                      <input
                        {...loginForm.register("password")}
                        type="password"
                        id="password"
                        className="w-full p-3 rounded-lg bg-card neu-input-inset"
                        placeholder="••••••••"
                      />
                      {loginForm.formState.errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                          <ExclamationTriangleIcon className="inline-block mr-1 h-3 w-3" />
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="remember"
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-foreground">
                          Remember me
                        </label>
                      </div>
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          setLocation("/");
                        }} 
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-3 px-4 rounded-lg flex items-center justify-center ${
                        theme === 'dark' ? 'gold-effect' : 'copper-effect'
                      } text-primary-foreground font-medium`}
                    >
                      <EnterIcon className="mr-2 h-4 w-4" />
                      Sign In
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-foreground mb-1">
                        Full Name
                      </label>
                      <input
                        {...registerForm.register("name")}
                        type="text"
                        id="name"
                        className="w-full p-3 rounded-lg bg-card neu-input-inset"
                        placeholder="John Doe"
                      />
                      {registerForm.formState.errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          <ExclamationTriangleIcon className="inline-block mr-1 h-3 w-3" />
                          {registerForm.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="register-email" className="block text-sm font-bold text-foreground mb-1">
                        Email
                      </label>
                      <input
                        {...registerForm.register("email")}
                        type="email"
                        id="register-email"
                        className="w-full p-3 rounded-lg bg-card neu-input-inset"
                        placeholder="your@email.com"
                      />
                      {registerForm.formState.errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          <ExclamationTriangleIcon className="inline-block mr-1 h-3 w-3" />
                          {registerForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="register-password" className="block text-sm font-bold text-foreground mb-1">
                        Password
                      </label>
                      <input
                        {...registerForm.register("password")}
                        type="password"
                        id="register-password"
                        className="w-full p-3 rounded-lg bg-card neu-input-inset"
                        placeholder="••••••••"
                      />
                      {registerForm.formState.errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                          <ExclamationTriangleIcon className="inline-block mr-1 h-3 w-3" />
                          {registerForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-bold text-foreground mb-1">
                        Confirm Password
                      </label>
                      <input
                        {...registerForm.register("confirmPassword")}
                        type="password"
                        id="confirm-password"
                        className="w-full p-3 rounded-lg bg-card neu-input-inset"
                        placeholder="••••••••"
                      />
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">
                          <ExclamationTriangleIcon className="inline-block mr-1 h-3 w-3" />
                          {registerForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-3 px-4 rounded-lg flex items-center justify-center ${
                        theme === 'dark' ? 'gold-effect' : 'copper-effect'
                      } text-primary-foreground font-medium`}
                    >
                      <CheckIcon className="mr-2 h-4 w-4" />
                      Create Account
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Social login options */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setLocation("/")}
                className="py-2 px-4 rounded-lg neu-social-button flex items-center justify-center"
              >
                <FaGoogle className="text-red-500" />
              </button>
              <button
                type="button"
                onClick={() => setLocation("/")}
                className="py-2 px-4 rounded-lg neu-social-button flex items-center justify-center"
              >
                <FaMicrosoft className="text-blue-500" />
              </button>
              <button
                type="button"
                onClick={() => setLocation("/")}
                className="py-2 px-4 rounded-lg neu-social-button flex items-center justify-center"
              >
                <FaLinkedin className="text-[#0077b5]" />
              </button>
            </div>

            {/* Toggle between login and register */}
            <div className="text-center">
              <p className="text-sm text-foreground">
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => setMode(mode === "login" ? "register" : "login")}
                  className="ml-1 text-primary font-bold hover:underline"
                >
                  {mode === "login" ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}