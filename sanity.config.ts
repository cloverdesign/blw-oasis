'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/cms/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'
import {theme} from './sanity/theme'
import {StudioLogo} from './sanity/components/StudioLogo'
import {BackToSiteNavbar} from './sanity/components/BackToSiteNavbar'

export default defineConfig({
  basePath: '/cms',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  theme,
  icon: StudioLogo,
  studio: {
    components: {
      navbar: BackToSiteNavbar,
    },
  },
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
