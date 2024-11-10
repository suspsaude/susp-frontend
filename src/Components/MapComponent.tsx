import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent: React.FC = () => {

  return (
    <MapContainer
      center={[-23.561684, -46.625378]} 
      zoom={13}
      style={{ height: '360px', width: '100%' }}
    >
      {/* Minimalist CartoDB Positron tiles */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[-23.561684, -46.625378]}>
        <Popup>
          Unidade Básica de Saúde da Vila Gomes
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
