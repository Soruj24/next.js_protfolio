"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function useLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await signIn("credentials", { email, password, redirect: false })
      if (result?.error) {
        if (result.error === "Email not verified") {
          toast.error("Your email is not verified. Please verify your email to login.")
        } else {
          toast.error("Invalid credentials. Access Denied.")
        }
      } else {
        toast.success("Welcome back, Commander!")
        router.push("/admin")
      }
    } catch {
      toast.error("An error occurred during secure login")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    email, setEmail,
    password, setPassword,
    showPassword, setShowPassword,
    isLoading,
    handleSubmit,
  }
}
