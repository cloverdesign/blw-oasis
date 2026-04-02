import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

const imageWithAlt = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        type: 'string',
        title: 'Alt text',
      }),
    ],
  })

export const resourcesPageImagesType = defineType({
  name: 'resourcesPageImages',
  title: 'Resources Page Images',
  type: 'document',
  icon: ImageIcon,
  fields: [
    imageWithAlt('heroImage', 'Hero Image'),
    imageWithAlt('rhapsodyImage1', 'Rhapsody Image 1'),
    imageWithAlt('rhapsodyImage2', 'Rhapsody Image 2'),
    imageWithAlt('foundationImage', 'Foundation School Image'),
  ],
  preview: {
    prepare() {
      return { title: 'Resources Page Images' }
    },
  },
})
