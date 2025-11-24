import { createFileRoute } from '@tanstack/react-router'
import { useTheme } from '@/theme'
import { useMediaQuery } from 'styled-breakpoints/use-media-query'
import {
  Text,
  ListItem,
  AboutContainer,
  AboutPageContent,
  AboutPageHighSchoolHeader,
  AboutPageHighSchoolLogos,
  AboutPageHighSchoolsContainer,
  AboutPageLogoContainer,
  AboutPageStudentContributors,
  AboutPageStudentContributorsHeader,
  AboutPageTitle,
  Image,
  List,
} from '@/features/about-page/components/about'
import naturnd from '@/assets/logos/1. NatuR&D.png'
import uvicmapshop from '@/assets/logos/2. Map Shop - UVic.png'
import pss from '@/assets/logos/3. PSS.png'
import ogm from '@/assets/logos/4. OpenGreenMap.png'
import seachange from '@/assets/logos/5. SeaChange.png'
import spec from '@/assets/logos/6. The Coalition.png'
import riwestshore from '@/assets/logos/7. Re-Imagine Westshore.png'
import qch from '@/assets/logos/8. Quadra - Cedar Hill.png'
import gvpn from '@/assets/logos/9. GVPlacemaking Network.png'
import gvnh from '@/assets/logos/10. Greater Victoria NatureHood.png'
import d4gv from '@/assets/logos/11. Data for Good Vancouver.png'
import obhs from '@/assets/logos/12. Oak Bay High.png'
import phs from '@/assets/logos/13. Parklands High School.png'
import mdhs from '@/assets/logos/14. Mount Doug High School.png'
import clhs from '@/assets/logos/15. Claremont High School.png'
import uviccel from '@/assets/logos/17. University of Victoria CEL.png'
import enbs from '@/assets/logos/18. Engage with Nature-Based Solutions.png'
import scbc from '@/assets/logos/SCBC_COL_2019.png'
import fbc from '@/assets/logos/19. Friends of Bowker Creek.jpg'
import fmlws from '@/assets/logos/20. Friends of Maltby Lake Watershed Society.jpg'
import vicdrains from '@/assets/logos/21. Victoria Drains.png'
import Scrollable from '@/components/scrollable'

export const Route = createFileRoute('/about')({
  component: About,
})

const textFormatter = (text: React.ReactNode, index: number) => (
  <Text key={`TextList - ${index}`}>{text}</Text>
)

const listItemFormatter = (text: React.ReactNode, index: number) => (
  <ListItem key={`ListItemList - ${index}`}>{text}</ListItem>
)

const PreListParagraphs = [
  'The RUSH Initiative is a cross sectoral collaboration to create rapid resilience in record time by engaging people in creating the conditions for health now, and into the future.',
  'Our approach combines nature-inspired design, community mapping, and a focus on health with watersheds as a primary indicator.',
  'By showcasing the research, creativity, and innovation happening in this region on an interactive landing page, we hope to provide a shared language on the vulnerabilities and opportunities for long-term health and climate action.',
  'We want to change the critical questions that get asked in planning meetings such as:', 
].map(textFormatter)

const BulletList = [
  'How is a development proposal an opportunity to increase resilience to climate-related events?', 
  'How can we support neighbourhoods to adapt and thrive in changing conditions?', 
  'If we extend and connect the ecosystem features across the urban landscape, what are all the benefits people would feel?', 
  'How can we work with Nature to create a quality of life for all?',
].map(listItemFormatter)

const PostListParagraphs = [
  'This is a tool for people to connect habitats, restore watersheds, feel a sense of belonging, and start conversations that help us reverse the trend of climate change, pollution and hopelessness.', 
  'Please use the feedback button to let us know what you think and any suggestions you have.',
].map(textFormatter)

