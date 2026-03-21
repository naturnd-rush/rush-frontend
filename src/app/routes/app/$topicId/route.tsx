import Spacer from '@/components/spacer'
import Legend from '@/features/map/components/legend'
import MapControlOverlay, { MapControl } from '@/features/map/components/map-control-overlay'
import MapView from '@/features/map/components/map-view'
import { useTopicLayers } from '@/features/map/hooks/use-topic-layers'
import { byDisplayOrder } from '@/lib/GraphQLProvider'
import { createFileRoute, Outlet, stripSearchParams } from '@tanstack/react-router'
import LegendGroup from '@/features/map/components/legend-group'
import LayerController from '@/features/map/components/layer-controller'
import { PlacesAutocomplete } from '@/features/search/components/places-autocomplete'
import { useTheme } from '@/theme'
import { useMediaQuery } from 'styled-breakpoints/use-media-query'
import Control from 'react-leaflet-custom-control'
import ShareModalButton from '@/features/map/components/share-modal-button'
import { latLng } from 'leaflet'

type MapSearch = {
  zoom: number,
  lat: number,
  lng: number
}

const defaultMapSearchValues = {
  zoom: 12,
  lat: 48.46557,
  lng: -123.314736,
}

export const Route = createFileRoute('/app/$topicId')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): MapSearch => {
    // validate and parse search params
    const zoom = Number(search?.zoom ?? defaultMapSearchValues.zoom)
    const lat = Number(search?.lat ?? defaultMapSearchValues.lat)
    const lng = Number(search?.lng ?? defaultMapSearchValues.lng)
    
    return {
      zoom: zoom,
      lat: lat,
      lng: lng,
    }
  },
  search: {
    middlewares: [stripSearchParams(defaultMapSearchValues)]
  }
})


function RouteComponent() {
  const { topicId } = Route.useParams()
  const { zoom, lat, lng } = Route.useSearch()
  const center = latLng(lat, lng)
  
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
          <MapControl style={{
            minHeight: '30%',
            maxHeight: isMobileOrTablet ? '40%' : undefined,
          }}>
            <Outlet />
          </MapControl>
          <Spacer />
          <MapControl style={{
            minWidth: '24rem',
            alignSelf: isMobileOrTablet ? 'flex-end' : 'unset',
            alignItems: 'flex-end'
          }}>
            <PlacesAutocomplete />
            <Legend loading={loading}>
              {error?.message}
              { groups }
            </Legend>
            <Spacer />
            <ShareModalButton />
        </MapControl>
        </MapControlOverlay>
      </Control>
    </MapView>
  )
}
