import L from 'leaflet'
import { renderToString } from 'react-dom/server'
import type { Location } from '@/sanity/lib/queries/locations'
import { getLocationColor } from './use-location-colors'
import { ChurchSide, FavouriteBook } from 'iconoir-react'

function MarkerSvg({ location }: { location: Location }) {
  const color = getLocationColor(location._id)
  const isChurch = location.type === 'church'

  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: color.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        border: '2px solid rgba(255,255,255,0.3)',
      }}
    >
      {isChurch ? (
        <ChurchSide color={color.icon} width={20} height={20} />
      ) : (
        <FavouriteBook color={color.icon} width={20} height={20} />
      )}
    </div>
  )
}

export function createLocationIcon(location: Location): L.DivIcon {
  const html = renderToString(<MarkerSvg location={location} />)
  return L.divIcon({
    html,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  })
}
