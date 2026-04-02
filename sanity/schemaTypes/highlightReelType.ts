import { PlayIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const highlightReelType = defineType({
  name: 'highlightReel',
  title: 'Highlight Reel',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'YouTube Video URL',
      type: 'url',
      validation: (rule) =>
        rule.uri({ scheme: ['https'] }).custom((url) => {
          if (!url) return true
          if (/^https?:\/\/(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)/.test(url)) {
            return true
          }
          return 'Must be a valid YouTube URL'
        }),
    }),
    defineField({
      name: 'thumbnail',
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
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: { title: 'title', media: 'thumbnail' },
  },
})
