import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import HeaderNav from "../HeaderNav/HeaderNav";
import Footer from "./../Footer/Footer";
import useCheckRole from "./../../hooks/useCheckRole";
import { UserContext } from "../../contexts/UserContext/UserContext";
import Loading from "../../components/Loading/Loading";

const DashboardLayout = () => {
  const { user } = useContext(UserContext);

  const [role, isRoleLoading] = useCheckRole(user?.email);

  // console.log(role, isRoleLoading);

  if (isRoleLoading) return <Loading />;

  const dashboardRoutes = (
    <>
      {role === "buyer" ? (
        <>
          <li>
            <NavLink to="/dashboard/my-orders" className="font-medium">My Orders</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/wishlist" className="font-medium">My Wishlist</NavLink>
          </li>
        </>
      ) : null}
      {role === "seller" ? (
        <>
          <li>
            <NavLink to="/dashboard/add-product" className="font-medium">Add a Product</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-products" className="font-medium">My Products</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-buyers" className="font-medium">My Buyers</NavLink>
          </li>
        </>
      ) : null}
      {role === "admin" ? (
        <>
          <li>
            <NavLink to="/dashboard/all-sellers" className="font-medium">All Sellers</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-buyers" className="font-medium">All Buyers</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/reported-items" className="font-medium">Reported Items</NavLink>
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
          <ul className="menu overflow-y-auto w-80 bg-gray-200 text-base-content text-lg font-barlow-cond tracking-widest z-20 h-full min-h-screen">
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
