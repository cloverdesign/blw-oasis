"use client"

import { forwardRef } from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import { ArrowUpRight, ChurchSide, FavouriteBook } from "iconoir-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { urlFor } from "@/sanity/lib/image"
import type { Location } from "@/sanity/lib/queries/locations"
import { getLocationColor } from "./use-location-colors"
import { CompassIcon } from "@phosphor-icons/react/dist/ssr"

interface LocationCardProps {
  location: Location
  isSelected?: boolean
  onClick?: () => void
}

export const LocationCard = forwardRef<HTMLDivElement, LocationCardProps>(
  function LocationCard({ location, isSelected, onClick }, ref) {
    const color = getLocationColor(location._id)
    const isChurch = location.type === "church"

    const imageUrl = location.image?.asset
      ? urlFor(location.image.asset).width(120).height(120).url()
      : null

    const directionsUrl =
      location.coordinates
        ? `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`
        : null

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          "flex gap-4 rounded-2xl border p-4 transition-all cursor-pointer",
          isSelected
            ? "border-white/20 bg-white/10"
            : "border-transparent hover:bg-white/5"
        )}
      >
        {/* Avatar */}
        <div className="relative size-14">
          <div
            className="size-full overflow-hidden rounded-full"
            style={{ border: `3px solid ${color.bg}` }}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={location.image?.alt || location.name}
                width={56}
                height={56}
                className="size-full object-cover"
              />
            ) : (
              <div
                className="flex size-full items-center justify-center text-xs font-bold text-white"
                style={{ background: color.icon }}
              >
                {location.name.charAt(0)}
              </div>
            )}
          </div>

          <div
            className="absolute bottom-0 right-0 flex p-1 items-center justify-center rounded-full"
            style={{ background: color.bg }}
          >
            {isChurch ? (
              <ChurchSide color={color.icon} className="size-4" />
            ) : (
              <FavouriteBook color={color.icon} className="size-4" />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h3 className="font-heading text-sm uppercase tracking-wide">
            {location.name}
          </h3>

          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            {location.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="size-3 shrink-0" />
                {location.phone}
              </span>
            )}
            {location.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="size-3 shrink-0" />
                {location.email}
              </span>
            )}
            {location.address && (
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3 shrink-0" />
                <span className="break-words">{location.address}</span>
              </span>
            )}
          </div>

          {(location.linkUrl || directionsUrl) && (
            <div className="flex flex-wrap gap-2 pt-1">
              {location.linkUrl && (
                <a
                  href={location.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white px-3 text-xs font-medium text-black"
                >
                  <ArrowUpRight className="size-3 shrink-0" />
                  Website
                </a>
              )}
              {directionsUrl && (
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex h-8 items-center gap-1.5 rounded-full bg-primary px-3 text-xs font-medium text-primary-foreground"
                >
                  <CompassIcon className="size-3 shrink-0" />
                  Directions
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)
