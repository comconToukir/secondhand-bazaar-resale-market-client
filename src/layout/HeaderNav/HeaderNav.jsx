import React from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../../assets/logo/secondhand-logo.png"

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
      <NavLink to="/blog">Blog</NavLink>
    </li>
  </>
);

const HeaderNav = () => {
  return (
    <div className="navbar bg-base-100 max-w-screen-xl mx-auto">
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
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {NavLinks}
          </ul>
        </div>
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <img src={logo} className="w-16" alt="secondhand-bazaar-logo" />
          SECONDHAND BAZAAR
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          {NavLinks}
        </ul>
      </div>
      <div className="navbar-end">
        <NavLink to='/login' className="">Login</NavLink>
      </div>
    </div>
  );
};

export default HeaderNav;
