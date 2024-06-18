import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import LeafletMap from "./UserLocationMap";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail, MdLocationCity, MdPhoneAndroid } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { LiaSearchLocationSolid } from "react-icons/lia";

export default function DashboardHome() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/user/${user.email}`)
        .then((res) => res.json())
        .then((data) => setUserInfo(data));
    }
  }, [user]);

  return (
    <div className="bg-blue-100 p-8 rounded-md font-mono space-y-4">
      <div className="flex justify-center items-center">
        <img
          className="btn-circle w-36 h-36"
          src={userInfo?.photoURL}
          alt="User Avatar"
        />
      </div>
      <h1 className="font-extrabold ">
        Welcome, <span className="">{userInfo?.name}</span>
      </h1>
      <p className="font-bold flex items-center gap-5">
        <MdEmail title="Email" /> <span>{userInfo?.email}</span>
      </p>
      <p className="font-bold flex items-center gap-5 ">
        <MdPhoneAndroid title="Phone Number" />{" "}
        {userInfo?.phoneNumber || "Not Available"}
      </p>
      <p className="font-bold flex items-center gap-5">
        <FaLocationDot title="Home Address" />{" "}
        {userInfo?.homeAddress || "Not Assigned"}
      </p>

      {/* User map */}
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      {userInfo?.latitude ? (
        <div className="font-semibold">
          <button
            className="flex justify-center items-center gap-2"
            onClick={() => document.getElementById("my_modal_4").showModal()}
          >
            <LiaSearchLocationSolid
              className="font-bold"
              title="View Your Location"
            />{" "}
            <span>
              <span className="text-blue-500 hover:text-blue-400">
                View Address on Map
              </span>{" "}
              (lat: {userInfo?.latitude || "Not Assigned"} & lng:{" "}
              {userInfo?.longitude || "Not Assigned"})
            </span>
          </button>
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">Click the button below to close</p>
              {userInfo?.latitude && userInfo?.longitude && (
                <div className="mt-4">
                  <LeafletMap
                    lat={parseFloat(userInfo?.latitude)}
                    lng={parseFloat(userInfo?.longitude)}
                    homeAddress={userInfo?.homeAddress}
                  />
                </div>
              )}
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button, it will close the modal */}

                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      ) : (
        ""
      )}
      <p className="font-bold flex items-center gap-5">
        Role: {userInfo?.role || "Not Assigned"}
      </p>

      <p className="font-thin text-sm">
        Last Sign in at: {user?.metadata.lastSignInTime}
      </p>

      <div className="flex justify-center ">
        <Link to={`/dashboard/profile/edit/${userInfo?._id}`}>
          <button className="btn btn-secondary btn-wide mt-4 ">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
}
