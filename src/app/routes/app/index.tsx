import TopicCard from '@/features/topic/components/topic-card';
import TopicContainer from '@/features/topic/components/topic-container';
import type { Topic } from '@/features/topic/types/topic';
import { gql, useQuery } from '@apollo/client';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
})

const MOCK_TOPIC_DATA = {
  id: 'be-healthy',
  title: 'Be Healthy',
  image: 'https://unsplash.com/photos/oajlEpl_m_w/download?ixid=M3wxMjA3fDB8MXxhbGx8M3x8fHx8fHx8MTc1Mjc4MjQwM3w&w=640',
  subtitle: 'Personal and planetary health are the same thing. How can I keep my natural life support system connected and protected?',
}

const GET_TOPICS = gql`
  query GetQuestions {
    allQuestions {
      id
      title
    }
  }
`

function DisplayTopics() {
  const { loading, error, data } = useQuery(GET_TOPICS);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  const topics = data.allQuestions.map(
    (topic: Omit<Topic, 'image' | 'subtitle'>) => {
      return <TopicCard key={topic.id} topic={{
        ...topic,
        image: MOCK_TOPIC_DATA.image,
        subtitle: MOCK_TOPIC_DATA.subtitle,
      }} />
    }
  )

  return topics
}


function RouteComponent() {
  return (
    <TopicContainer>
      <DisplayTopics />
    </TopicContainer>
  )
}
