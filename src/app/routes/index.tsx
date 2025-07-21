import TopicCard from '@/features/topic/components/topic-card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

const MOCK_TOPIC_DATA = {
  id: 'be-healthy',
  title: 'Be Healthy',
  image: 'https://unsplash.com/photos/oajlEpl_m_w/download?ixid=M3wxMjA3fDB8MXxhbGx8M3x8fHx8fHx8MTc1Mjc4MjQwM3w&w=640',
  subtitle: 'Personal and planetary health are the same thing. How can I keep my natural life support system connected and protected?',
}

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <TopicCard topic={MOCK_TOPIC_DATA} />
    </div>
  )
}