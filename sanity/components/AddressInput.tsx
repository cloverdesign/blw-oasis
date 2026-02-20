'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { set, unset, type StringInputProps } from 'sanity'
import { useFormValue } from 'sanity'
import { useClient } from 'sanity'

interface PhotonFeature {
  type: 'Feature'
  geometry: { type: 'Point'; coordinates: [number, number] }
  properties: {
    osm_id: number
    name?: string
    housenumber?: string
    street?: string
    city?: string
    state?: string
    country?: string
    locality?: string
  }
}

interface PhotonResponse {
  type: 'FeatureCollection'
  features: PhotonFeature[]
}

function formatAddress(p: PhotonFeature['properties']) {
  const parts = []
  if (p.name) parts.push(p.name)
  if (p.housenumber && p.street) parts.push(`${p.housenumber} ${p.street}`)
  else if (p.street) parts.push(p.street)
  if (p.city) parts.push(p.city)
  else if (p.locality) parts.push(p.locality)
  if (p.state && p.state !== p.city) parts.push(p.state)
  if (p.country) parts.push(p.country)
  return [...new Set(parts)].join(', ')
}

export function AddressInput(props: StringInputProps) {
  const { value, onChange, elementProps } = props
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<PhotonFeature[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [coordError, setCoordError] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const documentId = useFormValue(['_id']) as string | undefined
  const client = useClient({ apiVersion: '2024-01-01' })

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([])
      return
    }
    setIsLoading(true)
    try {
      const url = `https://photon.komoot.io/api?q=${encodeURIComponent(q)}&limit=5`
      const res = await fetch(url)
      const data: PhotonResponse = await res.json()
      const seen = new Set<number>()
      setResults(
        data.features.filter((f) => {
          if (seen.has(f.properties.osm_id)) return false
          seen.add(f.properties.osm_id)
          return true
        })
      )
    } catch {
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    onChange(val ? set(val) : unset())
    setShowResults(true)

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => search(val), 300)
  }

  const handleSelect = async (feature: PhotonFeature) => {
    const address = formatAddress(feature.properties)
    const [lng, lat] = feature.geometry.coordinates

    setQuery(address)
    onChange(set(address))
    setShowResults(false)
    setResults([])

    setCoordError(null)
    if (documentId) {
      const cleanId = documentId.replace(/^drafts\./, '')
      try {
        await client
          .patch(`drafts.${cleanId}`)
          .set({
            coordinates: {
              _type: 'geopoint',
              lat,
              lng,
            },
          })
          .commit()
      } catch (err) {
        console.error('Failed to save coordinates:', err)
        setCoordError('Could not save coordinates. Please set them manually.')
      }
    }
  }

  useEffect(() => {
    if (value && !query) setQuery(value)
  }, [value, query])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <input
        {...elementProps}
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={() => results.length > 0 && setShowResults(true)}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid var(--card-border-color, #ccc)',
          borderRadius: '4px',
          fontSize: '14px',
          background: 'var(--card-bg-color, #fff)',
          color: 'inherit',
        }}
        placeholder="Search for an address..."
      />
      {coordError && (
        <div style={{ color: '#e53e3e', fontSize: '12px', marginTop: 4 }}>
          {coordError}
        </div>
      )}
      {isLoading && (
        <div style={{ position: 'absolute', right: 12, top: 10, fontSize: '12px', opacity: 0.5 }}>
          ...
        </div>
      )}
      {showResults && results.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 100,
            background: 'var(--card-bg-color, #fff)',
            border: '1px solid var(--card-border-color, #ccc)',
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            maxHeight: 250,
            overflowY: 'auto',
          }}
        >
          {results.map((feature) => {
            const address = formatAddress(feature.properties)
            return (
              <button
                key={feature.properties.osm_id}
                type="button"
                onClick={() => handleSelect(feature)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px 12px',
                  textAlign: 'left',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: 'inherit',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--card-shadow-outline-color, #f0f0f0)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none'
                }}
              >
                {address}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
