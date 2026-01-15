"use client";

import { useState, useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { gsap } from "gsap";
import { Shield, Mail, Lock, Sparkles } from "lucide-react";
import AuthBackground from "@/components/auth/AuthBackground";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import AuthSubmitButton from "@/components/auth/AuthSubmitButton";
import AuthSocialLinks from "@/components/auth/AuthSocialLinks";
import AuthFooter from "@/components/auth/AuthFooter";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".login-card", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });
      
      gsap.from(".animate-item", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.5,
      });

      // Floating shapes animation
      gsap.to(".shape-1", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      gsap.to(".shape-2", {
        y: "random(-30, 30)",
        x: "random(-30, 30)",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === "Email not verified") {
          toast.error("Your email is not verified. Please verify your email to login.");
        } else {
          toast.error("Invalid credentials. Access Denied.");
        }
      } else {
        toast.success("Welcome back, Commander!");
        router.push("/admin");
      }
    } catch (error) {
      toast.error("An error occurred during secure login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-[#050505] px-4 overflow-hidden relative">
      <AuthBackground variant="login" />

      <div className="login-card w-full max-w-[450px] relative z-10">
        {/* Decorative Border Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl shadow-2xl">
          <AuthHeader 
            icon={Shield}
            title="Secure Access"
            subtitle="Enter your credentials to enter the bridge"
            subtitleIcon={Sparkles}
          />

          <form onSubmit={handleSubmit} className="space-y-5">
            <AuthInput 
              label="Identity (Email)"
              icon={Mail}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="commander@nebula.ai"
              accentColor="cyan"
            />

            <div className="space-y-2">
              <AuthInput 
                label="Access Key (Password)"
                icon={Lock}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                showPasswordToggle
                isPasswordVisible={showPassword}
                onPasswordToggle={() => setShowPassword(!showPassword)}
                accentColor="cyan"
              />
              <div className="flex justify-end mt-1">
                <Link 
                  href="/forget-password" 
                  className="text-xs text-gray-500 hover:text-cyan-400 transition-colors"
                >
                  Forget Password?
                </Link>
              </div>
            </div>

            <AuthSubmitButton 
              isLoading={isLoading}
              loadingText="Authorizing..."
              buttonText="Initiate Login"
              variant="cyan"
            />

            <AuthSocialLinks />

            <AuthFooter 
              text="New recruit?"
              linkText="Create Account"
              linkHref="/register"
              accentColor="cyan"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
