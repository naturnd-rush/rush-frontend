import { useAllTopics } from "../hooks/use-all-topics"
import TopicCard from "./topic-card"

export default function TopicController() {
  const { loading, error, topics } = useAllTopics()
  const topicCards = topics?.map((topic) => {
    return <TopicCard key={topic.slug} topic={topic} />
  })

  return (
    <>
      { loading ? <p>Loading...</p> : null}
      { error ? <p>Error: {error.message}</p> : null}
      { topicCards }
    </>
  )
}