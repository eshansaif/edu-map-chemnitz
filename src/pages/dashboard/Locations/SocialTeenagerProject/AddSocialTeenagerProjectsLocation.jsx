import axios from "axios";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import useAuth from "../../../../hooks/useAuth";

const AddSocialTeenagerProjectsLocation = () => {
  const { user } = useAuth();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/locations/social-teenager-projects"
        );
        setLocations(response?.data?.features);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  const handleCreateLocation = async (e) => {
    e.preventDefault();
    const form = e.target;
    const TRAEGER = form.TRAEGER.value;
    const LEISTUNGEN = form.LEISTUNGEN.value;
    const STRASSE = form.STRASSE.value;
    const PLZ = form.PLZ.value;
    const ORT = form.ORT.value;
    const TELEFON = form.TELEFON.value;
    const EMAIL = form.EMAIL.value;
    const FAX = form.FAX.value;
    const coordinates = [
      parseFloat(form.longitude.value),
      parseFloat(form.latitude.value),
    ];

    const locationData = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates,
      },
      properties: {
        TRAEGER,
        LEISTUNGEN,
        STRASSE,
        PLZ,
        ORT,
        TELEFON,
        FAX,
        EMAIL,
      },
    };

    const token = localStorage.getItem("token");

    await swal({
      title: "Are you sure?",
      text: "Once added, you will be able to see this in your location list!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willAdd) => {
      if (willAdd) {
        try {
          const response = await axios.post(
            "http://localhost:3000/locations/social-teenager-projects",
            locationData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Location added response:", response);
          swal("Wow! Your location has been added!", {
            icon: "success",
          });
          form.reset();
          setLocations([...locations, locationData]);
        } catch (error) {
          console.error("Error adding location:", error);
          swal("Error adding location!", {
            icon: "error",
          });
        }
      } else {
        swal("Location is not added!");
      }
    });
  };

  return (
    <div className="w-full px-16">
      <h1 className="text-4xl mb-4 text-center underline">
        Add Social Teenager Project Location
      </h1>
      <form onSubmit={handleCreateLocation} className="w-full">
        <div className="mb-4">
          <label htmlFor="TRAEGER">Träger </label>
          <input
            required
            type="text"
            name="TRAEGER"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="LEISTUNGEN">Leistungen </label>
          <input
            required
            type="text"
            name="LEISTUNGEN"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="STRASSE">Straße </label>
          <input
            required
            type="text"
            name="STRASSE"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="PLZ">PLZ </label>
          <input
            required
            type="text"
            name="PLZ"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ORT">Ort </label>
          <input
            required
            type="text"
            name="ORT"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="TELEFON">Telefon </label>
          <input
            required
            type="text"
            name="TELEFON"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="EMAIL">EMAIL </label>
          <input
            required
            type="text"
            name="EMAIL"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="FAX">Fax </label>
          <input type="text" name="FAX" className="w-full py-3 px-5 border" />
        </div>
        <div className="mb-4">
          <label htmlFor="latitude">Latitude </label>
          <input
            required
            type="number"
            step="0.000001"
            name="latitude"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="longitude">Longitude </label>
          <input
            required
            type="number"
            step="0.000001"
            name="longitude"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <input
            required
            type="submit"
            value={"Add Location"}
            className="w-full btn py-3 px-5 border btn-neutral"
          />
        </div>
      </form>
    </div>
  );
};

export default AddSocialTeenagerProjectsLocation;
