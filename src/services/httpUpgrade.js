import http from "./httpService";
import { apiUrl } from "../config.json";

function getEstoreBillings() {
  return http.get(apiUrl + "estore/upgrade");
}

function putEstoreBillings(inputValues) {
  return http.put(apiUrl + "estore/upgrade/" + inputValues._id, inputValues);
}

const httpUpgrade = {
  getEstoreBillings,
  putEstoreBillings
};

export default httpUpgrade;
