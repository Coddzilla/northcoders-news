import React, { Component } from "react";
import PostAComment from "./PostAComment";
import Voter from "./Voter";
//change into a function?
class CommentQuickView extends Component {
  render() {
    const {
      dataToView,
      handleSubmit,
      handleChange,
      article,
      newComment,
      username,
      handleClick
    } = this.props;

    return (
      <div>
        {dataToView.length === 0 && (
          <h2>
            There are currently no comments for this. Why don't you be the
            first!?
          </h2>
        )}

        <div>
          <PostAComment
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            newComment={newComment}
          />
          <div>
            {dataToView.length !== 0 &&
              dataToView.map(comment => {
                return (
                  <div key={comment.comment_id}>
                    <h4>Comment: </h4>
                    <p className="comment">{comment.body}</p>
                    <div className="commentInfo">
                      <Voter
                        article_id={article.article_id}
                        votes={comment.votes}
                        type="comment"
                        comment_id={comment.comment_id}
                      />
                      <h5>Written by:{comment.author}</h5>
                      <h5>created at: {comment.created_at}</h5>
                      <h5>id: {comment.comment_id}</h5>
                      {username === comment.author && (
                        <button
                          className="button"
                          onClick={() => {
                            handleClick(article.article_id, comment.comment_id);
                          }}
                          // key="deleteComment"
                        >
                          Delete comment
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default CommentQuickView;
