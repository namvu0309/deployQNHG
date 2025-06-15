/* LoginUserPage.jsx */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.scss';

const API_URL = 'http://localhost:3001/users';

export default function LoginUserPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(
        `${API_URL}?email=${encodeURIComponent(form.email)}&password=${encodeURIComponent(form.password)}`
      );
      if (!res.ok) throw new Error('Fetch failed');
      const users = await res.json();
      if (users.length > 0) {
        setSuccess(true);
        setTimeout(() => navigate('/menu-page'), 1500);
      } else {
        setError('Email hoặc mật khẩu không đúng.');
      }
    } catch {
      setError('Có lỗi khi kết nối server.');
    }
  };

  return (
    <div className="auth-container">
      {/* Logo top-left */}
      <div className="logo">
        <img src="/src/assets/client/images/header/logo.jpg" alt="Hoàng Gia" />
      </div>
      {/* Left panel: thumbnails grid */}
      <div className="thumbnail-panel">
        <div className="thumb"><img src="/src/assets/client/images/auth/thumb1.webp" alt="" /></div>
        <div className="thumb"><img src="/src/assets/client/images/auth/thumb2.webp" alt="" /></div>
        <div className="thumb"><img src="/src/assets/client/images/auth/thumb3.webp" alt="" /></div>
        <div className="thumb"><img src="/src/assets/client/images/auth/thumb4.webp" alt="" /></div>
       
      </div>
      {/* Right panel: form card */}
      <div className="form-panel">
        <div className="auth-card">
          <h1 className="auth-title">ĐĂNG NHẬP THÀNH VIÊN</h1>

          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">Đăng nhập thành công! Chuyển trang...</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="form-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={form.password}
              onChange={handleChange}
              required
              className="form-input"
            />
            <button type="submit" className="btn-primary">Đăng nhập</button>
          </form>

          <div className="auth-links">
            <a href="/forgot" className="forgot">Quên mật khẩu?</a>
            <a href="/register-page" className="register">Đăng ký thành viên</a>
          </div>
        </div>
      </div>
    </div>
  );
}