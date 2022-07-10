import React from "react";
import { Link } from "react-router-dom";

const PageBack = ({ link, linkName }) => {
  return (
    <div
      className="btn-group dropstart"
      style={{ marginTop: "20px", marginRight: "5px" }}
    >
      <Link
        className="btn btn-secondary dropdown-toggle"
        aria-expanded="false"
        to={link}
      >
        {linkName}
      </Link>
    </div>
  );
};

export default PageBack;
