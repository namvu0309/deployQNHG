import React, { useState } from "react";
import "./header.scss";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../../assets/client/images/header/logo.jpg";
import {
  FaPhoneAlt,
  FaRegClock,
  FaGift,
  FaUserPlus,
  FaUser,
} from "react-icons/fa";
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
      {/* Header Top mới */}
      <section className="header-top-bar">
        <div className="header-top-left">
          <span className="icon">
            <FaPhoneAlt />
          </span>
          <span className="top-text">
            Hotline: <b>*2005</b>
          </span>
          <span className="icon">
            <FaRegClock />
          </span>{" "}
          <span className="top-text">16:00 - 23:00</span>
        </div>
        <div className="header-top-right">
          <span className="icon">
            <FaGift />
          </span>

          <span className="divider-vertical" />
          <span className="icon">
            <FaUser />
          </span>
          <span className="top-link">Đăng nhập</span>
          <span className="divider-vertical" />
          <span className="icon">
            <FaUserPlus />
          </span>
          <span className="top-link">Đăng ký</span>
        </div>
      </section>
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
              to="/"
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
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
            <button className="nav-button" onClick={() => setShowPopup(true)}>
              ĐẶT BÀN
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
