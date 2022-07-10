import http from "./httpService";
import { apiUrl } from "../config.json";

function getAddiv3(
  couid,
  addiv1,
  addiv2,
  coucode,
  sortkey,
  sort,
  skip,
  limit,
  searchText
) {
  return http.get(
    apiUrl +
      "address/addiv3/" +
      couid +
      "/" +
      addiv1 +
      "/" +
      addiv2 +
      "?coucode=" +
      coucode +
      "&sortkey=" +
      sortkey +
      "&sort=" +
      sort +
      "&skip=" +
      skip +
      "&limit=" +
      limit +
      "&searchText=" +
      searchText
  );
}

function postAddiv3({ name }, couid, addiv1, addiv3, coucode) {
  return http.post(
    apiUrl +
      "address/addiv3/" +
      couid +
      "/" +
      addiv1 +
      "/" +
      addiv3 +
      "?coucode=" +
      coucode,
    {
      name,
    }
  );
}

function putAddiv3({ _id, name }, couid, addiv1, addiv2, coucode) {
  return http.put(
    apiUrl +
      "address/addiv3/" +
      couid +
      "/" +
      addiv1 +
      "/" +
      addiv2 +
      "/" +
      _id +
      "?coucode=" +
      coucode,
    {
      name,
    }
  );
}

function deleteAddiv3({ _id }, couid, addiv1, addiv2, coucode) {
  return http.delete(
    apiUrl +
      "address/addiv3/" +
      couid +
      "/" +
      addiv1 +
      "/" +
      addiv2 +
      "/" +
      _id +
      "?coucode=" +
      coucode
  );
}

const httpAddiv3 = {
  getAddiv3,
  postAddiv3,
  putAddiv3,
  deleteAddiv3,
};

export default httpAddiv3;
