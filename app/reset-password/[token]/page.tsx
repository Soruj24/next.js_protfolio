"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { gsap } from "gsap";
import { Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import AuthBackground from "@/components/auth/AuthBackground";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import AuthSubmitButton from "@/components/auth/AuthSubmitButton";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".auth-card", {
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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password reset successful! Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-[#050505] px-4 overflow-hidden relative">
      <AuthBackground variant="reset-password" />

      <div className="auth-card w-full max-w-[450px] relative z-10">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl shadow-2xl">
          <AuthHeader 
            icon={ShieldCheck}
            title="Secure Reset"
            subtitle="Define your new security credentials"
            iconClassName="bg-emerald-500/10 text-emerald-400"
          />

          <form onSubmit={handleSubmit} className="space-y-5">
            <AuthInput 
              label="New Access Key"
              icon={Lock}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              showPasswordToggle={true}
              isPasswordVisible={showPassword}
              onPasswordToggle={() => setShowPassword(!showPassword)}
              accentColor="emerald"
            />

            <AuthInput 
              label="Confirm Protocol"
              icon={Lock}
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              accentColor="emerald"
            />

            <AuthSubmitButton 
              isLoading={isLoading}
              loadingText="Updating..."
              buttonText="Update Password"
              variant="emerald"
            />
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center animate-item">
            <Link 
              href="/login" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors text-sm font-medium"
            >
              <ArrowLeft size={16} /> Cancel Reset
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
