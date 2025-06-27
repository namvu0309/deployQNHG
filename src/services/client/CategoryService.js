// // services/client/CategoryService.js
// import axios from "axios";

// const API_URL = "http://127.0.0.1:8000/api";

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const CategoryService = {
//   getParentCategories: async () => {
//     try {
//       const res = await axiosInstance.get("/admin/categories/parent");
//       return res.data;
//     } catch (error) {
//       console.error("Lỗi khi gọi API danh mục cha:", error.response?.data || error.message);
//       throw error;
//     }
//   },
// };

// export default CategoryService;
