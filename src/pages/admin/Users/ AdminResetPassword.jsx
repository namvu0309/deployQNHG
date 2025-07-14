import React, { useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import Swal from "sweetalert2"
import { resetPassword } from "@services/admin/authService"

export default function AdminResetPassword() {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!password || !confirmPassword) {
            setError("Vui lòng nhập đầy đủ mật khẩu")
            return
        }

        if (password !== confirmPassword) {
            setError("Mật khẩu không khớp")
            return
        }

        try {
            await resetPassword(id, {
                token,
                password,
                password_confirmation: confirmPassword,
            })

            Swal.fire("Thành công!", "Mật khẩu đã được đặt lại.", "success").then(() => {
                navigate("/admin/login?message=Đặt lại mật khẩu thành công!")
            })
        } catch (err) {
            const msg = err?.response?.data?.message || "Lỗi đặt lại mật khẩu!"
            Swal.fire("Lỗi", msg, "error")
        }
    }

    return (
        <div className="admin-forgot-container">
            <div className="forgot-card">
                <h2>🔒 Đặt lại mật khẩu</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Mật khẩu mới</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="form-group">
                        <label>Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="submit-btn">Xác nhận</button>
                </form>

                <div className="back-to-login">
                    <a href="/admin/login">← Quay lại đăng nhập</a>
                </div>
            </div>
        </div>
    )
}
