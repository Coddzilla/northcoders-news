import React, { Component } from "react";
import * as api from "./api";

import Error from "./Error";

class PostArticle extends Component {
  state = {
    body: "",
    title: "",
    topic: "coding",
    newTopic: "",
    chooseNewTopic: "false",

    Topics: [],
    err: null
  };
  render() {
    if (this.state.err) {
      return <Error err={this.state.err} />;
    }
    return (
      <form className="articleAdd" onSubmit={this.handleSubmit}>
        <label htmlFor="">Pick the topic you would like to write about:</label>
        <div>
          <select name="topic" id="topic_dropDown" onChange={this.handleChange}>
            {this.state.Topics.map(topic => (
              <option value={`${topic.slug}`} key={`${topic.slug}`}>{`${
                topic.slug
              }`}</option>
            ))}
          </select>
          <button className="button" onClick={this.handleClick}>
            Make a new topic?
          </button>
          {this.state.topic === "new" && (
            <div>
              <label>Make a new topic?</label>
              <input
                type="text"
                onChange={this.handleTopicChange}
                value={this.state.newTopic}
              />
              <button className="button" onClick={this.handleTopicClick}>
                Make new topic!
              </button>
            </div>
          )}
        </div>
        <br />
        <div>
          <label>Title: </label>
          <input
            onChange={this.handleChange}
            type="text"
            value={this.state.title}
            name="title"
            required
          />

          <label>Write your article here...</label>
          <input
            onChange={this.handleChange}
            type="text"
            size="70"
            value={this.state.body}
            name="body"
            required
          />
          <button className="button" type="submit">
            POST!
          </button>
        </div>
      </form>
    );
  }

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    api
      .getTopics()
      .then(Topics => this.setState({ Topics }))
      .catch(err => {
        this.setState({ err: err.response.status });
      });
  };
  handleSave = () => {
    localStorage.setItem("state", JSON.stringify(this.state));
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleTopicChange = event => {
    event.preventDefault();
    const newTopic = event.target.value;

    this.setState({ newTopic: newTopic });
  };

  handleTopicClick = event => {
    event.preventDefault();
    const newTopic = this.state.newTopic;

    api
      .addTopic(newTopic)
      .then(data => {
        this.setState({ Topics: [...this.state.Topics, data] });
      })
      .catch(err => {
        this.setState({ err: err.response.status });
      });
  };
  handleClick = event => {
    this.setState({ topic: "new" });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { user } = this.props;
    const { body, title, topic } = this.state;

    this.setState({ body: "", title: "", topic: "" }, () => {
      api
        .postArticle(title, body, user.username, topic)
        .then(article => {
          this.props.navigate(`/articles/${article.article_id}`);
        })
        .catch(err => {
          this.setState({ err: err.response.status });
        });
    });
  };
}

export default PostArticle;
