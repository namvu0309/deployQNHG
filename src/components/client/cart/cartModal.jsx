// CartModal.jsx
import React from "react";
import { useCart } from "./cartContext";
import "./cart.scss";

const CartModal = ({ onClose }) => {
  const { cart, changeQuantity, removeAll,  removeItem } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + ((item.quantity || 0) * (item.price || 0)),
    0
  );

  if (cart.length === 0) return null;

  return (
    <div className="cart-modal">
      <div className="cart-header">
        <h2>TẠM TÍNH</h2>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="cart-body">
      <div className="total-price">
  <div className="label">
    <strong>TỔNG TIỀN:</strong>
    <span>{totalPrice.toLocaleString()} ₫</span>
  </div>
   
 <div className="note-with-remove">
  <p className="note">
    Đơn giá tạm tính chỉ mang tính chất tham khảo. Liên hệ hotline để Hoàng Gia có thể tư vấn cho bạn chu đáo nhất.
  </p>
  <button className="remove-all-btn" onClick={removeAll}>
    ⟳ Xoá hết tạm tính
  </button>
</div>
   
</div>

        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="name">{item.name || item.title}</div>
              <div className="quantity-control">
  <button className="button-n" onClick={() => changeQuantity(item.id, -1)}>-</button>
  <span>{item.quantity}</span>
  <button className="button-n" onClick={() => changeQuantity(item.id, 1)}>+</button>
</div>
<div className="price">
  {(item.quantity * item.price || 0).toLocaleString()}₫
  <button className="remove-btn" onClick={() => removeItem(item.id)}>×</button>
</div>
            </li>
          ))}
        </ul>

        <div className="cart-footer">
          

          <button className="submit-btn">ĐẶT BÀN VỚI THỰC ĐƠN NÀY</button>
          <button className="submit-btn">ĐẶT BÀN ONLINE </button>
           
          <p>
          
            Gọi <strong>*2025</strong> để đặt bàn
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default CartModal;