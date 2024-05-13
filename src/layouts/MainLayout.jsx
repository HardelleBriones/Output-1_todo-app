import React from "react";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
