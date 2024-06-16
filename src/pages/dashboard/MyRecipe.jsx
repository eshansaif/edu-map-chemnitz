import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import RecepiCard from "../../components/cards/RecepiCard";

const MyRecipe = () => {
  const { user } = useAuth();
  // console.log(user?.email);
  const [myRecipe, setMyRecipe] = useState([]);
  // console.log(myRecipe.length);
  useEffect(() => {
    fetch(`http://localhost:3000/recipes/chef/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setMyRecipe(data));
  }, [user]);
  return (
    <div className="mx-16">
      <h1 className="text-4xl my-4 text-center">See Your All Recipe</h1>

      {myRecipe?.length == 0 ? (
        <p>No Recipe found, Please Add Recipe By clicking Add Recipe Button</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-6 mb-4">
          {myRecipe?.map((recipe) => (
            <RecepiCard key={recipe?._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipe;
