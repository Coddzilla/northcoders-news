import React from "react";

const QuickView = ({ id, handleClick, article }) => {
  return (
    <button
      className="QuickViewButton"
      id={id}
      onClick={() => {
        handleClick(article);
      }}
    >
      Quick view
    </button>
  );
};

export default QuickView;
