'use client';

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  ZoomControl,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ---------------------------------------------------------------------------
//  Fix the default-icon warnings (optional)
// ---------------------------------------------------------------------------
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl: '', iconUrl: '', shadowUrl: '' });

// ---------------------------------------------------------------------------
//  Dummy hotspots — swap with live data later
// ---------------------------------------------------------------------------
const hotspots = [
  { name: 'USA',     lat: 38.0, lng:  -97.0, colour: '#1e88e5' },
  { name: 'Brazil',  lat:-10.0, lng:  -52.0, colour: '#21c87a' },
  { name: 'France',  lat: 46.0, lng:    2.0, colour: '#ffb300' },
  { name: 'Bangkok', lat: 13.7, lng: 100.5, colour: '#e53935' },
];

// ---------------------------------------------------------------------------
//  Component
// ---------------------------------------------------------------------------
export default function WorldMap() {
  /**
   *  We switch to the free **Carto “Voyager”** raster tiles.
   *  – English-only labels (no local scripts like “Анталья” / “Αθήνα”)
   *  – Light, neutral colouring that matches your current palette.
   *
   *  Docs & attribution:  https://carto.com/basemaps/   :contentReference[oaicite:0]{index=0}
   */
  const cartoURL =
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      minZoom={2}
      maxZoom={5}
      scrollWheelZoom
      worldCopyJump
      zoomControl={false}                 // we’ll place it bottom-right
      style={{ width: '100%', height: '100%', borderRadius: '1rem' }}
    >
      <TileLayer
        url={cartoURL}
        attribution='© OpenStreetMap · CartoDB'
      />

      <ZoomControl position='bottomright' />

      {hotspots.map(({ name, lat, lng, colour }) => (
        <CircleMarker
          key={name}
          center={[lat, lng]}
          radius={8}
          pathOptions={{
            color: '#fff',
            fillColor: colour,
            fillOpacity: 0.9,
            weight: 2,
          }}
        >
          <Tooltip offset={[0, -12]}>{name}</Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
