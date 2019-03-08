import React from "react";

const Comments = ({ article, id, handleClick }) => {
  return (
    <button
      className="CommentsButton"
      onClick={() => {
        handleClick(article);
      }}
    >
      view comments in side bar
    </button>
  );
};

export default Comments;
