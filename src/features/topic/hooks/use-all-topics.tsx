import { ApolloError, gql, useQuery } from "@apollo/client";
import type { TopicWithTabIds } from "../../../types/topic";
import { expandBackendLink } from "@/utils/expand-backend-link";

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
      image: expandBackendLink(topic.image)
    }
  })

  return { loading, error, topics }
}
