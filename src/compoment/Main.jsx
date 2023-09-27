import React, { useContext } from "react";
import Header from "./Header";
import { ReducerNavbarContext } from "../context/ResizeContext";
import { Outlet } from "react-router-dom";
function Main() {
  const { toggleNavBar } = useContext(ReducerNavbarContext);
  const styleMain = {
    width: toggleNavBar ? "100%" : null,
  };
  return (
    <div className="conteneur-main" style={styleMain}>
      <Header />

      <Outlet />
    </div>
  );
}

export default Main;
