import { client } from '../client'

const IMAGE_PROJECTION = '{ asset->, alt }'
const REVALIDATE = { next: { revalidate: 60 } }

export interface SanityImage {
  asset: { _id: string; url: string }
  alt?: string
}

// Home Page
export interface HomePageImages {
  heroBackground: SanityImage | null
  galleryImage1: SanityImage | null
  galleryImage2: SanityImage | null
  galleryImage3: SanityImage | null
  galleryImage4: SanityImage | null
}

export async function getHomePageImages(): Promise<HomePageImages | null> {
  return client.fetch(
    `*[_type == "homePageImages" && _id == "homePageImages"][0] {
      heroBackground ${IMAGE_PROJECTION},
      galleryImage1 ${IMAGE_PROJECTION},
      galleryImage2 ${IMAGE_PROJECTION},
      galleryImage3 ${IMAGE_PROJECTION},
      galleryImage4 ${IMAGE_PROJECTION}
    }`,
    {},
    REVALIDATE,
  )
}

// About Page
export interface AboutPageImages {
  storyImage1: SanityImage | null
  storyImage2: SanityImage | null
  storyImage3: SanityImage | null
  howWeBegan: SanityImage | null
}

export async function getAboutPageImages(): Promise<AboutPageImages | null> {
  return client.fetch(
    `*[_type == "aboutPageImages" && _id == "aboutPageImages"][0] {
      storyImage1 ${IMAGE_PROJECTION},
      storyImage2 ${IMAGE_PROJECTION},
      storyImage3 ${IMAGE_PROJECTION},
      howWeBegan ${IMAGE_PROJECTION}
    }`,
    {},
    REVALIDATE,
  )
}

// Give Page
export interface GivePageImages {
  heroImage: SanityImage | null
}

export async function getGivePageImages(): Promise<GivePageImages | null> {
  return client.fetch(
    `*[_type == "givePageImages" && _id == "givePageImages"][0] {
      heroImage ${IMAGE_PROJECTION}
    }`,
    {},
    REVALIDATE,
  )
}

// Contact Page
export interface ContactPageImages {
  heroImage: SanityImage | null
}

export async function getContactPageImages(): Promise<ContactPageImages | null> {
  return client.fetch(
    `*[_type == "contactPageImages" && _id == "contactPageImages"][0] {
      heroImage ${IMAGE_PROJECTION}
    }`,
    {},
    REVALIDATE,
  )
}

// Resources Page
export interface ResourcesPageImages {
  heroImage: SanityImage | null
  rhapsodyImage1: SanityImage | null
  rhapsodyImage2: SanityImage | null
  foundationImage: SanityImage | null
}

export async function getResourcesPageImages(): Promise<ResourcesPageImages | null> {
  return client.fetch(
    `*[_type == "resourcesPageImages" && _id == "resourcesPageImages"][0] {
      heroImage ${IMAGE_PROJECTION},
      rhapsodyImage1 ${IMAGE_PROJECTION},
      rhapsodyImage2 ${IMAGE_PROJECTION},
      foundationImage ${IMAGE_PROJECTION}
    }`,
    {},
    REVALIDATE,
  )
}
