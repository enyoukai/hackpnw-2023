import { useState, useCallback, memo } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100vh'
  };

function MapView(props) {
    const latitude = props.latitude || 40.7128;
    const longitude = props.longitude || -74.0060;

    const [selectedMarker, setSelectedMarker] = useState(null);

    console.log(selectedMarker);

    const handleMarkerClick = (marker) => {
      setSelectedMarker(marker);
    };

    const handleMapClick = () => {
      setSelectedMarker(null);
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
    })

    const center = {
        lat: latitude,
        lng: longitude
    };

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const onLoadMarker = marker => {
      console.log('marker: ' +  marker.position.lat() + ', ' + marker.position.lng())
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
          {
            props.coordinates.map((coordinate, idx) => 
              <MarkerF
                onLoad={onLoadMarker}
                position={coordinate}
                onClick={() => handleMarkerClick(idx)}
                />
            )
          }
        {selectedMarker && (
              <InfoWindow
                position={{ lat: props.coordinates[selectedMarker].lat, lng: props.coordinates[selectedMarker].lng }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div>{props.posts[selectedMarker].title}</div>
              </InfoWindow>
            )}
        </GoogleMap>
    ) : <div>Loading</div>
}

export default memo(MapView)