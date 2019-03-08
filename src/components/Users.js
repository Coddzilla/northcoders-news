import React, { Component } from "react";

class Users extends Component {
  render() {
    const { users } = this.props;

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
}

export default Users;
