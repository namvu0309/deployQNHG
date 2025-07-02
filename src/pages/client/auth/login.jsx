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
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    try {
      const res = await loginUser(form);
      // Lưu toàn bộ object data vào localStorage với key 'authUser'
      if (res?.data?.token) {
        localStorage.setItem('token', res.data.token);
        if (res.data.user) {
          const { id, email, full_name } = res.data.user;
          localStorage.setItem('clientUser', JSON.stringify({ id, email, full_name }));
        }
        window.dispatchEvent(new Event('storage'));
        console.log(res.data.token);
      }
      setSuccess(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(
        err?.response?.data?.message || 'Email hoặc mật khẩu không đúng.'
      );
      setFieldErrors(err?.response?.data?.errors || {});
    }
  };

  const token = localStorage.getItem('authUser');
  // console.log('Token:', token);

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-left">
          <div className="auth-images-grid">
            <div className="auth-image-item"><img src="/src/assets/client/images/auth/thumb1.webp" alt="" /></div>
            <div className="auth-image-item"><img src="/src/assets/client/images/auth/thumb2.webp" alt="" /></div>
            <div className="auth-image-item"><img src="/src/assets/client/images/auth/thumb3.webp" alt="" /></div>
            <div className="auth-image-item"><img src="/src/assets/client/images/auth/thumb4.webp" alt="" /></div>
          </div>
        </div>
        <div className="auth-right">
          <div className="auth-form-box">
            <div className="auth-title">ĐĂNG NHẬP THÀNH VIÊN</div>
            {error && <div className="alert error">{error}</div>}
            {success && <div className="alert success">Đăng nhập thành công! Chuyển trang...</div>}
            <form onSubmit={handleSubmit} className="auth-form">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="auth-input"
              />
              {fieldErrors.email && <div className="field-error">{fieldErrors.email[0]}</div>}
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={form.password}
                onChange={handleChange}
                required
                className="auth-input"
              />
              {fieldErrors.password && <div className="field-error">{fieldErrors.password[0]}</div>}
              <button type="submit" className="auth-btn">Đăng nhập</button>
            </form>
            <div className="auth-link">
              <a href="/forgot" className="forgot">Quên mật khẩu?</a>
              <span> | </span>
              <a href="/register-page" className="register">Đăng ký thành viên</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}