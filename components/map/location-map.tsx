"use client"

import { useCallback, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useMediaQuery } from "@/lib/use-media-query"
import type { Location } from "@/sanity/lib/queries/locations"
import { LocationPanel } from "./location-panel"
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet"
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr"
import { MapLoadingPlaceholder } from "./map-loading-placeholder"

const MapView = dynamic(
  () => import("./map-view").then((mod) => ({ default: mod.MapView })),
  {
    ssr: false,
    loading: () => (
      <div className="size-full">
        <MapLoadingPlaceholder className="size-full" />
      </div>
    ),
  }
)

const MapViewNoLoading = dynamic(
  () => import("./map-view").then((mod) => ({ default: mod.MapView })),
  {
    ssr: false,
    loading: () => <div className="size-full bg-[#262626]" />,
  }
)

interface LocationMapProps {
  locations: Location[]
  mode: "interactive" | "static"
  showLoading?: boolean
  scrollWheelZoom?: boolean
  enableClustering?: boolean
  showControls?: boolean
}

export function LocationMap({ locations, mode, showLoading = true, scrollWheelZoom, enableClustering, showControls }: LocationMapProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [panelOpen, setPanelOpen] = useState(true)
  const [filteredIds, setFilteredIds] = useState<string[]>(
    locations.map((l) => l._id)
  )
  const [sheetContainer, setSheetContainer] = useState<HTMLDivElement | null>(
    null
  )
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const handleMarkerClick = useCallback((id: string) => {
    setSelectedId(id)
    setPanelOpen(true)
  }, [])

  const handleCardSelect = useCallback((id: string) => {
    setSelectedId(id)
  }, [])

  const handleFilteredIdsChange = useCallback((ids: string[]) => {
    setFilteredIds(ids)
  }, [])

  if (mode === "static") {
    const Map = showLoading ? MapView : MapViewNoLoading
    return (
      <div className="size-full">
        <Map locations={locations} interactive={false} showLoadingOverlay={showLoading} />
      </div>
    )
  }

  return (
    <div
      ref={(el) => {
        mapContainerRef.current = el
        setSheetContainer(el ?? null)
      }}
      className="relative size-full overflow-hidden"
    >
      <MapView
        locations={locations}
        interactive
        selectedId={selectedId}
        onMarkerClick={handleMarkerClick}
        filteredLocationIds={filteredIds}
        scrollWheelZoom={scrollWheelZoom}
        enableClustering={enableClustering}
        showControls={showControls}
        controlsHidden={!panelOpen ? false : !isDesktop}
      />

      {/* Desktop: overlay panel */}
      {isDesktop && panelOpen && (
        <div className="absolute bottom-4 left-4 z-1000 w-[380px] overflow-hidden rounded-2xl border border-white/10 bg-background/90 backdrop-blur-xl">
          <LocationPanel
            locations={locations}
            selectedId={selectedId}
            onSelect={handleCardSelect}
            onClose={() => setPanelOpen(false)}
            onFilteredIdsChange={handleFilteredIdsChange}
            className="h-full"
          />
        </div>
      )}

      {/* Desktop: reopen button */}
      {isDesktop && !panelOpen && (
        <button
          onClick={() => setPanelOpen(true)}
          className="absolute bottom-4 left-4 z-1000 flex size-10 items-center justify-center rounded-full border border-white/10 bg-background/90 backdrop-blur-xl transition-transform hover:scale-105"
        >
          <MapPinIcon weight="fill" className="size-4" />
        </button>
      )}

      {/* Mobile: floating button + bottom sheet */}
      {!isDesktop && (
        <Sheet open={panelOpen} onOpenChange={setPanelOpen}>
          <button
            onClick={() => setPanelOpen(true)}
            className="absolute bottom-4 left-4 z-1000 flex h-10 items-center gap-2 rounded-full border border-white/10 bg-background/90 px-4 text-sm backdrop-blur-xl transition-transform hover:scale-105"
          >
            <MapPinIcon weight="fill" className="size-4" />
            Locations
          </button>
          <SheetContent
            side="bottom"
            showCloseButton={false}
            container={sheetContainer}
            className="max-h-[70%]"
          >
            <SheetTitle className="sr-only">Locations</SheetTitle>
            <LocationPanel
              locations={locations}
              selectedId={selectedId}
              onSelect={handleCardSelect}
              onClose={() => setPanelOpen(false)}
              onFilteredIdsChange={handleFilteredIdsChange}
              className="h-full"
            />
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
