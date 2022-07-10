import http from "./httpService";
import jwtDecode from "jwt-decode";
import { apiUrl } from "../config.json";

const tokenKey = "token";

http.setJwt(getJwt());

export async function postHostAuth({ email, password }) {
  const { data: jwt } = await http.post(apiUrl + "allusers/hostauth", {
    email,
    password,
  });

  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (e) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getHostUsers() {
  return http.get(apiUrl + "allusers/hostusers");
}

const httpHostusers = {
  postHostAuth,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  getHostUsers,
};

export default httpHostusers;
