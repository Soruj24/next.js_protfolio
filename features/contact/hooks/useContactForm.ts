"use client";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas/contact";

type SubmitStatus = { success: boolean; message: string } | null;

export function useContactForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit: handleSubmitBase,
    formState: { errors, isSubmitting, dirtyFields, isValid },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = useCallback(
    async (data: ContactFormData) => {
      setSubmitStatus(null);
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await response.json();

        if (result.success) {
          setSubmitStatus({ success: true, message: "Message sent successfully!" });
          setIsSuccess(true);
          reset();
          setTimeout(() => {
            setIsSuccess(false);
            setSubmitStatus(null);
          }, 5000);
        } else {
          setSubmitStatus({
            success: false,
            message: result.message || "Something went wrong. Please try again.",
          });
        }
      } catch {
        setSubmitStatus({
          success: false,
          message: "Network error. Please check your connection.",
        });
      }
    },
    [reset]
  );

  const handleSubmit = handleSubmitBase(onSubmit);

  return {
    register,
    errors,
    isSubmitting,
    dirtyFields,
    isValid,
    submitStatus,
    isSuccess,
    handleSubmit,
    watch,
  };
}
