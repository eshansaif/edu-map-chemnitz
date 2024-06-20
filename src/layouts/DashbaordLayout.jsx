import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FcHome } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import { LuLogOut } from "react-icons/lu";
import { useEffect, useState } from "react";

export default function DashboardLayout() {
  const { logout, user, loading } = useAuth();
  const navigate = useNavigate();
  const [dbUser, setDbUser] = useState(null);
  const [isAddLocationsOpen, setIsAddLocationsOpen] = useState(false);
  const [isViewLocationsOpen, setIsViewLocationsOpen] = useState(false);

  useEffect(() => {
    fetch(`https://edu-map-chemnitz-server.vercel.app/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setDbUser(data));
  }, [user, dbUser, loading]);

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleAddLocations = () => {
    setIsAddLocationsOpen((prev) => !prev);
  };
  const toggleViewLocations = () => {
    setIsViewLocationsOpen((prev) => !prev);
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <div className="mb-4">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-neutral drawer-button lg:hidden"
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
                className="text-xl hidden md:block text-neutral font-extrabold"
                to="/"
              >
                EduMap Chemnitz
              </Link>
            </li>

            <li>
              <NavLink to="/dashboard/profile">
                {({ isActive }) => (
                  <span
                    className={
                      isActive ? "text-white font-semibold " : "font-bold"
                    }
                  >
                    Profile
                  </span>
                )}
              </NavLink>
            </li>
            {dbUser?.isAdmin === 1 && (
              <>
                <li>
                  <NavLink to="/dashboard/stats">
                    {({ isActive }) => (
                      <span
                        className={
                          isActive ? "text-white font-semibold " : "font-bold"
                        }
                      >
                        Stats
                      </span>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-users">
                    {({ isActive }) => (
                      <span
                        className={
                          isActive ? "text-white font-semibold " : "font-bold"
                        }
                      >
                        Manage All Users
                      </span>
                    )}
                  </NavLink>
                </li>
                <li>
                  <button className="font-bold" onClick={toggleAddLocations}>
                    Add Locations
                  </button>
                  {isAddLocationsOpen && (
                    <ul className="pl-4">
                      <li>
                        <NavLink to="/dashboard/add-location/school">
                          {({ isActive }) => (
                            <span
                              className={
                                isActive
                                  ? "text-white font-semibold "
                                  : "font-bold"
                              }
                            >
                              Add Schools Location
                            </span>
                          )}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/add-location/kindergarten">
                          {({ isActive }) => (
                            <span
                              className={
                                isActive
                                  ? "text-white font-semibold "
                                  : "font-bold"
                              }
                            >
                              Add Kindergartens Location
                            </span>
                          )}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/add-location/social-child-project">
                          {({ isActive }) => (
                            <span
                              className={
                                isActive
                                  ? "text-white font-semibold "
                                  : "font-bold"
                              }
                            >
                              Add Social Child Projects Location
                            </span>
                          )}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/add-location/social-teenager-project">
                          {({ isActive }) => (
                            <span
                              className={
                                isActive
                                  ? "text-white font-semibold "
                                  : "font-bold"
                              }
                            >
                              Add Social Teenager Projects Location
                            </span>
                          )}
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <button className="font-bold" onClick={toggleViewLocations}>
                    View Locations
                  </button>
                  {isViewLocationsOpen && (
                    <ul className="pl-4">
                      <li>
                        <NavLink to="/dashboard/view-location/schools">
                          {({ isActive }) => (
                            <span
                              className={
                                isActive
                                  ? "text-white font-semibold "
                                  : "font-bold"
                              }
                            >
                              View Schools Location
                            </span>
                          )}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/view-location/kindergartens">
                          {({ isActive }) => (
                            <span
                              className={
                                isActive
                                  ? "text-white font-semibold "
                                  : "font-bold"
                              }
                            >
                              View Kindergartens Location
                            </span>
                          )}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/view-location/social-child-projects">
                          {({ isActive }) => (
                            <span
                              className={
                                isActive
                                  ? "text-white font-semibold "
                                  : "font-bold"
                              }
                            >
                              View Social Child Projects Location
                            </span>
                          )}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/view-location/social-teenager-projects">
                          {({ isActive }) => (
                            <span
                              className={
                                isActive
                                  ? "text-white font-semibold "
                                  : "font-bold"
                              }
                            >
                              View Social Teenager Projects Location
                            </span>
                          )}
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            )}

            <li>
              <NavLink to={`/dashboard/my-favorite/${user?.email}`}>
                {({ isActive }) => (
                  <span
                    className={
                      isActive ? "text-white font-semibold " : "font-bold"
                    }
                  >
                    Favorite Locations
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
