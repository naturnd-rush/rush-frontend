import Spacer from '@/components/spacer'
import Legend from '@/features/map/components/legend'
import MapControlOverlay, { MapControl } from '@/features/map/components/map-control-overlay'
import MapView from '@/features/map/components/map-view'
import { useTopicLayers } from '@/features/map/hooks/use-topic-layers'
import { byDisplayOrder } from '@/lib/GraphQLProvider'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import LegendGroup from '@/features/map/components/legend-group'
import LayerController from '@/features/map/components/layer-controller'
import { PlacesAutocomplete } from '@/features/search/components/places-autocomplete'
import { useTheme } from '@/theme'
import { useMediaQuery } from 'styled-breakpoints/use-media-query'
import Control from 'react-leaflet-custom-control'

export const Route = createFileRoute('/app/$topicId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { topicId } = Route.useParams()
  
  // Map Layer API Call
  const [ loading, error, layerGroups ] = useTopicLayers(topicId)
  
  const groups = layerGroups
    ? [...layerGroups]
        .sort(byDisplayOrder)
        .map((group) => {
          const { layers, ...groupDetails } = group

          return (
            <LegendGroup {...groupDetails}>
              { [...layers].sort(byDisplayOrder).map((layer) => (
                <LayerController {...layer} />
              ))}
            </LegendGroup>
          )
        })
    : null

  const { down } = useTheme().breakpoints
  const isMobileOrTablet = useMediaQuery(down('lg'))
  
  // TODO: handle and display loading and error states.

  return (
    <MapControlOverlay>
      <MapView
        style={{
          width: '100%',
          height: 'calc(100% - 40px)',
          position: 'absolute',
          top: '40px',
          left: '0',
        }}
        controls={false && (
          <>
            <MapControl style={{
              minHeight: '30%',
            }}>
              
            </MapControl>
            <Spacer />
            <MapControl style={{
              position: isMobileOrTablet ? 'unset' : 'relative', /* for MapBox Search Results */
              alignItems: 'flex-end',
            }}> 
              
            </MapControl>
          </>
        )}
      >
        <Control position='topleft'>
          <MapControl style={{
            minHeight: '30%',
          }}>
            <Outlet />
          </MapControl>
        </Control>
        <Control position='topright'>
          <MapControl>
            <PlacesAutocomplete />
            <Legend loading={loading}>
              {error?.message}
              { groups }
            </Legend>
          </MapControl>
        </Control>
      </MapView>
    </MapControlOverlay>
  )
}
