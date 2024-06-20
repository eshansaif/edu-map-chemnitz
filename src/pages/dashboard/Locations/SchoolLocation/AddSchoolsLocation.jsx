import axios from "axios";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import useAuth from "../../../../hooks/useAuth";
import { v4 as uuidv4 } from "uuid";

const AddSchoolsLocation = () => {
  const { user } = useAuth();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/locations/schools"
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
    const TYP = form.TYP.value;
    const ART = form.ART.value;
    const BEZEICHNUNGZUSATZ = form.BEZEICHNUNGZUSATZ.value;
    const STRASSE = form.STRASSE.value;
    const PLZ = form.PLZ.value;
    const ORT = form.ORT.value;
    const TELEFON = form.TELEFON.value;
    const EMAIL = form.EMAIL.value;
    const FAX = form.FAX.value;
    const PROFILE = form.PROFILE.value;
    const WWW = form.WWW.value;
    const TRAEGER = form.TRAEGER.value;
    const BEZUGNR = form.BEZUGNR.value;
    const GEBIETSARTNUMMER = form.GEBIETSARTNUMMER.value;
    const SNUMMER = form.SNUMMER.value;
    const NUMMER = form.NUMMER.value;
    const Creator = form.Creator.value;
    const GlobalID = uuidv4();
    const CreationDate = new Date();
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
        TYP,
        ART,
        BEZEICHNUNGZUSATZ,
        STRASSE,
        PLZ,
        ORT,
        TELEFON,
        EMAIL,
        FAX,
        PROFILE,
        WWW,
        TRAEGER,
        BEZUGNR,
        GEBIETSARTNUMMER,
        SNUMMER,
        NUMMER,
        Creator,
        GlobalID,
        CreationDate,
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
            "http://localhost:3000/locations/schools",
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
        Add School Location
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
          <label htmlFor="TYP">TYP </label>
          <input
            required
            type="text"
            name="TYP"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ART">ART </label>
          <input
            required
            type="text"
            name="ART"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="BEZEICHNUNGZUSATZ">BEZEICHNUNGZUSATZ </label>
          <input
            required
            type="text"
            name="BEZEICHNUNGZUSATZ"
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
          <label htmlFor="PROFILE">PROFILE </label>
          <input
            type="text"
            name="PROFILE"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="WWW">WWW </label>
          <input type="text" name="WWW" className="w-full py-3 px-5 border" />
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
          <label htmlFor="TRAEGERTYP">TRAEGERTYP </label>
          <input
            type="number"
            name="TRAEGERTYP"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="BEZUGNR">BEZUGNR </label>
          <input
            type="text"
            name="BEZUGNR"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="GEBIETSARTNUMMER">GEBIETSARTNUMMER </label>
          <input
            type="number"
            name="GEBIETSARTNUMMER"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="SNUMMER">SNUMMER </label>
          <input
            type="number"
            name="SNUMMER"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="NUMMER">NUMMER </label>
          <input
            type="number"
            name="NUMMER"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Creator">Creator </label>
          <input
            type="text"
            name="Creator"
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
            value={"Add School Location"}
            className="w-full btn py-3 px-5 border btn-neutral"
          />
        </div>
      </form>
    </div>
  );
};

export default AddSchoolsLocation;
