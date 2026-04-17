import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'ctas',
      title: 'CTA Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'key',
              title: 'Button Key',
              type: 'string',
              description: 'Identifier for this button (do not change once set)',
              validation: (rule) => rule.required(),
              options: {
                list: [
                  { title: 'Home Hero — Primary', value: 'home_hero_primary' },
                  { title: 'Home Map — Primary', value: 'home_map_primary' },
                  { title: 'Home Map — Secondary', value: 'home_map_secondary' },
                  { title: 'Give — CTA', value: 'give_cta' },
                  { title: 'Resources — Rhapsody', value: 'resources_rhapsody' },
                  { title: 'Navigation — Contact', value: 'nav_contact' },
                ],
              },
            }),
            defineField({
              name: 'label',
              title: 'Button Text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link URL',
              type: 'string',
              description: 'Use relative paths for internal links (e.g. /contact) or full URLs for external links',
            }),
            defineField({
              name: 'isExternal',
              title: 'Open in new tab?',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'key' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
