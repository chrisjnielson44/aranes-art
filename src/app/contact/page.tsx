import { FadeIn } from '@/components/elements/fade-in'
import { Main } from '@/components/elements/main'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ContactForm } from '@/components/sections/contact-form'
import { HeroSimpleCentered } from '@/components/sections/hero-simple-centered'

// Sample artwork list for the dropdown
const artworks = [
  { id: '2', title: 'Song of the Pear' },
  { id: '3', title: 'Lemon Circus' },
  { id: '4', title: 'Ocean Ballet' },
  { id: '5', title: 'Musical Falls' },
]

export default function Page() {
  return (
    <>
      <Navbar />
      <Main>
        {/* Hero */}
        <FadeIn delay={0.1}>
          <HeroSimpleCentered
            id="hero"
            headline="Get in Touch"
            subheadline={
              <p>
                Whether you're interested in purchasing a piece, commissioning custom artwork, or showcasing my work in
                your gallery, I'd love to hear from you.
              </p>
            }
          />
        </FadeIn>

        {/* Contact Form */}
        <FadeIn delay={0.3}>
          <div className="w-full">
            <ContactForm
              artworks={artworks}
              eyebrow="Send a Message"
              headline="I'd love to hear from you"
              className="max-w-none"
            />
          </div>
        </FadeIn>
      </Main>
      <Footer />
    </>
  )
}
