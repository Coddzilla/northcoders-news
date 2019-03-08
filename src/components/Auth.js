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
    console.log(username);
    this.setState({ username });
  };
  handleSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    this.props.LogIn(username);
    this.setState({ username: "" });
  };

  // componentDidMount() {
  //   const retrievedState = localStorage.getItem("state");
  //   console.log(JSON.parse(retrievedState));
  //   const parsedState = JSON.parse(retrievedState);
  //   console.log(parsedState);
  //   if (typeof parsedState === "object") {
  //     this.setState(parsedState);
  //   }
  // }
  componentDidUpdate() {
    this.handleSave();
  }
  handleSave = () => {
    localStorage.setItem("state", JSON.stringify(this.state));
  };
}

export default Auth;