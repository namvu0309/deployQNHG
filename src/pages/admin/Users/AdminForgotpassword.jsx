import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { forgotPassword } from "@services/admin/authService"
import "@pages/admin/Users/AdminForgotPasssword.css"

export default function AdminForgotPassword() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!email.trim()) {
            setError("Vui lòng nhập email.")
            return
        }

        try {
            await forgotPassword(email)

            Swal.fire(
                "Thành công!",
                "Hệ thống đã gửi email đặt lại mật khẩu, vui lòng kiểm tra hộp thư.",
                "success"
            ).then(() => {
                navigate("/admin/login?message=Vui lòng kiểm tra email để đặt lại mật khẩu")
            })
        } catch (err) {
            const message = err?.response?.data?.message || "Không thể gửi email."
            Swal.fire("Lỗi", message, "error")
        }
    }

    return (
        <div className="admin-forgot-container">
            <div className="forgot-card">
                <h2>🔐 Quên mật khẩu?</h2>
                <p>Nhập email tài khoản quản trị của bạn để nhận liên kết đặt lại mật khẩu.</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@quannhau.com"
                        />
                        {error && <div className="error-message">{error}</div>}
                    </div>

                    <button type="submit" className="submit-btn">Gửi yêu cầu</button>
                </form>

                <div className="back-to-login">
                    <a href="/admin/login">← Quay lại đăng nhập</a>
                </div>
            </div>
        </div>
    )
}
