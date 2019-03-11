import React from "react";
import { Link } from "@reach/router";

const Header = () => {
  return (
    <div className="Header">
      <h2>LC-News!</h2>
      <div className="homeContainer">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default Header;
