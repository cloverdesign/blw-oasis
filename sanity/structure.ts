import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('location').title('Locations'),
      S.documentTypeListItem('event').title('Events'),
      S.documentTypeListItem('video').title('Videos'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['location', 'event', 'video'].includes(item.getId()!),
      ),
    ])
