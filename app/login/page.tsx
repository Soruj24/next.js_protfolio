"use client";

import { useState, useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { gsap } from "gsap";
import { Shield, Lock, Mail, ArrowRight, Sparkles, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const formRef = useRef(null);
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
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="shape-1 absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="shape-2 absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="login-card w-full max-w-[450px] relative z-10">
        {/* Decorative Border Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-xl bg-cyan-500/10 text-cyan-400 mb-4 animate-item">
              <Shield size={32} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent animate-item">
              Secure Access
            </h1>
            <p className="text-gray-400 mt-2 animate-item flex items-center justify-center gap-2">
              <Sparkles size={14} className="text-cyan-400" />
              Enter your credentials to enter the bridge
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2 animate-item">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-widest ml-1">Identity (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="commander@nebula.ai"
                  required
                  className="bg-white/5 border-white/10 text-white pl-10 h-12 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2 animate-item">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-widest ml-1">Access Key (Password)</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-white/5 border-white/10 text-white pl-10 pr-10 h-12 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <Link 
                  href="/forget-password" 
                  className="text-xs text-gray-500 hover:text-cyan-400 transition-colors"
                >
                  Forget Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/20 transition-all duration-300 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authorizing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Initiate Login <ArrowRight size={18} />
                </div>
              )}
            </button>

            <div className="animate-item">
              <div className="relative w-full py-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/5"></span>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
                  <span className="bg-[#0c0c0c] px-4 text-gray-500">Multi-Channel Auth</span>
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
              New recruit?{" "}
              <Link href="/register" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors underline-offset-4 hover:underline">
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
