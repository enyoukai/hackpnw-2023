import { useState, useCallback, memo } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
console.log(process.env.REACT_APP_MAPS_API_KEY);

const containerStyle = {
    width: '400px',
    height: '400px'
  };

function MapView(props) {
    const latitude = props.latitude || 40.7128;
    const longitude = props.longitude || 74.0060;

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

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {}
            <></>
        </GoogleMap>
    ) : <div>Loading</div>
}

export default memo(MapView)