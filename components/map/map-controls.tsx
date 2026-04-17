"use client"

import { useEffect, useState } from "react"
import { useMap } from "react-leaflet"
import L from "leaflet"
import { LocateFixed, Maximize, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface MapControlsProps {
  hidden?: boolean
}

function ControlButton({
  onClick,
  label,
  children,
  className,
}: {
  onClick: () => void
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex size-10 items-center justify-center text-white/80 transition-all duration-160 ease-out hover:text-white active:scale-95",
        className
      )}
    >
      {children}
    </button>
  )
}

export function MapControls({ hidden }: MapControlsProps) {
  const map = useMap()
  const [hasGeolocation, setHasGeolocation] = useState(false)

  // Check geolocation availability
  useEffect(() => {
    setHasGeolocation("geolocation" in navigator)
  }, [])

  // Add dark-themed scale bar
  useEffect(() => {
    const scale = L.control.scale({
      metric: true,
      imperial: true,
      position: "bottomleft",
    })
    scale.addTo(map)
    return () => {
      scale.remove()
    }
  }, [map])

  const handleZoomIn = () => map.zoomIn()
  const handleZoomOut = () => map.zoomOut()

  const handleFitAll = () => {
    const bounds: [number, number][] = []
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        const { lat, lng } = layer.getLatLng()
        bounds.push([lat, lng])
      }
    })
    if (bounds.length > 0) {
      map.fitBounds(L.latLngBounds(bounds), {
        padding: [50, 50],
        maxZoom: 5,
      })
    }
  }

  const handleLocate = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        map.flyTo([latitude, longitude], 10, { duration: 1 })
      },
      () => {
        // Silently handle denied/unavailable
      }
    )
  }

  if (hidden) return null

  return (
    <div className="absolute bottom-6 right-4 z-[1000] flex flex-col gap-2">
      {/* Locate Me */}
      {hasGeolocation && (
        <div className="rounded-xl border border-white/10 bg-[#282828]/90 backdrop-blur-sm">
          <ControlButton onClick={handleLocate} label="Locate me">
            <LocateFixed className="size-[18px]" />
          </ControlButton>
        </div>
      )}

      {/* Fit All */}
      <div className="rounded-xl border border-white/10 bg-[#282828]/90 backdrop-blur-sm">
        <ControlButton onClick={handleFitAll} label="Fit all locations">
          <Maximize className="size-[18px]" />
        </ControlButton>
      </div>

      {/* Zoom In / Out pill */}
      <div className="flex flex-col divide-y divide-white/10 rounded-xl border border-white/10 bg-[#282828]/90 backdrop-blur-sm">
        <ControlButton onClick={handleZoomIn} label="Zoom in">
          <Plus className="size-[18px]" />
        </ControlButton>
        <ControlButton onClick={handleZoomOut} label="Zoom out">
          <Minus className="size-[18px]" />
        </ControlButton>
      </div>
    </div>
  )
}
