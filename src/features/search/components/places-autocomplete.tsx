import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { useMap } from "react-leaflet";
import { SearchBox } from "@mapbox/search-js-react";
import { type SearchBoxRetrieveResponse } from "@mapbox/search-js-core";
import { divIcon, latLng, Marker, marker } from "leaflet";
import { LocateControl } from "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import "../css/leaflet.locate.override.css";

type PlacesAutocompleteApi = {
  placeApi: [
    Marker<any> | null,
    Dispatch<SetStateAction<Marker<any> | null>>
  ],
  locateApi: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ],
}

const mapPinMarker = divIcon({
  className: "",
  iconSize: [32, 32],
  html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#77bb41" d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/></svg>',
});

export const PlacesAutocomplete = () => {
  const map = useMap();
  const { placeApi, locateApi } = usePlacesAutocomplete();
  const [placeMarker, setPlaceMarker] = placeApi;
  const [locate, setLocate] = locateApi;
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  
  const locateControl = new LocateControl({
    position: 'topright'
  })

  useEffect(() => {
    if (map === undefined) return;

    // Restore placeMarker if exists from a previous page
    if (placeMarker) map.addLayer(placeMarker);

    // Add leaflet onmove listener to update autocomplete viewport restrictions
    const onMoveOrZoom = () => {
      const center = map.getCenter();
      setMapCenter({ lat: center.lat, lng: center.lng });
    };
    map.on("moveend zoomend", onMoveOrZoom);

    // Set bounds once on load
    onMoveOrZoom();

    // Current location control
    map.addControl(locateControl)
    if (locate) locateControl.start();
    const onLocateActivate = () => setLocate(true)
    map.on("locateactivate", onLocateActivate)
    const onLocateDeactivate = () => {setLocate(false); console.log('deactivate')}
    map.on("locatedeactivate", onLocateDeactivate)

    return () => {
      if (placeMarker) map.removeLayer(placeMarker);
      map.off("moveend zoomend", onMoveOrZoom);
      map.off("locateactivate", onLocateActivate)
      map.off("locatedeactivate", onLocateDeactivate)
      map.removeControl(locateControl)
    };
  }, [map, placeMarker, setMapCenter]);

  const placeholderText = 'Search for an address, point of interest...'

  const onRetrieve = (res: SearchBoxRetrieveResponse) => {
    const place = res.features[0];
    if (place?.geometry.coordinates) {
      // convert location to leaflet latlng
      const placeLatLng = latLng(
        place.geometry.coordinates[1],
        place.geometry.coordinates[0]
      );

      // add a marker to the map
      const placeMarker = marker(placeLatLng, { icon: mapPinMarker });
      placeMarker.bindPopup(place.properties.name, { offset: [0, 2] });
      map.addLayer(placeMarker);
      map.flyTo(placeLatLng, 14);
      setPlaceMarker(placeMarker);
    }
  };

  const onClear = () => {
    if (placeMarker != null) {
      map.removeLayer(placeMarker);
      setPlaceMarker(null);
    }
  };


  return (
    <div 
      style={{
        pointerEvents: 'auto',
        width: '100%',
      }}
    >
      <SearchBox
        accessToken="pk.eyJ1IjoicnVzaGFkbWluIiwiYSI6ImNtYzJudWd6czBhNTkybHEzNHdpNGE1MTUifQ.T-8P_6hh3kai9tTzjtvcTQ"
        placeholder={placeholderText}
        onRetrieve={onRetrieve}
        onClear={onClear}
        options={{
          language: "en",
          country: "CA",
          proximity: mapCenter ? mapCenter : latLng([48.46557, -123.314736]),
        }}
        popoverOptions={{
          offset: 5,
        }}
        theme={{
          variables: {
            minWidth: '100%'
          },
          cssText: `
            .SearchBox {
              width: calc(100% - 46px);
              border-radius: var(--panel-border-radius);
            }
            .Results { left: auto !important; top: 46px !important; }
          `,
        }}
      />
    </div>
  );
};

const PlacesAutocompleteContext = createContext<PlacesAutocompleteApi | null>(null)

export const PlacesAutocompleteProvider = (
  { children }: { children?: ReactNode | undefined}
) => {
  const markerState = useState<Marker | null>(null);
  const locateState = useState(false);

  return (
    <PlacesAutocompleteContext.Provider value={{placeApi: markerState, locateApi: locateState}}>
      {children}
    </PlacesAutocompleteContext.Provider>
  )
}

const usePlacesAutocomplete = () => {
  const placesAutocompleteState = useContext(PlacesAutocompleteContext)
  if (!placesAutocompleteState) {
    throw new Error('Missing PlacesAutocompleteContext')
  }
  return placesAutocompleteState
}