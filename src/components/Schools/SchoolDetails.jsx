import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet.fullscreen";
import "leaflet.fullscreen/Control.FullScreen.css";
import LoadingSpinner from "../smallComponents/LoadingSpinner";

// Fix marker icon issue with Leaflet and Webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Routing = ({ start, end }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      routeWhileDragging: true,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, start, end]);

  return null;
};

const SchoolDetails = () => {
  const { id } = useParams();
  const [locations, setLocations] = useState([]);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    fetch(
      "https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulen_OpenData/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson#"
    )
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.features);
        setLoading(false); // Data fetching complete
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Error occurred
      });

    // Get the current location
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  useEffect(() => {
    if (locations.length > 0) {
      const single = locations.find((location) => location.id == id);
      setDetails(single);
    }
  }, [locations, id]);

  useEffect(() => {
    if (currentPosition && details) {
      const { coordinates } = details.geometry;
      const schoolPosition = [coordinates[1], coordinates[0]];

      const lat1 = currentPosition[0];
      const lon1 = currentPosition[1];
      const lat2 = schoolPosition[0];
      const lon2 = schoolPosition[1];

      // Calculate distance using Haversine formula
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        0.5 -
        Math.cos(dLat) / 2 +
        (Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          (1 - Math.cos(dLon))) /
          2;
      const distance = R * 2 * Math.asin(Math.sqrt(a));

      setDistance(distance.toFixed(2));
    }
  }, [currentPosition, details]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!details) {
    return <p>Location not found</p>;
  }

  const { coordinates } = details.geometry;

  return (
    <div className="flex justify-center items-center">
      <div className="card w-4/5 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{details.properties.BEZEICHNUNG}</h2>
          <p>
            Address: {details.properties.STRASSE}, {details.properties.ORT}
          </p>
          <p>Type: {details.properties.TYP}</p>
          <p>Art: {details.properties.ART}</p>
          <p>Standorttyp: {details.properties.STANDORTTYP}</p>
          <p>
            Telephone:{" "}
            <span type="telephone">{details.properties.TELEFON}</span>
          </p>
          <p>Email: {details.properties.EMAIL}</p>
          {distance && (
            <p className="font-bold">
              Distance from current location: {distance} km
            </p>
          )}
        </div>
        <figure>
          <div style={{ height: "400px", width: "100%", marginTop: "20px" }}>
            <MapContainer
              center={[coordinates[1], coordinates[0]]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[coordinates[1], coordinates[0]]}
                eventHandlers={{
                  click: () => {
                    const popup = L.popup()
                      .setLatLng([coordinates[1], coordinates[0]])
                      .setContent(details.properties.BEZEICHNUNG);
                    map.openPopup(popup);
                  },
                }}
              >
                <Popup>{details.properties.BEZEICHNUNG}</Popup>
              </Marker>
              {currentPosition && (
                <Routing
                  start={currentPosition}
                  end={[coordinates[1], coordinates[0]]}
                />
              )}
              <MapControlFullScreen />
            </MapContainer>
          </div>
        </figure>
      </div>
    </div>
  );
};

const MapControlFullScreen = () => {
  const map = useMap();

  useEffect(() => {
    const fullscreenControl = L.control.fullscreen();
    fullscreenControl.addTo(map);

    return () => {
      map.removeControl(fullscreenControl);
    };
  }, [map]);

  return null;
};

export default SchoolDetails;