const logos = [
  { 
    src: naturnd,
    alt: 'NatuR&D',
    url: 'https://naturnd.com/rnd/'
  },
  { 
    src: uvicmapshop,
    alt: 'The University of Victoria Map Shop',
    url: 'https://www.uvicmapshop.com/'
  },
  { 
    src: pss,
    alt: 'Peninsula Streams & Shorelines',
    url: 'https://peninsulastreams.ca/'
  },
  { 
    src: ogm,
    alt: 'Open Green Map',
    url: 'https://greenmap.org/'
  },
  { 
    src: enbs,
    alt: 'Engage with Nature-Based Solutions',
    url: 'https://engagewithnbs.ca/'
  },
  { 
    src: seachange,
    alt: 'SeaChange Society',
    url: 'https://seachangesociety.com/'
  },
  { 
    src: spec,
    alt: 'Saanich Peninsula Environmental Coalition',
    url: 'https://saanichpeninsula.ca/'
  },
  { 
    src: riwestshore,
    alt: 'Re-Imagine Westshore Community',
    url: 'https://reimagineus.ca/'
  },
  { 
    src: qch,
    alt: 'Quadra Cedar Hill Community Association',
    url: 'https://qchca.org/'
  },
  { 
    src: gvpn,
    alt: 'Greater Victoria NatureHood',
    url: 'https://www.gvnaturehood.com/'
  },
  { 
    src: gvnh,
    alt: 'Greater Victoria Placemaking Network',
    url: 'https://victoriaplacemaking.ca/'
  },
  { 
    src: scbc,
    alt: 'Stewardship Centre for British Columbia',
    url: 'https://stewardshipcentrebc.ca/'
  },
  { 
    src: d4gv,
    alt: 'Data for Good Vancouver',
    url: 'https://vancouver.dataforgood.ca/'
  },
/*   { 
    src: require('../data/logos/16. RBC Tech for Nature.png'),
    alt: 'RBC Tech for Nature',
    url: 'https://www.rbc.com/our-impact/climate/environmental-donations.html'
  }, */
  { 
    src: uviccel,
    alt: 'The University of Victoria Community-Engaged Learning',
    url: 'https://www.uvic.ca/career-services/build-your-career/community-engaged-learning/index.php#ipn-community-engaged-learning'
  },
  { 
    src: fbc,
    alt: 'Friends of Bowker Creek Society',
    url: 'https://bowkercreek.org/'
  },
  { 
    src: fmlws,
    alt: 'Friends of Maltby Lake Watershed Society',
    url: 'https://maltbylake.com/'
  },
  { 
    src: vicdrains,
    alt: 'Victoria Drains',
    url: 'https://www.victoriadrains.com/'
  },
]

const LogoComponents = logos.map((logo, index) => (
  <a href={logo.url}>
    <Image
      key={`${logo.alt}-${index}`}
      alt={logo.alt}
      src={logo.src}
    />
  </a>
))

const logosHighSchools = [
  { 
    src: obhs,
    alt: 'Oak Bay High School',
    url: 'https://oakbay.sd61.bc.ca/'
  },
  { 
    src: phs,
    alt: 'Parklands High School',
    url: 'https://parkland.saanichschools.ca/'
  },
  { 
    src: mdhs,
    alt: 'Mount Douglas Secondary',
    url: 'https://mountdoug.sd61.bc.ca/'
  },
  { 
    src: clhs,
    alt: 'Claremont Secondary',
    url: 'https://claremont.saanichschools.ca/'
  }
]

const LogoComponentsHighSchool = logosHighSchools.map((logo, index) => (
  <a href={logo.url}>
    <Image
      key={`${logo.alt}-${index}`}
      alt={logo.alt}
      src={logo.src}
      maxHeight='6rem'
      maxWidth='12rem'
    />
  </a>
))

