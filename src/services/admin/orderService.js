import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000";
const API_URL = `${BASE_URL}/api/admin`;

// Lấy danh sách đơn hàng
export const getListOrders = (params) => {
    return axios.get(`${API_URL}/orders/list`, { params });
};

// Lấy chi tiết đơn hàng
export const getOrderDetail = (id) => {
    return axios.get(`${API_URL}/orders/${id}/detail`);
};

// Tạo đơn hàng mới
export const createOrder = (data) => {
    return axios.post(`${API_URL}/orders/create`, data, {
        headers: { "Content-Type": "application/json" },
    });
};

// Cập nhật đơn hàng
export const updateOrder = (id, data) => {
    return axios.post(`${API_URL}/orders/${id}/update`, data, {
        headers: { "Content-Type": "application/json" },
    });
};

// Cập nhật trạng thái item trong đơn hàng
export const updateItemStatus = (orderItemId, status) => {
    return axios.post(`${API_URL}/orders/items/${orderItemId}/status`, { status });
};

// Lấy lịch sử item đơn hàng
export const getOrderItemHistory = (orderItemId) => {
    return axios.get(`${API_URL}/orders/items/${orderItemId}/history`);
};

// Theo dõi đơn hàng
export const trackOrder = (orderCode) => {
    return axios.get(`${API_URL}/orders/track/${orderCode}`);
};

// Lấy đơn hàng theo table ID
export const getOrderByTableId = (tableId) => {
    return axios.get(`${API_URL}/orders/table/${tableId}`);
};

export const paymentOrder = (id, data) => {
    return axios.post(`${API_URL}/orders/${id}/pay`, data, {
        headers: { "Content-Type": "application/json" },
    });
};

export const getBillDetails = (id) => {
    return axios.get(`${API_URL}/bills/${id}/detail`);
};
