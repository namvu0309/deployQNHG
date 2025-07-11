import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000";
const API_URL = `${BASE_URL}/api/admin`;

// Lấy token từ localStorage
const getToken = () => {
    const adminToken = localStorage.getItem("admin_token");
    return adminToken || null;
};

// Tạo axios instance dùng chung
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});

// Interceptor thêm Authorization header trước khi gửi request
apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getCombos = (params) => {
    return apiClient.get(`/combos/list`, { params });
};

export const getComboDetail = (id) => {
    return apiClient.get(`/combos/${id}/detail`);
};

export const createCombo = (data) => {
    return apiClient.post(`/combos/create`, data);
};

// Hàm cập nhật combo (bỏ header vì có ảnh)
export const updateCombo = (id, data) => {
    return apiClient.post(`/combos/${id}/update`, data);
};

export const getTrashedCombos = (params) => {
    return apiClient.get(`/combos/trash`, { params });
};

export const softDeleteCombo = (id) => {
    return apiClient.delete(`/combos/${id}/soft/delete`);
};

export const forceDeleteCombo = (id) => {
    return apiClient.delete(`/combos/${id}/force/delete`);
};

export const restoreCombo = (id) => {
    return apiClient.post(`/combos/${id}/restore`);
};

export const addItemToCombo = (id, data) => {
    return apiClient.post(`/combos/${id}/add-items`, data);
};

export const updateItemQuantity = (comboId, dishId, data) => {
    return apiClient.post(`/combos/${comboId}/${dishId}/update-quantity`, data);
}; 