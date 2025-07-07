import React from "react";
import { useCart } from "./cartContext";
import "./cart.scss";

const CartSummary = ({ onClick }) => {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  if (totalItems === 0) return null;

  return (
    <div className="order-summary-n" onClick={onClick}>
      <span className="count">
  <span className="number">{totalItems} MÓN</span>
  <span className="tt">TẠM TÍNH</span>
</span>
<br />
<span className="icon-money">
  <span className="total">{totalPrice.toLocaleString()}₫</span>
</span>

    </div>
  );
};

export default CartSummary;
