import React, { Component } from 'react'
import { Pagination } from 'antd';

import httpUpgrade from "../../services/httpUpgrade";
import Navbar from "../common/navbar.jsx";
import UpgradeTable from './upgradeTable.jsx';

class Upgrade extends Component {
  state = {
    upgrades: [],
    pageSize: 10,
    currentPage: 1,
    sortkey: "createdAt",
    sort: -1,
    skip: 0,
    inputValues: {
      _id: "",
      estoreid: "",
      payStatus: ""
    },
    errors: {},
    };
    
  async componentDidMount() {
    this.loadAllBillings();
  }

  loadAllBillings = async () => {
    const { data } = await httpUpgrade.getEstoreBillings();
    let upgrades = [];
    data.upgrades.map(bill => {
      bill.billingHistory.map(hist => {
        upgrades.push({ ...hist, estoreid: bill._id, name: bill.name });
        return hist;
      });
      return bill;
    })
    upgrades = upgrades.sort((a,b) => {
      let fa = a.payStatus.toLowerCase(),
          fb = b.payStatus.toLowerCase();

      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
    })
    this.setState({ upgrades });
  }

  handlePageChange = async (page) => {
    const { pageSize } = this.state;
    this.setState({
      currentPage: page,
      pageSize,
    });
  };

  // handleSearch = async () => {
  //   const { pageSize, sortkey, sort, skip, inputValues } = this.state;
  //   try {
  //     const { data } = await httpWithdraw.getWithdraw(
  //       sortkey,
  //       sort,
  //       skip,
  //       pageSize,
  //       inputValues.searchQuery
  //     );
  //     this.setState({ withdrawals: data.withdrawals, itemsCount: data.length });
  //   } catch (e) {}
  // };

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
    const { upgrades, pageSize, currentPage, inputValues, errors } =
          this.state;
      
    return (
      <React.Fragment>
        <Navbar
          // onClick={this.handleSearch}
          // onChange={this.handleInputChange}
        />
        <main className="container">
          <h4 className="mt-4">Upgrades</h4>
          <UpgradeTable
            upgrades={upgrades}
            currentPage={currentPage}
            pageSize={pageSize}
            handlePageChange={this.handlePageChange}
            handleInputChange={this.handleInputChange}
            handleInputErrors={this.handleInputErrors}
            editInputValues={this.editInputValues}
            inputValues={inputValues}
            errors={errors}
            loadAllBillings={this.loadAllBillings}
            // onSort={this.handleSort}
          />
          <div align="center">
            <Pagination
              onChange={this.handlePageChange}
              current={currentPage}
              pageSize={pageSize}
              total={upgrades.length}
            />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Upgrade;