import MapView from '../components/MapView'
import { useLocation } from '../hooks/useLocation'

export function Discover()
{
    const { latitude, longitude } = useLocation();

	return (
        <div>
            <h1>check out this cool map</h1>
            <MapView latitude={latitude} longitude={longitude}/>
            <p>latitude: {latitude} longitude: {longitude}</p>
        </div>
	);
}