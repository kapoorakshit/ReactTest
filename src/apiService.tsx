import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "https://dummyjson.com/products/";

export const getAdminBoard = (category: string) => {
  return axios.get(`${API_URL}category/${category}?limit=10&skip=0`, {
    headers: authHeader()
  });
};

export const getCategories = () => {
  return axios.get(`${API_URL}categories/`, { headers: authHeader() });
};

export const getProducts = (category: string) => {
  return axios.get(`${API_URL}category/${category}`, {
    headers: authHeader()
  });
};

export const addProduct = (data: object) => {
  return axios.post(`${API_URL}add`, data, { headers: authHeader() });
};
