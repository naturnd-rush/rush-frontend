import { Link } from "@tanstack/react-router";
import { styled } from "@linaria/react";
import {
  FaInstagram,
  FaRegMap,
  FaRegQuestionCircle,
  FaRegShareSquare,
} from "react-icons/fa";
import {
  FaRegMessage,
} from "react-icons/fa6";
import Button from "@/components/button";
import copyUrlToClipboard from "@/utils/copy-url-to-clipboard";
import { useTheme } from "@/theme";
import { useMediaQuery } from "styled-breakpoints/use-media-query";
import Dropdown from "./mobile-dropdown";

/** Mocked up data */
const Pages = [
  {
    title: 'Home',
    target: '/app',
    icon: <FaRegMap />,
    color: undefined,
    bold: false
  },
  {
    title: 'About',
    target: '/about',
    icon: <FaRegQuestionCircle />,
    color: undefined,
    bold: false
  },
  {
    title: 'Feedback',
    target: 'https://forms.gle/rB1WaaLcUmEjxmMr8',
    icon: <FaRegMessage />,
    color: 'rgb(221, 107, 32)',
    bold: true,
    external: true
  },
  {
    title: 'Instagram',
    target: 'https://www.instagram.com/nature_rnd/',
    icon: <FaInstagram />,
    color: 'rgb(49, 151, 149)',
    bold: false,
    external: true
  },
  {
    title: 'Share',
    onClick: copyUrlToClipboard,
    icon: <FaRegShareSquare />,
    color: undefined,
    bold: false
  },
]

const Nav = styled.nav`
  // NavBarTheme
  background-color: #FFF;
  display: flex;
  align-items: center;
  height: var(--nav-height);
  // App
  //position: sticky;
  //top: 0px;
  z-index: 10;
  box-shadow: 0px 0px 8px 2px #888;

  padding-inline: 0.75rem 0.5rem;
`

const SiteTitle = styled.div`
  color: rgb(26, 32, 44);
  font-family: 'Poppins', sans-serif;
  font-weight: 700;

  // use short title below breakpoint
  .short { display: none }
  @media (max-width: 950px) {
    .short { display: inline-block; }
    .full { display: none; }
  }
`

const Spacer = styled.div`
  flex: 1 1 0%;
  place-self: stretch;
`

const NavLinks = Pages.map((page) => {
  const { title, target, external, ...buttonProps } = page
  const button = (
    <Button key={title} padding='0.75rem' {...buttonProps} >
      {title}
    </Button>
  )

  return target
    ? (
      <Link
        to={target}
        target={external ? '_blank' : '_self' }
        className="[&.active]:font-bold"
        key={title}
      >
        { button }
      </Link>
    ) : <div>{ button }</div>
})

export default function NavBar() {
  const { down } = useTheme().breakpoints
  const isMobile = useMediaQuery(down('sm'))

  return (
    <Nav>
      <Link to="/">
        <SiteTitle>
          <span className="full">[RUSH] Resilient Urban Systems & Habitat</span>
          <span className="short">[RUSH]</span>
        </SiteTitle>
      </Link>
      <Spacer />
      { isMobile ? <Dropdown>{NavLinks}</Dropdown> : NavLinks }
    </Nav>
  )
}