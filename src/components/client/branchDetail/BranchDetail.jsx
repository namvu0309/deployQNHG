"use client";
import React, { useState } from "react";
import "./Detail.scss";
import anhBadinh from "@assets/client/images/Branch/anh-badinh.jpg";
import BookingPopup from "../include/header/BookingPopup";
import {
  FaPhoneAlt,
  FaUtensils,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const BranchDetail = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="branch-detail">
      <div className="breadcrumb">
        <span>67A PHÓ ĐỨC CHÍNH</span>
      </div>

      <div className="banner">
        <img src={anhBadinh || "/placeholder.svg"} alt="67A Phó Đức Chính" />
      </div>

      <div className="info">
        <h1>67A Phó Đức Chính</h1>
        <p className="desc">
          Không gian nhậu đẳng cấp – Nơi hoàng gia hội ngộ anh em!
        </p>
        <span className="status">ĐANG MỞ</span>
        <span className="operating-hours">HOẠT ĐỘNG TỪ 09:00 - 24:00</span>

        <div className="meta">
          <div>
            <span>Sức chứa</span>
            <strong>400 KHÁCH</strong>
          </div>
          <div>
            <span>Diện tích</span>
            <strong>1000 M2</strong>
          </div>
          <div>
            <span>Số tầng</span>
            <strong>2 TẦNG</strong>
          </div>
          <div className="phone">
            <FaPhoneAlt /> *2005
          </div>
        </div>

        <div className="actions">
          <button onClick={() => setShowPopup(true)}>
            <FaCalendarAlt /> Đặt bàn ngay
          </button>
          <Link to="/menu-page" className="menu-button">
            <FaUtensils /> Xem thực đơn
          </Link>
          <button
            onClick={() =>
              window.open("https://maps.app.goo.gl/GenGVF7jDasa3Rmf9", "_blank")
            }
          >
            <FaMapMarkerAlt /> Xem bản đồ
          </button>
        </div>

        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="star" />
          ))}
          <span>5/5</span>
        </div>
      </div>

      <section>
        <h2>Không gian đậm chất hoàng gia</h2>
        <p>
          Quán Nhậu Hoàng Gia 67A Phó Đức Chính là cơ sở duy nhất trong hệ
          thống, sở hữu không gian lên tới 1000 M2 , sức chứa 400 KHÁCH. Với
          tone màu trầm ấm, bàn ghế gỗ sang trọng và ánh đèn vàng tinh tế, nơi
          đây mang đến cảm giác như đang nhậu giữa cung điện hiện đại.
        </p>
      </section>

      <section>
        <h2>Ẩm thực nhậu chuẩn vị – phục vụ như hoàng tộc</h2>
        <p>
          Mỗi món ăn tại Hoàng Gia là một tác phẩm tinh tế – từ lẩu hải sản, gà
          nướng muối tiêu đến các set nhậu tổng hợp cực đỉnh. Món ăn nóng hổi,
          lên đều, phục vụ chuyên nghiệp – đúng chất "vua gọi là có".
        </p>
      </section>

      <section>
        <h2>Sân vườn chill – Phòng lạnh sang</h2>
        <p>
          Bạn thích chill ngoài sân vườn hay cần không gian riêng tư máy lạnh?
          Hoàng Gia đều có đủ. Sân vườn mát mẻ với đèn treo lãng mạn, bên trong
          là phòng kín hiện đại – phù hợp cả hội bạn thân hay tiếp khách sang
          trọng.
        </p>
        <img src={anhBadinh || "/placeholder.svg"} alt="Sân vườn chill" />
      </section>

      <section>
        <h2>Hoàng Gia – Nơi vui là sang</h2>
        <p>
          Quán Nhậu Hoàng Gia không chỉ là nơi để ăn – mà là nơi để bạn bè hội
          tụ, để những câu chuyện được nâng ly trong không khí đẳng cấp mà gần
          gũi. Đặt bàn ngay hôm nay và thưởng thức trọn vẹn tinh thần "nhậu đẳng
          cấp – giá thân thiện".
        </p>
      </section>

      {/* Hiển thị popup đặt bàn nếu người dùng click */}
      {showPopup && (
        <BookingPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default BranchDetail;
