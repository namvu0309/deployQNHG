import React, { useState } from "react";
import {
  Card,
  CardBody,
  Badge,
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { MdVisibility, MdModeEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import "./card-order.css";

const OrderCard = ({ order, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending_confirmation: { color: "warning", text: "Chờ xác nhận" },
      confirmed: { color: "info", text: "Đã xác nhận" },
      preparing: { color: "primary", text: "Đang chế biến" },
      ready: { color: "success", text: "Sẵn sàng" },
      delivered: { color: "success", text: "Đã giao" },
      cancelled: { color: "danger", text: "Đã hủy" },
      completed: { color: "success", text: "Completed" },
    };
    const config =
      statusConfig[status] || { color: "secondary", text: "Không xác định" };

    return (
      <Badge color={config.color} pill className="order-card-status-badge">
        {status === "completed" && <FaCheck size={10} className="me-1" />}
        {config.text}
      </Badge>
    );
  };

  const getOrderTypeBadge = (orderType) => {
    const typeConfig = {
      "dine-in": { color: "primary", text: "Tại bàn" },
      takeaway: { color: "info", text: "Mang về" },
      delivery: { color: "success", text: "Giao hàng" },
    };
    return (
      <Badge color={typeConfig[orderType]?.color || "secondary"} pill>
        {typeConfig[orderType]?.text || "Không xác định"}
      </Badge>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount || 0);
  };

  const customerName = order.customer?.full_name || "Guest";

  return (
    <>
      <Card className="order-card h-100 shadow-sm border-0">
        <CardBody className="p-3 d-flex flex-column">
          {/* Top section */}
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h6 className="mb-0 fw-bold">{customerName}</h6>
              <small className="text-muted">{`#${
                order.order_code || "N/A"
              }`}</small>
            </div>
            {getStatusBadge(order.status)}
          </div>

          <hr className="my-3" />

          {/* Middle section */}
          <Row className="text-center">
            <Col xs="6" className="border-end">
              <BsBoxSeam size={22} className="text-muted mb-1" />
              <p className="text-muted small mb-0" style={{ lineHeight: "1.2" }}>
                Items
              </p>
              <p className="fw-bold fs-5 mb-0">{order.items?.length || 0}</p>
            </Col>
            <Col xs="6">
              <FiClock size={22} className="text-muted mb-1" />
              <p className="text-muted small mb-0" style={{ lineHeight: "1.2" }}>
                Time
              </p>
              <p className="fw-bold mb-0">
                {new Date(order.created_at).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
              <p className="text-muted small mb-0">
                {new Date(order.created_at).toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </Col>
          </Row>

          <div className="mt-auto pt-3">
            {/* Bottom section */}
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0 text-muted">Total Amount</h6>
              <h5 className="mb-0 order-card-total-amount fw-bold">
                {formatCurrency(order.total_amount)}
              </h5>
            </div>

            <div className="d-flex mt-3 gap-2">
              <Button
                color="light"
                className="w-100 border"
                onClick={() => setIsOpen(true)}
              >
                <MdVisibility className="me-1" /> View Details
              </Button>
              {onEdit && (
                <Button
                  color="secondary"
                  className="w-100 border"
                  onClick={() => onEdit(order)}
                >
                  <MdModeEdit className="me-1" /> Sửa
                </Button>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Modal for Order Details */}
      <Modal isOpen={isOpen} toggle={() => setIsOpen(false)} size="lg">
        <ModalHeader toggle={() => setIsOpen(false)}>
          Chi tiết đơn hàng #{order.order_code}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md={6}>
              <div>
                <strong>Trạng thái:</strong> {getStatusBadge(order.status)}
              </div>
              <div>
                <strong>Loại:</strong> {getOrderTypeBadge(order.order_type)}
              </div>
              <div>
                <strong>Thời gian:</strong>{" "}
                {new Date(order.created_at).toLocaleString("vi-VN")}
              </div>
              <div>
                <strong>Phương thức thanh toán:</strong>{" "}
                {order.payment_method || "N/A"}
              </div>
              <div>
                <strong>Bàn:</strong> {order.table_id || "N/A"}
              </div>
              <div>
                <strong>Số người:</strong> {order.number_of_people || 1}
              </div>
            </Col>
            <Col md={6}>
              <div>
                <strong>Khách hàng:</strong> {customerName}
              </div>
              <div>
                <strong>Tổng tiền:</strong>{" "}
                {formatCurrency(order.total_amount)}
              </div>
              <div>
                <strong>Danh sách món:</strong>
              </div>
              <ul>
                {order.items?.map((item, index) => (
                  <li key={index}>
                    {item.name} - {formatCurrency(item.price)} x {item.quantity}
                  </li>
                )) || <li>Không có món</li>}
              </ul>
              <div>
                <strong>Ghi chú:</strong> {order.notes || "Không có"}
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setIsOpen(false)}>
            Đóng
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default OrderCard;