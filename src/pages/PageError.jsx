import { Link, useRouteError } from "react-router-dom";

const PageError = () => {
  const { error, status } = useRouteError();

  return (
    <div className="container flex flex-col justify-center items-center h-screen text-center py-32">
      <h1 className=" text-7xl font-extrabold mb-8">Error {status || 404}</h1>
      <p className="lg:text-3xl">{error?.message}</p>
      <button className="btn bg-red-500 text-white mt-8">
        <Link to="/">Go Back To Home</Link>
      </button>
    </div>
  );
};

export default PageError;
