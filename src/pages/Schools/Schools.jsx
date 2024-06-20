import React, { useEffect, useState } from "react";
import SingleSchool from "./SingleSchool";
import LoadingSpinner from "../../components/smallComponents/LoadingSpinner";

const Schools = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/locations/schools")
      .then((response) => response.json())
      .then((data) => {
        setLocations(data.features.reverse());
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching JSON data:", error);
        setLoading(true);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const filteredLocations = locations.filter((location) =>
    location?.properties?.BEZEICHNUNG.toLowerCase().includes(
      searchQuery.toLowerCase()
    )
  );

  return (
    <div className="space-y-8">
      <div className="mx-20 sm:20 md:24 lg:mx-28 mt-8">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search Your Destination ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredLocations.map((location) => (
            <SingleSchool
              key={location.id || location?._id}
              location={location}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schools;
