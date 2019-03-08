import React, { Component } from "react";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Introduction from "./components/Introduction";
import * as api from "./components/api";
import Auth from "./components/Auth";
import Users from "./components/Users";
import Error from "./components/Error";
import CreateAUser from "./components/CreateAUser";

import "./App.css";

class App extends Component {
  state = {
    user: {},
    users: [],
    err: null,
    newUser: "",
    avatarURL: "https://i.stack.imgur.com/HQwHI.jpg",
    newAvatar: false,
    newUsername: ""
  };
  render() {
    if (this.state.err) {
      return <Error err={this.state.err} />;
    }
    return (
      <div className="App">
        <Header />
        <Auth LogIn={this.setUser} user={this.state.user}>
          <LogIn
            username={this.state.user.username}
            handleClick={this.handleClick}
          />
          <Introduction user={this.state.user} users={this.state.users} />
        </Auth>

        {!this.state.user.username && (
          <div>
            <h4>or create a new user...</h4>
            {this.state.newAvatar && (
              <img src={this.state.avatarURL} alt="avatarURL" />
            )}
            <CreateAUser
              wantNewAvatar={this.wantNewAvatar}
              handleCreateClick={this.handleCreateClick}
              newUser={this.state.newUser}
              setURL={this.setURL}
              newAvatar={this.state.newAvatar}
              createNewUser={this.createNewUser}
            />

            <Users fetchUsers={this.fetchUsers} users={this.state.users} />
          </div>
        )}
      </div>
    );
  }

  setUser = username => {
    api
      .fetchUser(username)
      .then(user => {
        this.setState({ user });
      })
      .catch(err => {
        this.setState({ err: err.response.status });
      });
  };

  createNewUser = (newUsername, newName) => {
    api.addUser(newUsername, this.state.avatarURL, newName).then(user => {
      this.setState({ users: [...this.state.users, user] });
    });
  };

  wantNewAvatar = () => {
    const { newAvatar } = this.state;
    if (newAvatar) {
      this.setState({ newAvatar: false });
    } else {
      this.setState({ newAvatar: true });
    }
  };

  componentDidMount() {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      this.setState({ user: parsedUser });
    }
  }

  componentDidUpdate() {
    //if statement
    this.handleSave();
  }
  handleSave = () => {
    const { user } = this.state;
    localStorage.setItem("user", JSON.stringify(user));
  };

  handleClick = () => {
    this.setState({ user: "" });
  };

  handleCreateClick = () => {
    this.setState({ newUser: "" });
  };
  setURL = (hairStyle, accessories, hairColour, facialHair, skinColour) => {
    if (facialHair !== "Blank") {
      this.setState({
        avatarURL: `https://avataaars.io/?avatarStyle=Circle&topType=${hairStyle}&accessoriesType=${accessories}&hairColor=${hairColour}&facialHairType=${facialHair}&clotheType=Hoodie&clotheColor=Black&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=${skinColour}`
      });
    } else {
      this.setState({
        avatarURL: `https://avataaars.io/?avatarStyle=Circle&topType=${hairStyle}&accessoriesType=${accessories}&hairColor=${hairColour}&facialHairType=${facialHair}&facialHairColor=${hairColour}&clotheType=Hoodie&clotheColor=Black&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=${skinColour}`
      });
    }
  };

  fetchUsers = () => {
    api
      .getUsers()
      .then(users => {
        this.setState({ users });
      })
      .catch(err => {
        this.setState({ err: err.response.status });
      });
  };
}

export default App;
