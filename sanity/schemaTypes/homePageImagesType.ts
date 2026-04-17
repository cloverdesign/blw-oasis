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

export const homePageImagesType = defineType({
  name: 'homePageImages',
  title: 'Home Page Images',
  type: 'document',
  icon: ImageIcon,
  fields: [
    imageWithAlt('heroBackground', 'Hero Background'),
    imageWithAlt('galleryImage1', 'Gallery Image 1'),
    imageWithAlt('galleryImage2', 'Gallery Image 2'),
    imageWithAlt('galleryImage3', 'Gallery Image 3'),
    imageWithAlt('galleryImage4', 'Gallery Image 4'),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page Images' }
    },
  },
})
