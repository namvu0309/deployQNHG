import React from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import "./OrderItemsModal.scss";
import dishDefaultImg from "@assets/admin/images/dish/dish-default.webp";
import { formatPriceToVND } from "@helpers/formatPriceToVND";

const OrderItemsModal = ({ isOpen, toggle, items }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" centered className="order-items-modal">
      <ModalHeader toggle={toggle}>Danh sách món ăn trong đơn</ModalHeader>
      <ModalBody>
        <div className="order-items-list">
          {items && items.length > 0 ? (
            items.map((item) => (
              <div className="order-item-row" key={item.id}>
                <div className="order-item-img">
                  <img src={item.image_url ? item.image_url : dishDefaultImg} alt={item.name} />
                </div>
                <div className="order-item-info">
                  <div className="order-item-name">{item.dish_id?.name || item.name}</div>
                  <div className="order-item-price">Giá: {formatPriceToVND(item.unit_price || item.price)} đ</div>
                  <div className="order-item-qty">Số lượng: {item.quantity}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-muted text-center">Không có món nào trong đơn.</div>
          )}
        </div>
        <div className="d-flex justify-content-end mt-3">
          <Button color="secondary" onClick={toggle}>Đóng</Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default OrderItemsModal; 