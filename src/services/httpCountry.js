import http from "./httpService";
import { apiUrl } from "../config.json";

function getCountries(sortkey, sort, skip, limit, searchText) {
  return http.get(
    apiUrl +
      "address/country?sortkey=" +
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

function postCountries({ name, countryCode, currency }) {
  return http.post(apiUrl + "address/country", { name, countryCode, currency });
}

function putCountries({ _id, name, countryCode, currency }) {
  return http.put(apiUrl + "address/country/" + _id, {
    name,
    countryCode,
    currency,
  });
}

function deleteCountries({ _id }) {
  return http.delete(apiUrl + "address/country/" + _id);
}

const httpCountry = {
  getCountries,
  postCountries,
  putCountries,
  deleteCountries,
};

export default httpCountry;
