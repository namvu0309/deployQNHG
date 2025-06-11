import React, { useState } from "react";
import "./bookingPopup.scss";

const BookingPopup = ({ isOpen, onClose }) => {
  const [guestCount, setGuestCount] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Đặt bàn</h2>

        <form className="form">
          {/* THÔNG TIN CỦA BẠN */}
          <div className="form-group">
            <h4>Thông tin của bạn</h4>
            <input type="text" placeholder="Tên của bạn" required />
            <input type="tel" placeholder="Số điện thoại" required />
          </div>

          {/* THÔNG TIN ĐẶT BÀN */}
          <div className="form-group">
            <h4>Thông tin đặt bàn</h4>
            <div>
                <p>Cơ Sở: Phó Đức Chính</p>
            </div>

            <div className="row">
              <div className="form-field">
                <label>Số lượng khách</label>
                <div className="quantity">
                  <button type="button" onClick={() => setGuestCount(Math.max(1, guestCount - 1))}>−</button>
                  <input type="text" value={guestCount} readOnly />
                  <button type="button" onClick={() => setGuestCount(guestCount + 1)}>+</button>
                </div>
              </div>

              <div className="form-field">
                <label>Ngày đặt</label>
                <input type="date" />
              </div>

              <div className="form-field">
                <label>Giờ đến</label>
                <input type="time" />
              </div>
            </div>

            <textarea placeholder="Ghi chú" />
          </div>

          {/* BUTTON */}
          <div className="actions">
            <button type="button" onClick={onClose}>Đóng</button>
            <button type="submit">ĐẶT BÀN NGAY</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPopup;
