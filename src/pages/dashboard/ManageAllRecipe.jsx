import axios from "axios";
import { useEffect, useState } from "react";
import RecipeRow from "../../components/cards/RecipeRow";

export default function ManageAllRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    async function loadRecipes() {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        if (response.status === 200) {
          setRecipes(response.data);
        }
      } catch (error) {
        console.error("Error loading recipes:", error);
      }
    }
    loadRecipes();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  // Extract unique categories from recipes
  const categories = [...new Set(recipes.map((recipe) => recipe.category))];

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!categoryFilter ||
        recipe.category.toLowerCase() === categoryFilter.toLowerCase())
  );

  return (
    <div className="overflow-x-auto w-full px-16 mt-10">
      <h1 className="text-3xl mb-4">Manage All Recipe</h1>
      <div className="md:flex gap-2 justify-between mb-4">
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title..."
            className="input input-bordered"
          />
        </div>
        <div>
          <select
            value={categoryFilter}
            onChange={handleCategoryFilterChange}
            className="select select-bordered"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecipes.map((recipe) => (
            <RecipeRow
              key={recipe._id}
              recipe={recipe}
              recipes={recipes}
              setRecipes={setRecipes}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
