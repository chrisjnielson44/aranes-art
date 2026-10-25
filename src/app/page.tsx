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
import { artworks } from '@/lib/artworks'
import Image from 'next/image'
import { useState } from 'react'

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
            className="py-16 sm:py-20 lg:py-24"
            headline="Hang an original Aranés."
            subheadline={<p>A timeless piece that speaks without words.</p>}
          />
        </FadeIn>

        {/* Gallery */}
        <GalleryGrid
          id="gallery"
          className="pt-0 pb-16"
          eyebrow="Portfolio"
          headline="Original Works"
          subheadline={<p>Original artworks available through gallery representation</p>}
          headerFadeIn
        >
          {artworks.map((artwork, index) => (
            <FadeIn
              key={artwork.id}
              delay={(index % 2) * 0.08}
              className={
                fullRowArtworkIds.has(artwork.id)
                  ? 'md:col-span-6'
                  : threeAcrossArtworkIds.has(artwork.id)
                    ? 'md:col-span-2'
                    : 'md:col-span-3'
              }
            >
              <ArtworkCard
                image={
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    width={Math.round(artwork.displayWidth * 40)}
                    height={Math.round(artwork.displayHeight * 40)}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority={index < 2}
                  />
                }
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
            subheadline={<p>Gallery owners, I&apos;d love to hear from you.</p>}
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
