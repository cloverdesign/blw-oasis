"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { Search } from "lucide-react"
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr"
import { useMediaQuery } from "@/lib/use-media-query"
import { cn } from "@/lib/utils"
import type { Location } from "@/sanity/lib/queries/locations"
import { LocationCard } from "@/components/map/location-card"
import { MapLoadingPlaceholder } from "@/components/map/map-loading-placeholder"
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet"
import Logo from "@/assets/logo.svg";
import { LocationsBackButton } from "./back-button"


const MapView = dynamic(
  () => import("@/components/map/map-view").then((mod) => ({ default: mod.MapView })),
  {
    ssr: false,
    loading: () => (
      <div className="size-full">
        <MapLoadingPlaceholder className="size-full" />
      </div>
    ),
  }
)

type LocationType = "all" | "campus" | "church"

function resolveInitialSelection(
  locations: Location[],
  initialSelectedId: string | undefined,
  initialType: "campus" | "church" | undefined
): { selectedId: string | null; activeType: LocationType } {
  if (initialSelectedId) {
    const loc = locations.find((l) => l._id === initialSelectedId)
    if (loc) {
      return { selectedId: loc._id, activeType: loc.type }
    }
  }
  return { selectedId: null, activeType: initialType ?? "all" }
}

interface LocationsPageProps {
  locations: Location[]
  initialType?: "campus" | "church"
  initialSelectedId?: string
}

export function LocationsPage({
  locations,
  initialType,
  initialSelectedId,
}: LocationsPageProps) {
  const initial = resolveInitialSelection(
    locations,
    initialSelectedId,
    initialType
  )
  const [selectedId, setSelectedId] = useState<string | null>(
    initial.selectedId
  )
  const [activeType, setActiveType] = useState<LocationType>(initial.activeType)
  const [searchQuery, setSearchQuery] = useState("")
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetContainer, setSheetContainer] = useState<HTMLDivElement | null>(null)
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const filtered = useMemo(() => {
    return locations.filter((loc) => {
      if (activeType !== "all" && loc.type !== activeType) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        return (
          loc.name.toLowerCase().includes(q) ||
          (loc.address && loc.address.toLowerCase().includes(q))
        )
      }
      return true
    })
  }, [locations, activeType, searchQuery])

  const filteredIds = useMemo(() => filtered.map((l) => l._id), [filtered])

  // Scroll selected card into view
  useEffect(() => {
    if (selectedId) {
      const el = cardRefs.current.get(selectedId)
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [selectedId])

  // Deep link: open mobile sheet when landing with ?id=
  useEffect(() => {
    if (!initialSelectedId) return
    if (typeof window === "undefined") return
    if (window.innerWidth < 1024) {
      setSheetOpen(true)
    }
  }, [initialSelectedId])

  const handleMarkerClick = useCallback((id: string) => {
    setSelectedId(id)
    if (!isDesktop) setSheetOpen(true)
  }, [isDesktop])

  const handleCardSelect = useCallback((id: string) => {
    setSelectedId(id)
  }, [])

  const setCardRef = useCallback(
    (id: string) => (el: HTMLDivElement | null) => {
      if (el) cardRefs.current.set(id, el)
      else cardRefs.current.delete(id)
    },
    []
  )

  const typeFilters: { label: string; value: LocationType }[] = [
    { label: "All", value: "all" },
    { label: "Campuses", value: "campus" },
    { label: "Churches", value: "church" },
  ]

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="flex items-center gap-2 px-5 pt-5 pb-4">
        <LocationsBackButton />
        <h2 className="font-heading text-[32px] uppercase tracking-wide">
          All Locations
        </h2>
      </div>

      {/* Type filter chips */}
      <div className="flex gap-2 px-5 pb-3">
        {typeFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveType(filter.value)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeType === filter.value
                ? "bg-white text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="px-5 pb-3">
        <div className="flex items-center gap-2 rounded-xl border border-[#4f4f4f] bg-white/5 px-3 py-2">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Location list */}
      <div className="flex-1 overflow-y-auto px-3 pb-3">
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
                onClick={() => handleCardSelect(location._id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )

  return (
    <div
      ref={(el) => setSheetContainer(el ?? null)}
      className="relative flex h-screen w-full"
    >
      {/* Desktop sidebar */}
      {isDesktop && (
        <aside className="flex w-[478px] shrink-0 flex-col bg-[#282828] text-white">
          {sidebarContent}
        </aside>
      )}

      {/* Map */}
      <div className="relative flex-1">
        <MapView
          locations={locations}
          interactive
          selectedId={selectedId}
          onMarkerClick={handleMarkerClick}
          filteredLocationIds={filteredIds}
          showLoadingOverlay
          scrollWheelZoom
          enableClustering
          showControls
          controlsHidden={sheetOpen && !isDesktop}
        />

        {/* Oasis watermark */}
        <div className="pointer-events-none absolute right-4 top-4 z-[500] font-heading text-lg uppercase tracking-wider text-white/20">
          <Logo className="group-hover:text-primary size-20" />
        </div>
      </div>

      {/* Mobile: floating button + bottom sheet */}
      {!isDesktop && (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <button
            onClick={() => setSheetOpen(true)}
            className="absolute bottom-4 left-4 z-[1000] flex h-10 items-center gap-2 rounded-full border border-white/10 bg-[#282828]/90 px-4 text-sm text-white backdrop-blur-xl transition-transform hover:scale-105"
          >
            <MapPinIcon weight="fill" className="size-4" />
            Locations
          </button>
          <SheetContent
            side="bottom"
            showCloseButton={false}
            container={sheetContainer}
            className="max-h-[70%] bg-[#282828] text-white"
          >
            <SheetTitle className="sr-only">Locations</SheetTitle>
            <div className="flex h-full flex-col">
              {sidebarContent}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
