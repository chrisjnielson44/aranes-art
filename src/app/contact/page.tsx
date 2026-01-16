import { Main } from '@/components/elements/main'
import { Section } from '@/components/elements/section'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ContactForm } from '@/components/sections/contact-form'
import { HeroSimpleCentered } from '@/components/sections/hero-simple-centered'

// Sample artwork list for the dropdown
const artworks = [
  { id: '1', title: 'Somewhere in La Mancha' },
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

        {/* Contact Information */}
        <Section
          id="info"
          eyebrow="Contact Information"
          headline="Let's Connect"
          subheadline={<p>Fill out the form below and I'll get back to you as soon as possible</p>}
        >
          <div className="mx-auto max-w-2xl space-y-8 text-olive-950 dark:text-white">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Subheading>For Inquiries</Subheading>
                <Text>
                  Use the form below to reach out about artwork purchases, commissions, or gallery collaborations.
                </Text>
              </div>
              <div>
                <Subheading>Commission Work</Subheading>
                <Text>
                  I accept commissions for custom pieces. Let me know your vision and I'll work with you to create
                  something unique.
                </Text>
              </div>
            </div>
          </div>
        </Section>

        {/* Contact Form */}
        <ContactForm artworks={artworks} eyebrow="Send a Message" headline="I'd love to hear from you" />
      </Main>
      <Footer />
    </>
  )
}
