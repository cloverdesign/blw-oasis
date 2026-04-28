import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCitySubtitle(address: string | null | undefined): string | null {
  if (!address) return null
  const parts = address.split(",").map((p) => p.trim()).filter(Boolean)
  if (parts.length < 2) return null
  const [city, statePart] = parts.slice(-2)
  const state = statePart.split(/\s+/)[0]
  if (!city || !state) return null
  return `${city}, ${state}`
}
