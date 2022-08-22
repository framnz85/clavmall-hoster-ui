import { Link } from "react-router-dom";
import companyLogo from "../../images/clavmall.png";

const Navbar = ({ onClick, onChange, noSearch }) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#009A57", padding: "0" }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          style={{ color: "#ffffff", marginRight: "50px" }}
          to="/"
        >
          <img src={companyLogo} alt="Clavmall" />
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link"
                style={{ color: "#ffffff", marginRight: "10px" }}
                to="/"
              >
                eStore
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                style={{ color: "#ffffff", marginRight: "10px" }}
                to="/countries"
              >
                Address
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                style={{ color: "#ffffff", marginRight: "10px" }}
                to="/payments"
              >
                Payments
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={{ color: "#ffffff", marginRight: "10px" }}
                to="/hostusers"
              >
                Hosts
              </Link>
            </li>
          </ul>
        </div>
        <form
          className="d-flex"
          onSubmit={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          {!noSearch && <>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              id="searchQuery"
              name="searchQuery"
              onChange={onChange}
            />
            <button
              className="btn btn-outline-light"
              type="button"
              onClick={() => onClick()}
            >
              Search
            </button>
          </>}
          <Link
            className="btn btn-danger"
            style={{ marginLeft: "50px" }}
            to="/logout"
          >
            Logout
          </Link>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
