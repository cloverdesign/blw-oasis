"use client"

import { useEffect, useMemo, useState } from "react"
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet"
import type { Map as LeafletMap } from "leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { Location } from "@/sanity/lib/queries/locations"
import { createLocationIcon } from "./location-marker"
import { MapLoadingPlaceholder } from "./map-loading-placeholder"

/** Leaflet map extended with optional tap handler (from plugins) */
type MapWithTap = LeafletMap & {
  tap?: { disable: () => void; enable: () => void }
}

interface MapViewProps {
  locations: Location[]
  interactive?: boolean
  selectedId?: string | null
  onMarkerClick?: (id: string) => void
  filteredLocationIds?: string[]
}

interface WithCoordinates {
  coordinates: { lat: number; lng: number }
}

function FitBounds({ locations }: { locations: Location[] }) {
  const map = useMap()

  useEffect(() => {
    const coords = (locations as WithCoordinates[])
      .filter((l): l is WithCoordinates => l.coordinates != null)
      .map((l) => [l.coordinates.lat, l.coordinates.lng] as [number, number])

    if (coords.length > 0) {
      map.fitBounds(L.latLngBounds(coords), {
        padding: [50, 50],
        maxZoom: 5,
      })
    }
  }, [locations, map])

  return null
}

function DisableInteractions() {
  const map = useMap() as MapWithTap

  useEffect(() => {
    map.dragging.disable()
    map.touchZoom.disable()
    map.doubleClickZoom.disable()
    map.scrollWheelZoom.disable()
    map.boxZoom.disable()
    map.keyboard.disable()
    map.tap?.disable()
    map.zoomControl?.remove()

    return () => {
      map.dragging.enable()
      map.touchZoom.enable()
      map.doubleClickZoom.enable()
      map.scrollWheelZoom.enable()
      map.boxZoom.enable()
      map.keyboard.enable()
      map.tap?.enable()
    }
  }, [map])

  return null
}

function FlyToSelected({
  locations,
  selectedId,
}: {
  locations: Location[]
  selectedId: string | null
}) {
  const map = useMap()

  useEffect(() => {
    if (!selectedId) return
    const loc = locations.find((l) => l._id === selectedId)
    if (loc?.coordinates) {
      const { lat, lng } = loc.coordinates
      map.flyTo([lat, lng], map.getZoom(), { duration: 0.5 })
    }
  }, [selectedId, locations, map])

  return null
}

export function MapView({
  locations,
  interactive = true,
  selectedId = null,
  onMarkerClick,
  filteredLocationIds,
}: MapViewProps) {
  const [tilesLoaded, setTilesLoaded] = useState(false)
  const visibleLocations = useMemo(() => {
    if (!filteredLocationIds) return locations
    const idSet = new Set(filteredLocationIds)
    return locations.filter((l) => idSet.has(l._id))
  }, [locations, filteredLocationIds])

  const allLocationsWithCoords = locations.filter((l) => l.coordinates)

  return (
    <MapContainer
      center={[39.8283, -98.5795]}
      zoom={4}
      className="size-full"
      zoomControl={interactive}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        eventHandlers={{
          load: () => setTilesLoaded(true),
        }}
      />

      <FitBounds locations={allLocationsWithCoords} />

      {!interactive && <DisableInteractions />}

      {interactive && selectedId && (
        <FlyToSelected locations={locations} selectedId={selectedId} />
      )}

      {visibleLocations.map((location) => {
        if (!location.coordinates) return null
        return (
          <Marker
            key={location._id}
            position={[location.coordinates.lat, location.coordinates.lng]}
            icon={createLocationIcon(location)}
            eventHandlers={
              onMarkerClick
                ? { click: () => onMarkerClick(location._id) }
                : {}
            }
          />
        )
      })}

      <div
        className={`absolute inset-0 z-1000 flex items-center justify-center rounded-3xl transition-opacity duration-300 ${
          tilesLoaded ? "pointer-events-none opacity-0" : ""
        }`}
        aria-hidden
      >
        <MapLoadingPlaceholder className="absolute inset-0 rounded-3xl" />
      </div>
    </MapContainer>
  )
}
