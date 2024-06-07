import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
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
            {/* <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li> */}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
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
          {/* <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li> */}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Login</a>
      </div>
    </div>
  );
};

export default Navbar;
