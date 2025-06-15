import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.scss';

const API_URL = 'http://localhost:3001/users';

export default function RegisterUserPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const newUser = {
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      createdAt: new Date().toISOString(),
      role: 'user'
    };
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      if (!res.ok) throw new Error('Add failed');
      await res.json();
      setSuccess(true);
      setTimeout(() => navigate('/login-page'), 1500);
    } catch {
      setError('Không thể lưu người dùng.');
    }
  };

  return (
    <div className="auth-container">
      <div className="logo">
        <img src="/src/assets/client/images/header/logo.jpg" alt="Hoàng Gia" />
      </div>
      <div className="thumbnail-panel">
        <div className="thumb"><img src="/src/assets/client/images/auth/thumb1.webp" alt="" /></div>
        <div className="thumb"><img src="/src/assets/client/images/auth/thumb2.webp" alt="" /></div>
        <div className="thumb"><img src="/src/assets/client/images/auth/thumb3.webp" alt="" /></div>
        <div className="thumb"><img src="/src/assets/client/images/auth/thumb4.webp" alt="" /></div>
      </div>
      <div className="form-panel">
        <div className="auth-card">
          <h1 className="auth-title">ĐĂNG KÝ THÀNH VIÊN</h1>
          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">Đăng ký thành công! Chuyển trang...</div>}
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên"
              value={form.fullName}
              onChange={handleChange}
              required
              className="form-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email của bạn"
              value={form.email}
              onChange={handleChange}
              required
              className="form-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu của bạn"
              value={form.password}
              onChange={handleChange}
              required
              className="form-input"
            />
            <button type="submit" className="btn-primary">Đăng ký</button>
          </form>
          <div className="auth-links">
            <a href="/login-page" className="forgot">Quay lại đăng nhập</a>
          </div>
        </div>
      </div>
    </div>
  );
}
