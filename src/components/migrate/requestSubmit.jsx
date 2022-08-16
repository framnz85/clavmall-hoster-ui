import React, { Component } from "react";

class MigrateSubmitted extends Component {
  state = {
    estoreid: this.props.match.params.estoreid
  }

  render() {
    document.title = "Request Submitted";
    return (
      <React.Fragment>
        <div
          className="container rounded-3"
          style={{
            width: "500px",
            padding: "40px",
            marginTop: "20px",
          }}
        >
          <div align="center" style={{
            color: "#009A57",
            fontSize: 32,
            marginBottom: 20,
          }}>
            Migration request was submitted. Email us now!
          </div>
          <div align="center" style={{
            color: "#333",
            fontSize: 18,
          }}>
            <b style={{ color: "red" }}>What's next?</b> Now that you already submitted a request for the migration of your account from eStore Platform to Clavstore Platform, you need to email us.
            <br /><br />
            <b style={{ color: "red" }}>Email Us At:</b> davgros.85@gmail.com
            <br />
            <b style={{ color: "red" }}>Subject:</b> Migration Request # {this.state.estoreid}
            <br />
            <b style={{ color: "red" }}>Content:</b> Sir start migrating my account from eStore to Clavstore with Migration Request # {this.state.estoreid}
          </div>

        </div>
      </React.Fragment>
    );
  }
}

export default MigrateSubmitted;
