import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import HeaderNav from "../HeaderNav/HeaderNav";
import Footer from "./../Footer/Footer";

const DashboardLayout = () => {
  const dashboardRoutes = (
    <>
      <li>
        <NavLink to="/">My Orders</NavLink>
      </li>
      <li>
        <NavLink to="/wishlist">My Wishlist</NavLink>
      </li>
    </>
  );

  return (
    <>
      <nav>
        <HeaderNav dashboard={true} />
      </nav>
      <div className="mt-8 rounded-md shadow-sm">
        <div className="drawer drawer-mobile h-auto">
          <input
            id="dashboard-toggle"
            type="checkbox"
            className="drawer-toggle"
            aria-label="dashboard-toggle"
          />
          <div className="drawer-content">
            <Outlet />
          </div>
          <div className="drawer-side">
            <label
              htmlFor="dashboard-toggle"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 overflow-y-auto w-80 bg-base-200 text-base-content min-h-screen">
              {dashboardRoutes}
            </ul>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default DashboardLayout;
