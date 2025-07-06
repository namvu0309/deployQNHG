import React, { useState } from "react";
import "./order.scss";
import { X, CreditCard, Truck, Wallet } from "lucide-react";

const OrderModal = ({ isOpen, onClose, cartItems = [] }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    note: "",
    paymentMethod: "cod", // cod: tiền mặt, card: thẻ tín dụng, bank: chuyển khoản
  });

  const [shippingFee] = useState(30000); // Phí vận chuyển cố định

  // Tính tổng tiền hàng
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  // Tổng tiền cuối cùng
  const total = subtotal + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic thanh toán ở đây
    console.log("Form data:", formData);
    console.log("Cart items:", cartItems);
    console.log("Total:", total);
  };

  const paymentMethods = [
    {
      id: "cod",
      name: "Thanh toán khi nhận hàng",
      icon: <Wallet size={20} />,
      description: "Thanh toán bằng tiền mặt khi nhận hàng"
    },
    {
      id: "card",
      name: "Thẻ tín dụng/ghi nợ",
      icon: <CreditCard size={20} />,
      description: "Thanh toán bằng thẻ Visa, Mastercard"
    },
    {
      id: "bank",
      name: "Chuyển khoản ngân hàng",
      icon: <Truck size={20} />,
      description: "Chuyển khoản trực tiếp vào tài khoản"
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="order-modal-overlay">
      <div className="order-modal">
        <div className="order-modal-header">
          <h2>Thanh toán đơn hàng</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="order-modal-content">
          {/* Cột 1: Form thông tin */}
          <div className="order-form-column">
            <form onSubmit={handleSubmit}>
              {/* Thông tin người mua */}
              <div className="form-section">
                <h3>Thông tin người mua</h3>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Nhập email của bạn"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Họ và tên *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Nhập họ và tên"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Địa chỉ giao hàng *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Nhập địa chỉ giao hàng chi tiết"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="note">Ghi chú</label>
                  <textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder="Ghi chú thêm về đơn hàng (không bắt buộc)"
                    rows="3"
                  />
                </div>
              </div>

              {/* Hình thức thanh toán */}
              <div className="form-section">
                <h3>Hình thức thanh toán</h3>
                <div className="payment-methods">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`payment-method ${
                        formData.paymentMethod === method.id ? "active" : ""
                      }`}
                      onClick={() =>
                        setFormData(prev => ({ ...prev, paymentMethod: method.id }))
                      }
                    >
                      <div className="payment-method-radio">
                        <input
                          type="radio"
                          id={method.id}
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleInputChange}
                        />
                        <label htmlFor={method.id}></label>
                      </div>
                      <div className="payment-method-icon">
                        {method.icon}
                      </div>
                      <div className="payment-method-info">
                        <h4>{method.name}</h4>
                        <p>{method.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Đặt hàng
                </button>
              </div>
            </form>
          </div>

          {/* Cột 2: Sidebar giỏ hàng */}
          <div className="order-sidebar">
            <div className="cart-summary">
              <h3>Đơn hàng của bạn</h3>
              
              {/* Danh sách sản phẩm */}
              <div className="cart-items">
                {cartItems.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p className="cart-item-price">
                        {item.price.toLocaleString()}đ x {item.quantity}
                      </p>
                    </div>
                    <div className="cart-item-total">
                      {(item.price * item.quantity).toLocaleString()}đ
                    </div>
                  </div>
                ))}
              </div>

              {/* Tổng tiền */}
              <div className="cart-totals">
                <div className="total-row">
                  <span>Tạm tính:</span>
                  <span>{subtotal.toLocaleString()}đ</span>
                </div>
                <div className="total-row">
                  <span>Phí vận chuyển:</span>
                  <span>{shippingFee.toLocaleString()}đ</span>
                </div>
                <div className="total-row total-final">
                  <span>Tổng cộng:</span>
                  <span>{total.toLocaleString()}đ</span>
                </div>
              </div>

              {/* Thông tin bổ sung */}
              <div className="cart-info">
                <p>• Đơn hàng sẽ được xử lý trong 24h</p>
                <p>• Thời gian giao hàng: 2-3 ngày làm việc</p>
                <p>• Miễn phí vận chuyển cho đơn hàng từ 500.000đ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
