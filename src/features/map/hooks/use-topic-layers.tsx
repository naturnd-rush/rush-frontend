import { ApolloError, gql, useQuery } from "@apollo/client";
import parse from 'html-react-parser';
import type { OrderedLayerGroup } from "../../../types/layers";

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
    const { layersOnLayerGroup, groupDescription, ...groupDetails } = group
    return {
      ...groupDetails,
      groupDescription: parse(groupDescription ?? ''),
      layers: layersOnLayerGroup
    }
  })

  return [ loading, error, layers ]
}