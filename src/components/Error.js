import React from "react";
import ErrorImages from "./ErrorImages";

const Error = ({ err }) => {
  console.log(err);
  if (err) {
    return (
      <div className="errorImage">
        <h4>Error: {err}</h4>
        <img src={ErrorImages[err]} alt={err} />
      </div>
    );
  } else {
    return <p>Sorry, there was a problem with that request</p>;
  }
};

export default Error;
