import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.scss';
import { registerUser } from '@services/client/auth/registerService';
import { toast } from 'react-toastify';

export default function RegisterUserPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await registerUser(form);
      setSuccess(true);
      toast.success('Đăng ký thành công! Đang chuyển trang...');
      setTimeout(() => navigate('/login-page'), 1500);
    } catch (err) {
      const apiErrors = err?.response?.data?.errors;
      if (apiErrors) {
        setErrors(apiErrors);
      } else {
        toast.error(err?.response?.data?.message || 'Không thể đăng ký. Vui lòng thử lại!');
      }
    }
  };

  const renderError = (field) =>
    errors[field] && (
      <p className="error">
        {Array.isArray(errors[field]) ? errors[field][0] : errors[field]}
      </p>
    );

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-left">
          <div style={{ marginBottom: 24 }}></div>
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
            {success && <div className="alert success">Đăng ký thành công! Chuyển trang...</div>}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <input
                  type="text"
                  name="full_name"
                  placeholder="Họ và tên"
                  value={form.full_name}
                  onChange={handleChange}
                  className="auth-input"
                />
                {renderError('full_name')}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="phone_number"
                  placeholder="Nhập số điện thoại"
                  value={form.phone_number}
                  onChange={handleChange}
                  className="auth-input"
                />
                {renderError('phone_number')}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email của bạn"
                  value={form.email}
                  onChange={handleChange}
                  className="auth-input"
                />
                {renderError('email')}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu của bạn"
                  value={form.password}
                  onChange={handleChange}
                  className="auth-input"
                />
                {renderError('password')}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password_confirmation"
                  placeholder="Nhập lại mật khẩu"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  className="auth-input"
                />
                {renderError('password_confirmation')}
              </div>

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
