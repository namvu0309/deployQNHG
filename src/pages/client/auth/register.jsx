// RegisterUserPage.jsx
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
      <div className="auth-card">
        <h1 className="auth-title">ĐĂNG KÝ THÀNH VIÊN</h1>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">Đăng ký thành công! Chuyển trang...</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              placeholder="Họ tên"
              value={form.fullName}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={form.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="btn-primary">
            Đăng ký
          </button>
        </form>
        <div className="auth-links">
          <a href="/login-page" className="forgot">Quay lại đăng nhập</a>
        </div>
      </div>
    </div>
  );
}
