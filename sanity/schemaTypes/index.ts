import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {locationType} from './locationType'
import {eventType} from './eventType'
import {videoType} from './videoType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, locationType, eventType, videoType],
}
