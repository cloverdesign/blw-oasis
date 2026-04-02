import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const givePageImagesType = defineType({
  name: 'givePageImages',
  title: 'Give Page Images',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Give Page Images' }
    },
  },
})
