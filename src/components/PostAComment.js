import React from "react";

const PostAComment = ({ handleSubmit, handleChange, newComment }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Post a comment</label>
        <input onChange={handleChange} value={newComment} required />
        <button className="button" type="submit">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostAComment;
