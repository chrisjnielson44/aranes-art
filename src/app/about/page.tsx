'use client'

import { FadeIn } from '@/components/elements/fade-in'
import { Main } from '@/components/elements/main'
import { Footer } from '@/components/footer'
import { Logo } from '@/components/logo'
import { Navbar } from '@/components/navbar'
import { HeroLeftAlignedWithPhoto } from '@/components/sections/hero-left-aligned-with-photo'

export default function Page() {
  return (
    <>
      <Navbar />
      <Main>
        {/* Hero - Artist Bio */}
        <HeroLeftAlignedWithPhoto
          id="hero"
          eyebrow={<FadeIn>About the Artist</FadeIn>}
          headline={<FadeIn delay={0.1}>Abstract Expressionism Through Contrast and Freedom</FadeIn>}
          subheadline={
            <FadeIn delay={0.2}>
              <div className="space-y-4">
                <p>
                  I am a self-taught painter born in the Dominican Republic and based in Naples, Florida. I began
                  painting after the age of 40, driven by a lifelong attraction to original artwork and a desire to
                  develop my own visual language.
                </p>
                <p>
                  Although I studied animal production and built my professional career as a project manager in
                  nonprofit organizations, art has always been an important presence in my life. I lived in Madrid for
                  two years, where weekly museum visits and travels throughout Europe deepened my visual sensibility.
                </p>
                <p>
                  My work belongs to abstract expressionism and grows out of contrast: colors that collide and find
                  balance, guided by the freedom of gesture and the movement of the brush. I want each piece to remain
                  open—because viewers can see and feel things different from what I do.
                </p>
              </div>
            </FadeIn>
          }
          photo={
            <FadeIn delay={0.3}>
              <div className="overflow-hidden rounded-xl outline -outline-offset-1 outline-black/5 dark:outline-white/5">
                <img src={'aranes-group-paintings.jpg'} />
              </div>
            </FadeIn>
          }
          footer={
            <FadeIn delay={0.4}>
              <div className="flex justify-center py-16">
                <Logo className="text-olive-950 dark:text-white" width="800" height="400" />
              </div>
            </FadeIn>
          }
        />
      </Main>
      <Footer />
    </>
  )
}
