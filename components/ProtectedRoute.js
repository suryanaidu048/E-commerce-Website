"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, userData, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/login")
        return
      }

      if (adminOnly && userData?.role !== "admin") {
        router.push("/")
        return
      }
    }
  }, [isAuthenticated, userData, loading, adminOnly, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!isAuthenticated || (adminOnly && userData?.role !== "admin")) {
    return null
  }

  return children
}
