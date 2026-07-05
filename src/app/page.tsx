'use client'

import { ArtworkCard } from '@/components/elements/artwork-card'
import { ArtworkModal } from '@/components/elements/artwork-modal'
import { ButtonLink } from '@/components/elements/button'
import { FadeIn } from '@/components/elements/fade-in'
import { Main } from '@/components/elements/main'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { GalleryGrid } from '@/components/sections/gallery-grid'
import { HeroSimpleCentered } from '@/components/sections/hero-simple-centered'
import { useState } from 'react'

const artworks = [
  {
    id: '9',
    title: 'The Woman',
    medium: 'Acrylic on Canvas',
    dimensions: '31.5" x 47.5"',
    image: '/The Woman.jpeg',
    displayWidth: 31.5,
    displayHeight: 47.5,
    sold: false,
  },
  {
    id: '8',
    title: 'The Man',
    medium: 'Acrylic on Canvas',
    dimensions: '31.5" x 47.5"',
    image: '/The Man.jpeg',
    displayWidth: 31.5,
    displayHeight: 47.5,
    sold: false,
  },
  {
    id: '7',
    title: 'Colorful Winds',
    medium: 'Acrylic on Canvas',
    dimensions: '24" x 48"',
    image: '/Colorful Winds.jpeg',
    displayWidth: 24,
    displayHeight: 48,
    sold: false,
  },
  {
    id: '6',
    title: 'Aurora',
    medium: 'Acrylic on Canvas',
    dimensions: '24" x 48"',
    image: '/Aurora.jpeg',
    displayWidth: 24,
    displayHeight: 48,
    sold: false,
  },
  {
    id: '4',
    title: 'Ocean Ballet',
    medium: 'Acrylic on Canvas',
    dimensions: '48" x 60"',
    image: '/Ocean Ballet.jpg',
    displayWidth: 60,
    displayHeight: 48,
    sold: false,
  },
  {
    id: '5',
    title: 'Musical Falls',
    medium: 'Acrylic on Canvas',
    dimensions: '36" x 48"',
    image: '/Musical Falls.jpg',
    displayWidth: 36,
    displayHeight: 48,
    sold: false,
  },
  {
    id: '10',
    title: 'Sunset in the Mountains',
    medium: 'Acrylic on Canvas',
    dimensions: '48" x 36"',
    image: '/Sunset in the Mountains.jpeg',
    displayWidth: 48,
    displayHeight: 36,
    sold: false,
  },
  {
    id: '1',
    title: 'Somewhere in La Mancha',
    medium: 'Acrylic on Canvas',
    dimensions: '72" x 48"',
    image: '/Somewhere in La Mancha.jpeg',
    displayWidth: 72,
    displayHeight: 48,
    sold: false,
  },
  {
    id: '2',
    title: 'Song of the Pear',
    medium: 'Acrylic on Canvas',
    dimensions: '31.5" x 47.5"',
    image: '/Song of the Pear.jpg',
    displayWidth: 31.5,
    displayHeight: 47.5,
    sold: false,
  },
  /*{
    id: '1',
    title: 'Somewhere in La Mancha',
    medium: 'Acrylic on Canvas',
    dimensions: '48" x 72"',
    image: '/Somewhere in La Mancha.jpg',
    sold: false,
  },*/
]

const largestArtworkSide = 40
const threeAcrossArtworkIds = new Set(['4', '5', '10'])
const fullRowArtworkIds = new Set(['1'])

export default function Page() {
  const [selectedArtwork, setSelectedArtwork] = useState<(typeof artworks)[0] | null>(null)

  return (
    <>
      <Navbar />
      <Main>
        {/* Hero */}
        <FadeIn>
          <HeroSimpleCentered
            id="hero"
            className="flex min-h-[22vh] items-center pt-10 pb-14 sm:min-h-[24vh] sm:pt-12 sm:pb-16 lg:min-h-[26vh] lg:pt-14 lg:pb-20"
            headline="Hang an original Aranés."
            subheadline={<p>A timeless piece that speaks without words.</p>}
            cta={
              <div className="flex items-center gap-4">
                {/*<ButtonLink href="#gallery" size="lg">
                  View Gallery
                </ButtonLink>
                <ButtonLink href="/gallery-masonry" size="lg" color="light">
                  View Masonry Style
                </ButtonLink>*/}
              </div>
            }
          />
        </FadeIn>

        {/* Gallery */}
        <GalleryGrid
          id="gallery"
          className="pt-4 pb-16 sm:pt-6 lg:pt-8"
          eyebrow="Portfolio"
          headline="Original Works"
          subheadline={<p>Original artworks available through gallery representation</p>}
          headerFadeIn
        >
          {artworks.map((artwork, index) => (
            <FadeIn
              key={artwork.id}
              delay={index * 0.1}
              className={
                fullRowArtworkIds.has(artwork.id)
                  ? 'md:col-span-6'
                  : threeAcrossArtworkIds.has(artwork.id)
                    ? 'md:col-span-2'
                    : 'md:col-span-3'
              }
            >
              <ArtworkCard
                image={<img src={artwork.image} alt={artwork.title} />}
                title={artwork.title}
                medium={artwork.medium}
                dimensions={artwork.dimensions}
                displayWidth={artwork.displayWidth}
                displayHeight={artwork.displayHeight}
                displayMaxSide={largestArtworkSide}
                sold={artwork.sold}
                onClick={() => setSelectedArtwork(artwork)}
              />
            </FadeIn>
          ))}
        </GalleryGrid>

        {/* Call To Action */}
        <FadeIn>
          <CallToActionSimpleCentered
            id="contact-cta"
            headline="Interested in a piece for your gallery?"
            subheadline={
              <p>
                Gallery owners, I&apos;d love to hear from you.
              </p>
            }
            cta={
              <ButtonLink href="/contact" size="lg">
                Contact Me
              </ButtonLink>
            }
          />
        </FadeIn>
      </Main>
      <Footer />

      {/* Artwork Modal */}
      {selectedArtwork && (
        <ArtworkModal
          isOpen={!!selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          image={<img src={selectedArtwork.image} alt={selectedArtwork.title} />}
          title={selectedArtwork.title}
          medium={selectedArtwork.medium}
          dimensions={selectedArtwork.dimensions}
          sold={selectedArtwork.sold}
        />
      )}
    </>
  )
}
