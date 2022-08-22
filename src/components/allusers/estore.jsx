import React, { Component } from "react";
import httpEstore from "../../services/httpEstore";
import Pagination from "../common/pagination.jsx";
import Navbar from "../common/navbar.jsx";
import EstoreModal from "../modals/estore";
import EstoreTable from "./estoreTable";

class Estore extends Component {
  state = {
    estores: [],
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
    const { pageSize, sortkey, sort, skip, inputValues } = this.state;

    const { data } = await httpEstore.getEstores(
      sortkey,
      sort,
      skip,
      pageSize,
      inputValues.searchQuery
    );
    this.setState({ estores: data.estores, itemsCount: data.length });
  }

  handlePageChange = async (page) => {
    const { pageSize, sortkey, sort, inputValues } = this.state;
    try {
      const { data } = await httpEstore.getEstores(
        sortkey,
        sort,
        (page - 1) * 10,
        pageSize,
        inputValues.searchQuery
      );
      this.setState({
        estores: data.estores,
        currentPage: page,
      });
    } catch (e) {}
  };

  handleSearch = async () => {
    const { pageSize, sortkey, sort, skip, inputValues } = this.state;
    try {
      const { data } = await httpEstore.getEstores(
        sortkey,
        sort,
        skip,
        pageSize,
        inputValues.searchQuery
      );
      this.setState({ estores: data.estores, itemsCount: data.length });
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
    const { itemsCount, estores, pageSize, currentPage, inputValues, errors } =
      this.state;

    return (
      <React.Fragment>
        <Navbar onClick={this.handleSearch} onChange={this.handleInputChange} />
        <main className="container">
          <EstoreTable
            estores={estores}
            currentPage={currentPage}
            handlePageChange={this.handlePageChange}
            handleInputChange={this.handleInputChange}
            handleInputErrors={this.handleInputErrors}
            editInputValues={this.editInputValues}
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
          <EstoreModal
            type="add"
            onSave={this.handlePageChange}
            onChange={this.handleInputChange}
            inputErrors={this.handleInputErrors}
            editInput={this.editInputValues}
            inputValues={inputValues}
            errors={errors}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default Estore;
