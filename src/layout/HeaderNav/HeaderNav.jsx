import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../../assets/logo/secondhand-logo.png";
import { UserContext } from "../../contexts/UserContext/UserContext";

const HeaderNav = ({ dashboard }) => {
  const { user, logOutUser } = useContext(UserContext);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`http://localhost:5000/get-categories`).then((res) => res.json()),
  });

  const NavLinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li tabIndex={0}>
        <button className="justify-between">
          Categories
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
          </svg>
        </button>
        <ul className="bg-base-200 z-50 w-52">
          {isLoading ? (
            <button className="loading">Loading</button>
          ) : (
            categories.map((ct) => (
              <li key={ct._id}>
                <NavLink to={`/category/${ct._id}`}>{ct.categoryName}</NavLink>
              </li>
            ))
          )}
        </ul>
      </li>
      <li>
        <NavLink to="/blog">Blog</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div
      className={`navbar bg-base-200 mx-auto ${
        !dashboard ? "max-w-screen-xl" : null
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 shadow bg-base-200 rounded-box w-52"
          >
            {NavLinks}
          </ul>
        </div>
        <Link
          to="/"
          className="lg:text-2xl text-lg font-bold flex gap-2 items-center"
        >
          <img
            src={logo}
            className="md:w-16 w-12"
            alt="secondhand-bazaar-logo"
          />
          SECONDHAND BAZAAR
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{NavLinks}</ul>
      </div>
      <div className="navbar-end flex-grow-0">
        {user ? (
          <>
            <button
              onClick={logOutUser}
              className="outline outline-1 outline-gray-600 font-semibold py-1 w-min px-4 rounded-md cursor-pointer hover:bg-slate-500 hover:text-gray-800"
            >
              Logout
            </button>
            <label
              htmlFor="dashboard-toggle"
              className="btn btn-square btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </>
        ) : (
          <NavLink to="/login" className="">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default HeaderNav;
