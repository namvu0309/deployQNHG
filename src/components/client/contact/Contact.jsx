import React from "react";
import "./Contact.scss";
import {
  FaFacebookF,
  FaTiktok,
  FaInstagram,
  FaYoutube,
  FaHome,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

// ✅ Import video từ trong src
import beerVideo from "@assets/client/images/Branch/video-beer.mp4";

const Contact = () => {
  return (
    <div className="contact-page">
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="video-background"
      >
        <source src={beerVideo} type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ video.
      </video>

      <div className="contact-container">
        {/* LEFT: INFO */}
        <div className="contact-info">
          <h2 className="brand">Hoàng Gia Group</h2>
          <p className="slogan">Hoàng Gia gọi – Anh em có mặt!</p>

          <ul className="info-list">
            <li><FaHome /> Cao Đẳng FPT Polytechnic</li>
            <li><FaEnvelope /> quannhauhoanggia@gmail.com</li>
            <li><FaPhone /> 03.4567.8999</li>
          </ul>

          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTiktok /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="contact-form">
          <form>
            <input type="text" placeholder="Tên của bạn*"  />
            <input type="email" placeholder="Email*"  />
            <input type="text" placeholder="Số điện thoại" />
            <input type="text" placeholder="Tiêu đề*"  />
            <textarea placeholder="Nhập nội dung..." rows="5"></textarea>
            <button type="submit">GỬI THÔNG TIN</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
