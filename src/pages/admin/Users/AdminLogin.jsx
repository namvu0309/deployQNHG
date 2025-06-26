"use client"

import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import Swal from "sweetalert2"
import { login as adminLogin } from "@services/admin/authService"
import { Coffee, Utensils, Wine, ChefHat } from "lucide-react"
import "./AdminLogin.css"

export default function AdminLogin() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const message = searchParams.get("message")

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [errors, setErrors] = useState({})
    const [generalError, setGeneralError] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setErrors({})
        setGeneralError("")

        try {
            const res = await adminLogin(formData)
            const { token, user } = res.data.data

            localStorage.setItem("admin_token", token)
            localStorage.setItem("admin_user", JSON.stringify(user))

            Swal.fire("Thành công", "Đăng nhập thành công!", "success").then(() => {
                navigate("/dashboard")
            })
        } catch (err) {
            const response = err.response;
            const validationErrors = response?.data?.errors || {};
            const message = response?.data?.message || "Đăng nhập thất bại!";

            // Nếu có lỗi dạng errors.{field}
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            Swal.fire("Lỗi", message, "error");
        }

    }

    return (
        <div className="admin-login-container">
            {/* Background Animation */}
            <div className="background-pattern"></div>

            {/* Floating Icons */}
            <div className="floating-icon floating-1"><Coffee size={40} /></div>
            <div className="floating-icon floating-2"><Utensils size={35} /></div>
            <div className="floating-icon floating-3"><Wine size={30} /></div>
            <div className="floating-icon floating-4"><ChefHat size={38} /></div>

            <div className="glowing-orb orb-1"></div>
            <div className="glowing-orb orb-2"></div>

            <div className="login-card">
                <div className="card-header-line"></div>
                <div className="card-header">
                    <div className="logo-container">
                        <div className="logo-ping"></div>
                        <ChefHat className="logo-icon" size={48} />
                    </div>
                    <h1 className="title">Quán Nhậu Hoàng Gia</h1>
                    <p className="subtitle">Hệ thống quản trị</p>
                </div>

                <div className="card-content">
                    {message && (
                        <div className="success-message">
                            <p>{message}</p>
                        </div>
                    )}

                    {generalError && (
                        <div className="error-message text-danger text-center mb-2">
                            {generalError}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="admin@quannhau.com"
                                value={formData.email}
                                onChange={handleChange}
                                className={`form-input ${errors.email ? "error" : ""}`}
                            />
                            {errors.email && <div className="error-message">{errors.email}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Mật khẩu</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className={`form-input ${errors.password ? "error" : ""}`}
                            />
                            {errors.password && <div className="error-message">{errors.password}</div>}
                        </div>

                        <button type="submit" className="login-button">
                            <span>Đăng nhập</span>
                            <div className="button-overlay"></div>
                        </button>
                    </form>

                    <div className="card-footer">
                        <div className="divider"></div>
                        <p className="copyright">© 2025 Quán Nhậu Hoàng Gia</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
