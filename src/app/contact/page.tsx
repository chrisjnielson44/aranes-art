import { Container } from '@/components/elements/container'
import { FadeIn } from '@/components/elements/fade-in'
import { Main } from '@/components/elements/main'
import { Footer } from '@/components/footer'
import { MailIcon } from '@/components/icons/mail-icon'
import { MapPinIcon } from '@/components/icons/map-pin-icon'
import { Navbar } from '@/components/navbar'
import { ContactForm } from '@/components/sections/contact-form'
import { HeroSimpleCentered } from '@/components/sections/hero-simple-centered'
import { artworks } from '@/lib/artworks'

const available = artworks.filter((artwork) => !artwork.sold)

export default function Page() {
  return (
    <>
      <Navbar />
      <Main>
        {/* Hero */}
        <FadeIn delay={0.1}>
          <HeroSimpleCentered
            id="hero"
            className="pb-10"
            headline="Get in Touch"
            subheadline={<p>Gallery owners interested in showcasing my work, I&apos;d love to hear from you.</p>}
          />
        </FadeIn>

        {/* Contact Form */}
        <FadeIn delay={0.3}>
          <Container className="pb-24">
            <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
              <aside className="flex flex-col gap-8 lg:col-span-2">
                <div className="overflow-hidden rounded-2xl outline -outline-offset-1 outline-black/5 dark:outline-white/5">
                  <img
                    src="/Ocean Ballet.jpg"
                    alt="Ocean Ballet, acrylic on canvas"
                    className="aspect-5/4 w-full object-cover"
                  />
                </div>
                <p className="text-base/7 text-olive-700 dark:text-olive-400">
                  Whether you represent a gallery, are looking for a piece for your home, or simply want to know more
                  about a painting, send me a note and I&apos;ll write back personally.
                </p>
                <dl className="flex flex-col gap-4 text-sm/6">
                  <div className="flex items-center gap-3">
                    <dt className="flex size-9 items-center justify-center rounded-full bg-olive-950/5 dark:bg-white/10">
                      <MailIcon className="text-olive-950 dark:text-white" />
                      <span className="sr-only">Email</span>
                    </dt>
                    <dd>
                      <a
                        href="mailto:info@aranesart.com"
                        className="font-medium text-olive-950 underline-offset-4 hover:underline dark:text-white"
                      >
                        info@aranesart.com
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <dt className="flex size-9 items-center justify-center rounded-full bg-olive-950/5 dark:bg-white/10">
                      <MapPinIcon className="text-olive-950 dark:text-white" />
                      <span className="sr-only">Studio</span>
                    </dt>
                    <dd className="text-olive-700 dark:text-olive-400">Naples, Florida</dd>
                  </div>
                </dl>
              </aside>

              <div className="flex flex-col justify-center rounded-3xl bg-white p-6 shadow-sm ring-1 ring-olive-950/5 sm:p-10 lg:col-span-3 dark:bg-white/5 dark:ring-white/10">
                <ContactForm artworks={available} />
              </div>
            </div>
          </Container>
        </FadeIn>
      </Main>
      <Footer />
    </>
  )
}
