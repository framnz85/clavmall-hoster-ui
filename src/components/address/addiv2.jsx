import React, { Component } from "react";
import queryString from "query-string";
import httpAddiv2 from "../../services/httpAddiv2";
import Pagination from "../common/pagination.jsx";
import PageBack from "../common/pageBack.jsx";
import Navbar from "../common/navbar.jsx";
import Addiv2Modal from "../modals/addiv2";
import Addiv2Table from "./addiv2Table";

class Addiv2 extends Component {
  state = {
    addivList2: [],
    itemsCount: 0,
    pageSize: 10,
    currentPage: 1,
    couid: this.props.match.params.couid,
    addiv1: this.props.match.params.addiv1,
    coucode: queryString.parse(this.props.location.search).coucode,
    couname: queryString.parse(this.props.location.search).couname,
    adDivName1: queryString.parse(this.props.location.search).adDivName1,
    adDivName2: queryString.parse(this.props.location.search).adDivName2,
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
    const {
      pageSize,
      couid,
      addiv1,
      coucode,
      sortkey,
      sort,
      skip,
      inputValues,
    } = this.state;

    try {
      const { data } = await httpAddiv2.getAddiv2(
        couid,
        addiv1,
        coucode,
        sortkey,
        sort,
        skip,
        pageSize,
        inputValues.searchQuery
      );

      this.setState({ addivList2: data.addiv2, itemsCount: data.length });
    } catch (e) {}
  }

  handlePageChange = async (page) => {
    const { pageSize, couid, addiv1, coucode, sortkey, sort, inputValues } =
      this.state;

    try {
      const { data } = await httpAddiv2.getAddiv2(
        couid,
        addiv1,
        coucode,
        sortkey,
        sort,
        (page - 1) * 10,
        pageSize,
        inputValues.searchQuery
      );

      this.setState({
        addivList2: data.addiv2,
        currentPage: page,
      });
    } catch (e) {}
  };

  handleSearch = async () => {
    const {
      pageSize,
      couid,
      addiv1,
      coucode,
      sortkey,
      sort,
      skip,
      inputValues,
    } = this.state;

    try {
      const { data } = await httpAddiv2.getAddiv2(
        couid,
        addiv1,
        coucode,
        sortkey,
        sort,
        skip,
        pageSize,
        inputValues.searchQuery
      );

      this.setState({ addivList2: data.addiv2, itemsCount: data.length });
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

  render() {
    const {
      itemsCount,
      addivList2,
      pageSize,
      currentPage,
      couid,
      addiv1,
      coucode,
      couname,
      adDivName1,
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
          <PageBack
            link={
              "/addiv2/" +
              couid +
              "/" +
              addiv1 +
              "?coucode=" +
              coucode +
              "&couname=" +
              couname +
              "&adDivName1=" +
              adDivName1
            }
            linkName={adDivName1}
          />
          {itemsCount === 0 && (
            <p align="center" style={{ margin: "50px 0" }}>
              There are no result to be shown
            </p>
          )}
          {itemsCount > 0 && (
            <div>
              <Addiv2Table
                addivList2={addivList2}
                currentPage={currentPage}
                handlePageChange={this.handlePageChange}
                handleInputChange={this.handleInputChange}
                handleInputErrors={this.handleInputErrors}
                editInputValues={this.editInputValues}
                couid={couid}
                addiv1={addiv1}
                coucode={coucode}
                couname={couname}
                adDivName1={adDivName1}
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
          <Addiv2Modal
            type="add"
            onSave={this.handlePageChange}
            onChange={this.handleInputChange}
            inputErrors={this.handleInputErrors}
            editInput={this.editInputValues}
            inputValues={inputValues}
            errors={errors}
            couid={couid}
            addiv1={addiv1}
            coucode={coucode}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default Addiv2;
