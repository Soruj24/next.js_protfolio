"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { ISettings } from "@/models/Settings"
import { toast } from "sonner"

export function useProfile() {
  const { data: session, status, update } = useSession()
  const [settings, setSettings] = useState<ISettings | null>(null)
  const [loadingSettings, setLoadingSettings] = useState(true)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [newName, setNewName] = useState("")

  useEffect(() => {
    if (session?.user?.name) {
      setNewName(session.user.name)
    }
  }, [session])

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings")
        if (response.ok) {
          const data = await response.json()
          setSettings(data)
        }
      } catch (error) {
        console.error("Error fetching settings:", error)
      } finally {
        setLoadingSettings(false)
      }
    }
    fetchSettings()
  }, [])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) return
    setIsUpdating(true)
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      })
      if (response.ok) {
        await update({ name: newName })
        toast.success("Profile updated successfully!")
        setIsEditDialogOpen(false)
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to update profile")
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsUpdating(false)
    }
  }

  return {
    session, status, update,
    settings, loadingSettings,
    isEditDialogOpen, setIsEditDialogOpen,
    isUpdating,
    newName, setNewName,
    handleProfileUpdate,
  }
}
