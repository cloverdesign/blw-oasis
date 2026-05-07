import Link from "next/link"
import { MapPin } from "lucide-react"
import { Instagram } from "iconoir-react"
import { urlFor } from "@/sanity/lib/image"
import { Button } from "@/components/ui/button"
import { getCitySubtitle } from "@/lib/utils"
import type { Location } from "@/sanity/lib/queries/locations"

export function ChurchCard({ location }: { location: Location }) {
    const imageUrl = location.image?.asset
        ? urlFor(location.image.asset).width(600).height(800).url()
        : null
    const mapHref = `/locations?type=${location.type}&id=${encodeURIComponent(location._id)}`
    const subtitle = location.subtitle ?? getCitySubtitle(location.address)

    return (
        <div
            className="bg-primary rounded-2xl relative overflow-hidden min-h-[400px] lg:min-h-[500px] flex flex-col justify-end p-4"
            style={
                imageUrl
                    ? {
                          backgroundImage: `url(${imageUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                      }
                    : undefined
            }
        >
            {!imageUrl && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="63"
                    height="76"
                    viewBox="0 0 63 76"
                    fill="none"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    <g clipPath="url(#clip0_church)">
                        <path
                            d="M29.0722 72.9103C41.8693 72.9924 61.155 53.0545 53.9116 33.4078C51.6229 27.2061 45.5648 24.0192 39.113 25.2784C34.6627 26.1479 30.6883 28.5597 28.7441 32.9279C26.5867 28.7155 22.928 25.9552 18.8469 25.1389C14.0727 24.1874 9.5814 25.7009 6.09504 28.896C2.32976 32.3455 0.76705 37.0992 -0.0778809 42.0088C0.192825 26.5663 9.86031 13.0515 25.8525 11.9482C41.0776 10.8982 54.5227 20.8856 58.247 35.6226C57.7753 26.5294 52.9272 18.5353 45.8847 13.1828C36.9022 6.35768 25.6269 4.72114 14.774 8.43309C25.7992 0.447262 41.0038 2.05919 50.6057 11.5257C65.1295 25.8485 65.7857 50.0808 51.9428 65.4003C47.8125 69.9695 42.7306 73.3 36.6561 74.469C26.0288 76.5157 14.9873 72.3115 8.37553 63.9524C2.98192 57.1397 3.55204 47.7183 9.95875 41.9678C13.3754 38.9039 18.404 38.6742 22.161 41.1311C25.5079 43.3214 27.2101 47.2015 26.1765 51.1349C24.3267 48.8995 21.7427 48.1613 19.1135 48.756C16.4844 49.3507 14.651 51.463 13.9947 54.285C11.8865 63.3003 19.9462 72.8447 29.0722 72.9062V72.9103ZM22.8378 44.2524C22.2185 42.8333 20.8403 41.8202 19.2079 41.3731C14.9053 40.1918 10.0572 42.2426 8.42885 46.5657C12.4566 42.8538 17.8954 42.017 22.8378 44.2524Z"
                            fill="#4CB1FE"
                        />
                        <path
                            d="M23.6909 70.4945C18.043 67.9023 14.1629 60.6875 16.8987 55.1052C17.637 53.5959 19.0069 52.4597 20.4096 52.2013C22.0585 51.8978 23.6663 52.755 24.8107 53.8912C22.28 54.3505 20.5942 55.8189 20.0446 58.1773C18.9987 62.6522 20.705 66.9712 23.6909 70.4986V70.4945Z"
                            fill="#4CB1FE"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_church">
                            <rect width="62.3444" height="75.0594" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            )}

            <div className="flex w-fit max-w-md flex-col gap-3 rounded-2xl bg-background p-4 text-foreground">
                <div className="flex flex-col gap-1">
                    <h3 className="font-heading text-lg">{location.name}</h3>
                    {subtitle && (
                        <p className="text-sm capitalize text-muted-foreground">{subtitle}</p>
                    )}
                </div>
                {location.address && (
                    <p className="text-sm text-muted-foreground">{location.address}</p>
                )}
                <div className="flex items-center gap-2">
                    {location.instagram && (
                        <Button variant="primary" size="sm" asChild>
                            <a
                                href={location.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Connect with ${location.name} on Instagram`}
                            >
                                <Instagram className="size-4" aria-hidden />
                                Tap to Connect
                            </a>
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`View ${location.name} on map`}
                        asChild
                    >
                        <Link href={mapHref}>
                            <MapPin className="size-4" aria-hidden />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
