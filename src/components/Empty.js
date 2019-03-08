import React from "react";
import { navigate } from "@reach/router";

const Empty = ({ type }) => {
  if (type === "topic") {
    return (
      <div>
        <p>
          Hummmm... it looks like there are no artciles written for this topic
          yet. Would you like to post one?!
        </p>
        <button
          className="button"
          onClick={() => {
            navigate("/postArticle");
          }}
        >
          Post an article!
        </button>
      </div>
    );
  }
};

export default Empty;
