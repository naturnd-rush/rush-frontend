import { ApolloError, gql, useQuery } from "@apollo/client";
import type { TopicContent } from "../types/topic";

const GET_TOPIC = gql`
  query TopicLayersQuery($id: UUID!) {
    question(id: $id) {
      id
      image
      title
      subtitle
      tabs {
        id
        title
      }
    }
  }
`

type QueryResults = { loading: boolean, error?: ApolloError, topic?: TopicContent }
export function useTopic(id: string): QueryResults {
  const { loading, error, data } = useQuery<{question: TopicContent}>(
    GET_TOPIC,
    { variables: { id: id }}
  );
  
  if (loading || error || data === undefined) return { loading, error, topic: undefined }

  const topic: TopicContent = {
    title: data.question.title,
    tabs: data.question.tabs.map((tab) => ({
      title: tab.title,
      id: tab.id,
      content: ''
    }))
  }

  return { loading, error, topic }
}