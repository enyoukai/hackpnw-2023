import MapView from '../components/MapView'
import { useLocation } from '../hooks/useLocation'
import { useState, useEffect } from 'react'
import axios from 'axios'

export function Discover()
{
    const { latitude, longitude } = useLocation();
    const [ coordinates, setCoordinates ] = useState([]);
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsra = (await axios.get('/posts')).data;
            setPosts(postsra);

            setCoordinates(() =>  
                postsra.map((post) => {
                    return {
                        lat: post.location.latitude,
                        lng: post.location.longitude
                    }
                })
            )
        }

        fetchPosts();
    }, []);

	return (
        <div>
            <MapView posts={posts} latitude={latitude} longitude={longitude} coordinates={coordinates} />
        </div>
	);
}