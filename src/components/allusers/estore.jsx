import React, { Component } from "react";
import httpEstore from "../../services/httpEstore";
import Pagination from "../common/pagination.jsx";
import Navbar from "../common/navbar.jsx";
import EstoreTable from "./estoreTable";
import { Button } from 'antd';
import { utils, writeFile } from 'xlsx';

class Estore extends Component {
  state = {
    estores: [],
    itemsCount: 0,
    pageSize: 10,
    currentPage: 1,
    sortkey: "_id",
    sort: -1,
    skip: 0,
    inputValues: {
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

  handleExport = async () => {
    const imageDir = "https://clavstoreimages.etnants.com/estore_images/";
    let productExp = [];
    let index = 0;
    
    const { itemsCount, sortkey, sort, skip, inputValues } = this.state;

    const { data } = await httpEstore.getEstores(
      sortkey,
      sort,
      skip,
      itemsCount,
      inputValues.searchQuery
    );

    for (let i = 0, estore = {}, images = "", locations = ""; i < data.estores.length; i++){
      estore = data.estores[i];
      index = i + 1;
      images = "";
      locations = "";
      estore.carouselImages && estore.carouselImages.map(img => {
        images = images + imageDir + "estore" + estore._id + "/" + img.url + ", ";
        return img.url;
      });
      const { countries, addiv1s, addiv2s, addiv3s } = await httpEstore.getEstoreLocation(estore._id, estore.country);
      if (!countries.data.err) {
        countries.data.map(country => {
          if (locations.length < 5000) {
            locations = locations + country.name + ", ";
          }
          return country;
        })
      }
      if (!addiv1s.data.err) {
        addiv1s.data.map(addiv1 => {
          if (locations.length < 5000) {
            locations = locations + addiv1.name + ", ";
          }
          return addiv1;
        })
      }
      if (!addiv2s.data.err) {
        addiv2s.data.map(addiv2 => {
          if (locations.length < 5000) {
            locations = locations + addiv2.name + ", ";
          }
          return addiv2;
        })
      }
      if (!addiv3s.data.err) {
        addiv3s.data.map(addiv3 => {
          if (locations.length < 5000) {
            locations = locations + addiv3.name + ", ";
          }
          return addiv3;
        })
      }
      const result = {
        _id: index + 1,
        type: "simple",
        sku: estore._id,
        name: estore.name,
        published: "1",
        isFeatured: "1",
        visibility: "visible",
        shortDesc: "",
        description: "Serving locations of " + locations,
        inStock: "1",
        allowCust: "1",
        categories: "grocery, online grocery, online store",
        tags: "grocery, online, product",
        images
      }
      productExp.push(result);
    }
        
    const headings = [[
      'ID',
      'Type',
      'SKU',
      'Name',
      'Published',
      'Is featured?',
      'Visibility in catalog',
      'Short description',
      'Description',
      'In stock?',
      'Allow customer reviews?',
      'Categories',
      'Tags',
      'Images',
    ]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, productExp, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, 'Estores.xlsx');
  };

  render() {
    const { itemsCount, estores, pageSize, currentPage, inputValues, errors } =
      this.state;

    return (
      <React.Fragment>
        <Navbar onClick={this.handleSearch} onChange={this.handleInputChange} />
        <main className="container">
          <h4 className="mt-4">Clavstores</h4>
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
          <Button type="primary" size="large" onClick={this.handleExport}>
            Catalog Export
          </Button>
          <Pagination
            itemsCount={itemsCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default Estore;
