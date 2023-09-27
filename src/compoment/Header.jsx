import React, { useContext } from "react";

import { ReducerNavbarContext } from "../context/ResizeContext";
import { FiColumns } from "react-icons/fi";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";
import { MyThemeContext } from "../context/ThemeContext";
function Header() {
  const { theme, toggleTheme } = useContext(MyThemeContext);
  const { user } = useContext(AuthContext);
  const { toggleNavBar, resizeNavBar } = useContext(ReducerNavbarContext);

  const resize = (e) => {
    e.preventDefault();
    resizeNavBar();
  };

  return (
    <>
      <div
        className="header"
        style={{
          backgroundColor: theme ? "#1c1c1c" : "white",
        }}
      >
        <div>
          <button
            onClick={resize}
            className={!toggleNavBar ? "show-nav-bar" : null}
          >
            <FiColumns size="2em" />
          </button>
        </div>
        <div className="conteneur-profil">
          <h5 style={{ color: theme ? "white":"#1c1c1c" }}>
            {user.nom} {user.prenoms}
          </h5>
          
          <div>
            <span
              onClick={(e) => {
                e.preventDefault();
                toggleTheme();
              }}
            >
              {theme ? (
                <BsSunFill fontSize="1.5em" color="orange" />
              ) : (
                <BsFillMoonFill fontSize="1.5em" />
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
