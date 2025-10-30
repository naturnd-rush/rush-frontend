import { ApolloError, gql, useQuery } from "@apollo/client";
import type { TabQueryResult, TopicContent } from "../../../types/topic";

const GET_TOPIC = gql`
  query TopicLayersQuery($slug: String!) {
    questionBySlug(slug: $slug) {
      id
      slug
      image
      title
      subtitle
      tabs {
        id
        slug
        title
      }
    }
  }
`

type QueryResults = { loading: boolean, error?: ApolloError, topic?: TopicContent }
export function useTopic(slug: string): QueryResults {
  const { loading, error, data } = useQuery<{
    questionBySlug: { title: string, tabs: TabQueryResult[] }
  }>(
    GET_TOPIC,
    { variables: { slug: slug }}
  );
  
  if (loading || error || data === undefined) return { loading, error, topic: undefined }

  const topic: TopicContent = {
    title: data.questionBySlug.title,
    tabs: data.questionBySlug.tabs.map((tab) => ({
      title: tab.title,
      id: tab.slug,
      content: ''
    }))
  }

  return { loading, error, topic }
}