import http from "./httpService";
import { apiUrl } from "../config.json";

function getAddiv1(couid, coucode, sortkey, sort, skip, limit, searchText) {
  return http.get(
    apiUrl +
      "address/addiv1/" +
      couid +
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

function postAddiv1({ name }, couid, coucode) {
  return http.post(apiUrl + "address/addiv1/" + couid + "?coucode=" + coucode, {
    name,
  });
}

function putAddiv1({ _id, name }, couid, coucode) {
  return http.put(
    apiUrl + "address/addiv1/" + couid + "/" + _id + "?coucode=" + coucode,
    {
      name,
    }
  );
}

function deleteAddiv1({ _id }, couid, coucode) {
  return http.delete(
    apiUrl + "address/addiv1/" + couid + "/" + _id + "?coucode=" + coucode
  );
}

const httpAddiv1 = {
  getAddiv1,
  postAddiv1,
  putAddiv1,
  deleteAddiv1,
};

export default httpAddiv1;
