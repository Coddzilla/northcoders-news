import React, { Component } from "react";
import ChooseAvatar from "./ChooseAvatar";

class CreateAUser extends Component {
  state = {
    newUsername: "",
    newName: ""
  };
  render() {
    const { wantNewAvatar, newAvatar, setURL, createNewUser } = this.props;
    return (
      <div>
        <button onClick={wantNewAvatar}>Create a new avatar?</button> <br />
        {newAvatar && <ChooseAvatar setURL={setURL} />}
        <label>What would you like your username to be?</label>
        <br />
        <input
          name="newUsername"
          onChange={this.handleChange}
          value={this.state.newUsername}
        />
        <br />
        <label>What is your name?</label>
        <br />
        <input
          name="newName"
          onChange={this.handleChange}
          value={this.state.newName}
        />
        <button
          className="button"
          onClick={() => {
            createNewUser(this.state.newUsername, this.state.newName);
          }}
        >
          Done!
        </button>{" "}
      </div>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
}

export default CreateAUser;
