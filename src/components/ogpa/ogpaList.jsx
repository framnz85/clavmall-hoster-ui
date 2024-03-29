import React, { Component } from 'react'
import { Pagination } from 'antd';

import httpOgpa from "../../services/httpOgpa";
import Navbar from "../common/navbar.jsx";
import OgpaListTable from './ogpaListTable.jsx';

class OgpaList extends Component {
  state = {
    ogpa: [],
    itemsCount: 0,
    pageSize: 10,
    currentPage: 1,
    sortkey: "createdAt",
    sort: -1,
    skip: 0,
    inputValues: {
      searchQuery: "",
    },
    errors: {},
    };
    
  async componentDidMount() {
    const { pageSize, sortkey, sort, skip, inputValues } = this.state;

    const { data } = await httpOgpa.getOgpa(
      sortkey,
      sort,
      skip,
      pageSize,
      inputValues.searchQuery
    );
    this.setState({ ogpa: data.ogpa, itemsCount: data.length });
  }

  handlePageChange = async (page) => {
    const { pageSize, sortkey, sort, inputValues } = this.state;
    try {
      const { data } = await httpOgpa.getOgpa(
        sortkey,
        sort,
        (page - 1) * pageSize,
        pageSize,
        inputValues.searchQuery
      );
      this.setState({
        ogpa: data.ogpa,
        currentPage: page,
        pageSize,
      });
    } catch (e) {}
  };

  handleSearch = async () => {
    const { pageSize, sortkey, sort, skip, inputValues } = this.state;
    try {
      const { data } = await httpOgpa.getOgpa(
        sortkey,
        sort,
        skip,
        pageSize,
        inputValues.searchQuery
      );
      this.setState({ ogpa: data.ogpa, itemsCount: data.length });
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
    const { itemsCount, ogpa, pageSize, currentPage, inputValues, errors } =
          this.state;
      
    return (
      <React.Fragment>
        <Navbar onClick={this.handleSearch} onChange={this.handleInputChange} />
        <main className="container">
          <h4 className="mt-4">OGPA Program</h4>
          <OgpaListTable
            ogpa={ogpa}
            currentPage={currentPage}
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

export default OgpaList;