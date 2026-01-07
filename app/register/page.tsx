"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { gsap } from "gsap";
import { UserPlus, User, Mail, Lock, ArrowRight, Sparkles, Zap, ShieldCheck, RefreshCw, Eye, EyeOff } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpStep, setShowOtpStep] = useState(false);
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".register-card", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      });
      
      gsap.from(".animate-item", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.4,
      });

      // Animated background blobs
      gsap.to(".blob-1", {
        scale: 1.2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, [showOtpStep]); // Re-run animation when switching steps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Access keys do not match. Verification failed.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Identity profile created. Verification required.");
        setShowOtpStep(true);
      } else {
        toast.error(data.error || "Onboarding failed");
      }
    } catch (error) {
      toast.error("A system error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }
    
    setIsLoading(true);

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Email verified! Welcome to the Nexus.");
        router.push("/login");
      } else {
        toast.error(data.error || "Verification failed");
      }
    } catch (error) {
      toast.error("Error during verification");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success("New code dispatched to your inbox");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to resend code");
      }
    } catch (error) {
      toast.error("System error during code dispatch");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-[#050505] px-4 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob-1 absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="register-card w-full max-w-[480px] relative z-10">
        <div className="relative bg-black/40 backdrop-blur-3xl border border-white/10 p-8 rounded-[2rem] shadow-2xl overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

          {!showOtpStep ? (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex p-3 rounded-2xl bg-purple-500/10 text-purple-400 mb-4 animate-item shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                  <UserPlus size={32} />
                </div>
                <h1 className="text-3xl font-bold text-white animate-item tracking-tight">
                  Join the Nexus
                </h1>
                <p className="text-gray-400 mt-2 animate-item flex items-center justify-center gap-2 text-sm">
                  <Zap size={14} className="text-purple-400" /> Initialize your digital twin
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5 animate-item">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-widest ml-1">Legal Name</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                      className="bg-white/5 border-white/10 text-white pl-10 h-12 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 animate-item">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nexus@ai.com"
                      required
                      className="bg-white/5 border-white/10 text-white pl-10 h-12 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 animate-item">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-widest ml-1">Access Key</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="bg-white/5 border-white/10 text-white pl-10 pr-10 h-12 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 animate-item">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-widest ml-1">Confirm Access Key</label>
                  <div className="relative group">
                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="bg-white/5 border-white/10 text-white pl-10 pr-10 h-12 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-purple-900/20 transition-all duration-300 mt-2 flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Syncing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Initialize Onboarding <ArrowRight size={18} />
                    </div>
                  )}
                </button>

                <div className="animate-item">
                  <div className="relative w-full py-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-white/5"></span>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
                      <span className="bg-[#0c0c0c] px-4 text-gray-500">Rapid Entry</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => signIn("github", { callbackUrl: "/admin" })}
                      className="flex items-center justify-center gap-2 h-11 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium"
                    >
                      <FaGithub size={18} /> GitHub
                    </button>
                    <button
                      type="button"
                      onClick={() => signIn("google", { callbackUrl: "/admin" })}
                      className="flex items-center justify-center gap-2 h-11 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium"
                    >
                      <FaGoogle size={16} className="text-red-500" /> Google
                    </button>
                  </div>
                </div>

                <p className="text-center text-sm text-gray-500 animate-item pt-4">
                  Already registered?{" "}
                  <Link href="/login" className="text-purple-400 font-bold hover:text-purple-300 transition-colors underline-offset-4 hover:underline">
                    Access Core
                  </Link>
                </p>
              </form>
            </>
          ) : (
            <div className="space-y-8 py-4">
              <div className="text-center">
                <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 mb-4 animate-item shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <ShieldCheck size={32} />
                </div>
                <h1 className="text-3xl font-bold text-white animate-item tracking-tight">
                  Security Check
                </h1>
                <p className="text-gray-400 mt-2 animate-item text-sm">
                  We&apos;ve sent a 6-digit code to <span className="text-cyan-400 font-mono">{email}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-8">
                <div className="flex justify-center animate-item">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(val) => setOtp(val)}
                  >
                    <InputOTPGroup className="gap-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="w-12 h-14 bg-white/5 border-white/10 text-white text-xl rounded-xl focus:ring-cyan-500/20 focus:border-cyan-500/50"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <div className="space-y-4 animate-item">
                  <button
                    type="submit"
                    disabled={isLoading || otp.length !== 6}
                    className="w-full h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/20 transition-all duration-300 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Verifying...
                      </div>
                    ) : (
                      "Confirm Access"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-cyan-400 transition-colors group"
                  >
                    <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                    Resend security code
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowOtpStep(false)}
                  className="w-full text-xs text-gray-600 hover:text-gray-400 transition-colors"
                >
                  Incorrect email? Back to registration
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
