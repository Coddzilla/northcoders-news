import React, { Component } from "react";
class Auth extends Component {
  state = { username: "" };
  render() {
    if (this.props.user !== "") {
      return (
        <div>
          <>{this.props.children}</>
        </div>
      );
    }
    return (
      <div className="Auth">
        <form onSubmit={this.handleSubmit}>
          <label>Enter username to Log in</label>
          <input
            onChange={this.handleChange}
            value={this.state.username}
            required
          />

          <button className="button" type="submit">
            Log in
          </button>
        </form>
      </div>
    );
  }
  handleChange = event => {
    event.preventDefault();
    const username = event.target.value;
    this.setState({ username });
  };
  handleSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    this.props.LogIn(username);
    this.setState({ username: "" });
  };

  componentDidUpdate() {
    this.handleSave();
  }
  handleSave = () => {
    localStorage.setItem("username", JSON.stringify(this.state.username));
  };
}

export default Auth;
