import axios from "axios";
// import { useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

/* eslint-disable react/prop-types */
export default function RecipeRow({ recipe, setRecipes, recipes }) {
  // const handleDelete = (id) => {
  //   axios.delete()
  // };

  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    try {
      await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this recipe!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete(`http://localhost:3000/recipes/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Post deleted:", id);
          setRecipes(recipes.filter((r) => r._id !== id));
          swal("Poof! Your recipe has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your recipe is safe!");
        }
      });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  return (
    <tr>
      <th>{recipe?._id}</th>
      <td>{recipe?.title}</td>
      <td>{recipe?.price}</td>
      <td>{recipe?.category}</td>
      <td className="flex gap-2">
        <Link
          to={`/dashboard/recipe-details/${recipe?._id}`}
          className="btn btn-xs btn-primary"
        >
          View
        </Link>
        <Link
          to={`/dashboard/edit-recipe/${recipe?._id}`}
          className="btn btn-xs btn-neutral"
        >
          Edit
        </Link>
        <button
          onClick={() => handleDelete(recipe?._id)}
          className="btn btn-xs btn-error"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
