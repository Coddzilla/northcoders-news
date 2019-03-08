import React, { Component } from "react";
import * as api from "./api";
import { Link, Router } from "@reach/router";
import Articles from "./Articles";
import Article from "./Article";
import AuthorPage from "./AuthorPage";
import NoMatch from "./NoMatch";
import PostArticle from "./postArticle";
import Profile from "./profile";
import Error from "./Error";

class Introduction extends Component {
  state = {
    topics: [],
    isLoading: true,
    err: null
  };
  render() {
    const { topics, isLoading } = this.state;

    // let fullTopics = topics.filter(topic => article.topic.length !== 0);
    //check if there are any artciles for the topic? this won't work as it is
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
          {topics.map(topic => (
            <Link to={`/topics/${topic.slug}`} key={topic.slug}>
              {topic.slug}
            </Link>
          ))}
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
            // user={this.props.user}
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
