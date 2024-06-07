import React from "react";
import { MapContainer as LeafletMap, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
// import "leaflet/dist/leaflet.css";

const MapContainer = ({ locations }) => {
  // Define custom icon
  const locatorIcon = L.icon({
    iconUrl: "/locator-icon.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <LeafletMap
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location) => (
        <Marker
          key={location.properties.OBJECTID}
          position={[
            location.geometry.coordinates[1],
            location.geometry.coordinates[0],
          ]}
          icon={locatorIcon}
        />
      ))}
    </LeafletMap>
  );
};

export default MapContainer;
