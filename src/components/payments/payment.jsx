import React, { Component } from "react";
import httpPayment from "../../services/httpPayment";
import Pagination from "../common/pagination.jsx";
import Navbar from "../common/navbar.jsx";
import PaymentTable from "./paymentTable";
import PaymentModal from "../modals/payments";

class Payments extends Component {
  state = {
    payments: [],
    itemsCount: 0,
    pageSize: 10,
    currentPage: 1,
    sortkey: "name",
    sort: 1,
    skip: 0,
    inputValues: {
      _id: "",
      name: "",
      category: "",
      searchQuery: "",
    },
    errors: {},
  };

  async componentDidMount() {
    const { pageSize, sortkey, sort, skip, inputValues } = this.state;

    const { data } = await httpPayment.getPayments(
      sortkey,
      sort,
      skip,
      pageSize,
      inputValues.searchQuery
    );
    this.setState({ payments: data.payments, itemsCount: data.length });
  }

  handlePageChange = async (page) => {
    const { pageSize, sortkey, sort, inputValues } = this.state;
    try {
      const { data } = await httpPayment.getPayments(
        sortkey,
        sort,
        (page - 1) * 10,
        pageSize,
        inputValues.searchQuery
      );
      this.setState({
        payments: data.payments,
        currentPage: page,
      });
    } catch (e) {}
  };

  handleSearch = async () => {
    const { pageSize, sortkey, sort, skip, inputValues } = this.state;
    try {
      const { data } = await httpPayment.getPayments(
        sortkey,
        sort,
        skip,
        pageSize,
        inputValues.searchQuery
      );
      this.setState({ payments: data.payments, itemsCount: data.length });
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

  addInputValues = () => {
    let inputValues = {
      ...this.state.inputValues,
      _id: "",
      name: "",
      category: "",
      searchQuery: "",
    };
    this.setState({ inputValues });
  };

  handleSort = (sortName) => {
    let { sortkey, sort } = { ...this.state };

    if (sortkey === sortName) sort = -sort;
    else sort = 1;

    sortkey = sortName;
    this.setState({ sortkey, sort }, () => this.handlePageChange(1));
  };

  render() {
    const { itemsCount, payments, pageSize, currentPage, inputValues, errors } =
      this.state;

    return (
      <React.Fragment>
        <Navbar onClick={this.handleSearch} onChange={this.handleInputChange} />
        <main className="container">
          <h4 className="mt-4">Payments</h4>
          <PaymentTable
            payments={payments}
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
          <PaymentModal
            type="add"
            onSave={this.handlePageChange}
            onChange={this.handleInputChange}
            inputErrors={this.handleInputErrors}
            editInput={this.editInputValues}
            addInput={this.addInputValues}
            inputValues={inputValues}
            errors={errors}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default Payments;
