import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Lấy tất cả món ăn
export const getAllDishes = async () => {
  const response = await axiosInstance.get("/dishes");
  return response.data;
};

// Lấy món ăn theo danh mục con
export const getMenuList = async (id) => {
  const response = await axiosInstance.get(`/dishes/category/${id}/child`);
  return response.data;
};

// Lấy món ăn mới nhất
export const getLatestDishes = async () => {
  const response = await axiosInstance.get("/dishes/latest");
  return response.data;
};

// Lấy chi tiết món ăn
export const getDishDetail = async (id) => {
  const response = await axiosInstance.get(`/dishes/${id}`);
  return response.data;
};
