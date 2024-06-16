import { Link, NavLink, Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FcHome } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import { LuLogOut } from "react-icons/lu";

export default function DashbaordLayout() {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <div className=" mb-4">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <GiHamburgerMenu className="text-3xl" />
          </label>
        </div>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-60 min-h-screen bg-base-200 text-base-content flex flex-col justify-between">
          {/* Sidebar content here */}
          <div>
            <li>
              <Link
                className="text-xl hidden md:block text-[#4a00ff] font-extrabold"
                to="/"
              >
                Roshui Ghor
              </Link>
            </li>

            <li>
              <NavLink to="/dashboard/profile">
                {({ isActive }) => (
                  <span
                    className={
                      isActive
                        ? "text-blue-500 font-semibold underline"
                        : "font-bold"
                    }
                  >
                    Profile
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/stats">
                {({ isActive }) => (
                  <span
                    className={
                      isActive
                        ? "text-blue-500 font-semibold underline"
                        : "font-bold"
                    }
                  >
                    Stats
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manage-recipes">
                {({ isActive }) => (
                  <span
                    className={
                      isActive
                        ? "text-blue-500 font-semibold underline"
                        : "font-bold"
                    }
                  >
                    Manage All Recipes
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/add-recipe">
                {({ isActive }) => (
                  <span
                    className={
                      isActive
                        ? "text-blue-500 font-semibold underline"
                        : "font-bold"
                    }
                  >
                    Add Recipe
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              {/* <Link to={"/dashboard/add-recipe"}>Add Recipe</Link> */}
              <NavLink to={`/dashboard/my-recipe/${user?.email}`}>
                {({ isActive }) => (
                  <span
                    className={
                      isActive
                        ? "text-blue-500 font-semibold underline"
                        : "font-bold"
                    }
                  >
                    My Recipe
                  </span>
                )}
              </NavLink>
            </li>
          </div>
          <div className="flex gap-4">
            <Link to={"/"} className="btn btn-neutral">
              <FcHome className="text-3xl font-bold" title="Go To Home" />
            </Link>
            <button className="btn btn-error" onClick={handleLogout}>
              <LuLogOut className="text-3xl font-bold" title="Logout" />
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
}
