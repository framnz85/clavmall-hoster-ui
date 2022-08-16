import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./components/common/notFound";
import Countries from "./components/address/countries.jsx";
import Addiv1 from "./components/address/addiv1.jsx";
import Addiv2 from "./components/address/addiv2.jsx";
import Addiv3 from "./components/address/addiv3.jsx";
import HostUsers from "./components/allusers/hostusers.jsx";
import Estore from "./components/allusers/estore.jsx";
import LoginForm from "./components/allusers/login.jsx";
import Logout from "./components/allusers/logout.jsx";
import httpHostusers from "./services/httpHostusers";
import Payments from "./components/payments/payment";
import MigrateRequest from "./components/migrate/request.jsx";
import MigrateSubmitted from "./components/migrate/requestSubmit.jsx";
import "./App.css";

class App extends Component {
  state = { user: { email: "", password: "" } };

  componentDidMount() {
    const user = httpHostusers.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        {user && (
          <Switch>
            <Route path="/addiv3/:couid/:addiv1/:addiv2" component={Addiv3} />
            <Route path="/addiv2/:couid/:addiv1" component={Addiv2} />
            <Route path="/addiv1/:couid" component={Addiv1} />
            <Route path="/hostusers" component={HostUsers} />
            <Route path="/countries" component={Countries} />
            <Route path="/estore" component={Estore} />
            <Route path="/logout" component={Logout} />
            <Route path="/payments" component={Payments} />
            <Route path="/migrate" component={MigrateRequest} />
            <Route path="/migratesubmitted/:estoreid" component={MigrateSubmitted} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/login" exact to="/estore" />
            <Redirect from="/" exact to="/estore" />
            <Redirect to="/not-found" />
          </Switch>
        )}
        {!user && (
          <Switch>
            <Route path="/migrate" component={MigrateRequest} />
            <Route path="/migratesubmitted/:estoreid" component={MigrateSubmitted} />
            <Route path="/login" component={LoginForm} />
            <Redirect to="/login" />
          </Switch>
        )}
      </React.Fragment>
    );
  }
}

export default App;
