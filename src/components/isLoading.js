import React from "react";
import { Link } from "@reach/router";

const IsLoading = () => {
  return (
    <div>
      {" "}
      <h3>Loading...</h3>
      <Link to={`/postArticle`}>Write an article!</Link>
    </div>
  );
};

export default IsLoading;
