import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Lấy danh sách món ăn nổi bật
export const getFeaturedDishes = async () => {
  const response = await axiosInstance.get("/dishes/featured");
  return response.data;
};

// Lấy chi tiết món ăn
export const getDishDetail = async (id) => {
  const response = await axiosInstance.get(`/dishes/${id}`);
  return response.data;
};
