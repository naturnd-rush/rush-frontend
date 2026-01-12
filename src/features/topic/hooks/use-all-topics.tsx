import { ApolloError, gql, useQuery } from "@apollo/client";
import type { Topic, TabSlugs, TabIds, TopicSash } from "../../../types/topic";
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
      sash {
        backgroundColor
        text
        textColor
      }
    }
  }
`

type TopicData = Topic & TabIds & TopicSash
type QueryResults = { loading: boolean, error?: ApolloError, topics?: TopicData[] }
export function useAllTopics(): QueryResults {
  const { loading, error, data } = useQuery(GET_TOPICS);

  if (loading || error || data === undefined) return { loading, error, topics: undefined }

  const topics = data.allQuestions.map((
    topic: Topic & TabSlugs & TopicSash & { sash?: { text: string }}
  ) => {
    return {
      ...topic,
      sash: topic.sash ? {
        backgroundColor: topic.sash.backgroundColor,
        name: topic.sash.text,
        textColor: topic.sash.textColor,
      } : null,
      tabs: topic.tabs.map((tab) => {return {...tab, id: tab.slug}}),
      image: expandBackendLink(topic.image)
    }
  })

  return { loading, error, topics }
}
