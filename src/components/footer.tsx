import { Logo } from '@/components/logo'
import {
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'

export function Footer() {
  return (
    <FooterWithNewsletterFormCategoriesAndSocialIcons
      id="footer"
      cta={
        <div className="flex max-w-xs flex-col items-start gap-4">
          <Logo className="text-olive-950 dark:text-white" />
          <p className="text-olive-700 dark:text-olive-400">
            Original abstract expressionist paintings, available through gallery representation.
          </p>
        </div>
      }
      links={
        <>
          <FooterCategory title="Explore">
            <FooterLink href="/">Gallery</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterCategory>
          <FooterCategory title="Get in touch">
            <FooterLink href="mailto:info@aranesart.com">info@aranesart.com</FooterLink>
            <li className="text-olive-700 dark:text-olive-400">Naples, Florida</li>
          </FooterCategory>
        </>
      }
      fineprint={`© ${new Date().getFullYear()} Aranes. All rights reserved.`}
    />
  )
}
