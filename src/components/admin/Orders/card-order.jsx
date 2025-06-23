import React from "react";
import {
    Card,
    CardBody,
    Badge,
    Button,
    Row,
    Col,
} from "reactstrap";
import { MdModeEdit, MdVisibility, MdReceipt } from "react-icons/md";
import { FaCheck, FaTimes, FaUsers, FaCalendarAlt, FaClock, FaMoneyBillWave } from "react-icons/fa";

const OrderCard = ({
    order,
    onEdit,
    onView,
    onDelete,
    onStatusChange,
}) => {
    const getStatusBadge = (status) => {
        const statusConfig = {
            pending_confirmation: { color: "warning", text: "Chờ xác nhận" },
            confirmed: { color: "info", text: "Đã xác nhận" },
            preparing: { color: "primary", text: "Đang chế biến" },
            ready: { color: "success", text: "Sẵn sàng" },
            delivered: { color: "success", text: "Đã giao" },
            cancelled: { color: "danger", text: "Đã hủy" },
            completed: { color: "info", text: "Hoàn thành" },
        };
        const config = statusConfig[status] || {
            color: "secondary",
            text: "Không xác định",
        };
        return <Badge color={config.color} className="px-2 py-1" style={{ fontSize: '0.8rem' }}>{config.text}</Badge>;
    };

    const getOrderTypeBadge = (orderType) => {
        const typeConfig = {
            'dine-in': { color: "primary", text: "Tại bàn" },
            'takeaway': { color: "info", text: "Mang về" },
            'delivery': { color: "success", text: "Giao hàng" },
        };
        const config = typeConfig[orderType] || {
            color: "secondary",
            text: "Không xác định",
        };
        return <Badge color={config.color} pill>{config.text}</Badge>;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    const formatTime = (timeString) => {
        if (!timeString) return "N/A";
        const date = new Date(timeString);
        return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const customerName = order.customer?.full_name || "Khách vãng lai";

    return (
        <Card className="h-100 shadow-sm border-light">
            <CardBody className="d-flex flex-column p-3">
                {/* Header */}
                <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                    <div 
                        className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3" 
                        style={{ width: 48, height: 48, flexShrink: 0 }}
                    >
                        <span className="text-primary" style={{ fontSize: 22, fontWeight: 600 }}>
                            {customerName?.charAt(0)?.toUpperCase() || "K"}
                        </span>
                    </div>
                    <div className="flex-grow-1">
                        <div className="fw-bold fs-6 mb-0 text-truncate">{customerName}</div>
                        <div className="text-muted" style={{ fontSize: 13 }}>
                            #{order.order_code || "N/A"}
                        </div>
                    </div>
                    <div className="ms-2">
                        {getOrderTypeBadge(order.order_type)}
                    </div>
                </div>

                {/* Details */}
                <div className="flex-grow-1">
                    <Row className="gy-3">
                        <Col xs="6" className="d-flex align-items-center">
                            <FaCalendarAlt className="text-muted me-2" style={{ fontSize: 14 }} />
                            <div>
                                <div className="text-muted" style={{ fontSize: 12 }}>Ngày</div>
                                <div className="fw-bold" style={{ fontSize: 14 }}>{formatDate(order.order_time || order.created_at)}</div>
                            </div>
                        </Col>
                        <Col xs="6" className="d-flex align-items-center">
                            <FaClock className="text-muted me-2" style={{ fontSize: 14 }} />
                            <div>
                                <div className="text-muted" style={{ fontSize: 12 }}>Giờ</div>
                                <div className="fw-bold" style={{ fontSize: 14 }}>{formatTime(order.order_time || order.created_at)}</div>
                            </div>
                        </Col>
                        <Col xs="12" className="d-flex align-items-center">
                            <FaMoneyBillWave className="text-muted me-2" style={{ fontSize: 14 }} />
                            <div>
                                <div className="text-muted" style={{ fontSize: 12 }}>Tổng tiền</div>
                                <div className="fw-bold text-success" style={{ fontSize: 14 }}>{formatCurrency(order.final_amount || order.total_amount || 0)}</div>
                            </div>
                        </Col>
                    </Row>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-3 mt-3">
                     <div className="d-flex justify-content-between align-items-center mb-3">
                         <span className="fw-bold text-muted" style={{fontSize: 14}}>Trạng thái</span>
                         {getStatusBadge(order.status)}
                     </div>

                    <Row className="g-2">
                        {onView && (
                            <Col>
                                <Button color="light" size="sm" className="w-100" onClick={() => onView(order)}>
                                    <MdVisibility className="me-1" /> Xem
                                </Button>
                            </Col>
                        )}
                        {onEdit && (
                            <Col>
                                <Button color="light" size="sm" className="w-100" onClick={() => onEdit(order)}>
                                    <MdModeEdit className="me-1" /> Sửa
                                </Button>
                            </Col>
                        )}
                    </Row>

                    {order.status === "pending_confirmation" && onStatusChange && onDelete && (
                        <Row className="g-2 mt-2">
                            <Col>
                                <Button color="success" size="sm" className="w-100" onClick={() => onStatusChange(order.id, "confirmed")}>
                                    <FaCheck className="me-1" /> Xác nhận
                                </Button>
                            </Col>
                            <Col>
                                <Button color="danger" outline size="sm" className="w-100" onClick={() => onDelete(order)}>
                                    <FaTimes className="me-1" /> Hủy
                                </Button>
                            </Col>
                        </Row>
                    )}

                    {order.status === "confirmed" && onStatusChange && (
                        <Row className="g-2 mt-2">
                            <Col xs={12}>
                                <Button
                                    color="primary"
                                    size="sm"
                                    className="w-100"
                                    onClick={() => onStatusChange(order.id, "preparing")}
                                    title="Bắt đầu chế biến"
                                >
                                    <MdReceipt size={14} className="me-1" />
                                    Bắt đầu chế biến
                                </Button>
                            </Col>
                        </Row>
                    )}

                    {order.status === "preparing" && onStatusChange && (
                        <Row className="g-2 mt-2">
                            <Col xs={12}>
                                <Button
                                    color="success"
                                    size="sm"
                                    className="w-100"
                                    onClick={() => onStatusChange(order.id, "ready")}
                                    title="Sẵn sàng giao"
                                >
                                    <FaCheck size={14} className="me-1" />
                                    Sẵn sàng giao
                                </Button>
                            </Col>
                        </Row>
                    )}
                </div>
            </CardBody>
        </Card>
    );
};

export default OrderCard;