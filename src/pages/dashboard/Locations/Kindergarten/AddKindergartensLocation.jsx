import axios from "axios";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import useAuth from "../../../../hooks/useAuth";
const AddKindergartensLocation = () => {
  const { user } = useAuth();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/locations/kindergartens"
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
    const BEZEICHNUNG = form.BEZEICHNUNG.value;
    const KURZBEZEICHNUNG = form.KURZBEZEICHNUNG.value;
    const STRASSE = form.STRASSE.value;
    const STRSCHL = form.STRSCHL.value;
    const HAUSBEZ = form.HAUSBEZ.value;
    const PLZ = form.PLZ.value;
    const ORT = form.ORT.value;
    const HORT = form.HORT.value;
    const KITA = form.KITA.value;
    const URL = form.URL.value;
    const TELEFON = form.TELEFON.value;
    const EMAIL = form.EMAIL.value;
    const FAX = form.FAX.value;
    const BARRIEREFREI = form.BARRIEREFREI.value;
    const INTEGRATIV = form.INTEGRATIV.value;
    const TRAEGER = form.TRAEGER.value;
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
        BEZEICHNUNG,
        KURZBEZEICHNUNG,
        STRASSE,
        STRSCHL,
        HAUSBEZ,
        PLZ,
        ORT,
        HORT,
        KITA,
        URL,
        TELEFON,
        EMAIL,
        FAX,
        BARRIEREFREI,
        INTEGRATIV,
        TRAEGER,
        userEmail: user?.email,
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
            "http://localhost:3000/locations/kindergartens",
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
        Add Kindergartens Location
      </h1>
      <form onSubmit={handleCreateLocation} className="w-full">
        <div className="mb-4">
          <label htmlFor="BEZEICHNUNG">BEZEICHNUNG </label>
          <input
            required
            type="text"
            name="BEZEICHNUNG"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="KURZBEZEICHNUNG">KURZBEZEICHNUNG </label>
          <input
            required
            type="text"
            name="KURZBEZEICHNUNG"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="STRASSE">STRASSE </label>
          <input
            required
            type="text"
            name="STRASSE"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="STRSCHL">STRSCHL </label>
          <input
            required
            type="text"
            name="STRSCHL"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="HAUSBEZ">HAUSBEZ </label>
          <input
            required
            type="text"
            name="HAUSBEZ"
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
          <label htmlFor="HORT">HORT </label>
          <input
            required
            type="number"
            name="HORT"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="KITA">KITA </label>
          <input
            required
            type="number"
            name="KITA"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="URL">URL </label>
          <input
            required
            type="text"
            name="URL"
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
          <label htmlFor="BARRIEREFREI">BARRIEREFREI </label>
          <input
            type="text"
            name="BARRIEREFREI"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="INTEGRATIV">INTEGRATIV </label>
          <input
            type="text"
            name="INTEGRATIV"
            className="w-full py-3 px-5 border"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="TRAEGER">TRAEGER </label>
          <input
            type="text"
            name="TRAEGER"
            className="w-full py-3 px-5 border"
          />
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
            value={"Add Kindergarten Location"}
            className="w-full btn py-3 px-5 border btn-neutral"
          />
        </div>
      </form>
    </div>
  );
};

export default AddKindergartensLocation;
