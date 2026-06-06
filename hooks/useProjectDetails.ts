"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { projects as localProjects } from "@/data/projects"
import { IProject } from "@/types"

export function useProjectDetails(id: string | string[] | undefined) {
  const [project, setProject] = useState<IProject | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return
      setLoading(true)
      try {
        const localProject = localProjects.find((p) => p.id === id)
        if (localProject) {
          setProject(localProject)
          setLoading(false)
          return
        }

        const res = await fetch("/api/projects")
        if (res.ok) {
          const allProjects = await res.json()
          const foundProject = allProjects.find(
            (p: IProject) => p.id === id || p._id === id,
          )
          if (foundProject) {
            setProject(foundProject)
          } else {
            router.push("/#projects")
          }
        } else {
          router.push("/#projects")
        }
      } catch {
        router.push("/#projects")
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id, router])

  return { project, loading }
}
