import http from "./httpService";
import { apiUrl } from "../config.json";

function getEstores(sortkey, sort, skip, limit, searchText) {
  return http.get(
    apiUrl +
      "allusers/estore?sortkey=" +
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

function postEstores({ name }) {
  return http.post(apiUrl + "allusers/estore", { name });
}

function putEstores({ _id, name }) {
  return http.put(apiUrl + "allusers/estore/" + _id, {
    name,
  });
}

function deleteEstores({ _id }) {
  return http.delete(apiUrl + "allusers/estore/" + _id);
}

const httpEstore = {
  getEstores,
  postEstores,
  putEstores,
  deleteEstores,
};

export default httpEstore;
