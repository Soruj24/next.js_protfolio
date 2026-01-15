"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { gsap } from "gsap";
import { UserPlus, User, Mail, Lock, ShieldCheck, Zap } from "lucide-react";
import AuthBackground from "@/components/auth/AuthBackground";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import AuthSubmitButton from "@/components/auth/AuthSubmitButton";
import AuthSocialLinks from "@/components/auth/AuthSocialLinks";
import AuthFooter from "@/components/auth/AuthFooter";
import AuthOTPForm from "@/components/auth/AuthOTPForm";

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
      <AuthBackground variant="register" />

      <div className="register-card w-full max-w-[480px] relative z-10">
        <div className="relative bg-black/40 backdrop-blur-3xl border border-white/10 p-8 rounded-[2rem] shadow-2xl overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

          {!showOtpStep ? (
            <>
              <AuthHeader 
                icon={UserPlus}
                title="Join the Nexus"
                subtitle="Initialize your digital twin"
                subtitleIcon={Zap}
                iconClassName="bg-purple-500/10 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
              />

              <form onSubmit={handleSubmit} className="space-y-4">
                <AuthInput 
                  label="Legal Name"
                  icon={User}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  accentColor="purple"
                />

                <AuthInput 
                  label="Email Address"
                  icon={Mail}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nexus@ai.com"
                  accentColor="purple"
                />

                <AuthInput 
                  label="Access Key"
                  icon={Lock}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  showPasswordToggle
                  isPasswordVisible={showPassword}
                  onPasswordToggle={() => setShowPassword(!showPassword)}
                  accentColor="purple"
                />

                <AuthInput 
                  label="Confirm Access Key"
                  icon={ShieldCheck}
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  showPasswordToggle
                  isPasswordVisible={showConfirmPassword}
                  onPasswordToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                  accentColor="purple"
                />

                <AuthSubmitButton 
                  isLoading={isLoading}
                  loadingText="Syncing..."
                  buttonText="Initialize Onboarding"
                  variant="purple"
                />

                <AuthSocialLinks label="Rapid Entry" />

                <AuthFooter 
                  text="Already registered?"
                  linkText="Access Core"
                  linkHref="/login"
                  accentColor="purple"
                />
              </form>
            </>
          ) : (
            <AuthOTPForm 
              email={email}
              otp={otp}
              setOtp={setOtp}
              isLoading={isLoading}
              onSubmit={handleVerifyOtp}
              onResend={handleResendOtp}
              onBack={() => setShowOtpStep(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
