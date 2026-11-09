import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useNavigate, useParams } from 'react-router-dom';



const libraries = ['places']; // Optional: For using Places API features
const mapContainerStyle = {
  width: 'min(100%, 1000px)',
  height: 'min(65vh, 500px)',
  margin: '0 auto', // Center the map horizontally
};

const initialPosition = {
  lat: 13.0827, // Replace with a default latitude
  lng: 80.2707, // Replace with a default longitude
};


const MapComponent = () => {
  const { id } = useParams(); // Use useParams to get route parameters
  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(initialPosition);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadBinLocation = async () => {
      try {
        const response = await fetch(`/api/v1/bin/${id}`);
        const bin = await response.json();
        if (!response.ok) throw new Error(bin.message || `Could not load bin (${response.status}).`);
        if (Number.isFinite(Number(bin.lat)) && Number.isFinite(Number(bin.long))) {
          const position = { lat: Number(bin.lat), lng: Number(bin.long) };
          setMarkerPosition(position);
          map?.panTo(position);
        }
      } catch (loadError) {
        setError(loadError.message || 'Could not load the bin location.');
      } finally {
        setLoading(false);
      }
    };
    loadBinLocation();
  }, [id, map]);

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
  
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('This browser does not support location services.');
      return;
    }
    setError('');
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const position = { lat: coords.latitude, lng: coords.longitude };
      setMarkerPosition(position);
      map?.panTo(position);
      map?.setZoom(17);
    }, (locationError) => {
      setError(locationError.code === locationError.PERMISSION_DENIED
        ? 'Location access is blocked. Allow it in the browser site settings and try again.'
        : locationError.code === locationError.TIMEOUT
          ? 'Could not determine your location in time. Try again outdoors or check GPS.'
          : 'Could not determine your location. Check the device location settings.');
    }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 });
  };

  const handleSubmit = async () => {
    const { lat, lng } = markerPosition;
    setSaving(true);
    setError('');
    try {
      const response = await fetch(`/api/v1/bin/map/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ lat, long: lng }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || `Could not update bin location (${response.status}).`);
      alert('Bin location updated successfully.');
      navigate('/view_bin_admin');
    } catch (saveError) {
      setError(saveError.message || 'Could not save the selected location.');
    } finally {
      setSaving(false);
    }
  };


  return (
    <div style={{ textAlign: 'center' }}>
    <LoadScript googleMapsApiKey="AIzaSyBY7Leo8nAxXuX_PpmZwkCeSB5okxW9Vbk" libraries={libraries}>
      {loading && <p>Loading saved bin location…</p>}
      {error && <p role="alert">{error}</p>}
      <button type="button" onClick={handleCurrentLocation}>Use my current location</button>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={markerPosition}
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
        <button onClick={handleSubmit} disabled={saving}>{saving ? 'Saving…' : 'Save location'}</button>
      </div>
    </LoadScript>
    </div>
  );
};

export default MapComponent;
