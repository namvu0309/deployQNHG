import React, { useState } from "react";
import './menu.scss';
import { combos, dishs } from "./data-menu";
import plush from "./image/plush.svg";

const Profile = () => {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = (item) => {
    const priceNumber = Number(item.price.toString().replace(/[^\d]/g, ""));
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1, price: priceNumber }];
      }
    });
  };

  const handleRemoveAll = () => {
    setCart([]);
    setIsModalOpen(false);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="td-menu">
      <div className="menuList">
        <div className="widthCT">
          {totalItems > 0 && (
            <div className="order-summary" onClick={() => setIsModalOpen(true)}>
                <span className="count">{totalItems} MÓN</span> <span className="tt">TẠM TÍNH</span> <br />
                <span className="total">{totalPrice.toLocaleString()}</span>
            </div>
          )}


          <div className="menuBox">
            <h2 className="title-menu">Combo</h2>
            <ul className="list-food-menu">
              {combos.map((combo) => (
                <li key={combo.id}>
                  <div className="food-menu">
                    <a href="#" className="thumb">
                      <img src={combo.image} alt={combo.title} />
                    </a>
                    <div className="info-box">
                      <a href="#" className="title-food">{combo.title}</a>
                      <div className="price-food">{combo.price}</div>
                      <div className="funcsBox">
                        <button
                          className="add-to-card"
                          onClick={() => handleAdd(combo)}
                        >
                          <img src={plush} alt="" />
                          <span className="txt">Đặt</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="menuBox">
            <h2 className="title-menu">Món mới</h2>
            <ul className="list-food-menu dish">
              {dishs.map((dish) => (
                <li key={dish.id}>
                  <div className="food-menu-dish">
                    <a href="#" className="thumb">
                      <img src={dish.image} alt={dish.description} />
                    </a>
                    <div className="info-box">
                      <a href="#" className="title-food">{dish.description}</a>
                      <div className="price-food">{dish.price}</div>
                      <div className="funcsBox">
                        <button
                          className="add-to-card"
                          onClick={() => handleAdd(dishs)}
                        >
                          <img src={plush} alt="" />
                          <span className="txt">Đặt</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {isModalOpen && (
            <div className="cart-modal">
              <div className="cart-header">
                <h2>Tạm tính</h2>
                <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
              </div>
              <div className="cart-footer">
                <div className="total">Tổng tiền: <span>{totalPrice.toLocaleString()}</span></div>
                <div className="clear">
                  <div className="text-clear">
                    <span>Đơn giá tạm tính chỉ mang tính chất tham khảo.</span><br />Liên hệ hotline để Tự Do có thể tư vấn cho bạn chu đáo nhất.
                  </div>
                  <div onClick={handleRemoveAll} className="clear-cart">Xoá hết tạm tính</div>
                </div>
              
              </div>

              <ul className="cart-list">
                {cart.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className="name">{item.title || item.description}</div>
                    <div className="quantity-control">
                      <span>{item.quantity}</span>
                    </div>
                    <div className="price">
                      {(item.price * item.quantity).toLocaleString()}₫
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
