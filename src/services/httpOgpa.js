import http from "./httpService";
import { apiUrl, apiUrl2 } from "../config.json";

function getOgpa(sortkey, sort, skip, limit, searchText) {
  return http.get(
    apiUrl +
      "ogt/ogpa?sortkey=" +
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

function putOgpa(inputValues) {
  console.log(inputValues)
  return http.put(apiUrl2 + "ogt/ogpa/" + inputValues._id, inputValues);
}

function deleteOgpa({ _id }) {
  return http.delete(apiUrl + "ogt/ogpa/" + _id);
}

const httpOgpa = {
  getOgpa,
  putOgpa,
  deleteOgpa
};

export default httpOgpa;
