"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { UserPlus, User, Mail, Lock, ShieldCheck, Zap } from "lucide-react";
import { useRegisterForm } from "@/features/auth/hooks/useRegisterForm";
import AuthBackground from "@/features/auth/components/AuthBackground";
import AuthHeader from "@/features/auth/components/AuthHeader";
import AuthInput from "@/features/auth/components/AuthInput";
import AuthSubmitButton from "@/features/auth/components/AuthSubmitButton";
import AuthSocialLinks from "@/features/auth/components/AuthSocialLinks";
import AuthFooter from "@/features/auth/components/AuthFooter";
import AuthOTPForm from "@/features/auth/components/AuthOTPForm";

export default function RegisterPage() {
  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    showPassword, setShowPassword,
    showConfirmPassword, setShowConfirmPassword,
    otp, setOtp,
    isLoading,
    showOtpStep,
    setShowOtpStep,
    handleSubmit,
    handleVerifyOtp,
    handleResendOtp,
  } = useRegisterForm();
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

      gsap.to(".blob-1", {
        scale: 1.2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, [showOtpStep]);

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
