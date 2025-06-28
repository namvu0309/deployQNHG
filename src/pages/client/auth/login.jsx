/* LoginUserPage.jsx */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.scss';
import { loginUser } from '@services/client/auth/loginService';

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
      await loginUser(form);
      setSuccess(true);
      setTimeout(() => navigate('/menu-page'), 1500);
    } catch (err) {
      setError(
        err?.response?.data?.message || 'Email hoặc mật khẩu không đúng.'
      );
    }
  };

  return (
    <div className="register-bg">
      <div className="register-container">
        <div className="register-col register-col-left">
          <div className="register-illustration">
            <img src="/src/assets/client/images/auth/thumb1.webp" alt="Đăng nhập" style={{width: '180px', height: '180px', borderRadius: '50%', boxShadow: '0 2px 12px rgba(0,0,0,0.10)'}} />
          </div>
        </div>
        <div className="register-col register-col-right">
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
    </div>
  );
}