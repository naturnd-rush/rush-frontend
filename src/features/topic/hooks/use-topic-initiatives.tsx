import { ApolloError, gql, useQuery } from "@apollo/client";
import parse from 'html-react-parser';
import type { Initiative } from "../../../types/topic";
import { expandBackendLink } from "@/utils/expand-backend-link";

const GET_TOPIC_INITIATIVES = gql`
  query TopicTabsQuery($slug: String!) {
    questionBySlug(slug: $slug) {
      id
      initiatives {
        content
        id
        image
        link
        title
        tags {
          id
          name
        }
      }
    }
  }
`

type QueryResults = [ loading: boolean, error: ApolloError | undefined, initiatives: Initiative[] ]
export function useTopicInitiatives(slug: string): QueryResults {
  const { loading, error, data } = useQuery<{questionBySlug: { initiatives: Initiative[] }}>(
    GET_TOPIC_INITIATIVES,
    { variables: { slug: slug }}
  );
  
  if (loading || error || data === undefined) return [ loading, error, [] ]

  const initiatives: Initiative[] = data.questionBySlug.initiatives.map((initiative) => ({
    ...initiative,
    image: expandBackendLink(initiative.image) ?? '',
    tags: initiative.tags.map((tag) => ({
      ...tag,
      color: tag.color ?? 'white',
      bgColor: tag.bgColor ?? 'rgb(56, 161, 105)',
    })),
    content: typeof initiative.content === 'string'
      ? parse(initiative.content)
      : initiative.content
  }))

  return [ loading, error, initiatives ]
}