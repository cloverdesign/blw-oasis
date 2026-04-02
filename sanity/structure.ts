import type {StructureResolver} from 'sanity/structure'

const SINGLETON_TYPES = ['siteSettings', 'highlightReel', 'homePageImages', 'aboutPageImages', 'givePageImages', 'contactPageImages', 'resourcesPageImages']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('location').title('Locations'),
      S.documentTypeListItem('event').title('Events'),
      S.documentTypeListItem('video').title('Videos'),
      S.documentTypeListItem('leader').title('Leaders'),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings'),
        ),
      S.listItem()
        .title('Highlight Reel')
        .child(
          S.document().schemaType('highlightReel').documentId('highlightReel'),
        ),
      S.divider(),
      S.listItem()
        .title('Page Images')
        .child(
          S.list()
            .title('Page Images')
            .items([
              S.listItem()
                .title('Home Page')
                .child(
                  S.document().schemaType('homePageImages').documentId('homePageImages'),
                ),
              S.listItem()
                .title('About Page')
                .child(
                  S.document().schemaType('aboutPageImages').documentId('aboutPageImages'),
                ),
              S.listItem()
                .title('Give Page')
                .child(
                  S.document().schemaType('givePageImages').documentId('givePageImages'),
                ),
              S.listItem()
                .title('Contact Page')
                .child(
                  S.document().schemaType('contactPageImages').documentId('contactPageImages'),
                ),
              S.listItem()
                .title('Resources Page')
                .child(
                  S.document().schemaType('resourcesPageImages').documentId('resourcesPageImages'),
                ),
            ]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['location', 'event', 'video', 'leader', ...SINGLETON_TYPES].includes(item.getId()!),
      ),
    ])
