import { ApolloError, gql, useQuery } from "@apollo/client";
import parse from 'html-react-parser';
import type { Tab, TabQueryResult } from "../../../types/topic";

const GET_TOPIC_TABS = gql`
  query TopicTabsQuery($slug: String!) {
    questionBySlug(slug: $slug) {
      id
      tabs {
        id
        title
        content
      }
    }
  }
`

type QueryResults = [ loading: boolean, error: ApolloError | undefined, tabs: Tab[] ]
export function useTopicTabs(slug: string): QueryResults {
  const { loading, error, data } = useQuery<{questionBySlug: { tabs: TabQueryResult[] }}>(
    GET_TOPIC_TABS,
    { variables: { slug: slug }}
  );
  
  if (loading || error || data === undefined) return [loading, error, []]

  const tabs: Tab[] = data.questionBySlug.tabs.map((tab) => ({
    title: tab.title,
    id: tab.id,
    content: parse(tab.content),
  }))

  return [ loading, error, tabs ]
}