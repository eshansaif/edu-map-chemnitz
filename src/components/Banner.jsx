import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="hero min-h-[480px]"
      style={{
        backgroundImage:
          "url(https://dam.destination.one/867476/a2f008eb72904cb7e71c516aef476bc6eccc912f0fdbe33e4218f7cdb1ece8d4/karlmarxmonument_ernestouhlmann-jpg.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome To EduMap</h1>
          <p className="mb-5">
            Explore and Navigate Your Desired Location here and See the Map
            Details in a Easy Going User Interface
          </p>
          <Link to="/map-viewer">
            <button className="btn btn-neutral">Explore Destinations</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
