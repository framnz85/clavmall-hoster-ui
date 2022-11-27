import React, { Component } from "react";

class MigrateRequest extends Component {
  render() {
    document.title = "Migration Request";

    return (
      <React.Fragment>
        <div
          align="center"
          style={{
            padding: "40px",
            marginTop: "40px",
          }}
        >
          <h3>Migration to the New Platform needs you to Enroll OGPA Program</h3>
          <br /><br />
          <button type="button" className="btn btn-primary btn-lg"
            onClick={() => window.open("https://ogt.clavstore.com/ogpa", '_parent', 'noopener,noreferrer')}
          >
            Register To OGPA HERE
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default MigrateRequest;
