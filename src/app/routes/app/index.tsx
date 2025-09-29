import TopicCard from '@/features/topic/components/topic-card';
import TopicContainer from '@/features/topic/components/topic-container';
import type { Topic } from '@/features/topic/types/topic';
import { gql, useQuery } from '@apollo/client';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
})

const GET_TOPICS = gql`
  query GetQuestions {
    allQuestions {
      id
      image
      subtitle
      title
      tabs {
        id
      }
    }
  }
`

function DisplayTopics() {
  const { loading, error, data } = useQuery(GET_TOPICS);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  const topics = data.allQuestions.map(
    (topic: Topic & { tabs: {id: string}[] }) => {
      return <TopicCard key={topic.id} topic={{
        ...topic,
        image: 'http://192.168.4.86:8080/media/' + topic.image,
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
