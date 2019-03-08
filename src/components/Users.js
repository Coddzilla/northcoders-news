import React, { Component } from "react";

class Users extends Component {
  // state = { users: [] };
  render() {
    const { users } = this.props;
    console.log("line 777", users);
    return (
      <div className="userList">
        {users.length !== 0 &&
          users.map(user => {
            return (
              <div key={user.name}>
                <img src={user.avatar_url} alt="" />
                <h3>{user.name}</h3>
                <h5>{user.username}</h5>
              </div>
            );
          })}
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  // fetchUsers = () => {
  //   api.getUsers().then(users => {
  //     this.setState({ users });
  //     // this.props.saveUsers({ users });
  //   });
  // };
}

export default Users;
