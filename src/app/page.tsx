'use client'

import { ArtworkCard } from '@/components/elements/artwork-card'
import { ArtworkModal } from '@/components/elements/artwork-modal'
import { ButtonLink } from '@/components/elements/button'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { GalleryGrid } from '@/components/sections/gallery-grid'
import { HeroSimpleCentered } from '@/components/sections/hero-simple-centered'
import { useState } from 'react'

// Sample artwork data - replace with real artwork information
const artworks = [
  {
    id: '1',
    title: 'Sunset Dreams',
    medium: 'Oil on Canvas',
    dimensions: '24" x 36"',
    year: '2024',
    price: '$1,200',
    description:
      'A vibrant exploration of color and light, capturing the ephemeral beauty of a coastal sunset. This piece was inspired by walks along the Pacific shoreline.',
    sold: false,
  },
  {
    id: '2',
    title: 'Mountain Reflection',
    medium: 'Acrylic on Canvas',
    dimensions: '30" x 40"',
    year: '2023',
    price: '$1,500',
    description:
      'This serene landscape depicts the stillness of alpine lakes. The mirror-like reflection creates a meditative quality that invites contemplation.',
    sold: false,
  },
  {
    id: '3',
    title: 'Urban Poetry',
    medium: 'Mixed Media',
    dimensions: '18" x 24"',
    year: '2024',
    description:
      'A dynamic composition exploring the rhythm and energy of city life through layered textures and bold geometric forms.',
    sold: true,
  },
  {
    id: '4',
    title: 'Garden Dance',
    medium: 'Watercolor',
    dimensions: '16" x 20"',
    year: '2023',
    price: '$800',
    description:
      'Delicate florals captured in fluid watercolor washes. This piece celebrates the organic movement and vibrant colors found in nature.',
    sold: false,
  },
  {
    id: '5',
    title: 'Abstract Horizons',
    medium: 'Oil on Canvas',
    dimensions: '36" x 48"',
    year: '2024',
    price: '$2,000',
    description:
      'A bold exploration of form and color, this abstract piece evokes the vastness of open landscapes while maintaining an intimate emotional connection.',
    sold: false,
  },
  {
    id: '6',
    title: 'Winter Silence',
    medium: 'Oil on Canvas',
    dimensions: '24" x 30"',
    year: '2023',
    price: '$1,300',
    description:
      'The quietude of a winter landscape rendered in subtle tones. This work captures the peaceful solitude found in cold, clear mornings.',
    sold: false,
  },
]

export default function Page() {
  const [selectedArtwork, setSelectedArtwork] = useState<(typeof artworks)[0] | null>(null)

  return (
    <>
      {/* Hero */}
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

      {/* Gallery */}
      <GalleryGrid
        id="gallery"
        eyebrow="Portfolio"
        headline="Original Works"
        subheadline={<p>Original artwork available for purchase and commission</p>}
      >
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            image={
              <div className="flex size-full items-center justify-center bg-gradient-to-br from-olive-200 to-olive-400 dark:from-olive-800 dark:to-olive-950">
                <span className="text-sm text-olive-700 dark:text-olive-300">Art Image Here</span>
              </div>
            }
            title={artwork.title}
            medium={artwork.medium}
            dimensions={artwork.dimensions}
            price={artwork.price}
            year={artwork.year}
            sold={artwork.sold}
            onClick={() => setSelectedArtwork(artwork)}
          />
        ))}
      </GalleryGrid>

      {/* Call To Action */}
      <CallToActionSimpleCentered
        id="contact-cta"
        headline="Interested in a piece or commissioning custom artwork?"
        subheadline={
          <p>
            Whether you're a collector, gallery owner, or looking for a custom piece for your space, I'd love to hear
            from you.
          </p>
        }
        cta={
          <ButtonLink href="/contact" size="lg">
            Contact Me
          </ButtonLink>
        }
      />

      {/* Artwork Modal */}
      {selectedArtwork && (
        <ArtworkModal
          isOpen={!!selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          image={
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-olive-200 to-olive-400 dark:from-olive-800 dark:to-olive-950">
              <span className="text-sm text-olive-700 dark:text-olive-300">Art Image Here</span>
            </div>
          }
          title={selectedArtwork.title}
          medium={selectedArtwork.medium}
          dimensions={selectedArtwork.dimensions}
          price={selectedArtwork.price}
          year={selectedArtwork.year}
          description={selectedArtwork.description}
          sold={selectedArtwork.sold}
        />
      )}
    </>
  )
}
