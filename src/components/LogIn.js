import React from "react";
import { Link } from "@reach/router";
import "../CSS/LogIn.css";

const LogIn = ({ handleClick, username }) => {
  return (
    <div className="LogIn">
      <Link to="/profile">Profile</Link>
      <h4>Logged in as {username}</h4>
      <button className="button" onClick={handleClick}>
        Log out
      </button>
    </div>
  );
};

export default LogIn;
