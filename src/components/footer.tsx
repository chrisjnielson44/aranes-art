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
        <div className="flex justify-start">
          <Logo className="text-olive-950 dark:text-white" />
        </div>
      }
      links={
        <>
          <FooterCategory title="Portfolio">
            <FooterLink href="/">Gallery</FooterLink>
            <FooterLink href="/#gallery">Recent Works</FooterLink>
          </FooterCategory>
        </>
      }
      fineprint="© 2026 Aranes. All rights reserved."
    />
  )
}
