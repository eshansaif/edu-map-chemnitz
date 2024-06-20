import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewSocialChildProjectsLocations = () => {
  let serialNo = 1;
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/locations/social-child-projects"
        );
        setLocations(response?.data?.features?.reverse());
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    await swal({
      title: "Are you sure?",
      text: "Once delete, you will not be able to see this in your location list!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willAdd) => {
      if (willAdd) {
        try {
          const response = await axios.delete(
            `http://localhost:3000/location/social-child-project/${id}`
          );
          console.log("Location deleted response:", response);
          swal("You Have Removed the Location Successfully!", {
            icon: "success",
          });
          setLocations((prev) =>
            prev.filter((location) => location?._id !== id)
          );
        } catch (error) {
          console.error("Error adding location:", error);
          swal("Error adding location!", {
            icon: "error",
          });
        }
      } else {
        swal("Location is not deleted!");
      }
    });
  };

  return (
    <div className="overflow-x-auto w-full px-16 mt-3">
      <h2 className="text-3xl mt-2 mb-4 text-center underline">
        All Locations of Social Child Projects
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>SL.</th>
              <th>Action</th>
              <th>TRAEGER</th>
              <th>BEZEICHNUNG</th>
              <th>KURZBEZEICHNUNG</th>
              <th>LEISTUNGEN</th>
              <th>STRASSE</th>
              <th>PLZ</th>
              <th>ORT</th>
              <th>TELEFON</th>
              <th>FAX</th>
              <th>EMAIL</th>
            </tr>
          </thead>
          <tbody>
            {locations?.map((location) => (
              <tr key={location?.id || location?._id}>
                <th>{serialNo++}</th>
                <td className="flex gap-1">
                  <Link
                    to={`/../social-child-project/${
                      location?.id || location?._id
                    }`}
                  >
                    <button className="btn btn-primary btn-xs">View</button>
                  </Link>
                  <button
                    disabled={location?.id && "true"}
                    className="btn btn-secondary btn-xs"
                    onClick={() => handleDelete(location?._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  {location?.properties?.TRAEGER
                    ? location?.properties?.TRAEGER
                    : "Not Found"}
                </td>
                <td>
                  {location?.properties?.BEZEICHNUNG
                    ? location?.properties?.BEZEICHNUNG
                    : "Not Found"}
                </td>
                <td>
                  {location?.properties?.KURZBEZEICHNUNG
                    ? location?.properties?.KURZBEZEICHNUNG
                    : "Not Found"}
                </td>
                <td>
                  {location?.properties?.LEISTUNGEN
                    ? location?.properties?.LEISTUNGEN
                    : "Not Found"}
                </td>
                <td>
                  {location?.properties?.STRASSE
                    ? location?.properties?.STRASSE
                    : "Not Found"}
                </td>
                <td>
                  {location?.properties?.PLZ
                    ? location?.properties?.PLZ
                    : "Not Found"}
                </td>
                <td>
                  {location?.properties?.ORT
                    ? location?.properties?.ORT
                    : "Not Found"}
                </td>
                <td>
                  {location?.properties?.TELEFON
                    ? location?.properties?.TELEFON
                    : "Not Found"}
                </td>
                <td>{location?.properties?.FAX}</td>
                <td>
                  {location?.properties?.EMAIL
                    ? location?.properties?.EMAIL
                    : "Not Found"}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>ID</th>
              <th>TRAEGER</th>
              <th>LEISTUNGEN</th>
              <th>STRASSE</th>
              <th>PLZ</th>
              <th>ORT</th>
              <th>TELEFON</th>
              <th>FAX</th>
              <th>EMAIL</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ViewSocialChildProjectsLocations;
