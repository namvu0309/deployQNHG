
import axios from "axios";

const API_URL = "http://localhost:8000/api/admin";

export const login = (data) => {
    return axios.post(`${API_URL}/login`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
export const logout = () => {
    const token = localStorage.getItem("admin_token");

    return axios.post(`${API_URL}/logout`, {}, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
};

export const forgotPassword = (email) => {
    return axios.post(`http://localhost:8000/api/admin/forgot-password`, { email }, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const resetPassword = (id, data) => {
    return axios.post(`http://localhost:8000/api/admin/reset-password/${id}`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
