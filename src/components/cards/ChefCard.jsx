import { FaMobileRetro } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";
import { Link } from "react-router-dom";

const ChefCard = ({ chef }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img className="h-60" src={chef?.photoURL} alt="Chef Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{chef?.name}</h2>
        <p className="flex gap-2 items-center">
          <FaMobileRetro /> <span>{chef?.phoneNumber}</span>
        </p>
        <p className="flex gap-2 items-center">
          <MdMarkEmailUnread /> <span>{chef?.email}</span>
        </p>

        <div className="card-actions justify-end">
          <Link to={`/chef-recipes/${chef?.email}`}>
            <button className="btn btn-primary">View All Recipes</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChefCard;
