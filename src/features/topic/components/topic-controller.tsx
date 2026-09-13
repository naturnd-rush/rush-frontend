import { useAdminChannels } from "@/lib/GraphQLProvider"
import { useAllTopics } from "../hooks/use-all-topics"
import TopicCard from "./topic-card"

export default function TopicController() {
  const channels = useAdminChannels()
  const { loading, error, topics } = useAllTopics(channels)
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