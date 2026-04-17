import L from "leaflet"

interface ClusterLike {
  getChildCount: () => number
  getAllChildMarkers: () => Array<{
    getIcon: () => { options: { html?: string } }
  }>
}

/**
 * Extract background colors from child marker icon HTML and count occurrences.
 * Each marker's DivIcon contains an inline `background: #hexcolor` style.
 */
function getChildColorCounts(cluster: ClusterLike): Map<string, number> {
  const counts = new Map<string, number>()
  for (const marker of cluster.getAllChildMarkers()) {
    const html = marker.getIcon()?.options?.html ?? ""
    const match = html.match(/background:\s*(#[0-9a-fA-F]{6})/)
    if (match) {
      counts.set(match[1], (counts.get(match[1]) || 0) + 1)
    }
  }
  return counts
}

/**
 * Build a conic-gradient string with proportional color segments.
 */
function buildConicGradient(colorCounts: Map<string, number>, total: number): string {
  if (colorCounts.size === 0) return "rgba(255,255,255,0.15)"

  const segments: string[] = []
  let offset = 0
  for (const [color, count] of colorCounts) {
    const pct = (count / total) * 100
    segments.push(`${color} ${offset.toFixed(1)}% ${(offset + pct).toFixed(1)}%`)
    offset += pct
  }
  return `conic-gradient(${segments.join(", ")})`
}

export function createClusterIcon(cluster: ClusterLike) {
  const count = cluster.getChildCount()

  let size: number
  if (count < 10) size = 36
  else if (count < 50) size = 44
  else size = 52

  const colorCounts = getChildColorCounts(cluster)
  const gradient = buildConicGradient(colorCounts, count)
  const ringWidth = 3
  const innerSize = size - ringWidth * 2

  return L.divIcon({
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${gradient};
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    ">
      <div style="
        width: ${innerSize}px;
        height: ${innerSize}px;
        border-radius: 50%;
        background: rgba(23, 23, 23, 0.9);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: ${size < 40 ? 13 : 14}px;
        font-weight: 600;
      ">${count}</div>
    </div>`,
    className: "marker-cluster-custom",
    iconSize: L.point(size, size),
  })
}
