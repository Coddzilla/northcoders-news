import React from "react";
import { Link } from "@reach/router";

const Header = () => {
  return (
    <div className="Header">
      <h2>LC-News!</h2>
      <div className="homeContainer">
        <Link to="/">Home</Link>
        {/* <img
          src="http://www.stickpng.com/assets/thumbs/588a66aad06f6719692a2d1d.png"
          alt="home"
        /> */}
      </div>
    </div>
  );
};

export default Header;
