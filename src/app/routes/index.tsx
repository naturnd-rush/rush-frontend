import { createFileRoute } from '@tanstack/react-router'
import { useQuery, gql } from '@apollo/client'
import TopicCard, { type Topic } from '@/features/topic/components/topic-card'

export const Route = createFileRoute('/')({
  component: Index,
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
  const topicData: Topic = {
    id: "",
    title: "",
    image: "",
    subtitle: "",
  }

  if (loading) { topicData.title = "Loading..." }
  else if (error) { topicData.title = `Error: ${error.message}`}
  else {
    topicData.title = data.allQuestions[0].title
    topicData.id = data.allQuestions[0].id
    topicData.image = MOCK_TOPIC_DATA.image
    topicData.subtitle = MOCK_TOPIC_DATA.subtitle
  }

  return topicData
}

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <TopicCard topic={DisplayTopics()} />
    </div>
  )
}