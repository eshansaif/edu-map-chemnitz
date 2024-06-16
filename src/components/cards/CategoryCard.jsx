import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function CategoryCard({ category }) {
  return (
    <div className="border px-5 py-3 rounded hover:animate-pulse hover:animate-bounce hover:text-green-500 hover:font-bold">
      <Link className="" to={`/category/${category?.title}`}>
        <h1 className="text-center ">{category?.title}</h1>
      </Link>
    </div>
  );
}
