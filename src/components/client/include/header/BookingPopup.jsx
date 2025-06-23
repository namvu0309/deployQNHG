import React, { useState } from "react";
import "./bookingPopup.scss";
import {post} from "../../../../helpers/admin/api_helper"
const BookingPopup = ({ isOpen, onClose }) => {
  const [guestCount, setGuestCount] = useState(1);
  const customer_id = 1;
  const [orderTable, setOrderTable] = useState({
    customer_id: customer_id,
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    reservation_date: "",
    reservation_time: "",
    number_of_guests: 1,
    table_id: "",
    notes: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderTable((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullReservationTime = `${orderTable.reservation_date} ${orderTable.reservation_time}`;
    const submissionData = {
      ...orderTable,
      reservation_time: fullReservationTime,
    };

    console.log("Đặt bàn:", submissionData);
    // Gửi dữ liệu đến backend tại đây nếu cần (fetch/axios)
    const res = await post('/reservations/create',submissionData,{ "Content-Type": "application/json"})
    
    console.log("🚀 ~ handleSubmit ~ res:", res)
    onClose(); // Đóng popup sau khi gửi
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Đặt bàn</h2>

        <form className="form" onSubmit={handleSubmit}>
          {/* THÔNG TIN CỦA BẠN */}
          <div className="form-group">
            <h4>Thông tin của bạn</h4>
            <input
              type="text"
              name="customer_name"
              placeholder="Tên của bạn"
              value={orderTable.customer_name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="customer_phone"
              placeholder="Số điện thoại"
              value={orderTable.customer_phone}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="customer_email"
              placeholder="Email (nếu có)"
              value={orderTable.customer_email}
              onChange={handleChange}
            />
          </div>

          {/* THÔNG TIN ĐẶT BÀN */}
          <div className="form-group">
            <h4>Thông tin đặt bàn</h4>

            <div className="row">
              <div className="form-field">
                <label>Số lượng khách</label>
                <div className="quantity">
                  <button
                    type="button"
                    onClick={() => {
                      const newCount = Math.max(1, guestCount - 1);
                      setGuestCount(newCount);
                      setOrderTable((prev) => ({
                        ...prev,
                        number_of_guests: newCount,
                      }));
                    }}
                  >
                  </button>
                  <input type="text" value={guestCount} readOnly />
                  <button
                    type="button"
                    onClick={() => {
                      const newCount = guestCount + 1;
                      setGuestCount(newCount);
                      setOrderTable((prev) => ({
                        ...prev,
                        number_of_guests: newCount,
                      }));
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="form-field">
                <label>Ngày đặt</label>
                <input
                  type="date"
                  name="reservation_date"
                  value={orderTable.reservation_date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Giờ đến</label>
                <input
                  type="time"
                  name="reservation_time"
                  value={orderTable.reservation_time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <textarea
              name="notes"
              placeholder="Ghi chú"
              value={orderTable.notes}
              onChange={handleChange}
            />
          </div>

          {/* BUTTON */}
          <div className="actions">
            <button type="button" onClick={onClose}>
              Đóng
            </button>
            <button type="submit">ĐẶT BÀN NGAY</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPopup;
