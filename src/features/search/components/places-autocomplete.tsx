import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { SearchBox } from '@mapbox/search-js-react';
import { type SearchBoxRetrieveResponse } from '@mapbox/search-js-core'
import { latLng, Marker, marker } from 'leaflet';

export const PlacesAutocomplete = () => {
  const map = useMap();
  const [placeMarker, setPlaceMarker] = useState<Marker | null>(null);
  const [mapCenter, setMapCenter] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    if (map === undefined) return

    // Add leaflet onmove listener to update autocomplete viewport restrictions
    const onMoveOrZoom = () => {
      const center = map.getCenter()
      setMapCenter({lat: center.lat, lng: center.lng})
    }
    map.on('moveend zoomend', onMoveOrZoom)

    // Set bounds once on load
    onMoveOrZoom()

    return () => {
      if (placeMarker) map.removeLayer(placeMarker)
      map.off('moveend zoomend', onMoveOrZoom)
    }
  }, [ map, placeMarker, setMapCenter ])

  const placeholderText = 'Search...'
    // 'Search for an address, business, or point of interest...'

  const inputWidth = '100%'
    // '27rem'

  //const inputPosition = 'topleft'

  const onRetrieve = (res: SearchBoxRetrieveResponse) => {
    const place = res.features[0];
    if (place?.geometry.coordinates) {
      // convert location to leaflet latlng
      const placeLatLng = latLng(
        place.geometry.coordinates[1],
        place.geometry.coordinates[0]
      )
      
      // add a marker to the map
      const placeMarker = marker(placeLatLng)
      placeMarker.bindPopup(place.properties.name,
        {offset: [0,2]});
      map.addLayer(placeMarker)
      map.flyTo(placeLatLng, 14)
      setPlaceMarker(placeMarker)
    }
  }

  const onClear = () => {
    if (placeMarker != null) {
      map.removeLayer(placeMarker)
      setPlaceMarker(null)
    }
  }

  return (
    <SearchBox
      accessToken='pk.eyJ1IjoicnVzaGFkbWluIiwiYSI6ImNtYzJudWd6czBhNTkybHEzNHdpNGE1MTUifQ.T-8P_6hh3kai9tTzjtvcTQ'
      placeholder={placeholderText}
      onRetrieve={onRetrieve}
      onClear={onClear}
      options={{
        language: 'en',
        country: 'CA',
        proximity: mapCenter ? mapCenter : latLng([48.46557, -123.314736])
      }}
      popoverOptions={{
        offset: 5
      }}
      theme={{
        cssText: `
          .Results { left: 0 !important; top: 46px !important; }
          .SearchBox {width: ${inputWidth}}
        `
      }}
    />
  )
}