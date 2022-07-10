import { Component } from "react";
import httpHostusers from "../../services/httpHostusers";

class Logout extends Component {
  componentDidMount() {
    httpHostusers.logout();
    window.location = "/login";
  }
  render() {
    return null;
  }
}

export default Logout;
