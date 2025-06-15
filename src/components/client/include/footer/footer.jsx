import React from "react";
import "./Footer.scss";
import logo from "../../../../assets/client/images/header/logo.jpg";
const Footer = () => {
  return (
    <footer className="tudo-footer">
      <div className="tudo-footer__left">
           <h2>
              <span className="line-1">Quán Nhậu</span>
              <span className="line-2">Hoàng Gia</span>
            </h2>
        <img
          src={logo}
          alt="Quán Nhậu Hoàng Gia"
          className="tudo-footer__logo"
        /> 
      
        <button className="tudo-footer__button">ĐẶT BÀN</button>
      </div>

      <div className="tudo-footer__center">
        <ul className="tudo-footer__menu">
          <li className="tudo-footer__menu-item">Thực đơn</li>
          <li className="tudo-footer__menu-item">Hệ thống cơ sở</li>
          <li className="tudo-footer__menu-item">Ưu đãi</li>
          <li className="tudo-footer__menu-item">Liên hệ</li>
        </ul>
        
      </div>
      <div className="tudo-footer__info">
          <p>
            <strong>Hotline</strong> <br />
            <span className="tudo-footer__highlight">*1986</span>
          </p>
          <p>
            <strong>Email</strong> <br />
            <span className="tudo-footer__highlight">
              quannhauhoanggia@gmail.com
            </span>
          </p>
        </div>

      <div className="tudo-footer__right">
        
        <div className="tudo-footer__social">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-youtube"></i>
        </div>
        <p className="tudo-footer__copyright">
          © 2023 Quán Nhậu Hoàng Gia
        </p>
      </div>
    </footer>
  );
};

export default Footer;
