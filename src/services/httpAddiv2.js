import http from "./httpService";
import { apiUrl } from "../config.json";

function getAddiv2(
  couid,
  addiv1,
  coucode,
  sortkey,
  sort,
  skip,
  limit,
  searchText
) {
  return http.get(
    apiUrl +
      "address/addiv2/" +
      couid +
      "/" +
      addiv1 +
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

function postAddiv2({ name }, couid, addiv1, coucode) {
  return http.post(
    apiUrl + "address/addiv2/" + couid + "/" + addiv1 + "?coucode=" + coucode,
    {
      name,
    }
  );
}

function putAddiv2({ _id, name }, couid, addiv1, coucode) {
  return http.put(
    apiUrl +
      "address/addiv2/" +
      couid +
      "/" +
      addiv1 +
      "/" +
      _id +
      "?coucode=" +
      coucode,
    {
      name,
    }
  );
}

function deleteAddiv2({ _id }, couid, addiv1, coucode) {
  return http.delete(
    apiUrl +
      "address/addiv2/" +
      couid +
      "/" +
      addiv1 +
      "/" +
      _id +
      "?coucode=" +
      coucode
  );
}

const httpAddiv2 = {
  getAddiv2,
  postAddiv2,
  putAddiv2,
  deleteAddiv2,
};

export default httpAddiv2;
