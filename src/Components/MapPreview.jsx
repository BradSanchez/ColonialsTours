// src/components/MapPreview.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapPreview({ places, height = 420 }) {
  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <MapContainer
        center={[18.4735, -69.8854]}
        zoom={15}
        className="w-full h-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {places.map((p, i) => (
          <Marker key={i} position={[p.lat, p.lng]}>
            <Popup>{p.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}