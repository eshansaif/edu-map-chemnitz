import React from "react";
import Navbar from "../components/Shared/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
