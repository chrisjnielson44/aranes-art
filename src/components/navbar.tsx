import { Logo } from '@/components/logo'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLinksActionsAndCenteredLogo,
} from '@/components/sections/navbar-with-links-actions-and-centered-logo'

export function Navbar() {
  return (
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
          <Logo className="text-olive-950 dark:text-white" />
        </NavbarLogo>
      }
      actions={<></>}
    />
  )
}
