import { ApolloError, gql, useQuery } from "@apollo/client";
import type { OrderedLayerGroup } from "../../../app/types/layers";

const GET_TOPIC_LAYERS = gql`
  query TopicLayersQuery($slug: String!) {
  questionBySlug(slug: $slug) {
    id
    layerGroupsOnQuestion {
      displayOrder
      groupDescription
      groupName
      layersOnLayerGroup {
        activeByDefault
        displayOrder
        layerId
      }
    }
  }
}
`

type QUERY_RESULTS = [ loading: boolean, error?: ApolloError, layers?: OrderedLayerGroup[] ]
export function useTopicLayers(slug: string): QUERY_RESULTS {
  const { loading, error, data } = useQuery(
    GET_TOPIC_LAYERS,
    { variables: { slug: slug }}
  );
  
  if (loading || error) return [ loading, error, undefined ]

  const layers = data.questionBySlug.layerGroupsOnQuestion.map((group: any) => {
    const { layersOnLayerGroup, ...groupDetails } = group
    return { ...groupDetails, layers: layersOnLayerGroup }
  })

  return [ loading, error, layers ]
}