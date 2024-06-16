import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

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
    <div className="bg-blue-100 p-8 rounded-md">
      <div className="flex justify-center items-center">
        <img
          className="btn-circle w-36 h-36"
          src={userInfo?.photoURL}
          alt="User Avatar"
        />
      </div>
      <h1>
        Welcome, <span className="font-bold">{userInfo?.name}</span>
      </h1>
      <p>Email: {userInfo?.email}</p>
      <p>Phone Number: {userInfo?.phoneNumber || "Not Available"}</p>
      <p>Role: {userInfo?.role || "Not Assigned"}</p>
      <p>Last Sign in at: {user?.metadata.lastSignInTime}</p>
      <Link to={`/dashboard/profile/edit/${userInfo?._id}`}>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600">
          Edit Profile
        </button>
      </Link>
    </div>
  );
}
