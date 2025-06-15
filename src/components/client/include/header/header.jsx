import React, { useState } from "react";
import "./header.scss";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../../assets/client/images/header/logo.jpg";
import BookingPopup from "./BookingPopup"; // Import popup đặt bàn


const Header = () => {
  const [showNoti, setShowNoti] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // State để mở popup
  const location = useLocation();

  return (
    <header className="header-wrapper">
      {showNoti && (
        <div className="header-notification">
          <span className="noti-text">
            TẶNG 5000 ÁO PHÔNG PHIÊN BẢN THIẾT KẾ CHO KHÁCH HÀNG
          </span>
          <button
            className="noti-close"
            onClick={() => setShowNoti(false)}
            aria-label="Đóng thông báo"
          >
            ✕
          </button>
        </div>
      )}

      <div className="header-main">
        <div className="header-left">
          <Link to="/" className="logo">
            <img src={logo} alt="Quán Nhậu Hoàng Gia" />
          </Link>
          <div className="brand-name"></div>
          <div className="divider"></div>
          <div className="hotline">
            <span>HOTLINE</span> <strong>*1986</strong>
          </div>
        </div>

        <div className="nav-menu">
          <div className="nav-links">
            <Link
              to="/home-page"
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            >
              Trang Chủ
            </Link>
            <Link
              to="/menu-page"
              className={`nav-link ${
                location.pathname.includes("/menu-page") ? "active" : ""
              }`}
            >
              Thực Đơn
            </Link>
            <Link
              to="/branch-page"
              className={`nav-link ${
                location.pathname.includes("/branch-page") ? "active" : ""
              }`}
            >
              Cơ Sở
            </Link>
            <Link
              to="/endow-page"
              className={`nav-link ${
                location.pathname.includes("/endow-page") ? "active" : ""
              }`}
            >
              Ưu Đãi
            </Link>
            <Link
              to="/contact-page"
              className={`nav-link ${
                location.pathname.includes("/contact-page") ? "active" : ""
              }`}
            >
              Liên Hệ
            </Link>

            {/* Nút Đặt Bàn mở popup */}
            <button
              className="nav-button"
              onClick={() => setShowPopup(true)}
            >
              ĐẶT BÀN
            </button>
         <a href="/login-page" className="nav-login" aria-label="Tài khoản">
  <i className="fas fa-user nav-login__icon" aria-hidden="true"></i>
</a>
            
          </div>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm món ăn"
            />
            <button className="search-button" aria-label="Tìm kiếm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Hiển thị popup khi showPopup === true */}
      {showPopup && (
        <BookingPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
      )}
    </header>
  );
};

export default Header;
