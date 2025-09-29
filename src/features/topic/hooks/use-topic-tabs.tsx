import { ApolloError, gql, useQuery } from "@apollo/client";
import parse from 'html-react-parser';
import type { Tab, TabQueryResult } from "../types/topic";

const GET_TOPIC_TABS = gql`
  query TopicTabsQuery($id: UUID!) {
    question(id: $id) {
      id
      tabs {
        id
        title
        content
      }
    }
  }
`

type QueryResults = { loading: boolean, error?: ApolloError, tabs: Tab[] }
export function useTopicTabs(id: string): QueryResults {
  const { loading, error, data } = useQuery<{question: { tabs: TabQueryResult[] }}>(
    GET_TOPIC_TABS,
    { variables: { id: id }}
  );
  
  if (loading || error || data === undefined) return { loading, error, tabs: [] }

  const tabs: Tab[] = data.question.tabs.map((tab) => ({
    title: tab.title,
    id: tab.id,
    content: parse(tab.content),
  }))

  return { loading, error, tabs }
}