import React, { Component } from "react";
import Error from "./Error";
import * as api from "../api";
import Voter from "./Voter";
import { Link } from "@reach/router";
import SideBar from "./Sidebar";
import IsLoading from "./IsLoading";
import cooking from "./cookingImages";
import coding from "./codingImages";
import football from "./footballImages";
import defaultImg from "./defaultImages";
// import MediaQuery from "react-responsive";

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
        {/* <MediaQuery minDeviceWidth={1224}> */}
        <SideBar
          sideBarView="commentView"
          article={article}
          username={this.props.user.username}
        />
        {/* </MediaQuery> */}
        {/* <MediaQuery maxDeviceWidth={1224}> */}
        {/* <SideBar
            sideBarView="phoneMode"
            article={article}
            username={this.props.user.username}
          />
        </MediaQuery> */}
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

        const authorUser = users.filter(
          user => user.username === article.author
        );

        this.setState({
          article,
          isLoading: false,
          url: authorUser[0].avatar_url
        });
      })
      .catch(err => {
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
