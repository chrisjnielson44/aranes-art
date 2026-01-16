import { Link } from '@/components/elements/link'
import { Main } from '@/components/elements/main'
import { Footer } from '@/components/footer'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Navbar } from '@/components/navbar'
import { HeroSimpleCentered } from '@/components/sections/hero-simple-centered'

export default function Page() {
  return (
    <>
      <Navbar />
      <Main>
        <HeroSimpleCentered
          headline="Page not found"
          subheadline={<p>Sorry, but the page you were looking for could not be found.</p>}
          cta={
            <Link href="/">
              Go back home <ArrowNarrowRightIcon />
            </Link>
          }
        />
      </Main>
      <Footer />
    </>
  )
}
