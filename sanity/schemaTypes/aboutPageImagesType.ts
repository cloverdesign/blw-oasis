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

export const aboutPageImagesType = defineType({
  name: 'aboutPageImages',
  title: 'About Page Images',
  type: 'document',
  icon: ImageIcon,
  fields: [
    imageWithAlt('storyImage1', 'Story Image 1 (Campus ministry gathering)'),
    imageWithAlt('storyImage2', 'Story Image 2 (The foundation)'),
    imageWithAlt('storyImage3', 'Story Image 3 (Students in fellowship)'),
    imageWithAlt('howWeBegan', 'How We Began Image'),
  ],
  preview: {
    prepare() {
      return { title: 'About Page Images' }
    },
  },
})
