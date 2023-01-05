import http from "./httpService";
import { apiUrl, apiUrl2 } from "../config.json";

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

function getEstore(estoreid) {
  return http.get(
    apiUrl +
      "user/estore?estoreid=" + estoreid
  );
}

function postEstores({
  name, owner, email, password, urlname1, urlname2, urlname3, estoreName, estoreEmail, estoreSupid, estoreUrlname
}) {
  return http.post(apiUrl + "allusers/estore", {
    name, owner, email, password, urlname1, urlname2, urlname3, status: "pending", estoreName, estoreEmail, estoreSupid, estoreUrlname
  });
}

function postEstores2({
  name, owner, email, mobile, password, urlname1
}) {
  return http.post(apiUrl + "allusers/estore", {
    name, owner, email, mobile, password, urlname1, status: "pending"
  });
}

function putEstores(inputValues) {
  return http.put(apiUrl + "allusers/estore/" + inputValues._id, inputValues);
}

function deleteEstores({ _id }) {
  return http.delete(apiUrl + "allusers/estore/" + _id);
}

const getEstoreLocation = async (estoreid, couid) => {
  const countries = await http.get(apiUrl2 + "address/estoreCountries/" + estoreid);
  const addiv1s = await http.get(apiUrl2 + "address/estoreAddiv1s/" + estoreid + "/" + couid);
  const addiv2s = await http.get(apiUrl2 + "address/estoreAddiv2s/" + estoreid + "/" + couid);
  const addiv3s = await http.get(apiUrl2 + "address/estoreAddiv3s/" + estoreid + "/" + couid);
  return {countries, addiv1s, addiv2s, addiv3s}
}

const httpEstore = {
  getEstores,
  getEstore,
  postEstores,
  postEstores2,
  putEstores,
  deleteEstores,
  getEstoreLocation,
};

export default httpEstore;
