import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const MyFavList = () => {
  const { user } = useAuth();
  const [myFavList, setMyFavList] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/user/favorite/${user?.email}`)
        .then((res) => res.json())
        .then((data) => setMyFavList(data.reverse()));
    }
  }, [user, myFavList]);

  const removeFavorite = async (locationId) => {
    await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to see this in your favorites list!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await fetch(
            `http://localhost:3000/user/favorite/${user?.email}/${locationId}`,
            {
              method: "DELETE",
            }
          );
          const data = await response.json();

          if (data.status === "success") {
            swal("You have removed the favorite successfully!", {
              icon: "success",
            });
            setMyFavList((prevList) =>
              prevList.filter((fav) => fav?._id !== locationId)
            );
          } else {
            swal("Error removing favorite!", {
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error removing favorite:", error);
          swal("Error removing favorite!", {
            icon: "error",
          });
        }
      } else {
        swal("Favorite is not deleted!");
      }
    });
  };

  return (
    <div className="mx-16">
      <h1 className="text-4xl my-4 text-center">
        See Your All Favorite Locations
      </h1>

      {myFavList.length === 0 ? (
        <p>No Favorite Location Added yet!</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-6 mb-4">
          {myFavList.map((fav) => (
            <div key={fav._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{fav?.location?.name}</h2>
                <p className="text-sm">{fav?.location?.category}</p>
                <div className="card-actions justify-center">
                  <Link to={`/${fav?.location?.url}`}>
                    <button className="btn btn-primary btn-sm">
                      View Details
                    </button>
                  </Link>

                  <button
                    onClick={() => removeFavorite(fav?._id)}
                    className="btn btn-secondary btn-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavList;
