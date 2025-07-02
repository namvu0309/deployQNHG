import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.scss';
import { registerUser } from '@services/client/auth/registerService';

export default function RegisterUserPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await registerUser({
        full_name: form.full_name,
        phone_number: form.phone_number,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation
      });
      setSuccess(true);
      setTimeout(() => navigate('/login-page'), 1500);
    } catch (err) {
      setError(
        err?.response?.data?.message || 'Không thể đăng ký. Vui lòng thử lại!'  
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-left">
          <div style={{ marginBottom: 24 }}>
            
          </div>
          <div className="auth-images-grid">
            <div className="auth-image-item"><img src="/src/assets/client/images/auth/thumb1.webp" alt="" /></div>
            <div className="auth-image-item"><img src="/src/assets/client/images/auth/thumb2.webp" alt="" /></div>
            <div className="auth-image-item"><img src="/src/assets/client/images/auth/thumb3.webp" alt="" /></div>
            <div className="auth-image-item"><img src="/src/assets/client/images/auth/thumb4.webp" alt="" /></div>
          </div>
        </div>
        <div className="auth-right">
          <div className="auth-form-box">
            <div className="auth-title">ĐĂNG KÝ THÀNH VIÊN</div>
            {error && <div className="alert error">{error}</div>}
            {success && <div className="alert success">Đăng ký thành công! Chuyển trang...</div>}
            <form onSubmit={handleSubmit} className="auth-form">
              <input
                type="text"
                name="full_name"
                placeholder="Họ và tên"
                value={form.full_name}
                onChange={handleChange}
                className="auth-input"
              />
              <input
                type="text"
                name="phone_number"
                placeholder="Nhập số điện thoại"
                value={form.phone_number}
                onChange={handleChange}
                className="auth-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email của bạn"
                value={form.email}
                onChange={handleChange}
                className="auth-input"
              />
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu của bạn"
                value={form.password}
                onChange={handleChange}
                className="auth-input"
              />
              <input
                type="password"
                name="password_confirmation"
                placeholder="Nhập lại mật khẩu"
                value={form.password_confirmation}
                onChange={handleChange}
                className="auth-input"
              />
              <button type="submit" className="auth-btn">Đăng ký</button>
            </form>
            <div className="auth-link">
              <a href="/login-page" className="forgot">Quay lại đăng nhập</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
