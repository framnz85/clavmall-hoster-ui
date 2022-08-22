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
  getEstore,
  postEstores,
  putEstores,
  deleteEstores,
};

export default httpEstore;