const contributors = [
  'Morgan Phillips',
  'Helena Jacobsen',
  'Brendan Kerwin',
  'Griffin Stever',
  'Sarah Swan',
  'Liam Lepik',
  'Victoria Jeffery',
  'Katie Wilson',
  'Steve Martin',
  'Matthew Evans',
  'Tenaya Lynx',
  'Julia Frasher',
  'Riley Sondergaard',
  'Ella Bethune',
  'Darryl Seah',
  'Ben DesRosiers',
  'Ardis Mellor-Laing',
  'Casey Lake',
  'Evan Gerbrecht',
  'Samantha Denton',
  'Ethan Heckrodt',
  'Sam Wetzel',
  'Eric Berendt',
  'Olivia Stephenson',
  'Jack Britton',
  'Callan Rakimov',
  'Sean Bennett',
  'Aiden FoxCroft',
  'Grace Long',
  'Olivia Graham',
  'Jared Leary',
  'Langley Chan',
  'Oliva Gatrell',
  'Zacc Lavigne',
  'Nabila Kazmi',
  'Deanie Harding',
  'Emma Gordon ',
  'Stephanie Mai',
  'Lili Guglich',
  'Addie Tonn',
  'Toby Lee',
  'Marissa Tweedy',
  'Eve Seward',
  'Salvador Bigam',
  'Maya Munoz',
  'Melanie Robertson',
  'Levi Zadka',
  'Housam Tarrach',
  'Sean Sun',
  'Brigitte Larkin',
  'Eric Ouellette',
  'Uri Oberlander',
  'Scott Magrath',
  'Lauren Onushko',
  'Ivan Sherbot',
  'Lucas Whiffin',
  'Art Attack group',
  'Thomas Armitage',
  'Clara Dickieson',
  'Jack Panayi',
  'Hazim Ismail',
  'Madison Hopkyns',
  'Adam Yates LaBerge',
  'Miranda Chen',
  'Chloe Cizeron',
  'Sophie Buitendyk',
].map((name) => (
  <p key={name} style={{fontFamily:'var(--chakra-fonts-subHeading)', fontSize:'1rem'}}>{name}</p>
))

function About() {
  const { background, breakpoints: { down } } = useTheme()
  const downLg = useMediaQuery(down('lg'))
  const downXl = useMediaQuery(down('xl'))
  const down2xl = useMediaQuery(down('xxl'))

  return (
    <Scrollable style={{
      backgroundImage: `linear-gradient(rgba(42, 42, 42, 0.7), rgba(42, 42, 42, 0.7)), url(${background})`,
      backgroundSize: 'cover',
      // display backgroundImage and center topic cards when height not filled
      height: 'calc(100% - var(--nav-height))',
    }}>
      <AboutContainer>
        <AboutPageContent
          style={{
            marginBottom: '1.5rem',
            maxWidth: downLg ? '64ch' : downXl ? '84ch' : down2xl ? '96ch' : '120ch',
          }}
        >
          <AboutPageTitle>About</AboutPageTitle>
          <List key='pre-list-paragraphs'>
            { PreListParagraphs }
          </List>
          <ul key='bullet-list' style={{ paddingBlock: '0.5em', paddingInlineStart: '2em'}}>
            { BulletList }
          </ul>
          <List key='post-list-paragraphs'>
            { PostListParagraphs }
          </List> 
          <AboutPageLogoContainer key='logos'>
            { LogoComponents }
          </AboutPageLogoContainer>
          <AboutPageHighSchoolsContainer key='high-schools'>
            <AboutPageHighSchoolHeader>
              Participating High Schools
            </AboutPageHighSchoolHeader>
          </AboutPageHighSchoolsContainer>
          <AboutPageHighSchoolLogos
            key='logosHighSchools'
          >
            { LogoComponentsHighSchool }
          </AboutPageHighSchoolLogos>
          <AboutPageStudentContributorsHeader
            key='student-contributors'
          >
            University of Victoria - Community Mapping & Community Based Participatory Research
            <br />
            Student Contributors
          </AboutPageStudentContributorsHeader>
          <AboutPageStudentContributors
            key='contributors'
          >
            { contributors }
          </AboutPageStudentContributors>
        </AboutPageContent>
      </AboutContainer>
    </Scrollable>
  )
}

