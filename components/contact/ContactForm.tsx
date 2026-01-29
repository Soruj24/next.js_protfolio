import React, { forwardRef } from "react";
import MagneticButton from "../ui/MagneticButton";

interface ContactFormProps {
  formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  setFormData: (data: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  submitStatus: { success: boolean; message: string } | null;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
}

const ContactForm = forwardRef<HTMLDivElement, ContactFormProps>(
  (
    {
      formData,
      setFormData,
      handleSubmit,
      isSubmitting,
      submitStatus,
      onMouseMove,
      onMouseLeave,
    },
    ref
  ) => {
    return (
      <div
        className="contact-element relative"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        ref={ref}
      >
        {/* Form Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

        <form
          onSubmit={handleSubmit}
          className="relative space-y-4 md:space-y-6 bg-[#030712]/80 backdrop-blur-2xl p-6 md:p-8 lg:p-10 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 shadow-2xl"
        >
          <div className="space-y-1 md:space-y-2">
            <label className="text-[10px] md:text-sm font-medium text-cyan-400/80 uppercase tracking-widest md:ml-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 md:px-6 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 focus:outline-none text-sm md:text-base text-white transition-all duration-300 placeholder:text-gray-600"
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-1 md:space-y-2">
            <label className="text-[10px] md:text-sm font-medium text-cyan-400/80 uppercase tracking-widest md:ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 md:px-6 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 focus:outline-none text-sm md:text-base text-white transition-all duration-300 placeholder:text-gray-600"
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-1 md:space-y-2">
            <label className="text-[10px] md:text-sm font-medium text-cyan-400/80 uppercase tracking-widest md:ml-1">
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 md:px-6 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 focus:outline-none text-sm md:text-base text-white transition-all duration-300 placeholder:text-gray-600"
              required
              placeholder="Enter subject"
            />
          </div>

          <div className="space-y-1 md:space-y-2">
            <label className="text-[10px] md:text-sm font-medium text-cyan-400/80 uppercase tracking-widest md:ml-1">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 md:px-6 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 focus:outline-none text-sm md:text-base text-white transition-all duration-300 placeholder:text-gray-600 resize-none"
              required
              placeholder="Enter your message"
            />
          </div>

          <div className="pt-2">
            <MagneticButton
              type="submit"
              disabled={isSubmitting}
              className="w-full relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 transition-all duration-500 group-hover:scale-105"></div>
              <div className="relative px-6 py-4 md:px-8 md:py-5 flex items-center justify-center font-bold text-base md:text-lg text-white">
                {isSubmitting ? (
                  <span className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Execute Transmission <span className="ml-2">→</span>
                  </span>
                )}
              </div>
            </MagneticButton>
          </div>

          <div className="success-message opacity-0 transform translate-y-10 text-center">
            {submitStatus && (
              <div
                className={`inline-flex items-center px-4 py-2 border rounded-full text-sm font-medium ${
                  submitStatus.success
                    ? "bg-green-500/10 border-green-500/20 text-green-400"
                    : "bg-red-500/10 border-red-500/20 text-red-400"
                }`}
              >
                <span className="mr-2">{submitStatus.success ? "⚡" : "❌"}</span>
                {submitStatus.message}
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
);

ContactForm.displayName = "ContactForm";

export default ContactForm;
