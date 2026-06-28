import React from "react";
import { ShieldCheck, RefreshCw } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface AuthOTPFormProps {
  email: string;
  otp: string;
  setOtp: (otp: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onResend: () => void;
  onBack: () => void;
}

const AuthOTPForm: React.FC<AuthOTPFormProps> = ({
  email,
  otp,
  setOtp,
  isLoading,
  onSubmit,
  onResend,
  onBack,
}) => {
  return (
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

      <form onSubmit={onSubmit} className="space-y-8">
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
            onClick={onResend}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-cyan-400 transition-colors group"
          >
            <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
            Resend security code
          </button>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-xs text-gray-600 hover:text-gray-400 transition-colors"
        >
          Incorrect email? Back to registration
        </button>
      </form>
    </div>
  );
};

export default AuthOTPForm;
