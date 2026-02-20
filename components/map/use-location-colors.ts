export interface LocationColor {
  bg: string
  icon: string
}

const COLORS: LocationColor[] = [
  { bg: '#60a5fa', icon: '#bfdbfe' }, // blue-400 / blue-200
  { bg: '#4ade80', icon: '#bbf7d0' }, // green-400 / green-200
  { bg: '#fb923c', icon: '#fed7aa' }, // orange-400 / orange-200
  { bg: '#f472b6', icon: '#fbcfe8' }, // pink-400 / pink-200
  { bg: '#a78bfa', icon: '#ddd6fe' }, // violet-400 / violet-200
]

function djb2Hash(str: string): number {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i)
  }
  return hash >>> 0
}

export function getLocationColor(id: string): LocationColor {
  return COLORS[djb2Hash(id) % COLORS.length]
}
