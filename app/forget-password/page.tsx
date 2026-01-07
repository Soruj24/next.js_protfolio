"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { gsap } from "gsap";
import { Mail, ArrowRight, Sparkles, KeyRound, ArrowLeft } from "lucide-react";

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
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="shape-1 absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="shape-2 absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="auth-card w-full max-w-[450px] relative z-10">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

        <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-xl bg-orange-500/10 text-orange-400 mb-4 animate-item">
              <KeyRound size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white animate-item tracking-tight">
              Password Recovery
            </h1>
            <p className="text-gray-400 mt-2 animate-item">
              {isSent
                ? "Check your inbox for instructions"
                : "Enter your email to reset access"}
            </p>
          </div>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2 animate-item">
                <label className="text-sm font-medium text-gray-300 ml-1">
                  Email Protocol
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 size-5" />
                  <Input
                    type="email"
                    placeholder="commander@nexus.ai"
                    className="pl-10 bg-white/5 border-white/10 text-white focus:border-orange-500/50 h-12 rounded-xl transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/20 animate-item group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Initializing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Send Reset Link{" "}
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
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
              <Button
                onClick={() => setIsSent(false)}
                variant="ghost"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Didn&apos;t receive it? Try again
              </Button>
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
