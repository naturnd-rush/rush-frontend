import { ApolloError, gql, useQuery } from "@apollo/client";
import parse from 'html-react-parser';
import type { Tab, TabQueryResult } from "../../../types/topic";

const GET_TAB = gql`
  query TopicTabQuery($questionSlug: String!, $questionTabSlug: String!) {
    questionTabBySlug(questionSlug: $questionSlug, questionTabSlug: $questionTabSlug) {
      id
      slug
      title
      content
      displayOrder
      iconUrl
    }
  }
`

const GET_DEFAULT_TAB = gql`
  query TopicTabQuery($questionSlug: String!) {
    defaultQuestionTab(questionSlug: $questionSlug) {
      id
      slug
      title
      content
      displayOrder
      iconUrl
    }
  }
`

type TabBySlugQueryResult = { questionTabBySlug: TabQueryResult }
type DefaultTabQueryResult = { defaultQuestionTab: TabQueryResult }
const isTabQueryResult = (
  result: TabBySlugQueryResult | DefaultTabQueryResult
): result is TabBySlugQueryResult => 'questionTabBySlug' in result;
const isDefaultTabQueryResult = (
  result: TabBySlugQueryResult | DefaultTabQueryResult
): result is DefaultTabQueryResult => 'defaultQuestionTab' in result;

type UseTopicTabResults = [ loading: boolean, error: ApolloError | undefined, tab: Tab | undefined ]
export function useTopicTab(
  questionSlug: string,
  questionTabSlug: string | undefined
): UseTopicTabResults {
  let useTab = undefined;
  if (questionTabSlug === undefined) {
    useTab = () => useQuery<DefaultTabQueryResult>(
      GET_DEFAULT_TAB,
      {variables: { questionSlug: questionSlug }}
    )
  } else {
    useTab = () => useQuery<TabBySlugQueryResult>(
      GET_TAB,
      {variables: { questionSlug: questionSlug, questionTabSlug: questionTabSlug }}
    )
  }

  const { loading, error, data } = useTab()
  
  if (loading || error || data === undefined) return [loading, error, undefined]
  
  const tabResult = isTabQueryResult(data)
  ? data.questionTabBySlug
  : isDefaultTabQueryResult(data)
  ? data.defaultQuestionTab
  : undefined
  
  if (tabResult === undefined) return [loading, error, undefined]
  
  const tab: Tab = {
    title: tabResult.title,
    id: tabResult.slug,
    content: parse(tabResult.content),
    displayOrder: tabResult.displayOrder,
    icon: <img src={tabResult.iconUrl} />,
  }

  return [ loading, error, tab]
}