import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import HeaderNav from "../HeaderNav/HeaderNav";
import Footer from "./../Footer/Footer";
import useCheckRole from "./../../hooks/useCheckRole";
import { UserContext } from "../../contexts/UserContext/UserContext";

const DashboardLayout = () => {
  const { user } = useContext(UserContext);

  const [role, isRoleLoading] = useCheckRole(user?.email);

  // console.log(role, isRoleLoading);

  if (isRoleLoading) return "loading";

  const dashboardRoutes = (
    <>
      <>
        <li>
          <NavLink to="/">My Orders</NavLink>
        </li>
        <li>
          <NavLink to="/wishlist">My Wishlist</NavLink>
        </li>
      </>
      {role === "seller" ? (
        <>
          <li>
            <NavLink to="/dashboard/add-product">Add a Product</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-products">My Products</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-buyers">My Buyers</NavLink>
          </li>
        </>
      ) : null}
    </>
  );

  return (
    <>
      <nav>
        <HeaderNav dashboard={true} />
      </nav>
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
          <label htmlFor="dashboard-toggle" className="drawer-overlay"></label>
          <ul className="menu overflow-y-auto w-80 bg-base-200 text-base-content  z-20 h-full min-h-screen">
            {dashboardRoutes}
          </ul>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default DashboardLayout;
