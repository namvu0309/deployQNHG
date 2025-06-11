// LoginUserPage.jsx
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
      <div className="auth-card">
        <h1 className="auth-title">ĐĂNG NHẬP THÀNH VIÊN</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
            Đăng nhập thành công! Chuyển trang...
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
            Đăng nhập
          </button>
        </form>

        <div className="auth-links">
          <a href="/forgot" className="forgot">Quên mật khẩu?</a>
          <a href="/register" className="register">Đăng ký thành viên</a>
        </div>
      </div>
    </div>
  );
}
