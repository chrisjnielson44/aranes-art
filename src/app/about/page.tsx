import { ButtonLink } from '@/components/elements/button'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { Section } from '@/components/elements/section'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { HeroLeftAlignedWithPhoto } from '@/components/sections/hero-left-aligned-with-photo'

export default function Page() {
  return (
    <>
      {/* Hero - Artist Bio */}
      <HeroLeftAlignedWithPhoto
        id="hero"
        eyebrow="About the Artist"
        headline="Abstract Expressionism Through Contrast and Freedom"
        subheadline={
          <div className="space-y-4">
            <p>
              I am a self-taught painter born in the Dominican Republic and based in Naples, Florida. I began painting
              after the age of 40, driven by a lifelong attraction to original artwork and a desire to develop my own
              visual language.
            </p>
            <p>
              Although I studied animal production and built my professional career as a project manager in nonprofit
              organizations, art has always been an important presence in my life. I lived in Madrid for two years,
              where weekly museum visits and travels throughout Europe deepened my visual sensibility.
            </p>
            <p>
              My work belongs to abstract expressionism and grows out of contrast: colors that collide and find
              balance, guided by the freedom of gesture and the movement of the brush. I want each piece to remain
              open—because viewers can see and feel things different from what I do.
            </p>
          </div>
        }
        photo={
          <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-olive-200 to-olive-400 dark:from-olive-800 dark:to-olive-950">
            <span className="text-sm text-olive-700 dark:text-olive-300">Replace with artist photo</span>
          </div>
        }
      />

      {/* Artist Statement */}
      <Section id="statement" eyebrow="Artist Statement" headline="Creating Through Contrast and Gesture">
        <div className="mx-auto max-w-3xl space-y-6 text-olive-950 dark:text-white">
          <Text>
            My work belongs to abstract expressionism and grows out of contrast: colors that collide and find balance,
            guided by the freedom of gesture and the movement of the brush.
          </Text>
          <Text>
            I want each piece to remain open—because viewers can see and feel things different from what I do. This
            openness is essential to my creative process, allowing the work to live beyond my initial intentions and
            resonate with each person who encounters it.
          </Text>
          <Text>
            The freedom of gesture and spontaneity drives my practice. Each brushstroke is both deliberate and
            intuitive, creating dynamic compositions where contrasting elements find their own unique harmony.
          </Text>
        </div>
      </Section>

      {/* Background */}
      <Section
        id="background"
        eyebrow="Background"
        headline="Journey & Experience"
        subheadline={
          <p>
            From the Dominican Republic to Europe to Naples, Florida—a journey of visual discovery and artistic growth
          </p>
        }
      >
        <div className="mx-auto max-w-3xl space-y-6 text-olive-950 dark:text-white">
          <div>
            <Subheading>Origins & Early Influences</Subheading>
            <Text>
              Born in the Dominican Republic, I carried a lifelong attraction to original artwork before beginning to
              paint myself after the age of 40. This late start brought a unique perspective—years of observation,
              appreciation, and longing to develop my own visual language.
            </Text>
          </div>
          <div>
            <Subheading>European Experience</Subheading>
            <Text>
              Living in Madrid for two years profoundly shaped my artistic vision. Weekly museum visits and travels
              throughout Europe deepened my visual sensibility, exposing me to centuries of artistic tradition and
              contemporary innovation. This immersion in European art culture continues to inform my work today.
            </Text>
          </div>
          <div>
            <Subheading>Current Practice</Subheading>
            <Text>
              Now based in Naples, Florida, I work as a self-taught painter while drawing on my background in animal
              production and nonprofit project management. This diverse experience brings unique perspectives to my
              artistic practice. I'm available for commissions and collaborate with galleries and collectors who
              appreciate abstract expressionist work.
            </Text>
          </div>
        </div>
      </Section>

      {/* Call To Action */}
      <CallToActionSimpleCentered
        id="contact-cta"
        headline="Let's work together"
        subheadline={
          <p>
            Interested in purchasing a piece, commissioning custom work, or exhibiting my art in your gallery? I'd
            love to hear from you.
          </p>
        }
        cta={
          <ButtonLink href="/contact" size="lg">
            Get in Touch
          </ButtonLink>
        }
      />
    </>
  )
}
