import { ApolloError, gql, useQuery } from "@apollo/client";
import type { Topic, TabSlugs, TopicWithTabIds } from "../../../types/topic";
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
        slug
      }
    }
  }
`

type QueryResults = { loading: boolean, error?: ApolloError, topics?: TopicWithTabIds[] }
export function useAllTopics(): QueryResults {
  const { loading, error, data } = useQuery(GET_TOPICS);

  if (loading || error || data === undefined) return { loading, error, topics: undefined }

  const topics = data.allQuestions.map((topic: Topic & TabSlugs) => {
    return {
      ...topic,
      tabs: topic.tabs.map((tab) => {return {...tab, id: tab.slug}}),
      image: expandBackendLink(topic.image)
    }
  })

  return { loading, error, topics }
}
