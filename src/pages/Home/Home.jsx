import React from "react";
import { Link } from "react-router-dom";
import Banner from "../../components/Banner";

const Home = () => {
  const homeDivs = [
    {
      id: 1,
      title: "Map",
      to: "map-viewer",
    },
    {
      id: 2,
      title: "Impressum",
      to: "",
    },
    {
      id: 3,
      title: "Documentation",
      to: "",
    },
    {
      id: 4,
      title: "Link To Sources",
      to: "",
    },
  ];
  return (
    <div>
      <Banner />
      <div className="flex justify-center items-center mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {homeDivs.map((homeDiv) => (
            <Link to={homeDiv.to} key={homeDiv.id}>
              <div className="card w-80 h-40 bg-neutral text-primary-content">
                <div className="card-body flex justify-center items-center">
                  <h2 className="card-title text-center font-black text-4xl">
                    {homeDiv.title}
                  </h2>
                  {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
                  {/* <div className="card-actions justify-end">
                <button className="btn">Buy Now</button>
              </div> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
