import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "./api";
import Comments from "./Comments";
import IsLoading from "./isLoading";
import QuickView from "./QuickView";
import SideBar from "./Sidebar";
import Error from "./Error";

class Profile extends Component {
  state = {
    usersArticles: [],
    isLoading: true,
    sideBarView: "default",
    article: {},
    err: null
  };
  render() {
    const { user } = this.props;
    const { isLoading, usersArticles, article, sideBarView } = this.state;
    if (this.state.err) {
      return <Error err={this.state.err} />;
    }
    if (usersArticles.length === 0) {
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
          <img className="avatarImage" src={user.avatar_url} alt="avatar_url" />

          <div>Articles written by {user.username}:</div>
          <ul>
            {usersArticles.map(article => {
              return (
                <div key={article.article_id}>
                  <Link to={`/articles/${article.article_id}`}>
                    {article.title}
                  </Link>
                  <QuickView
                    article={article}
                    handleClick={this.handleClickQuickView}
                    id={article.article_id}
                  />
                  <Comments
                    article={article}
                    handleClick={this.handleClickComments}
                  />
                  <button
                    className="button"
                    onClick={() => {
                      this.handleClick(article.article_id);
                    }}
                    key="deleteArticle"
                  >
                    Delete Article
                  </button>
                </div>
              );
            })}
          </ul>
          {usersArticles.length > 2 && (
            <p>You wrote all these articles... well done!</p>
          )}
          {usersArticles.length === 0 && (
            <div>
              <p>
                Hummm... looks like you haven't got any live articles at the
                moment, want to post one?!
              </p>
              {/* <PostArticle path="/postArticle" username={this.props.username} /> */}
              <Link to={`/postArticle`}>Write an article!</Link>
            </div>
          )}
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
    const { user } = this.props;
    api
      .getUserArticles(user.username)
      .then(usersArticles => {
        this.setState({ usersArticles, isLoading: false });
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
        const newArticles = this.state.usersArticles.filter(
          article => article.article_id !== article_id
        );
        this.setState({ usersArticles: newArticles });
      })
      .catch(err => {
        this.setState({ err: err.response.status });
      });
  };
}

export default Profile;
