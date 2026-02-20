export function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  return null
}

export function getYouTubeEmbedUrl(url: string): string | null {
  const videoId = getYouTubeVideoId(url)
  if (!videoId) return null
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`
}

export function getYouTubeThumbnailUrl(url: string): string {
  const videoId = getYouTubeVideoId(url)
  if (!videoId) return ''
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

type LiveCheckResult = {
  isLive: boolean
  videoId: string | null
  title: string | null
  thumbnail: string | null
}

export async function checkChannelLive(
  channelId: string,
  apiKey: string
): Promise<LiveCheckResult> {
  const url = new URL('https://www.googleapis.com/youtube/v3/search')
  url.searchParams.set('part', 'snippet')
  url.searchParams.set('channelId', channelId)
  url.searchParams.set('eventType', 'live')
  url.searchParams.set('type', 'video')
  url.searchParams.set('key', apiKey)

  const res = await fetch(url.toString(), { next: { revalidate: 60 } })

  if (!res.ok) {
    return { isLive: false, videoId: null, title: null, thumbnail: null }
  }

  const data = await res.json()

  if (!data.items || data.items.length === 0) {
    return { isLive: false, videoId: null, title: null, thumbnail: null }
  }

  const item = data.items[0]

  return {
    isLive: true,
    videoId: item.id?.videoId ?? null,
    title: item.snippet?.title ?? null,
    thumbnail:
      item.snippet?.thumbnails?.high?.url ??
      item.snippet?.thumbnails?.default?.url ??
      null,
  }
}

export async function getLiveStatus(): Promise<LiveCheckResult> {
  const apiKey = process.env.YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID

  if (!apiKey || !channelId) {
    return { isLive: false, videoId: null, title: null, thumbnail: null }
  }

  return checkChannelLive(channelId, apiKey)
}
