import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  latitude: number;
  longitude: number;
}

const MapComponent: React.FC<MapProps> = ({latitude, longitude}) => {

  return (
    <MapContainer
      center={[latitude, longitude]} 
      zoom={13} 
      style={{ height: '360px', width: '100%' }}
    >
      {/* Minimalist CartoDB Positron tiles */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          Unidade Básica de Saúde da Vila Gomes
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
