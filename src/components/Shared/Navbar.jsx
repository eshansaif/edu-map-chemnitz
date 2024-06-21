import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { BiLogIn } from "react-icons/bi";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const [dbUser, setDbUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetch(`https://edu-map-chemnitz-server.vercel.app/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setDbUser(data));
  }, [user, dbUser, loading]);

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to="/">
                {({ isActive, isPending, isTransitioning }) => (
                  <span className={isActive ? "active font-bold" : "font-bold"}>
                    Home
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/schools">
                {({ isActive, isPending, isTransitioning }) => (
                  <span className={isActive ? "active font-bold" : "font-bold"}>
                    Schools
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/kindergartens">
                {({ isActive, isPending, isTransitioning }) => (
                  <span className={isActive ? "active font-bold" : "font-bold"}>
                    Kindergartens
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/social-child-projects">
                {({ isActive, isPending, isTransitioning }) => (
                  <span className={isActive ? "active font-bold" : "font-bold"}>
                    Social Child Projects
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/social-teenager-projects">
                {({ isActive, isPending, isTransitioning }) => (
                  <span className={isActive ? "active font-bold" : "font-bold"}>
                    Social Teenager Projects
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost md:text-xl font-mono">
          EduMap Chemnitz
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">
              {({ isActive, isPending, isTransitioning }) => (
                <span className={isActive ? "active font-bold" : "font-bold"}>
                  Home
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/schools">
              {({ isActive, isPending, isTransitioning }) => (
                <span className={isActive ? "active font-bold" : "font-bold"}>
                  Schools
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/kindergartens">
              {({ isActive, isPending, isTransitioning }) => (
                <span className={isActive ? "active font-bold" : "font-bold"}>
                  Kindergartens
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/social-child-projects">
              {({ isActive, isPending, isTransitioning }) => (
                <span className={isActive ? "active font-bold" : "font-bold"}>
                  Social Child Projects
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/social-teenager-projects">
              {({ isActive, isPending, isTransitioning }) => (
                <span className={isActive ? "active font-bold" : "font-bold"}>
                  Social Teenager Projects
                </span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>

      {!user?.email ? (
        <div className="navbar-end flex gap-4">
          <Link
            to={"/login"}
            className="btn btn-neutral font-bold text-white flex justify-center items-center"
          >
            <BiLogIn className="font-bold text-lg" />
            <span>Login</span>
          </Link>
        </div>
      ) : (
        <div
          className="navbar-end flex gap-4 tooltip tooltip-bottom"
          data-tip={`${dbUser?.name}, Please click on the image to see more options to navigate`}
        >
          <div className=" dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full tooltip">
                <img
                  alt={dbUser?.name ? dbUser?.name : "Name is not updated yet"}
                  src={
                    dbUser?.photoURL
                      ? dbUser?.photoURL
                      : "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="font-bold">
                <Link to="/dashboard">
                  <a className="justify-between ">Dashboard</a>
                </Link>
              </li>
              <li className="font-bold">
                <button onClick={handleLogout}>
                  <a>Logout</a>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
