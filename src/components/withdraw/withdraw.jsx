import React, { Component } from 'react'
import { Pagination } from 'antd';

import httpWithdraw from "../../services/httpWithdraw";
import Navbar from "../common/navbar.jsx";
import WithdrawTable from './withdrawTable.jsx';

class Withdraw extends Component {
  state = {
    withdrawals: [],
    itemsCount: 0,
    pageSize: 10,
    currentPage: 1,
    sortkey: "createdAt",
    sort: -1,
    skip: 0,
    inputValues: {
      _id: "",
      name: "",
      searchQuery: "",
      status: ""
    },
    errors: {},
    };
    
  async componentDidMount() {
    const { pageSize, sortkey, sort, skip, inputValues } = this.state;

    const { data } = await httpWithdraw.getWithdraw(
      sortkey,
      sort,
      skip,
      pageSize,
      inputValues.searchQuery
    );
    this.setState({ withdrawals: data.withdrawals, itemsCount: data.length });
  }

  handlePageChange = async (page, pageSize) => {
    const { sortkey, sort, inputValues } = this.state;
    try {
      const { data } = await httpWithdraw.getWithdraw(
        sortkey,
        sort,
        (page - 1) * pageSize,
        pageSize,
        inputValues.searchQuery
      );
      this.setState({
        withdrawals: data.withdrawals,
        currentPage: page,
        pageSize,
      });
    } catch (e) {}
  };

  handleSearch = async () => {
    const { pageSize, sortkey, sort, skip, inputValues } = this.state;
    try {
      const { data } = await httpWithdraw.getWithdraw(
        sortkey,
        sort,
        skip,
        pageSize,
        inputValues.searchQuery
      );
      this.setState({ withdrawals: data.withdrawals, itemsCount: data.length });
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
    const { itemsCount, withdrawals, pageSize, currentPage, inputValues, errors } =
          this.state;
      
    return (
      <React.Fragment>
        <Navbar onClick={this.handleSearch} onChange={this.handleInputChange} />
        <main className="container">
          <h4 className="mt-4">Withdrawals</h4>
          <WithdrawTable
            withdrawals={withdrawals}
            currentPage={currentPage}
            pageSize={pageSize}
            handlePageChange={this.handlePageChange}
            handleInputChange={this.handleInputChange}
            handleInputErrors={this.handleInputErrors}
            editInputValues={this.editInputValues}
            inputValues={inputValues}
            errors={errors}
            onSort={this.handleSort}
          />
          <div align="center">
            <Pagination
              onChange={this.handlePageChange}
              current={currentPage}
              pageSize={pageSize}
              total={itemsCount}
            />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Withdraw;