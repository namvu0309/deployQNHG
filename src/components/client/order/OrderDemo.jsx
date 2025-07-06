import React, { useState } from "react";
import OrderModal from "./order";

// Dữ liệu mẫu cho giỏ hàng
const sampleCartItems = [
  {
    id: 1,
    name: "Gà nướng lá chanh",
    price: 180000,
    quantity: 2,
    image: "https://via.placeholder.com/60x60/FF6B6B/FFFFFF?text=Gà"
  },
  {
    id: 2,
    name: "Cá lóc nướng trui",
    price: 220000,
    quantity: 1,
    image: "https://via.placeholder.com/60x60/4ECDC4/FFFFFF?text=Cá"
  },
  {
    id: 3,
    name: "Rau xào tỏi",
    price: 45000,
    quantity: 3,
    image: "https://via.placeholder.com/60x60/45B7D1/FFFFFF?text=Rau"
  }
];

const OrderDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Demo Order Modal</h2>
      <p>Click vào nút bên dưới để mở modal thanh toán:</p>
      
      <button 
        onClick={openModal}
        style={{
          padding: "12px 24px",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Mở Modal Thanh Toán
      </button>

      <OrderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        cartItems={sampleCartItems}
      />
    </div>
  );
};

export default OrderDemo; 