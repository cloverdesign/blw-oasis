"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import type { Map as LeafletMap } from "leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { Location } from "@/sanity/lib/queries/locations"
import { createLocationIcon } from "./location-marker"
import { createClusterIcon } from "./cluster-icon"
import { MapControls } from "./map-controls"
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
  showLoadingOverlay?: boolean
  scrollWheelZoom?: boolean
  enableClustering?: boolean
  showControls?: boolean
  controlsHidden?: boolean
}

interface WithCoordinates {
  coordinates: { lat: number; lng: number }
}

function FitBounds({ locations }: { locations: Location[] }) {
  const map = useMap()
  const locationsRef = useRef(locations)
  locationsRef.current = locations

  useEffect(() => {
    const coords = (locationsRef.current as WithCoordinates[])
      .filter((l): l is WithCoordinates => l.coordinates != null)
      .map((l) => [l.coordinates.lat, l.coordinates.lng] as [number, number])

    if (coords.length > 0) {
      map.fitBounds(L.latLngBounds(coords), {
        padding: [50, 50],
        maxZoom: 5,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map])

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
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
      if (reducedMotion) {
        map.setView([lat, lng], map.getZoom())
      } else {
        map.flyTo([lat, lng], map.getZoom(), { duration: 0.5 })
      }
    }
  }, [selectedId, locations, map])

  return null
}

function LocationTooltip({ location }: { location: Location }) {
  return (
    <Tooltip
      direction="top"
      offset={[0, -14]}
      className="map-tooltip"
    >
      <div className="flex flex-col gap-0.5">
        <span className="font-heading text-xs font-semibold uppercase tracking-wide">
          {location.name}
        </span>
        <span className="text-[10px] capitalize text-neutral-400">
          {location.type === "church" ? "Church" : "Campus Fellowship"}
        </span>
        {location.address && (
          <span className="mt-0.5 max-w-[200px] text-[10px] leading-tight text-neutral-400">
            {location.address}
          </span>
        )}
      </div>
    </Tooltip>
  )
}

export function MapView({
  locations,
  interactive = true,
  selectedId = null,
  onMarkerClick,
  filteredLocationIds,
  showLoadingOverlay = true,
  scrollWheelZoom = false,
  enableClustering = false,
  showControls = false,
  controlsHidden = false,
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
      minZoom={2}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      maxBoundsViscosity={1.0}
      className="size-full"
      style={{ backgroundColor: "#262626" }}
      scrollWheelZoom={scrollWheelZoom}
      zoomControl={showControls ? false : interactive}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        noWrap={true}
        eventHandlers={{
          load: () => setTilesLoaded(true),
        }}
      />

      <FitBounds locations={allLocationsWithCoords} />

      {!interactive && <DisableInteractions />}

      {interactive && selectedId && (
        <FlyToSelected locations={locations} selectedId={selectedId} />
      )}

      {enableClustering ? (
        <MarkerClusterGroup
          iconCreateFunction={createClusterIcon}
          maxClusterRadius={50}
          spiderfyOnMaxZoom
          chunkedLoading
        >
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
              >
                <LocationTooltip location={location} />
              </Marker>
            )
          })}
        </MarkerClusterGroup>
      ) : (
        visibleLocations.map((location) => {
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
            >
              <LocationTooltip location={location} />
            </Marker>
          )
        })
      )}

      {showControls && <MapControls hidden={controlsHidden} />}

      {showLoadingOverlay && (
        <div
          className={`absolute inset-0 z-1000 flex items-center justify-center rounded-3xl transition-opacity duration-300 ${tilesLoaded ? "pointer-events-none opacity-0" : ""
            }`}
          aria-hidden
        >
          <MapLoadingPlaceholder className="absolute inset-0 rounded-3xl" />
        </div>
      )}
    </MapContainer>
  )
}
