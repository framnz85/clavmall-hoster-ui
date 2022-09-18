import React, { Component } from "react";

class RegisterSubmitted extends Component {
  state = {
    estoreid: this.props.match.params.estoreid
  }

  render() {
    document.title = "Registration Submitted";
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
            Clavstore Registration was submitted. Email us now!
          </div>
          <div align="center" style={{
            color: "#333",
            fontSize: 18,
          }}>
            <b style={{ color: "red" }}>What's next?</b> Now that you successfully registered for Clavstore, you need to email us.
            <br /><br />
            <b style={{ color: "red" }}>Email Us At:</b> davgros.85@gmail.com
            <br />
            <b style={{ color: "red" }}>Subject:</b> Registration # {this.state.estoreid}
            <br />
            <b style={{ color: "red" }}>Content:</b> Sir, start setting up my Clavstore account with Registration # {this.state.estoreid}
            <br /><br /><br />
            <div style={{border: "1px solid red", color: "red", padding: 20}}>We will then inform you once the setting up is done. Thank you!.</div>
          </div>

        </div>
      </React.Fragment>
    );
  }
}

export default RegisterSubmitted;
