import { ApolloError, gql, useQuery } from "@apollo/client";
import type { Tab, TabQueryResult } from "../../../types/topic";

const GET_TOPIC_TABS = gql`
  query TopicTabsQuery($slug: String!) {
    questionBySlug(slug: $slug) {
      id
      tabs {
        id
        slug
        title
        displayOrder
        iconUrl
      }
    }
  }
`

type QueryResults = [ loading: boolean, error: ApolloError | undefined, tabs: Omit<Tab,'content'>[] ]
export function useTopicTabs(slug: string): QueryResults {
  const { loading, error, data } = useQuery<{questionBySlug: { tabs: TabQueryResult[] }}>(
    GET_TOPIC_TABS,
    { variables: { slug: slug }}
  );
  
  if (loading || error || data === undefined) return [loading, error, []]

  const tabs: Omit<Tab,'content'>[] = data.questionBySlug.tabs.map((tab) => ({
    title: tab?.title,
    id: tab?.slug,
    displayOrder: tab.displayOrder,
    icon: <img src={tab.iconUrl} />,
  }))

  return [ loading, error, tabs ]
}