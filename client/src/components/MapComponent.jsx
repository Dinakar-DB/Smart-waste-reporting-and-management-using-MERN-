import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Link ,useParams} from 'react-router-dom';



const libraries = ['places']; // Optional: For using Places API features
const mapContainerStyle = {
  width: '1000px',
  height: '500px',
  margin: '0 auto', // Center the map horizontally
};

const initialPosition = {
  lat: 13.0827, // Replace with a default latitude
  lng: 80.2707, // Replace with a default longitude
};


const MapComponent = () => {
  const { id } = useParams(); // Use useParams to get route parameters
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State for success alert

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(initialPosition);

  const handleMarkerDragEnd = (e) => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();

    // Update marker position
    setMarkerPosition({ lat, lng });
  };

  
  const handleMapClick = (e) => {
    // Update marker position on map click
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setMarkerPosition({ lat, lng });
  };
  
  const handleSubmit = () => {
    const { lat, lng } = markerPosition;

    // Post latitude and longitude to REST API (replace with your API endpoint)
     fetch(`http://localhost:4000/api/v1/bin/map/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lat: lat,
        long: lng,
      }),
    })
    
      .then((response) => response.json())
      .then((data) => {
        console.log('API response:', data);
        setShowSuccessAlert(true); // Show success alert on successful response
        // Redirect to view_bin_admin after a delay (adjust the delay as needed)
        setTimeout(() => {
          alert('Updated successfully.')
          window.location.href = "/view_bin_admin";

        }, 100); // Redirect after 2 seconds (2000 milliseconds)
      })
      .catch((error) => console.error('API error:', error));
};


  return (
    <div style={{ textAlign: 'center' }}>
    <LoadScript googleMapsApiKey="AIzaSyBY7Leo8nAxXuX_PpmZwkCeSB5okxW9Vbk" libraries={libraries}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={initialPosition}
        zoom={15}
        onLoad={(map) => setMap(map)}
        onClick={handleMapClick}
      >
        <Marker
          position={markerPosition}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
        />
      </GoogleMap>
      <div>
        <br></br>
        <label>Latitude: </label>
        <input type="text" value={markerPosition.lat} readOnly />

        <label>Longitude: </label>
        <input type="text" value={markerPosition.lng} readOnly /><br></br>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </LoadScript>
    </div>
  );
};

export default MapComponent;
