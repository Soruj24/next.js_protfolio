"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function useRegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showOtpStep, setShowOtpStep] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Access keys do not match. Verification failed.")
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success("Identity profile created. Verification required.")
        setShowOtpStep(true)
      } else {
        toast.error(data.error || "Onboarding failed")
      }
    } catch {
      toast.error("A system error occurred during registration")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit code")
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success("Email verified! Welcome to the Nexus.")
        router.push("/login")
      } else {
        toast.error(data.error || "Verification failed")
      }
    } catch {
      toast.error("Error during verification")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        toast.success("New code dispatched to your inbox")
      } else {
        const data = await res.json()
        toast.error(data.error || "Failed to resend code")
      }
    } catch {
      toast.error("System error during code dispatch")
    } finally {
      setIsLoading(false)
    }
  }

  return {
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
  }
}
