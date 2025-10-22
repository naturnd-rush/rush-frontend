import { styled } from "@linaria/react"

export const AboutContainer = styled.div`
  display: flex;
  direction: row;
  justify-content: center;
  align-items: center;
  color: rgb(26, 32, 44);
`

export const AboutPageContent = styled.div`
  background-color: white;
  border-radius: var(--panel-border-radius);
  margin-top: 1.5rem;
  margin-inline: 0.5rem;
  padding: 1.5rem;
  padding-bottom: 0.5rem;
`

export const AboutPageTitle = styled.h1`
  font-family: 'Figtree Variable', sans-serif;
  font-size: 2.5rem;
  line-height: 3rem;
  font-weight: bold;
  margin-top: 0.75rem;
`

export const AboutPageLogoContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-block: 2rem;
`

export const AboutPageHighSchoolsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-inline: 10%;
  margin-bottom: 1rem;
  direction: row;
  gap: 10px;
  align-items: center;
  
  &:before {
    flex: 1;
    content: "";
    height: 4px;
    background: linear-gradient(to left, gray, transparent);
  }

  &:after {
    flex: 1;
    content: "";
    height: 4px;
    background: linear-gradient(to right, gray, transparent);
  }
`

export const AboutPageHighSchoolHeader = styled.p`
  flex: 0 0 auto;
  font-family: 'Urbanist Variable', sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  color: rgba(0,0,0,0.6);
  text-decoration: underline;
  text-align: center;
`

export const AboutPageHighSchoolLogos = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: 3rem 1rem;
  margin-block: 2rem;
`

export const AboutPageStudentContributorsHeader = styled.p`
  flex: 0 0 auto;
  font-family: 'Urbanist Variable', sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  color: rgba(0,0,0,0.6);
  text-decoration: underline;
  text-align: center;
  margin-bottom: 1rem;
  width: 100%;
`

export const AboutPageStudentContributors = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: baseline;
  gap: 1rem;
  margin-block: 2rem;
`

export const Text = styled.p`
  font-family: 'Bitter Variable', serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(0,0,0,0.6);
  margin-top: 0.5rem;
`

export const List = styled.ul`
  padding-inline-start: 0;
`

export const ListItem = styled.li`
  font-family: 'Bitter Variable', serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(0,0,0,0.6);
  margin-top: 0.5rem;
`

type ImageProps = {
  maxHeight?: string,
  maxWidth?: string,
}
export const Image = styled.img<ImageProps>`
  object-fit: contain;
  max-height: ${(props) => props.maxHeight ?? '7rem' };
  max-width: ${(props) => props.maxWidth ?? '16rem' };
`