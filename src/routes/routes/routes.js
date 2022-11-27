import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout/DashboardLayout";
import MainLayout from "../../layout/MainLayout/MainLayout";
import Blog from "../pages/Blog/Blog";
import Categories from "../pages/Categories/Categories";
import Category from "../pages/Category/Category";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../pages/Dashboard/MyProducts/MyProducts";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import WishList from './../pages/Dashboard/WishList/WishList';
import AllBuyers from './../pages/Dashboard/AllBuyers/AllBuyers';
import AllSellers from './../pages/Dashboard/AllSellers/AllSellers';
import PaymentPage from "../pages/Dashboard/PaymentPage/PaymentPage.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import MyBuyers from "../pages/Dashboard/MyBuyers/MyBuyers";
import ReportedItems from './../pages/Dashboard/ReportedItems/ReportedItems';
import Advertisements from "../pages/Advertisements/Advertisements";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'categories',
        element: <Categories />
      },
      {
        path: 'category/:id',
        loader: ({ params }) => fetch(`http://localhost:5000/v2/category/${params.id}`),
        element: <Category />
      },
      {
        path: 'advertisements',
        loader: () => fetch('http://localhost:5000/v2/advertisements'),
        element: <Advertisements />
      },
      {
        path: 'blog',
        element: <Blog />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'add-product',
        element: <AddProduct />,
      },
      {
        path: 'my-products',
        element: <MyProducts />,
      },
      {
        path: 'my-buyers',
        element: <MyBuyers />,
      },
      {
        path: 'my-orders',
        element: <MyOrders />,
      },
      {
        path: 'wishList',
        element: <WishList />,
      },
      {
        path: 'all-buyers',
        element: <AllBuyers />,
      },
      {
        path: 'all-sellers',
        element: <AllSellers />,
      },
      {
        path: 'reported-items',
        element: <ReportedItems />,
      },
      {
        path: 'payment/:id',
        element: <PaymentPage />,
      },
    ]
  }
])

export default router;