// import React from "react";
// import { Link } from "@reach/router";
// import "../CSS/LogIn.css";

// const LogIn = ({ handleClick, username }) => {
//   return (
//     <div className="LogIn">
//       <Link to="/profile">Profile</Link>
//       <h4>Logged in as {username}</h4>
//       <button className="button" onClick={handleClick}>
//         Log out
//       </button>
//     </div>
//   );
// };

// export default LogIn;

////

import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import "../CSS/LogIn.css";
import MediaQuery from "react-responsive";

class LogIn extends Component {
  render() {
    const { handleClick, username, topics, handleChange } = this.props;
    return (
      <>
        <div className="LogIn">
          <Link to="/profile">Profile</Link>
          <h4>Logged in as {username}</h4>
          {/*  */}
          <MediaQuery minDeviceWidth={1224}>
            {/* {topics.map(topic => (
              <Link
              className="topic"
              to={`/topics/${topic.slug}`}
              key={topic.slug}
              >
              {topic.slug}
              </Link>
            ))} */}
            {topics.map(topic => (
              <button
                className="button"
                key={topic.slug}
                onClick={() => {
                  this.topicClick(topic.slug);
                }}
              >
                {topic.slug}
              </button>
            ))}
          </MediaQuery>
          {/*  */}
          <MediaQuery maxDeviceWidth={1224}>
            <label>Choose a topic</label>
            <select
              className="topicChoose"
              name="topic"
              id="topicSelect"
              onChange={handleChange}
            >
              {topics.map(topic => (
                <option value={topic.slug} key={topic.slug}>
                  {topic.slug}
                </option>
              ))}
            </select>
          </MediaQuery>
          <Link to="/articles">View all articles</Link>
          <Link to="/postArticle">Post an Article!</Link>
          {/*  */}
          <button className="button" onClick={handleClick}>
            Log out
          </button>
        </div>
      </>
    );
  }
  topicClick = slug => {
    navigate(`/topics/${slug}`);
  };
}
export default LogIn;
