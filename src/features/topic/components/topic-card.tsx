import { styled } from '@linaria/react'
import { Link } from '@tanstack/react-router'

const BackgroundImage = styled.img`
  // from baseStyle
  width: inherit;
  height: inherit;
  border-radius: inherit;
  object-fit: cover;
  object-position: top;
  //overflow: hidden;
  // from variant expanded
  position: absolute;
  z-index: -1;
  `

const Card = styled.div`
  border-radius: 16px;
  //background: #FFFFFFAA;
  color: white;
  width: 320px;
  height: 448px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  `

const Content = styled.div`
  text-align: left;
  border-radius: inherit;
  overflow: hidden;
  padding: 1rem;
  background: linear-gradient(rgba(33,33,33,0.1) 0, rgba(33,33,33,0.3) 180px, rgba(33,33,33,.8) 320px, rgba(33,33,33,1)) 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 8px;
  height: 100%;
  `

const doubleDropShadow = {
  textShadow: '0 0 4px black; 2px 2px 6px black'
}

const Title = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 130%;
  ${doubleDropShadow}
  flex: 0;
  margin: 0;
`
const Subtitle = styled.p`
  font-family: 'Urbanist Variable', sans-serif;
  font-weight: 500;
  line-height: 130%;
  ${doubleDropShadow}
  flex: 0;
  margin: 0;
`

export type Topic = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

export default function TopicCard({ topic }: { topic: Topic }) {

  const topicRoute = `/app/${topic.id}`

  return (
    <Link to={topicRoute}>
      <Card>
        <BackgroundImage src={topic.image}/>
        <Content>
          <Title>{topic.title}</Title>
          <Subtitle>{topic.subtitle}</Subtitle>
        </Content>
      </Card>
    </Link>
  )
}