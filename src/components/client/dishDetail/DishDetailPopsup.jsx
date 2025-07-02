import React from "react";
import "./DishDetailPopsup.scss";

const DishDetailPopsup = ({ isOpen, onClose, dish }) => {
  if (!isOpen || !dish) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{dish.name}</h2>
        <div className="dish-detail-content">
          <img src={dish.image_url} alt={dish.name} className="dish-img" />
          <div className="dish-info">
            <p className="dish-price">
              Giá: {dish.selling_price ? dish.selling_price.toLocaleString() : ""}đ
            </p>
            <p className="dish-desc">{dish.description}</p>
          </div>
        </div>
        <div className="actions">
          <button type="button" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default DishDetailPopsup;
