import React from "react";
import { Link } from "react-router-dom";

const SingleSchool = ({ location }) => {
  return (
    <div className="card w-80 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{location?.properties?.BEZEICHNUNG}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <Link to={`/school/${location.id}`}>
            <button className="btn btn-primary">View Details</button>
          </Link>
          <Link to={`/`}>
            <button className="btn btn-secondary">Add To Favorite</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleSchool;
