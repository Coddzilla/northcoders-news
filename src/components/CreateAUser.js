import React, { Component } from "react";
import ChooseAvatar from "./ChooseAvatar";

class CreateAUser extends Component {
  state = {
    newUsername: "",
    newName: ""
  };
  render() {
    const {
      handleChangeCreate,
      newUser,
      wantNewAvatar,
      newAvatar,
      setURL,
      createNewUser,
      handleChange
    } = this.props;
    return (
      // <form onSubmit={handleCreateClick}>
      <div>
        <label>What would you like your username to be?</label>
        <br />
        <input
          name="newUsername"
          onChange={this.handleChange}
          value={this.state.newUsername}
        />
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
          Create a user
        </button>{" "}
        <button onClick={wantNewAvatar}>Create a new avatar?</button>{" "}
        {newAvatar && <ChooseAvatar setURL={setURL} />}
      </div>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
}

export default CreateAUser;
