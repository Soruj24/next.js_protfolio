"use client";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useContactForm } from "../hooks/useContactForm";
import SuccessAnimation from "./SuccessAnimation";

interface ContactFormProps {
  email?: string;
}

export default function ContactForm({ email }: ContactFormProps) {
  const {
    register,
    errors,
    isSubmitting,
    submitStatus,
    isSuccess,
    handleSubmit,
  } = useContactForm();

  return (
    <div className="relative">
      {/* Glow */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-cyan-500/10 via-transparent to-purple-500/10 opacity-50" />

      <div className="relative rounded-2xl bg-[#080c15] border border-white/[0.06] p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <SuccessAnimation key="success" />
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
              aria-label="Contact form"
            >
              {/* Name */}
              <FormField
                label="Name"
                htmlFor="contact-name"
                error={errors.name?.message}
                required
              >
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  {...register("name")}
                  className={inputClass(!!errors.name)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                />
              </FormField>

              {/* Email */}
              <FormField
                label="Email"
                htmlFor="contact-email"
                error={errors.email?.message}
                required
              >
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  {...register("email")}
                  className={inputClass(!!errors.email)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                />
              </FormField>

              {/* Subject */}
              <FormField
                label="Subject"
                htmlFor="contact-subject"
                error={errors.subject?.message}
                required
              >
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Project inquiry"
                  {...register("subject")}
                  className={inputClass(!!errors.subject)}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                />
              </FormField>

              {/* Message */}
              <FormField
                label="Message"
                htmlFor="contact-message"
                error={errors.message?.message}
                required
              >
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  {...register("message")}
                  className={`${inputClass(!!errors.message)} resize-none`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                />
              </FormField>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3.5 text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c15]"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </motion.button>

              {/* Status */}
              <AnimatePresence>
                {submitStatus && !isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className={`text-center text-sm py-3 rounded-xl font-medium ${
                      submitStatus.success
                        ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                        : "text-red-400 bg-red-500/10 border border-red-500/20"
                    }`}
                    role="alert"
                  >
                    {submitStatus.message}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email fallback */}
              <p className="text-center text-[11px] text-gray-400">
                Or email directly at{" "}
                <a
                  href={`mailto:${email || "sorujmahmudb2h@gmail.com"}`}
                  className="text-cyan-400/60 hover:text-cyan-400 transition-colors underline underline-offset-2 decoration-cyan-400/20"
                >
                  {email || "sorujmahmudb2h@gmail.com"}
                </a>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FormField({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-1"
      >
        {label}
        {required && <span className="text-cyan-500">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-[11px] text-red-400 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean): string {
  return `w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-sm text-white placeholder:text-gray-400 focus:outline-none transition-all duration-300 ${
    hasError
      ? "border-red-500/40 focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20"
      : "border-white/[0.06] focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/15 hover:border-white/[0.1]"
  }`;
}
