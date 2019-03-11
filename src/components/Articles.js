import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";
import Comments from "./Comments";
import QuickView from "./QuickView";
import SideBar from "./Sidebar";
import Empty from "./Empty";
import Error from "./Error";
import cooking from "./cookingImages";
import coding from "./codingImages";
import football from "./footballImages";
import defaultImg from "./defaultImages";
import { throttle } from "lodash";
import "../CSS/Articles.css";
import MediaQuery from "react-responsive";

class Articles extends Component {
  state = {
    articles: [],
    sideBarView: "default",
    article: {},
    sort_by: "",
    err: null,
    page: 1,
    haveAllArticles: false
  };
  render() {
    const { article, articles, sideBarView } = this.state;
    const images = { coding, football, cooking, defaultImg };

    if (this.state.err) {
      return (
        <section className="AllArticles">
          <Error err={this.state.err} />
        </section>
      );
    }
    if (articles.length === 0) {
      return (
        <section className="AllArticles">
          <Empty type="topic" />
        </section>
      );
    }
    return (
      <>
        <section className="MainLeft">
          <div>
            {" "}
            {this.props.view !== "home" && (
              <select name="sort_by" id="sort_by" onChange={this.handleChange}>
                <option value="title" key="title">
                  title
                </option>
                <option value="created_at" key="created_at">
                  date
                </option>
                <option value="comment_count" key="comment_count">
                  comment count
                </option>
                <option value="votes" key="votes">
                  votes
                </option>
              </select>
            )}
            <button
              className="button"
              onClick={() => {
                this.props.navigate("/postArticle");
              }}
            >
              Post an article!
            </button>
          </div>

          <ul className="AllArticles">
            {" "}
            {articles.map(article => {
              if (!images[article.topic]) {
                return (
                  <div className="card" key={article.article_id}>
                    {this.props.view === "home" && (
                      <div className="container">
                        <img src={images.defaultImg[0]} alt={article.topic} />
                      </div>
                    )}
                    <br />
                    <Link to={`/articles/${article.article_id}`}>
                      {article.title}
                    </Link>{" "}
                    <br />
                    <MediaQuery minDeviceWidth={1224}>
                      <QuickView
                        article={article}
                        handleClick={this.handleClickQuickView}
                      />
                      <Comments
                        article={article}
                        handleClick={this.handleClickComments}
                      />
                    </MediaQuery>
                    {this.props.user.username === article.author && (
                      <button
                        className="DeleteButton"
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
              }

              return (
                <div className="card" key={article.article_id}>
                  {this.props.view === "home" && (
                    <div className="container">
                      <img src={images[article.topic][0]} alt={article.topic} />
                    </div>
                  )}
                  <Link to={`/articles/${article.article_id}`}>
                    {article.title}
                  </Link>{" "}
                  <MediaQuery minDeviceWidth={1224}>
                    <QuickView
                      article={article}
                      handleClick={this.handleClickQuickView}
                    />
                    <Comments
                      article={article}
                      handleClick={this.handleClickComments}
                    />
                  </MediaQuery>
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
        <MediaQuery minDeviceWidth={1224}>
          <SideBar
            sideBarView={sideBarView}
            article={article}
            username={this.props.user.username}
          />
        </MediaQuery>
      </>
    );
  }

  componentDidMount() {
    this.fetchArticles();

    this.addScrollEventListener();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.view !== "home") {
      if (
        prevProps.view !== this.props.view ||
        prevState.sort_by !== this.state.sort_by ||
        prevProps.topic !== this.props.topic
      ) {
        this.setState({ page: 1 });
      }
      if (
        prevState.page !== this.state.page ||
        prevState.sort_by !== this.state.sort_by ||
        prevProps.topic !== this.props.topic
      ) {
        this.fetchArticles();
      }
    }
  }

  addScrollEventListener = () => {
    document
      .querySelector(".AllArticles")
      .addEventListener("scroll", this.handleScroll);
  };

  handleScroll = throttle(event => {
    const { scrollHeight, scrollTop, clientHeight } = event.target;

    if (
      clientHeight + scrollTop + 100 > scrollHeight &&
      !this.state.haveAllArticles
    ) {
      this.setState({ page: this.state.page + 1 });
    }
  }, 500);

  fetchArticles = () => {
    const { sort_by, page } = this.state;

    api
      .getArticles(sort_by, this.props, page)
      .then(articles => {
        if (page === 1) {
          this.setState({ articles });
        } else {
          this.setState({ articles: [...this.state.articles, ...articles] });
        }
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({ haveAllArticles: true, err: err.response.status });
        } else {
          this.setState({ err: err.response.status });
        }
      });
  };

  handleClickComments = article => {
    this.setState({ sideBarView: "commentView", article });
  };

  handleClickQuickView = article => {
    this.setState({ sideBarView: "QuickView", article });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleClick = article_id => {
    api
      .deleteArticleById(article_id)
      .then(data => {
        const newArticles = this.state.articles.filter(
          article => article.article_id !== article_id
        );

        this.setState({ articles: newArticles });
      })
      .catch(err => {
        this.setState({ err: err.response.status });
      });
  };
}

export default Articles;
