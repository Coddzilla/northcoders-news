import React, { Component } from "react";
import * as api from "../api";
import "../CSS/SideBar.css";
import QuickViewPage from "./QuickViewPage";
import CommentQuickView from "./CommentViewSB";
import Error from "./Error";

class SideBar extends Component {
  state = {
    dataToView: [],
    fullComment: "",
    err: null
  };
  render() {
    const { article, sideBarView } = this.props;

    if (this.state.err) {
      return <Error err={this.state.err} />;
    }
    if (!article.article_id || sideBarView === "default") {
      return (
        <div className="Sidebar">
          <div className="defaultSideBar">
            <h2>Have a look at our articles!</h2>
            <p>Why don't you sit down and read about northcoders fun?!</p>
          </div>
        </div>
      );
    }

    if (sideBarView === "commentView" && article) {
      return (
        <>
          <div className="Sidebar">
            <CommentQuickView
              dataToView={this.state.dataToView}
              username={this.props.username}
              handleClick={this.handleClick}
              article={this.props.article}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
          </div>
        </>
      );
    }

    if (sideBarView === "QuickView" && article) {
      return (
        <div className="Sidebar">
          <QuickViewPage article={article} />
        </div>
      );
    }
  }

  componentDidMount() {
    this.fetchViewData();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.fetchViewData();
    }
  }

  handleClick = (article_id, comment_id) => {
    api
      .deleteCommentById(article_id, comment_id)
      .then(() => {
        const newDataToView = this.state.dataToView.filter(
          comment => comment.comment_id !== comment_id
        );
        this.setState({ dataToView: newDataToView });
      })
      .catch(err => {
        this.setState({ err: err.response.status });
      });
  };

  fetchViewData = () => {
    const { article, sideBarView } = this.props;
    if (sideBarView === "commentView") {
      api
        .getViewComments(article.article_id)
        .then(dataToView => {
          this.setState({ dataToView });
        })
        .catch(err => {
          this.setState({ err: err.response.status });
        });
    }
  };

  handleChange = event => {
    event.preventDefault();
    const fullComment = event.target.value;
    this.setState({ fullComment });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { article, username } = this.props;
    const fullComment = this.state.fullComment;
    api.addComment(article.article_id, fullComment, username);

    const newComment = {
      username,
      body: fullComment,
      article_id: 1,
      votes: 0,
      created_at: Date.now()
    };

    this.setState({ dataToView: [newComment, ...this.state.dataToView] });

    this.setState({ fullComment: "" });
  };
}

export default SideBar;
