import React from "react";
import {
    Card,
    CardBody,
    Badge,
    Button,
    Row,
    Col,
} from "reactstrap";
import { MdModeEdit, MdVisibility } from "react-icons/md";
import { FaTrash, FaCheck, FaTimes, FaUsers, FaCalendarAlt, FaClock, FaStickyNote } from "react-icons/fa";

const ReservationCard = ({
    reservation,
    onEdit,
    onView,
    onDelete,
    onStatusChange,
}) => {
    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: "warning", text: "Chờ xác nhận" },
            confirmed: { color: "success", text: "Đã xác nhận" },
            cancelled: { color: "danger", text: "Đã hủy" },
            completed: { color: "info", text: "Hoàn thành" },
            no_show: { color: "secondary", text: "Không đến" },
            seated: { color: "primary", text: "Đã ngồi" },
        };
        const config = statusConfig[status] || {
            color: "secondary",
            text: "Không xác định",
        };
        return <Badge color={config.color} className="mb-2">{config.text}</Badge>;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    const formatTime = (timeString) => {
        if (!timeString) return "N/A";
        return timeString;
    };

    const truncateText = (text, maxLength = 50) => {
        if (!text) return "Không có ghi chú";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <Card className="h-100 reservation-card shadow-sm">
            <CardBody className="d-flex flex-column">
                {/* Header với tên khách và mã đặt bàn */}
                <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="mb-0 text-primary fw-bold">
                            {reservation.customer_name || "Khách"}
                        </h6>
                        <small className="text-muted">
                            #{reservation.id || "N/A"}
                        </small>
                    </div>
                    {getStatusBadge(reservation.status)}
                </div>

                {/* Thông tin chi tiết */}
                <div className="flex-grow-1">
                    <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                            <FaCalendarAlt className="text-muted me-2" size={14} />
                            <small className="text-muted">Ngày đặt:</small>
                        </div>
                        <div className="ms-4">
                            <strong>{formatDate(reservation.booking_date || reservation.reservation_date)}</strong>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                            <FaClock className="text-muted me-2" size={14} />
                            <small className="text-muted">Giờ đặt:</small>
                        </div>
                        <div className="ms-4">
                            <strong>{formatTime(reservation.booking_time || reservation.reservation_time)}</strong>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                            <FaUsers className="text-muted me-2" size={14} />
                            <small className="text-muted">Số khách:</small>
                        </div>
                        <div className="ms-4">
                            <strong>{reservation.number_of_guests || "N/A"} người</strong>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                            <FaStickyNote className="text-muted me-2" size={14} />
                            <small className="text-muted">Ghi chú:</small>
                        </div>
                        <div className="ms-4">
                            <small className="text-muted">
                                {truncateText(reservation.notes || reservation.special_requests)}
                            </small>
                        </div>
                    </div>
                </div>

                {/* Action buttons - chỉ hiển thị nếu có props */}
                {(onView || onEdit || onDelete || onStatusChange) && (
                    <div className="mt-auto">
                        <Row className="g-2">
                            {onView && (
                                <Col xs={6}>
                                    <Button
                                        color="info"
                                        size="sm"
                                        className="w-100"
                                        onClick={() => onView(reservation)}
                                        title="Xem chi tiết"
                                    >
                                        <MdVisibility size={16} />
                                        <span className="ms-1 d-none d-sm-inline">Xem</span>
                                    </Button>
                                </Col>
                            )}
                            {onEdit && (
                                <Col xs={6}>
                                    <Button
                                        color="primary"
                                        size="sm"
                                        className="w-100"
                                        onClick={() => onEdit(reservation)}
                                        title="Chỉnh sửa"
                                    >
                                        <MdModeEdit size={16} />
                                        <span className="ms-1 d-none d-sm-inline">Sửa</span>
                                    </Button>
                                </Col>
                            )}
                        </Row>
                        
                        {reservation.status === "pending" && onStatusChange && onDelete && (
                            <Row className="g-2 mt-2">
                                <Col xs={6}>
                                    <Button
                                        color="success"
                                        size="sm"
                                        className="w-100"
                                        onClick={() => onStatusChange(reservation.id, "confirmed")}
                                        title="Xác nhận"
                                    >
                                        <FaCheck size={14} />
                                        <span className="ms-1 d-none d-sm-inline">Xác nhận</span>
                                    </Button>
                                </Col>
                                <Col xs={6}>
                                    <Button
                                        color="danger"
                                        size="sm"
                                        className="w-100"
                                        onClick={() => onDelete(reservation)}
                                        title="Xóa"
                                    >
                                        <FaTrash size={14} />
                                        <span className="ms-1 d-none d-sm-inline">Xóa</span>
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </div>
                )}
            </CardBody>
        </Card>
    );
};

export default ReservationCard; 