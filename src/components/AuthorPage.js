import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./api";
import Comments from "./Comments";
import Voter from "./Voter";
import QuickView from "./QuickView";
import SideBar from "./Sidebar";
import IsLoading from "./isLoading";
import Error from "./Error";

class AuthorPage extends Component {
  state = {
    authorsArticles: [],
    isLoading: true,
    sideBarView: "default",
    article: {},
    url: "",
    err: null
  };
  render() {
    const { user } = this.props;
    const { isLoading, authorsArticles, article, sideBarView } = this.state;
    if (this.state.err) {
      return <Error err={this.state.err} />;
    }
    if (authorsArticles.length === 0) {
      return (
        <div>
          <p>
            Hummm.. looks like you don't have any live articles at the moment,
            would you like to post one?
          </p>

          <Link to={`/postArticle`}>Write an article!</Link>
        </div>
      );
    } else if (isLoading) {
      return <IsLoading />;
    }
    return (
      <>
        <section className="MainLeft">
          <Link to={`/postArticle`}>Write an article!</Link>
          <img src={this.state.url} alt="avatar" />
          <div>Articles written by {user.username}:</div>
          <ul>
            {authorsArticles.map(article => {
              return (
                <div key={article.article_id}>
                  <Link to={`/articles/${article.article_id}`}>
                    {article.title}
                  </Link>
                  <QuickView
                    article={article}
                    handleClick={this.handleClickQuickView}
                  />
                  <Comments
                    article={article}
                    handleClick={this.handleClickComments}
                  />
                  <Voter
                    article_id={article.article_id}
                    votes={article.votes}
                    comment_id={null}
                    type="article"
                  />
                  {this.props.user.username === article.author && (
                    <button
                      className="button"
                      onClick={() => {
                        this.handleClick(article.article_id);
                      }}
                      key="deleteArticle"
                    >
                      Delete Article
                    </button>
                  )}
                </div>
              );
            })}
          </ul>
        </section>
        <SideBar
          sideBarView={sideBarView}
          article={article}
          username={this.props.user.username}
        />
      </>
    );
  }

  componentDidMount() {
    this.fetchUserArticles();
  }

  fetchUserArticles = () => {
    const { users, user } = this.props;

    const authorUser = users.filter(
      userToFilter => userToFilter.username === user
    );

    api
      .getUserArticles(user)
      .then(authorsArticles => {
        this.setState({
          authorsArticles,
          isLoading: false,
          url: authorUser[0].avatar_url
        });
      })
      .catch(err => {
        this.setState({ err: err.response.status });
      });
  };

  handleClickComments = article => {
    this.setState({ sideBarView: "commentView", article });
  };

  handleClickQuickView = article => {
    this.setState({ sideBarView: "QuickView", article });
  };

  handleClick = article_id => {
    api
      .deleteArticleById(article_id)
      .then(data => {
        const newArticles = this.state.authorsArticles.filter(
          article => article.article_id !== article_id
        );

        this.setState({ authorsArticles: newArticles });
      })
      .catch(err => {
        this.setState({ err: err.response.status });
      });
  };
}

export default AuthorPage;
