import React, { useState } from "react";
import "./Header.scss";

const Header = () => {
  const [showNoti, setShowNoti] = useState(true);

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
            ×
          </button>
        </div>
      )}

      <div className="header-main">
        <div className="header-left">
          <div className="logo">
            <img src="./image/logo.jpg" alt="Quán Nhậu Hoàng Gia" />
          </div>
          <div className="hotline">
            <span>HOTLINE</span>
            <strong>*1986</strong>
          </div>
        </div>

      <nav className="nav-menu">
  <div className="nav-links">
    <a href="/menu-page" className="nav-link active">THỰC ĐƠN</a>
    <a href="#stores" className="nav-link">CƠ SỞ</a>
    <a href="#offers" className="nav-link">ƯU ĐÃI</a>
    <a href="#contact" className="nav-link">LIÊN HỆ</a>
    <a href="#booking" className="nav-button">ĐẶT BÀN</a>
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
    <path
      d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"
    />
  </svg>
</button>
  </div>

</nav>

      </div>

      <div className="header-content">
        <h1>Thực đơn</h1>
        <p>
          Thưởng hoa vị giác với 300+ món nhậu đặc sắc, lạ nuông, hải sản được
          chuẩn bị từ những đầu bếp chuyên nghiệp hàng đầu.
        </p>
      </div>

      <div className="menu-categories">
        <ul className="category-list">
          <li>TẤT CẢ</li>
          <li>COMBO</li>
          <li>MÓN MỚI</li>
          <li>ĐỒ UỐNG</li>
          <li>DÊ TƯƠI</li>
          <li>SALAD - NỘM</li>
          <li>RAU XANH</li>
          <li>THIẾT BÀN</li>
          <li>ĐỒ NƯỚNG</li>
          <li>HẢI SẢN</li>
          <li>CÁ CÁC MÓN</li>
          <li>MÓN ĂN CHƠI</li>
          <li>MÓN NHẬU</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;