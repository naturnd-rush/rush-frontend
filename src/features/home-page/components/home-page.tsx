import type { PropsWithChildren } from "react";
import { styled } from "@linaria/react";
import Scrollable from "@/components/scrollable";
import Button from "@/components/button";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "@tanstack/react-router";
import Bear from "./bear";
import { useTheme } from "@/theme";
import { useMediaQuery } from "styled-breakpoints/use-media-query";

const HomePageBackground = styled.div`
  background-image: linear-gradient(
    rgba(42, 42, 42, 0.7),
    rgba(42, 42, 42, 0.7)),
      url('/src/assets/background.webp');
  background-size: cover;
  // display background-image and center topic cards when height not filled
  height: calc(100% - var(--nav-height));
`

const HomePageContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 16px;
  height: 100%;
`

type Size = 'desktop' | 'laptop' | 'mobile'
type SizeProp = { size: Size }

const contentSizes = {
  desktop: {
    marginRight: '10rem'
  },
  laptop: {
    marginRight: '10rem'
  },
  mobile: {
    marginRight: '0'
  }
}
const HomePageContent = styled.div<SizeProp>`
  background-color: white;
  border-radius: var(--panel-border-radius);
  max-width: 65ch;
  padding: 1.5rem;
  padding-bottom: 0.5rem;

  margin-right: ${props => (contentSizes[props.size].marginRight)};
`

const titleSizes = {
  desktop: {
    fontSize: '2.5rem',
    lineHeight: '2rem',
  },
  laptop: {
    fontSize: '2.5rem',
    lineHeight: '2rem',
  },
  mobile: {
    fontSize: '1.75rem',
    lineHeight: '2rem',
  }
}
const HomePageTitle = styled.h1<SizeProp>`
  font-family: Figtree, sans-serif;
  font-size: ${props => (titleSizes[props.size].fontSize)};
  line-height: ${props => (titleSizes[props.size].lineHeight)};
  font-weight: 900;
  margin-top: 0.25rem;
  color: rgb(26, 32, 44);
`

const subTitleSizes = {
  desktop: {
    fontSize: '1rem',
  },
  laptop: {
    fontSize: '1rem',
  },
  mobile: {
    fontSize: '1rem',
  }
}
const HomePageSubTitle = styled.h2<SizeProp>`
  font-family: Urbanist, sans-serif;
  font-size: ${props => (subTitleSizes[props.size].fontSize)};
  font-weight: 500;
  margin-top: 1rem;
  color: rgba(0,0,0,0.6);
`

const bodySizes = {
  desktop: {
    fontSize: '0.875rem',
  },
  laptop: {
    fontSize: '0.875rem',
  },
  mobile: {
    fontSize: '0.75rem',
  }
}
const HomePageBody = styled.div<SizeProp>`
  font-family: Bitter, sans-serif;
  font-size: ${props => bodySizes[props.size].fontSize};
  font-weight: 500;
  margin-top: 0.75rem;
  color: rgba(0,0,0,0.6);

  p {
    margin-top: 0.5rem;
  }
`

const ButtonContainer = styled.div<SizeProp>`
  width: 100%;
  display: inline-flex;
  justify-content: ${props => (props.size === 'mobile' ? 'left' : 'center')};
  margin-block: 1.5rem;
`

export default function HomePage({ children }: PropsWithChildren) {
  const { down, between } = useTheme().breakpoints
  const isLaptop = useMediaQuery(between('sm','lg'))
  const isMobile = useMediaQuery(down('sm'))
  const size = isMobile ? 'mobile' : isLaptop ? 'laptop' : 'desktop'
  const ScrollableStyle = {
    height: '100%'
  }

  return (
    <HomePageBackground>
      <Scrollable style={ScrollableStyle}>
        <HomePageContainer>
          <Bear>
            <HomePageContent size={size}>
              <HomePageTitle size={size}>Welcome to the RUSH</HomePageTitle>
              <HomePageSubTitle size={size}>
                Climate change is a real bummer but reversing the trend is at our fingertips and in our footprints. The Resilient Urban Systems & Habitat (RUSH) Initiative is about rapid resilience in record time.
              </HomePageSubTitle>
              <HomePageBody size={size}>
                <p>Join this collective creation to mapping the difference we’re all making. Comparing datasets on personal and planetary health. Help us plot the spots that track the healing. Help identify the risks and the fixes.</p>
                <p>The RUSH Initiative is exploring this work on the unceded and unsurrendered territories of the lək̓ʷəŋən and SENĆOŦEN speaking peoples. Maps have a long history of erasure of Indigenous cultures and territories. Our goal is to promote tools that support the healing of ecosystems and communities so that all beings can live their best life.</p>
                { children }
              </HomePageBody>
              <ButtonContainer size={size}>
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
    </HomePageBackground>
  )
}