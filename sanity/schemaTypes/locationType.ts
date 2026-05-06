import { PinIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { AddressInput } from '../components/AddressInput'

export const locationType = defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g. New York, Georgia',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Church', value: 'church' },
          { title: 'Campus', value: 'campus' },
        ],
        layout: 'radio',
      },
      initialValue: 'church',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      description: 'Type an address to auto-fill coordinates',
      components: {
        input: AddressInput,
      },
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Short location label shown under the title (e.g., "Baltimore, MD"). Leave blank to auto-derive from the address.',
      hidden: ({ parent }) => parent?.type !== 'church',
    }),
    defineField({
      name: 'universities',
      title: 'Universities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of universities for this campus',
      hidden: ({ parent }) => parent?.type !== 'campus',
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint',
      description: 'Auto-filled from address, or set manually',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'linkUrl',
      title: 'Link URL',
      type: 'url',
      description: 'Optional external link for the arrow button',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      description: 'Full Instagram profile URL (e.g. https://instagram.com/blwoasis). Powers the "Tap to Connect" button on campus cards.',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }).custom((value) => {
          if (!value) return true
          try {
            return /(?:^|\.)instagram\.com$/i.test(new URL(value).hostname) || 'Must be an instagram.com URL'
          } catch {
            return 'Must be a valid URL'
          }
        }),
    }),
  ],
  preview: {
    select: { name: 'name', address: 'address', type: 'type' },
    prepare({ name, address, type }) {
      return {
        title: name,
        subtitle: `${type === 'campus' ? 'Campus' : 'Church'} ${address ? `- ${address}` : ''}`,
        media: PinIcon,
      }
    },
  },
})
