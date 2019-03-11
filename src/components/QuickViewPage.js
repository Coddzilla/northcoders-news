import React from "react";
import "../CSS/QuickView.css";
const QuickViewPage = ({ article }) => {
  return (
    <div className="QuickView">
      <h2>{article.title}</h2>
      <h3>Votes: {article.votes}</h3>
      <p>You can vote on this by viewing the full article</p>
      <h3>Topic: {article.topic}</h3>
      <h3>created at: {article.created_at.slice(0, 10)}</h3>
      <h3>Created by: {article.author}</h3>
    </div>
  );
};

export default QuickViewPage;
