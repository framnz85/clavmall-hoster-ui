import http from "./httpService";
import { apiUrl, apiUrl2 } from "../config.json";

function getWithdraw(sortkey, sort, skip, limit, searchText) {
  return http.get(
    apiUrl +
      "withdraw/withdrawal?sortkey=" +
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

function putWithdraw(inputValues) {
  return http.put(apiUrl2 + "withdraw/withdrawal/" + inputValues._id, inputValues);
}

const httpWithdraw = {
  getWithdraw,
  putWithdraw
};

export default httpWithdraw;
