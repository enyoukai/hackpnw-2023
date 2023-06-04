import Autocomplete from "react-google-autocomplete";

const AddressAutocomplete = () => {
	const API_KEY = console.log(process.env.REACT_APP_MAPS_API_KEY);
	return (
		<Autocomplete
			apiKey={API_KEY}
			style={{ width: "90%" }}
			onPlaceSelected={(place) => {
				console.log(place);
			}}
			options={{
				types: ["(regions)"],
				componentRestrictions: { country: "ru" },
			}}
			defaultValue="Amsterdam"
		/>
	);
};

export default AddressAutocomplete;

// const AddressAutocomplete = () => {
//   const handlePlaceSelect = (place) => {
//     console.log(place);
//     // Handle the selected place
//   };

//   return (
//     <div>
//       <GooglePlacesAutocomplete
//         onSelect={handlePlaceSelect}
//         apiKey="YOUR_API_KEY"
//         autocompletionRequest={{
//           types: ['address'],
//         }}
//       />
//     </div>
//   );
// };

// export default AddressAutocomplete;

// export function LocationDropdown() {
//   const [address, setAddress] = useState('');
//   const [coordinates, setCoordinates] = useState(null);

//   const handlePlaceSelect = async (place) => {
//     const formattedAddress = place.formatted_address;
//     setAddress(formattedAddress);

//     try {
//       const results = await geocodeByAddress(formattedAddress);
//       const latLng = await getLatLng(results[0]);
//       setCoordinates(latLng);
//     } catch (error) {
//       console.log('Error fetching geolocation:', error);
//     }
//   };

//   return (
//     <div>
//       <GooglePlacesAutocomplete
//         onSelect={handlePlaceSelect}
//         apiKey="YOUR_API_KEY"
//         autocompletionRequest={{
//           types: ['address'],
//         }}
//       />
//       <p>Selected Address: {address}</p>
//       {coordinates && (
//         <p>
//           Latitude: {coordinates.lat}, Longitude: {coordinates.lng}
//         </p>
//       )}
//     </div>
//   );
// };
