import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Main } from '@/components/elements/main'
import { GitHubIcon } from '@/components/icons/social/github-icon'
import { XIcon } from '@/components/icons/social/x-icon'
import { YouTubeIcon } from '@/components/icons/social/youtube-icon'
import {
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  NewsletterForm,
  SocialLink,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLinksActionsAndCenteredLogo,
} from '@/components/sections/navbar-with-links-actions-and-centered-logo'
import type { Metadata } from 'next'
import Image from 'next/image'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aranes - Abstract Expressionist Artist',
  description: 'Original abstract expressionist paintings by Aranes, a self-taught artist based in Naples, Florida. Available for purchase and commission.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <>
          <NavbarWithLinksActionsAndCenteredLogo
            id="navbar"
            links={
              <>
                <NavbarLink href="/">Gallery</NavbarLink>
                <NavbarLink href="/about">About</NavbarLink>
                <NavbarLink href="/contact">Contact</NavbarLink>
              </>
            }
            logo={
              <NavbarLogo href="/">
                <span className="font-serif text-2xl font-bold text-olive-950 dark:text-white">Aranes</span>
              </NavbarLogo>
            }
            actions={
              <>
                <ButtonLink href="/contact">Get in Touch</ButtonLink>
              </>
            }
          />

          <Main>{children}</Main>

          <FooterWithNewsletterFormCategoriesAndSocialIcons
            id="footer"
            cta={
              <NewsletterForm
                headline="Stay Updated"
                subheadline={
                  <p>
                    Subscribe to receive updates about new artwork, upcoming exhibitions, and available commissions.
                  </p>
                }
                action="#"
              />
            }
            links={
              <>
                <FooterCategory title="Portfolio">
                  <FooterLink href="/">Gallery</FooterLink>
                  <FooterLink href="/#gallery">Recent Works</FooterLink>
                </FooterCategory>
                <FooterCategory title="About">
                  <FooterLink href="/about">Artist Bio</FooterLink>
                  <FooterLink href="/about#statement">Artist Statement</FooterLink>
                  <FooterLink href="/about#background">Background</FooterLink>
                </FooterCategory>
                <FooterCategory title="Connect">
                  <FooterLink href="/contact">Contact</FooterLink>
                  <FooterLink href="/contact">Commissions</FooterLink>
                  <FooterLink href="/contact">Purchase Artwork</FooterLink>
                </FooterCategory>
              </>
            }
            fineprint="© 2025 Aranes. All rights reserved."
            socialLinks={
              <>
                <SocialLink href="https://instagram.com" name="Instagram">
                  <XIcon />
                </SocialLink>
                <SocialLink href="https://facebook.com" name="Facebook">
                  <GitHubIcon />
                </SocialLink>
              </>
            }
          />
        </>
      </body>
    </html>
  )
}
