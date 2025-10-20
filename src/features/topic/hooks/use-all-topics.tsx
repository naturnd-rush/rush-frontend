import { ApolloError, gql, useQuery } from "@apollo/client";
import type { TopicWithTabIds } from "../types/topic";

const GET_TOPICS = gql`
  query GetQuestions {
    allQuestions {
      id
      slug
      image
      subtitle
      title
      tabs {
        id
      }
    }
  }
`

type QueryResults = { loading: boolean, error?: ApolloError, topics?: TopicWithTabIds[] }
export function useAllTopics(): QueryResults {
  const { loading, error, data } = useQuery(GET_TOPICS);

  if (loading || error || data === undefined) return { loading, error, topics: undefined }

  const topics = data.allQuestions.map((topic: TopicWithTabIds) => {
    return {
      ...topic,
      image: [
        import.meta.env.VITE_BACKEND_BASE_URL,
        import.meta.env.VITE_MEDIA_PATH,
        topic.image,
      ].join('/')
    }
  })

  return { loading, error, topics }
}
