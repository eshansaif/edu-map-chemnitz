import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import useAuth from "../../hooks/useAuth";
// import { v4 as uuidv4 } from "uuid";

const AddRecipe = () => {
  const [categories, setCategories] = useState();
  const { user } = useAuth();

  // console.log(user?.email);

  useEffect(() => {
    async function load() {
      const data = await axios.get("http://localhost:3000/categories");
      // console.log(data?.data);
      if (data?.status === 200) {
        // console.log(data?.data.categories);
        setCategories(data?.data);
      }
    }

    load();
  }, []);

  const handleCreateRecipe = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const price = form.price.value;
    const image = form.image.value;
    const category = form.category.value;
    const description = form.description.value;

    const recipeData = {
      title,
      price,
      image,
      category,
      description,
      email: user?.email,
    };

    const token = localStorage.getItem("token");

    // console.log(token);

    await swal({
      title: "Are you sure?",
      text: "Once added, you will be able to see this in your recipe list!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willAdd) => {
      if (willAdd) {
        try {
          const response = await axios.post(
            "http://localhost:3000/recipes",
            recipeData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Recipe added response:", response);
          swal("Wow! Your recipe has been added!", {
            icon: "success",
          });
          form.reset();
        } catch (error) {
          console.error("Error adding recipe:", error);
          swal("Error adding recipe!", {
            icon: "error",
          });
        }
      } else {
        swal("Recipe is not added!");
      }
    });
  };

  return (
    <div className="w-full px-16">
      <h1 className="text-4xl mb-4">Add Recipe</h1>
      <form onSubmit={handleCreateRecipe} className="w-full">
        {/* <div className="mb-4">
          <label htmlFor="">Id </label>
          <input
            required
            type="text"
            name="id"
            className="w-full py-3 px-5 border"
          />
        </div> */}
        <div className="mb-4">
          <label htmlFor="">Title </label>
          <input
            required
            type="text"
            name="title"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="">Price </label>
          <input
            required
            type="number"
            name="price"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="">Image </label>
          <input
            required
            type="text"
            name="image"
            className="w-full py-3 px-5 border"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="">Category </label>
          <select name="category" id="" className="w-full py-3 px-5 border">
            {categories?.map((category) => (
              <option key={category?.id} value={category?.title}>
                {category?.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="">Description </label>
          <textarea name="description" className="w-full py-3 px-5 border" />
        </div>

        <div className="mb-4">
          <input
            required
            type="submit"
            value={"Add Recipe"}
            className="w-full btn py-3 px-5 border btn-neutral"
          />
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
