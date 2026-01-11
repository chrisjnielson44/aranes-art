import { Logo } from '@/components/logo'
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
              My work belongs to abstract expressionism and grows out of contrast: colors that collide and find balance,
              guided by the freedom of gesture and the movement of the brush. I want each piece to remain open—because
              viewers can see and feel things different from what I do.
            </p>
          </div>
        }
        photo={<img src={'aranes-group-paintings.jpg'} />}
        footer={
          <div className="flex justify-center py-16">
            <Logo className="text-olive-950 dark:text-white" width="800" height="400" />
          </div>
        }
      />
    </>
  )
}
