import type { PropsWithChildren } from "react";
import { styled } from "@linaria/react";
import Scrollable from "@/components/scrollable";
import Button from "@/components/button";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "@tanstack/react-router";
import Bear from "./bear";
import { useTheme } from "@/theme";

const HomePageContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 16px;
  height: 100%;
`

const HomePageContent = styled.div`
  background-color: white;
  border-radius: var(--panel-border-radius);
  max-width: 65ch;
  padding: 1.5rem;
  padding-bottom: 0.5rem;
  margin-right: 10rem;
`

const HomePageTitle = styled.h1`
  font-family: Figtree, sans-serif;
  font-size: 2.5rem;
  line-height: 2rem;
  font-weight: 900;
  margin-top: 0.25rem;
  color: rgb(26, 32, 44);
`

const HomePageSubTitle = styled.h2`
  font-family: Urbanist, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 1rem;
  color: rgba(0,0,0,0.6);
`

const HomePageBody = styled.main`
  font-family: Bitter, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.75rem;
  color: rgba(0,0,0,0.6);

  p {
    margin-top: 0.5rem;
  }
`

const ButtonContainer = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: center;
  margin-block: 1.5rem;
`

export default function HomePage({ children }: PropsWithChildren) {
  const { background } = useTheme()

  return (
    <Scrollable style={{
      backgroundImage: `
        linear-gradient(rgba(42, 42, 42, 0.7),
        rgba(42, 42, 42, 0.7)),
        url(${background})`,
      backgroundSize: 'cover',
      // display backgroundImage and center topic cards when height not filled
      height: 'calc(100% - var(--nav-height))',
    }}>
      <HomePageContainer>
        <Bear>
          <HomePageContent>
            <HomePageTitle>Welcome to the RUSH</HomePageTitle>
            <HomePageSubTitle>
              Climate change is a real bummer but reversing the trend is at our fingertips and in our footprints. The Resilient Urban Systems & Habitat (RUSH) Initiative is about rapid resilience in record time.
            </HomePageSubTitle>
            <HomePageBody>
              <p>Join this collective creation to mapping the difference we’re all making. Comparing datasets on personal and planetary health. Help us plot the spots that track the healing. Help identify the risks and the fixes.</p>
              <p>The RUSH Initiative is exploring this work on the unceded and unsurrendered territories of the lək̓ʷəŋən and SENĆOŦEN speaking peoples. Maps have a long history of erasure of Indigenous cultures and territories. Our goal is to promote tools that support the healing of ecosystems and communities so that all beings can live their best life.</p>
              { children }
            </HomePageBody>
            <ButtonContainer>
              <Link to='/app'>
                <Button
                  bgColor='rgb(56,161,105)'
                  color='white'
                  rightIcon={<FaArrowRight />}
                >Get Started</Button>
              </Link>
            </ButtonContainer>
          </HomePageContent>
        </Bear>
      </HomePageContainer>
    </Scrollable>
  )
}