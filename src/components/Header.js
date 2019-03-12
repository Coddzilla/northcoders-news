import React from "react";
import { Link } from "@reach/router";
import "../CSS/Header.css";

const Header = () => {
  return (
    <div className="Header">
      <h2>LC-News!</h2>

      <div className="homeContainer">
        <Link to="/">
          <img
            src="http://2014.igem.org/wiki/images/e/e5/Wageningen_UR_home.png"
            alt="home"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
