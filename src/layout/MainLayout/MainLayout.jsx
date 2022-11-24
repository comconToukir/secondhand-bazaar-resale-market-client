import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import HeaderNav from "../HeaderNav/HeaderNav";

const MainLayout = () => {
  return (
    <>
      <nav>
        <HeaderNav />
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default MainLayout;
