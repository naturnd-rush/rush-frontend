import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { SearchBox } from '@mapbox/search-js-react';
import { type SearchBoxRetrieveResponse } from '@mapbox/search-js-core'
import { divIcon, latLng, Marker, marker } from 'leaflet';

const mapPinMarker = divIcon({
  iconSize: [32,32],
  html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#74C0FC" d="M352 348.4C416.1 333.9 464 276.5 464 208C464 128.5 399.5 64 320 64C240.5 64 176 128.5 176 208C176 276.5 223.9 333.9 288 348.4L288 544C288 561.7 302.3 576 320 576C337.7 576 352 561.7 352 544L352 348.4zM328 160C297.1 160 272 185.1 272 216C272 229.3 261.3 240 248 240C234.7 240 224 229.3 224 216C224 158.6 270.6 112 328 112C341.3 112 352 122.7 352 136C352 149.3 341.3 160 328 160z"/></svg>'
})

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
      const placeMarker = marker(placeLatLng, { icon: mapPinMarker })
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
    <div style={{ pointerEvents: 'auto' }}>
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
            .SearchBox {width: ${inputWidth}}
          `
        }}
      />
    </div>
  )
}