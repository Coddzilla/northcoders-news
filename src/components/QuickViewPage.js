import React from 'react';
const QuickViewPage = ({article}) => {
return (
< div className="Sidebar">
          <h2>{article.title}</h2>
          <h3>Votes: {article.votes}</h3>
          <p>You can vote on this by viewing the full article</p>
          <h3>Topic: {article.topic}</h3>
          <h3>created at: {article.created_at}</h3>
          <h3>Created by: {article.author}</h3>
</div>)}

export default QuickViewPage;