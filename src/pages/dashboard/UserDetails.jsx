import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LeafletMap from "./UserLocationMap";

const UserDetails = () => {
  const { id } = useParams();

  const [userDetails, setUserDetails] = useState();

  console.log(userDetails);

  useEffect(() => {
    async function load() {
      const recipeData = await axios.get(
        `https://edu-map-chemnitz-server.vercel.app/users/${id}`
      );
      // console.log(recipeData.data);
      if (recipeData?.status === 200) {
        setUserDetails(recipeData?.data);
      }
    }

    load();
  }, [id]);
  return (
    <div className="flex justify-center items-center w-full">
      <div className="card lg:card-side bg-base-100 shadow-xl flex w-full">
        <div className="flex flex-col w-full">
          <figure className="h-64 w-full flex justify-center items-center">
            <img
              src={userDetails?.photoURL}
              alt="Album"
              className="h-full w-full object-none "
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{userDetails?.name}</h2>
            <p>
              Email: {userDetails?.email ? userDetails?.email : "Not Available"}
            </p>
            <p>
              Phone Number:{" "}
              {userDetails?.phoneNumber
                ? userDetails?.phoneNumber
                : "Not Available"}
            </p>
            <p>
              Home Address:{" "}
              {userDetails?.homeAddress
                ? userDetails?.homeAddress
                : "Not Assigned"}
            </p>
            <p>
              Role: {userDetails?.role ? userDetails?.role : "Not Assigned"}
            </p>
          </div>
          <div>
            {userDetails?.latitude && userDetails?.longitude ? (
              <div className="mt-4 w-full">
                <LeafletMap
                  lat={parseFloat(userDetails?.latitude)}
                  lng={parseFloat(userDetails?.longitude)}
                  homeAddress={userDetails?.homeAddress}
                />
              </div>
            ) : null}
          </div>
          <div className="card-actions justify-end">
            <Link to="/dashboard/manage-users">
              <button className="btn btn-neutral">View All Users</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
