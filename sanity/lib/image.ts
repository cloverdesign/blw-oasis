import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

export const optimizedImageUrl = (
  source: SanityImageSource,
  width?: number,
  height?: number,
) => {
  let img = builder.image(source).format('webp').auto('format').quality(80)
  if (width) img = img.width(width)
  if (height) img = img.height(height)
  return img.url()
}
