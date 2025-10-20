import { ApolloError, gql, useQuery } from "@apollo/client";
import type { LayerDetails, LayerOnTopic } from "../types/layers";

const GET_TOPIC_LAYERS = gql`
  query TopicLayersQuery($slug: String!) {
  questionBySlug(slug: $slug) {
    id
    layersOnQuestion {
      activeByDefault
      layer {
        description
        id
        name
      }
      layerGroup {
        groupDescription
        groupName
        id
      }
    }
  }
}
`

type QUERY_RESULTS = { loading: boolean, error?: ApolloError, layers?: LayerDetails[] }
export function useTopicLayers(slug: string): QUERY_RESULTS {
  const { loading, error, data } = useQuery(
    GET_TOPIC_LAYERS,
    { variables: { slug: slug }}
  );
  
  if (loading || error) return { loading, error, layers: undefined }

  const layers = data.questionBySlug.layersOnQuestion.map(
    (layerOnTopic: LayerOnTopic) => layerOnTopic.layer
  )

  return { loading, error, layers }
}