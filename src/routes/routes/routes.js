import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout/DashboardLayout";
import MainLayout from "../../layout/MainLayout/MainLayout";
import Blog from "../pages/Blog/Blog";
import Categories from "../pages/Categories/Categories";
import Category from "../pages/Category/Category";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import MyProducts from "../pages/Dashboard/MyProducts/MyProducts";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
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
        loader: ({ params }) => fetch(`http://localhost:5000/category/${params.id}`),
        element: <Category />
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
    children: [
      {
        path: 'add-product',
        element: <AddProduct />,
      },
      {
        path: 'my-products',
        element: <MyProducts />,
      },
    ]
  }
])

export default router;