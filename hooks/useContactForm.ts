"use client";
import { useState } from "react";
import { gsap } from "gsap";

export function useContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        setSubmitStatus({ success: true, message: "Thank you! Your message has been sent successfully." });
        setFormData({ name: "", email: "", subject: "", message: "" });
        gsap.to(".success-message", { opacity: 1, y: 0, duration: 0.5 });
        setTimeout(() => gsap.to(".success-message", { opacity: 0, y: 20, duration: 0.5, onComplete: () => setSubmitStatus(null) }), 5000);
      } else {
        setSubmitStatus({ success: false, message: data.message || "Something went wrong. Please try again." });
        gsap.to(".success-message", { opacity: 1, y: 0, duration: 0.5 });
      }
    } catch {
      setSubmitStatus({ success: false, message: "Network error. Please check your connection." });
      gsap.to(".success-message", { opacity: 1, y: 0, duration: 0.5 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, setFormData, isSubmitting, submitStatus, handleSubmit };
}
