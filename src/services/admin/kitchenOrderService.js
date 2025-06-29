import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/admin";

// Lấy danh sách đơn bếp
export const getListKitchenOrders = (params) => {
    return axios.get(`${API_URL}/kitchen-orders/list`, { params });
};

// Cập nhật trạng thái đơn bếp
export const updateKitchenOrderStatus = (id, data) => {
    return axios.post(`${API_URL}/kitchen-orders/${id}/update-status`, data);
};

// Hủy đơn bếp
export const cancelKitchenOrder = (id) => {
    return axios.post(`${API_URL}/kitchen-orders/${id}/cancel`);
};

// Đếm số lượng đơn bếp theo trạng thái
export const countKitchenOrdersByStatus = () => {
    return axios.get(`${API_URL}/kitchen-orders/count-by-status`);
}; 