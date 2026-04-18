"use client"

import { useEffect, useRef, useState } from "react"
import { StaticMapSection } from "@/components/home/static-map-section"
import { LocationMap } from "@/components/map/location-map"
import { MapLoadingPlaceholder } from "@/components/map/map-loading-placeholder"
import type { Location } from "@/sanity/lib/queries/locations"
import type { SiteSettings } from "@/sanity/lib/queries/siteSettings"

const ROOT_MARGIN = "400px 0px"

interface DeferredHomeMapProps {
  locations: Location[]
  siteSettings: SiteSettings | null
}

export function DeferredHomeMap({ locations, siteSettings }: DeferredHomeMapProps) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [loadMap, setLoadMap] = useState(false)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoadMap(true)
          observer.disconnect()
        }
      },
      { root: null, rootMargin: ROOT_MARGIN, threshold: 0 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="px-4 lg:px-10">
      <StaticMapSection siteSettings={siteSettings}>
        <div ref={sentinelRef} className="relative size-full min-h-0">
          {loadMap ? (
            <LocationMap
              locations={locations}
              mode="interactive"
              enableClustering
              showControls
            />
          ) : (
            <MapLoadingPlaceholder className="size-full" />
          )}
        </div>
      </StaticMapSection>
    </div>
  )
}
