import { styled } from "@linaria/react"
import { Link } from "@tanstack/react-router"
import type { PropsWithChildren } from "react"

const PageBackgroundImage = styled.div`
  background-image: linear-gradient(
    rgba(42, 42, 42, 0.0),
    rgba(42, 42, 42, 0.2)),
      url('/src/assets/background.webp');
  background-size: cover;
  // display background-image and center topic cards when height not filled
  height: calc(100% - var(--nav-height));
`

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 1.2rem;
  line-height: 1.2rem;
  background-color: rgba(42, 42, 42, 0.7);
  color: #999b9e;
  text-align: right;
  padding-right: 1rem;
  font-size: 0.8rem;

  a {
    transition: color 0.4s ease-in-out;
    color: #999b9e;
    &:hover {
      color: #fff;
    }
  }
`

export const PageBackground = (props: PropsWithChildren) => {
  return (
    <PageBackgroundImage>
      {props.children}
      <Footer>
        ©2026 Roy Group - All Rights Reserved
        |&nbsp;<Link to='/terms' search={true}>TERMS</Link>
        {/* &nbsp;|&nbsp;<Link to='/privacy' search={true}>PRIVACY</Link> */}
      </Footer>
    </PageBackgroundImage>
  )
}