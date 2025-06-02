import React from 'react';
import './footer.scss';
import logo from '../../../../assets/client/images/header/logo.jpg'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={logo} alt="Logo" className="footer-logo" />
        <div className="footer-info">
          <h1>QUÁN NHẬU TỰ DO</h1>
          <p className="highlight">Thực đơn</p>
          <p>Hệ thống cửa số</p>
        </div>
      </div>
      <div className="footer-right">
        <div className="footer-contact">
          <p>Hotline</p>
          <p className="highlight">1900 1986</p>
          <p>Email</p>
          <p className="highlight">quannhautudo@gmail.com</p>
          <p>Liên hệ</p>
          <p>Ưu đãi</p>
        </div>
        <div className="footer-social">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-tiktok"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>
        <button className="footer-button">ĐẶT BÀN</button>
      </div>
      <div className="footer-bottom">
        <p>© 2023 Quán Nhậu Tự Do</p>
      </div>
    </footer>
  );
};

export default Footer;