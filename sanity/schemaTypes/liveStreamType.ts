import { PlayIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const liveStreamType = defineType({
  name: 'liveStream',
  title: 'Live Stream',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'isEnabled',
      title: 'Enable Live Stream',
      type: 'boolean',
      description: 'When ON, Watch shows the live player (or Live Placeholder if embed is missing). When OFF, Watch shows the Offline Placeholder.',
      initialValue: false,
    }),
    defineField({
      name: 'title',
      title: 'Stream Title',
      type: 'string',
      description: 'Optional title shown below the stream (e.g. "Sunday Service — Live").',
    }),
    defineField({
      name: 'embedCode',
      title: 'Embed Code',
      type: 'text',
      description: 'Paste the YouTube URL or iframe embed code. If this is empty/invalid while enabled, the Live Placeholder image is shown.',
      rows: 6,
    }),
    defineField({
      name: 'livePlaceholder',
      title: 'Live Placeholder',
      type: 'object',
      description: 'Fallback visual shown only when livestream is enabled but no playable stream can be rendered.',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          description: 'Recommended: 16:9 image (e.g. 1920x1080).',
          options: { hotspot: true },
        }),
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the fallback visual for screen readers.',
          validation: (Rule) => Rule.max(120),
        }),
      ],
    }),
    defineField({
      name: 'offlinePlaceholder',
      title: 'Offline Placeholder',
      type: 'object',
      description: 'Visual shown when livestream is not currently live (Enable Live Stream is OFF).',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          description: 'Recommended: 16:9 image (e.g. 1920x1080).',
          options: { hotspot: true },
        }),
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the offline visual for screen readers.',
          validation: (Rule) => Rule.max(120),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      enabled: 'isEnabled',
    },
    prepare({ enabled }) {
      return {
        title: 'Live Stream',
        subtitle: enabled ? '🔴 Live' : 'Off',
      }
    },
  },
})
