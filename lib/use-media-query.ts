import { useSyncExternalStore } from "react"

const mqlCache = new Map<string, MediaQueryList>()

function getMql(query: string): MediaQueryList | null {
  if (typeof window === "undefined") return null
  if (!mqlCache.has(query)) {
    mqlCache.set(query, window.matchMedia(query))
  }
  return mqlCache.get(query) ?? null
}

/**
 * SSR-safe media query hook. Returns false on the server and during initial hydration before layout.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = getMql(query)
      if (!mql) return () => {}
      const handler = () => callback()
      mql.addEventListener("change", handler)
      return () => mql.removeEventListener("change", handler)
    },
    () => getMql(query)?.matches ?? false,
    () => false
  )
}
