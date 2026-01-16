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
    id: '1',
    title: 'Somewhere in La Mancha',
    medium: 'Acrylic on Canvas',
    dimensions: '48" x 72"',
    image: '/Somewhere in La Mancha.jpg',
    sold: false,
  },
  {
    id: '2',
    title: 'Song of the Pear',
    medium: 'Acrylic on Canvas',
    dimensions: '31" x 47"',
    image: '/Song of the Pear.jpg',
    sold: false,
  },
  {
    id: '3',
    title: 'Lemon Circus',
    medium: 'Acrylic on Canvas',
    dimensions: '48" x 48"',
    image: '/Lemon Circus.jpg',
    sold: false,
  },
  {
    id: '4',
    title: 'Ocean Ballet',
    medium: 'Acrylic on Canvas',
    dimensions: '48" x 60"',
    image: '/Ocean Ballet.jpg',
    sold: false,
  },
  {
    id: '5',
    title: 'Musical Falls',
    medium: 'Acrylic on Canvas',
    dimensions: '36" x 48"',
    image: '/Musical Falls.jpg',
    sold: false,
  },
]

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
            headline="Hang an original Aranés."
            subheadline={<p>Let contemplation guide you to create your own expression.</p>}
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
          eyebrow="Portfolio"
          headline="Original Works"
          subheadline={<p>Original artwork available for purchase and commission</p>}
          headerFadeIn
        >
          {artworks.map((artwork, index) => (
            <FadeIn key={artwork.id} delay={index * 0.1}>
              <ArtworkCard
                image={<img src={artwork.image} alt={artwork.title} />}
                title={artwork.title}
                medium={artwork.medium}
                dimensions={artwork.dimensions}
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
            headline="Interested in a piece or commissioning custom artwork?"
            subheadline={
              <p>
                Whether you're a collector, gallery owner, or looking for a custom piece for your space, I'd love to
                hear from you.
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
