import React, { Component } from "react";
import * as api from "../api";
import { Link, Router } from "@reach/router";
import Articles from "./Articles";
import Article from "./Article";
import AuthorPage from "./AuthorPage";
import NoMatch from "./NoMatch";
import PostArticle from "./PostArticle";
import Profile from "./Profile";
import Error from "./Error";
import MediaQuery from "react-responsive";

class Introduction extends Component {
  state = {
    topics: [],
    isLoading: true,
    err: null
  };
  render() {
    const { topics, isLoading } = this.state;

    const { users } = this.props;
    if (this.state.err) {
      return <Error err={this.state.err} />;
    }
    if (isLoading) {
      return <h2>Loading...</h2>;
    }
    return (
      <section>
        <nav className="LogIn">
          {" "}
          <MediaQuery minDeviceWidth={1224}>
            {topics.map(topic => (
              <Link
                className="topic"
                to={`/topics/${topic.slug}`}
                key={topic.slug}
              >
                {topic.slug}
              </Link>
            ))}
          </MediaQuery>
          <Link to="/articles">View all articles</Link>
          <Link to="/postArticle">Post an Article!</Link>
        </nav>

        <Router className="main">
          <Articles path="/" user={this.props.user} view="home" />
          <Articles path="/articles" user={this.props.user} view="all" />
          <Articles
            path="/topics/:topic"
            user={this.props.user}
            view="topics"
          />
          <Article
            path="/articles/:article_id"
            user={this.props.user}
            users={users}
          />
          <Profile path="/profile" user={this.props.user} />
          <AuthorPage
            path="/users/:user/articles"
            userLoggedIn={this.props.user}
            users={users}
          />
          <PostArticle path="/postArticle" user={this.props.user} />
          <NoMatch default />
        </Router>
      </section>
    );
  }

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    api
      .getTopics()
      .then(topics => {
        this.setState({ topics, isLoading: false });
      })
      .catch(err => {
        this.setState({ err: err.response.status });
      });
  };
}

export default Introduction;
