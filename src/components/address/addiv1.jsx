import React, { Component } from "react";
import queryString from "query-string";
import httpAddiv1 from "../../services/httpAddiv1";
import Pagination from "../common/pagination.jsx";
import PageBack from "../common/pageBack.jsx";
import Navbar from "../common/navbar.jsx";
import Addiv1Modal from "../modals/addiv1";
import Addiv1Table from "./addiv1Table";

class Addiv1 extends Component {
  state = {
    addivList1: [],
    itemsCount: 0,
    pageSize: 10,
    currentPage: 1,
    couid: this.props.match.params.couid,
    coucode: queryString.parse(this.props.location.search).coucode,
    couname: queryString.parse(this.props.location.search).couname,
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
    const { pageSize, couid, coucode, sortkey, sort, skip, inputValues } =
      this.state;

    try {
      const { data } = await httpAddiv1.getAddiv1(
        couid,
        coucode,
        sortkey,
        sort,
        skip,
        pageSize,
        inputValues.searchQuery
      );

      this.setState({ addivList1: data.addiv1, itemsCount: data.length });
    } catch (e) {}
  }

  handlePageChange = async (page) => {
    const { pageSize, couid, coucode, sortkey, sort, inputValues } = this.state;

    try {
      const { data } = await httpAddiv1.getAddiv1(
        couid,
        coucode,
        sortkey,
        sort,
        (page - 1) * 10,
        pageSize,
        inputValues.searchQuery
      );

      this.setState({
        addivList1: data.addiv1,
        currentPage: page,
      });
    } catch (e) {}
  };

  handleSearch = async () => {
    const { pageSize, couid, coucode, sortkey, sort, skip, inputValues } =
      this.state;

    try {
      const { data } = await httpAddiv1.getAddiv1(
        couid,
        coucode,
        sortkey,
        sort,
        skip,
        pageSize,
        inputValues.searchQuery
      );

      this.setState({ addivList1: data.addiv1, itemsCount: data.length });
    } catch (e) {}
  };

  handleInputChange = (e) => {
    const inputValues = { ...this.state.inputValues };
    inputValues[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ inputValues });
  };

  handleInputErrors = (err) => {
    let errors = { ...this.state.errors };
    errors = err;
    this.setState({ errors });
  };

  editInputValues = (inputData) => {
    let inputValues = { ...this.state.inputValues };
    let errors = { ...this.state.errors };
    inputValues = inputData;
    errors = {};
    this.setState({ inputValues, errors });
  };

  handleSort = (sortName) => {
    let { sortkey, sort } = { ...this.state };

    if (sortkey === sortName) sort = -sort;
    else sort = 1;

    sortkey = sortName;
    this.setState({ sortkey, sort }, () => this.handlePageChange(1));
  };

  render() {
    const {
      itemsCount,
      addivList1,
      pageSize,
      currentPage,
      couid,
      coucode,
      couname,
      inputValues,
      errors,
    } = this.state;

    return (
      <React.Fragment>
        <Navbar onClick={this.handleSearch} onChange={this.handleInputChange} />
        <main className="container">
          <PageBack link="/countries" linkName="All Countries" />
          <PageBack
            link={
              "/addiv1/" + couid + "?coucode=" + coucode + "&couname=" + couname
            }
            linkName={couname}
          />
          {itemsCount === 0 && (
            <p align="center" style={{ margin: "50px 0" }}>
              There are no result to be shown
            </p>
          )}
          {itemsCount > 0 && (
            <div>
              <Addiv1Table
                addivList1={addivList1}
                currentPage={currentPage}
                handlePageChange={this.handlePageChange}
                handleInputChange={this.handleInputChange}
                handleInputErrors={this.handleInputErrors}
                editInputValues={this.editInputValues}
                couid={couid}
                coucode={coucode}
                couname={couname}
                inputValues={inputValues}
                errors={errors}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={itemsCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          )}
          <Addiv1Modal
            type="add"
            onSave={this.handlePageChange}
            onChange={this.handleInputChange}
            inputErrors={this.handleInputErrors}
            inputValues={inputValues}
            errors={errors}
            couid={couid}
            coucode={coucode}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default Addiv1;
