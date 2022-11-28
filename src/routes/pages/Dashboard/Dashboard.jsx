import useCheckRole from "./../../../hooks/useCheckRole";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext/UserContext";
import Loading from "../../../components/Loading/Loading";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [role, isRoleLoading] = useCheckRole(user?.email);

  if (isRoleLoading) return <Loading />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-4 h-96">
      {role === "buyer" ? (
        <>
          <Link
            to="/dashboard/my-orders"
            className="border grid place-items-center text-3xl font-bold hover:bg-gray-200 hover:shadow-sm rounded-sm"
          >
            My Orders
          </Link>
          <Link
            to="/dashboard/wishlist"
            className="border grid place-items-center text-3xl font-bold hover:bg-gray-200 hover:shadow-sm rounded-sm"
          >
            Wishlist
          </Link>
        </>
      ) : null}
      {role === "seller" ? (
        <>
          <Link
            to="/dashboard/add-product"
            className="border grid place-items-center text-3xl font-bold hover:bg-gray-200 hover:shadow-sm rounded-sm"
          >
            Add a Product
          </Link>
          <Link
            to="/dashboard/my-products"
            className="border grid place-items-center text-3xl font-bold hover:bg-gray-200 hover:shadow-sm rounded-sm"
          >
            My Products
          </Link>
          <Link
            to="/dashboard/my-buyers"
            className="border grid place-items-center text-3xl font-bold hover:bg-gray-200 hover:shadow-sm rounded-sm"
          >
            My Buyers
          </Link>
        </>
      ) : null}
      {role === "admin" ? (
        <>
          <Link
            to="/dashboard/all-sellers"
            className="border grid place-items-center text-3xl font-bold hover:bg-gray-200 hover:shadow-sm rounded-sm"
          >
            All Sellers
          </Link>
          <Link
            to="/dashboard/all-buyers"
            className="border grid place-items-center text-3xl font-bold hover:bg-gray-200 hover:shadow-sm rounded-sm"
          >
            All Buyers
          </Link>
          <Link
            to="/dashboard/reported-items"
            className="border grid place-items-center text-3xl font-bold hover:bg-gray-200 hover:shadow-sm rounded-sm"
          >
            Reported Items
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default Dashboard;
