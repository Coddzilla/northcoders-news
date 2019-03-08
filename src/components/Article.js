// use watson to google the phrase and get the first image result url

import React, { Component } from "react";
import Error from "./Error";
import * as api from "./api";
import Voter from "./Voter";
// import Comments from "./Comments";
import { Link } from "@reach/router";
import SideBar from "./Sidebar";
import IsLoading from "./isLoading";
import cooking from "./CookingImages";
import coding from "./CodingImages";
import football from "./FootballImages";
import defaultImg from "./defaultImages";

class Article extends Component {
  state = {
    article: {},
    isLoading: true,
    sideBarView: "default",
    url: "",
    err: null
  };

  render() {
    const { article, isLoading } = this.state;
    const images = { coding, football, cooking };

    if (this.state.err) {
      return <Error err={this.state.err} />;
    }
    if (isLoading) {
      return <IsLoading />;
    }
    return (
      <>
        <section className="MainLeft">
          {" "}
          <article>
            <h2>{article.title}</h2>
            <h5>
              <Link to={`/users/${article.author}/articles`}>
                {article.author}
              </Link>
              <img className="avatarImage" src={this.state.url} alt="avatar" />
            </h5>
            {/* <img src={} alt=""/> */}
            <Voter
              article_id={article.article_id}
              votes={article.votes}
              type="article"
              comment_id={null}
            />

            <h4>{article.body}</h4>
            {article.author === this.props.user.username && (
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
          </article>
          {images[article.topic] && (
            <div className="container">
              <img
                // src={cooking[article.article_id]}
                src={images[article.topic][Math.floor(Math.random() * 11)]}
                alt="sorry, unavailable"
              />
            </div>
          )}
          {!images[article.topic] && (
            <div className="container">
              <img src={defaultImg[0]} alt="sorry, unavailable" />
            </div>
          )}
        </section>

        <SideBar
          sideBarView="commentView"
          article={article}
          username={this.props.user.username}
        />
      </>
    );
  }

  componentDidMount() {
    this.fetchArticle();
  }

  fetchArticle = () => {
    const { article_id } = this.props;
    api
      .getArticle(article_id)
      .then(article => {
        const { users } = this.props;
        console.log("users", users);
        const authorUser = users.filter(
          user => user.username === article.author
        );
        console.log(users);
        //check if users is still there

        this.setState({
          article,
          isLoading: false,
          url: authorUser[0].avatar_url
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ err: err.response.status });
      });
  };

  handleClick = article_id => {
    api
      .deleteArticleById(article_id)
      .then(data => {
        this.props.navigate("/articles");
      })
      .catch(err => {
        this.setState({ err: err.response.status });
      });
  };
}

export default Article;
