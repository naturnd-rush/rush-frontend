import { Link } from "@tanstack/react-router";
import { styled } from "@linaria/react";

const Nav = styled.nav`
  // NavBarTheme
  background-color: #FFF;
  display: flex;
  align-items: center;
  height: 2.5rem;
  // App
  position: sticky;
  top: 0px;
  z-index: 10;
  box-shadow: 0px 0px 8px 2px #888;

  padding-inline: 1rem;
`

const SiteTitle = styled.div`
  color: rgb(26, 32, 44);
  font-family: 'Poppins', sans-serif;
  font-weight: 700;

  // use short title below breakpoint
  .short { display: none }
  @media (max-width: 768px) {
    .short { display: inline-block; }
    .full { display: none; }
  }
`

const Spacer = styled.div`
  flex: 1 1 0%;
  place-self: stretch;
`

export default function NavBar() {

  return (
    <Nav>
      <Link to="/">
        <SiteTitle>
          <span className="full">[RUSH] Resilient Urban Systems & Habitat</span>
          <span className="short">[RUSH]</span>
        </SiteTitle>
      </Link>
      <Spacer />
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{' '}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
    </Nav>
  )
}