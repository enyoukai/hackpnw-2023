import React, { useState, useEffect } from 'react';

export const useLocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
	if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(
		(position) => {
			setLatitude(position.coords.latitude);
			setLongitude(position.coords.longitude);
		},
		(error) => {
			console.log('Error retrieving location:', error);
		}
	);
	} else {
	console.log('Geolocation is not supported by this browser.');
	}
  }, []);

  return { latitude, longitude };
};
