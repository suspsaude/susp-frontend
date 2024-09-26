import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fixing Leaflet icon paths
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const MapComponent: React.FC = () => {

  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });
  }, []);

  return (
    <MapContainer
      center={[-23.561684, -46.625378]} 
      zoom={13} 
      style={{ height: '350px', width: '100%' }}
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
