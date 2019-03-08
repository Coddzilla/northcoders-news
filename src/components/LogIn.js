import React from "react";
import { Link } from "@reach/router";
import "../LogIn.css";

const LogIn = ({ handleClick }) => {
  return (
    <div className="LogIn">
      <Link to="/profile">Profile</Link>
      <button className="button" onClick={handleClick}>
        Log out
      </button>
    </div>
  );
};

export default LogIn;
