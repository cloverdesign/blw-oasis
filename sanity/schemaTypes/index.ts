import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {locationType} from './locationType'
import {eventType} from './eventType'
import {videoType} from './videoType'
import {highlightReelType} from './highlightReelType'
import {siteSettingsType} from './siteSettingsType'
import {leaderType} from './leaderType'
import {homePageImagesType} from './homePageImagesType'
import {aboutPageImagesType} from './aboutPageImagesType'
import {givePageImagesType} from './givePageImagesType'
import {contactPageImagesType} from './contactPageImagesType'
import {resourcesPageImagesType} from './resourcesPageImagesType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    locationType,
    eventType,
    videoType,
    highlightReelType,
    siteSettingsType,
    leaderType,
    homePageImagesType,
    aboutPageImagesType,
    givePageImagesType,
    contactPageImagesType,
    resourcesPageImagesType,
  ],
}
