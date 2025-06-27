
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
