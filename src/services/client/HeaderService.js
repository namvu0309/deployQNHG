// src/services/client/HeaderService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const HeaderService = {
  getParentCategories: async () => {
    try {
      const res = await axiosInstance.get("/categories/parent");
      // console.log("✅ Dữ liệu danh mục cha:", res.data);
      return res.data.data;
    } catch (error) {
      console.error("❌ Lỗi lấy danh mục cha:", error.response?.data || error.message);
      throw error;
    }
  },

  getChildCategories: async () => {
    try {
      const res = await axiosInstance.get("/categories/child/dish");
      console.log("✅ Dữ liệu danh mục con:", res.data);
      return res.data.data;
    } catch (error) {
      console.error("❌ Lỗi lấy danh mục con:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default HeaderService;
