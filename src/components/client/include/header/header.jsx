import React, { useState, useEffect } from "react";
import "./header.scss";
import { Link, Navigate, useLocation } from "react-router-dom";
import logo from "../../../../assets/client/images/header/logo.jpg";
import BookingPopup from "./BookingPopup";
import HeaderService from "../../../../services/client/HeaderService"; 
import { FaPhoneAlt, FaRegClock, FaGift, FaUser, FaUserPlus } from "react-icons/fa";

const Header = () => {
  const [showNoti, setShowNoti] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [ setCategories] = useState([]); // Danh mục cha
  const location = useLocation();

  // Gọi API lấy danh mục cha khi load header
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await HeaderService.getParentCategories();
        setCategories(data);
        // console.log("✅ Danh mục cha:", data);
      } catch (error) {
        console.error("❌ Không thể tải danh mục cha:", error);
      }
    };

    fetchCategories();
  }, []);


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
          <Link to="/login-page" className="top-link">
            Đăng nhập
          </Link>
          <span className="divider-vertical" />
          <span className="icon">
            <FaUserPlus />
          </span>
          <Link to="/register-page" className="top-link">
            Đăng ký
          </Link>
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
              className={`nav-link ${location.pathname.includes("/menu-page") ? "active" : ""}`}
            >
              Thực Đơn
            </Link>
            <Link
              to="/branch-page"
              className={`nav-link ${location.pathname.includes("/branch-page") ? "active" : ""}`}
            >
              Cơ Sở
            </Link>
            <Link
              to="/endow-page"
              className={`nav-link ${location.pathname.includes("/endow-page") ? "active" : ""}`}
            >
              Ưu Đãi
            </Link>
            <Link
              to="/contact-page"
              className={`nav-link ${location.pathname.includes("/contact-page") ? "active" : ""}`}
            >
              Liên Hệ
            </Link>

            {/* Nút Đặt Bàn mở popup */}
            <button className="nav-button" onClick={() => setShowPopup(true)}>
              ĐẶT BÀN
            </button>
          </div>

          {/* ❗️(Tuỳ chọn): hiển thị danh mục cha nếu cần */}
          {/* <ul className="dropdown-menu">
            {categories.map((item) => (
              <li key={item.id}>
                <Link to={`/menu-page?category=${item.id}`}>{item.name}</Link>
              </li>
            ))}
          </ul> */}
        </div>
      </div>

      {showPopup && (
        <BookingPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
      )}
    </header>
  );
};

export default Header;
