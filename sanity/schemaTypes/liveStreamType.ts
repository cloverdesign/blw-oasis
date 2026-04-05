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
      description: 'Toggle this on to show the live stream section on the Watch page.',
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
      description: 'Paste the full embed HTML here (e.g. an <iframe> from YouTube, Vimeo, Facebook, etc.).',
      rows: 6,
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
