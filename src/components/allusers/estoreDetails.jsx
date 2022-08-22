import React, { Component } from "react";
import httpEstore from "../../services/httpEstore";
import Navbar from "../common/navbar.jsx";

class Estore extends Component {
  state = {
    estoreid: this.props.match.params.estoreid,
    estore: {},
    itemsCount: 0,
    pageSize: 10,
    currentPage: 1,
    sortkey: "name",
    sort: 1,
    skip: 0,
    inputValues: {
      _id: "",
      name: "",
      searchQuery: "",
    },
    errors: {},
  };

  async componentDidMount() {
    const { estoreid } = this.state;

    const { data } = await httpEstore.getEstore(
      estoreid
    );
    this.setState({ estore: data.estore[0] });
  }

  render() {
    const { estore } = this.state;

    return (
      <React.Fragment>
        <Navbar noSearch={true} />
        <main className="container"><br /><br />
          <b>ID:</b> {estore._id}<br />
          <b>Name:</b> {estore.name}<br />
          <b>Owner:</b> {estore.owner}<br />
          <b>Email:</b> {estore.email}<br />
          <b>Nominated Password:</b> {estore.password}<br />
          <b>Nominated Urlname 1:</b> {estore.urlname1}<br />
          <b>Nominated Urlname 2:</b> {estore.urlname2}<br />
          <b>Nominated Urlname 3:</b> {estore.urlname3}<br /><br />
          <b>Estore Name:</b> {estore.estoreName}<br />
          <b>Estore Email:</b> {estore.estoreEmail}<br />
          <b>Estore Supplier ID:</b> {estore.estoreSupid}<br />
          <b>Estore Urlname:</b> {estore.estoreUrlname}<br /><br />
          <b>Plan Type:</b> {estore.planType}<br />
          <b>Recurring Cycle:</b> {estore.recurringCycle}<br />
          <b>Status:</b> {estore.status}<br />
        </main>
      </React.Fragment>
    );
  }
}

export default Estore;
