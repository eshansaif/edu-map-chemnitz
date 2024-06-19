import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const SingleSocialTeenagerProject = ({ location }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:3000/user/favorite/${user?.email}`
          );
          const favorites = response.data;

          console.log(favorites);

          // Check if the current location is already in the user's favorites, including the category in the check
          const alreadyFavorite = favorites.some(
            (fav) =>
              fav.location.id === location.id &&
              fav.location.category === "Social Teenager Project"
          );
          setIsFavorite(alreadyFavorite);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        } finally {
          setLoading(false); // Set loading to false after the check
        }
      } else {
        setLoading(false); // Set loading to false if no user is logged in
      }
    };

    checkIfFavorite();
  }, [user, location.id]);

  const handleAddToFavorite = async () => {
    if (!user) {
      alert("You must be logged in to add to favorites.");
      return navigate("/login");
    }

    try {
      const favoriteData = {
        userEmail: user?.email,
        location: {
          id: location.id,
          name: location.properties.TRAEGER,
          url: `social-teenager-project/${location?.id}`,
          category: "Social Teenager Project",
        },
      };

      const response = await axios.post(
        "http://localhost:3000/user/favorite",
        favoriteData
      );

      if (response?.data?.status === "success") {
        setIsFavorite(true);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your location has been added to your favorite list",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      console.log(response.data);
    } catch (error) {
      console.error("Error adding to favorite:", error);
    }
  };

  return (
    <div className="card w-80 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{location?.properties?.TRAEGER}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end flex">
          <Link to={`/social-teenager-project/${location.id}`}>
            <button className="btn btn-primary">View Details</button>
          </Link>
          <button
            className="btn btn-secondary"
            onClick={handleAddToFavorite}
            disabled={isFavorite || loading} // Disable button during loading or if already favorite
          >
            {loading
              ? "Loading..."
              : isFavorite
              ? "Already Added"
              : "Add To Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleSocialTeenagerProject;
