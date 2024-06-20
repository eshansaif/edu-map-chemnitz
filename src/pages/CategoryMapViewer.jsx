import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet.fullscreen";
import "leaflet.fullscreen/Control.FullScreen.css";
import LoadingSpinner from "../components/smallComponents/LoadingSpinner";

// Fix marker icon issue with Leaflet and Webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const categoryUrls = {
  schools:
    "https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulen_OpenData/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
  kindergarden:
    "https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Kindertageseinrichtungen_Sicht/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
  social_child_projects:
    "https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulsozialarbeit_FL_1/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
  social_teenager_projects:
    "http://localhost:3000/locations/social-teenager-projects",
};

const CategoryMapViewer = () => {
  const [locations, setLocations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("schools");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(categoryUrls[selectedCategory]);
        const data = await res.json();
        setLocations(data.features);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/4 p-4 bg-gray-100">
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-bold mb-2"
          >
            Categories
          </label>
          <select
            id="category"
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="w-full p-2 border border-gray-300 rounded-md font-bold "
          >
            <option className="font-semibold" value="schools">
              Schools
            </option>
            <option className="font-semibold" value="kindergarden">
              Kindergarden
            </option>
            <option className="font-semibold" value="social_child_projects">
              Social Child Projects
            </option>
            <option className="font-semibold" value="social_teenager_projects">
              Social Teenager Projects
            </option>
          </select>
        </div>
        <ul className="space-y-2  md:block hidden">
          {locations.map((location) => (
            <li key={location.id} className="p-2 border-b border-gray-300">
              {selectedCategory == "schools" && location.properties.BEZEICHNUNG}
              {selectedCategory == "kindergarden" &&
                location.properties.BEZEICHNUNG}
              {selectedCategory == "social_child_projects" &&
                location.properties.TRAEGER}
              {selectedCategory == "social_teenager_projects" &&
                location.properties.TRAEGER}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-3/4 h-64 md:h-full mt-4 md:mt-0">
        <MapContainer
          center={[50.83, 12.92]}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={[
                location.geometry.coordinates[1],
                location.geometry.coordinates[0],
              ]}
            >
              <Popup>
                <b>{location.properties.BEZEICHNUNG}</b>
                <br />
                Address: {location.properties.STRASSE},{" "}
                {location.properties.ORT}
                <br />
                Type: {location.properties.TYP}
                <br />
                Art: {location.properties.ART}
                <br />
                Standorttyp: {location.properties.STANDORTTYP}
                <br />
                Telephone: {location.properties.TELEFON}
                <br />
                Email: {location.properties.EMAIL}
                <br />
              </Popup>
            </Marker>
          ))}
          <MapControlFullScreen />
        </MapContainer>
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

export default CategoryMapViewer;
