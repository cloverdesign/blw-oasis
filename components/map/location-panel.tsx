"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Location } from "@/sanity/lib/queries/locations"
import { LocationCard } from "./location-card"

interface LocationPanelProps {
  locations: Location[]
  selectedId: string | null
  onSelect: (id: string) => void
  onClose: () => void
  onFilteredIdsChange: (ids: string[]) => void
  className?: string
}

export function LocationPanel({
  locations,
  selectedId,
  onSelect,
  onClose,
  onFilteredIdsChange,
  className,
}: LocationPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  const filtered = useMemo(
    () =>
      locations.filter((loc) => {
        if (!searchQuery.trim()) return true
        const q = searchQuery.toLowerCase()
        return (
          loc.name.toLowerCase().includes(q) ||
          (loc.address && loc.address.toLowerCase().includes(q))
        )
      }),
    [locations, searchQuery]
  )

  useEffect(() => {
    onFilteredIdsChange(filtered.map((l) => l._id))
  }, [filtered, onFilteredIdsChange])

  // Scroll selected card into view
  useEffect(() => {
    if (selectedId) {
      const el = cardRefs.current.get(selectedId)
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [selectedId])

  const setCardRef = useCallback(
    (id: string) => (el: HTMLDivElement | null) => {
      if (el) cardRefs.current.set(id, el)
      else cardRefs.current.delete(id)
    },
    []
  )

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col overflow-hidden", className)}>
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between px-5 pt-5 pb-3">
        <h2 className="font-heading text-lg uppercase tracking-wide">
          All Locations
        </h2>
        <button
          onClick={onClose}
          className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-white/10"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Search */}
      <div className="shrink-0 px-5 pb-3">
        <div
          className={cn(
            "flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2 shadow-xs transition-[color,box-shadow]",
            "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50"
          )}
        >
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            type="text"
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* List */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-3 pb-3">
        {filtered.length === 0 ? (
          <p className="px-2 py-4 text-center text-sm text-muted-foreground">
            No locations found.
          </p>
        ) : (
          <div className="flex flex-col gap-1">
            {filtered.map((location) => (
              <LocationCard
                key={location._id}
                ref={setCardRef(location._id)}
                location={location}
                isSelected={selectedId === location._id}
                onClick={() => onSelect(location._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
