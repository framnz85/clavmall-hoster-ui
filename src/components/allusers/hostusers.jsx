import React, { Component } from "react";
import httpHostusers from "../../services/httpHostusers";
import Navbar from "../common/navbar.jsx";

class Countries extends Component {
  state = {
    hostusers: [],
  };

  async componentDidMount() {
    const { data } = await httpHostusers.getHostUsers();
    this.setState({ hostusers: data });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <h4 className="mt-4">Address</h4>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {this.state.hostusers.map((hostuser, index) => (
                <tr key={hostuser._id}>
                  <td>{index + 1}</td>
                  <td>{hostuser.name}</td>
                  <td>{hostuser.email}</td>
                  <td>{hostuser._id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </React.Fragment>
    );
  }
}

export default Countries;
