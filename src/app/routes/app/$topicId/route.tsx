import Spacer from '@/components/spacer'
import Legend from '@/features/map/components/legend'
import MapControlOverlay, { MapControl } from '@/features/map/components/map-control-overlay'
import MapView from '@/features/map/components/map-view'
import { useTopicLayers } from '@/features/map/hooks/use-topic-layers'
import { byDisplayOrder } from '@/lib/GraphQLProvider'
import { createFileRoute, Outlet, useParams } from '@tanstack/react-router'
import LegendGroup from '@/features/map/components/legend-group'
import LayerController from '@/features/map/components/layer-controller'
import { PlacesAutocomplete } from '@/features/search/components/places-autocomplete'
import { useTheme } from '@/theme'
import { useMediaQuery } from 'styled-breakpoints/use-media-query'
import Control from 'react-leaflet-custom-control'
import ShareModalButton from '@/features/map/components/share-modal-button'
import { latLng } from 'leaflet'
import { useTopic } from '@/features/topic/hooks/use-topic'
import ContentContainer from '@/features/content/components/content-container'

export const Route = createFileRoute('/app/$topicId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { topicId } = Route.useParams()
  const { tabId } = useParams({ strict: false }) // Get child tabId from loose params for setting active tab
  const { zoom, lat, lng, activeLayers } = Route.useSearch()
  const center = latLng(lat, lng)
  const searchHasActiveLayers = activeLayers.length > 0
  
  // Map Layer API Call
  const [ loading, error, layerGroups ] = useTopicLayers(topicId)
  
  const groups = layerGroups
    ? [...layerGroups]
        .sort(byDisplayOrder)
        .map((group) => {
          const { layers, ...groupDetails } = group

          return (
            <LegendGroup key={group.groupName} {...groupDetails}>
              { [...layers].sort(byDisplayOrder).map((layer) => {
                const activeByDefault = searchHasActiveLayers
                  ? activeLayers.includes(layer.layerId)
                  : layer.activeByDefault
                return (
                  <LayerController key={layer.layerId} {...layer} activeByDefault={activeByDefault} />
                )
              })}
            </LegendGroup>
          )
        })
    : null

  const { down } = useTheme().breakpoints
  const isMobileOrTablet = useMediaQuery(down('lg'))

  const [ loadingTopic, errorTopic, topic ] = useTopic(topicId)
  const { hasInitiatives, ...topicContent } = { hasInitiatives: false, tabs: [], title: '', ...topic }
  
  // TODO: handle and display loading and error states.

  return (
    <MapView
      zoom={zoom}
      center={center}
      style={{
        width: '100%',
        height: 'calc(100% - 40px)',
        position: 'absolute',
        top: '40px',
        left: '0',
      }}
    >
      <Control position='topleft'>
        <MapControlOverlay>
          {/* ContentView */}
          <MapControl style={{
            minHeight: '30%',
            //maxHeight: isMobileOrTablet ? '40%' : undefined,
          }}>
            <ContentContainer
              activeTabId={tabId}
              isTopicLoading={loadingTopic}
              {...topicContent}
            >
              <Outlet />
              { errorTopic?.message }
            </ContentContainer>
          </MapControl>
          <Spacer />

          {/* LegendView */}
          <MapControl style={{
            minWidth: 'min(24rem, 100%)',
            maxWidth: '100%',
            alignSelf: isMobileOrTablet ? 'flex-end' : 'unset',
            alignItems: 'flex-end'
          }}>
            <PlacesAutocomplete />
            <Legend loading={loading}>
              {error?.message}
              { groups }
            </Legend>
            { isMobileOrTablet ? null : <Spacer /> }
            <ShareModalButton />
        </MapControl>
        </MapControlOverlay>
      </Control>
    </MapView>
  )
}
