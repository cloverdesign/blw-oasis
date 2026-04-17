"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LocationsBackButton() {
  const router = useRouter()

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
      return
    }

    router.push("/fellowships")
  }

  return (
    <Button variant="accent" size="icon" onClick={handleBack} className="gap-2">
      <ArrowLeft className="size-4" />
    </Button>
  )
}
