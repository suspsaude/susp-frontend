import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  latitude: number;
  longitude: number;
  name: string;
}

const MapComponent: React.FC<MapProps> = ({ latitude, longitude, name }) => {
  const handleMarkerClick = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: '360px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[latitude, longitude]} eventHandlers={{ click: handleMarkerClick }}>
        <Popup>
          {name}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;