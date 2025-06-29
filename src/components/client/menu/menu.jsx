import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./menu.scss";
import { getMenuList, getAllDishes } from "@services/client/menuService";
import { getDishDetail } from "@services/client/dishDetailService";
import plush from "@assets/client/images/menu/plush.svg";
import defaultDishImg from "@assets/client/images/branch/anh-caugiay.jpg";
import NavbarCategory from "../../../components/client/include/header/NavbarCategory";
import DishDetailPopsup from "../dishDetail/DishDetailPopsup";

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("category");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        let data;
        if (categoryId) {
          data = await getMenuList(categoryId);
        } else {
          data = await getAllDishes();
        }
        setMenuData(Array.isArray(data.data) ? data.data : []);
      } catch (e) {
        console.error("Lỗi lấy menu:", e);
      }
    };
    fetchMenu();
  }, [categoryId]);

  const handleAdd = (item) => {
    const priceNumber = Number(item.price?.toString().replace(/[^\d]/g, ""));
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

  // Hàm mở popup chi tiết sản phẩm
  const handleShowDetail = async (id) => {
    try {
      const res = await getDishDetail(id);
      setSelectedDish(res.data || null);
      setShowDetail(true);
    } catch (e) {
      setSelectedDish(null);
      setShowDetail(false);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className="td-menu">
      <NavbarCategory />
      <div className="menuList">
        <div className="widthCT">
          {totalItems > 0 && (
            <div className="order-summary" onClick={() => setIsModalOpen(true)}>
              <span className="count">{totalItems} MÓN</span>{" "}
              <span className="tt">TẠM TÍNH</span> <br />
              <span className="total">{totalPrice.toLocaleString()}</span>
            </div>
          )}

          <div className="menuBox">
            <h2 className="title-menu">Menu</h2>
            <ul className="list-food-menu">
              {Array.isArray(menuData) && menuData.length > 0 ? (
                menuData.map((item) => (
                  <li key={item.id}>
                    <div className="food-menu">
                      <a
                        href="#"
                        className="thumb"
                        onClick={e => {
                          e.preventDefault();
                          handleShowDetail(item.id);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={item.image_url ? item.image_url : defaultDishImg}
                          alt={item.name || item.title || "Món ăn"}
                          onError={e => { e.target.onerror = null; e.target.src = defaultDishImg; }}
                        />
                      </a>
                      <div className="info-box">
                        <a href="#" className="title-food">
                          {item.name || item.title || item.description}
                        </a>
                        <div className="price-food">{item.selling_price ? item.selling_price.toLocaleString() + "₫" : item.price}</div>
                        <div className="funcsBox">
                          <button
                            className="add-to-card"
                            onClick={() => handleAdd(item)}
                          >
                            <img src={plush} alt="" />
                            <span className="txt">Đặt</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li>Không có dữ liệu menu.</li>
              )}
            </ul>
          </div>

          {isModalOpen && (
            <div className="cart-modal">
              <div className="cart-header">
                <h2>Tạm tính</h2>
                <button
                  className="close-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  ×
                </button>
              </div>

              <ul className="cart-list">
                {cart.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className="name">{item.title || item.description || item.name}</div>
                    <div className="quantity-control">
                      <span>{item.quantity}</span>
                    </div>
                    <div className="price">
                      {(item.price * item.quantity).toLocaleString()}₫
                    </div>
                  </li>
                ))}
              </ul>
              <button className="remove-all-btn" onClick={handleRemoveAll} style={{marginTop: '16px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer'}}>Xóa hết</button>
            </div>
          )}

          {/* Popup chi tiết sản phẩm */}
          <DishDetailPopsup
            isOpen={showDetail}
            onClose={() => setShowDetail(false)}
            dish={selectedDish}
          />
        </div>
      </div>
    </div>
  );
};

export default Menu;