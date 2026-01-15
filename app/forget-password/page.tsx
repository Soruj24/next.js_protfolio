"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { gsap } from "gsap";
import { Mail, KeyRound, ArrowLeft } from "lucide-react";
import AuthBackground from "@/components/auth/AuthBackground";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import AuthSubmitButton from "@/components/auth/AuthSubmitButton";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
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
        ease: "sine.inOut",
      });
      gsap.to(".shape-2", {
        y: "random(-30, 30)",
        x: "random(-30, 30)",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSent(true);
        toast.success("Recovery link sent to your email!");
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to send recovery email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-[#050505] px-4 overflow-hidden relative"
    >
      <AuthBackground variant="forgot-password" />

      <div className="auth-card w-full max-w-[450px] relative z-10">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

        <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl shadow-2xl">
          <AuthHeader 
            icon={KeyRound}
            title="Password Recovery"
            subtitle={isSent ? "Check your inbox for instructions" : "Enter your email to reset access"}
            iconClassName="bg-orange-500/10 text-orange-400"
          />

          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <AuthInput 
                label="Email Protocol"
                icon={Mail}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="commander@nexus.ai"
                accentColor="orange"
              />

              <AuthSubmitButton 
                isLoading={isLoading}
                loadingText="Initializing..."
                buttonText="Send Reset Link"
                variant="orange"
              />
            </form>
          ) : (
            <div className="space-y-6 text-center animate-item">
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                <p className="text-orange-200 text-sm leading-relaxed">
                  We&apos;ve sent a secure reset link to{" "}
                  <span className="text-white font-mono">{email}</span>. Please
                  check your spam folder if you don&apos;t see it.
                </p>
              </div>
              <button
                onClick={() => setIsSent(false)}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium underline underline-offset-4"
              >
                Didn&apos;t receive it? Try again
              </button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-white/5 text-center animate-item">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm font-medium"
            >
              <ArrowLeft size={16} /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
