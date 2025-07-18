import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Đăng ký tài khoản
export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/register", userData);
  return response.data;
}; 