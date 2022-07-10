import http from "./httpService";
import { apiUrl } from "../config.json";

function getPayments(sortkey, sort, skip, limit, searchText) {
  return http.get(
    apiUrl +
      "payments/payment?sortkey=" +
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

function postPayment({ name, category }) {
  return http.post(apiUrl + "payments/payment", { name, category });
}

function putPayment({ _id, name, category }) {
  return http.put(apiUrl + "payments/payment/" + _id, {
    name,
    category,
  });
}

function deletePayment({ _id }) {
  return http.delete(apiUrl + "payments/payment/" + _id);
}

const httpPayments = {
  getPayments,
  postPayment,
  putPayment,
  deletePayment,
};

export default httpPayments;
