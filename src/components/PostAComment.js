import React from "react";
import "../CSS/PostAComment.css";

const PostAComment = ({ handleSubmit, handleChange, newComment }) => {
  return (
    <div className="PostAComment">
      <form onSubmit={handleSubmit}>
        <label>Post a comment</label>
        <input
          className="inputComment"
          onChange={handleChange}
          value={newComment}
          required
        />
        <button className="button" type="submit">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostAComment;
