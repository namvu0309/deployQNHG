import React, { useState } from "react";
import {
    Card,
    CardBody,
    Pagination,
    PaginationItem,
    PaginationLink,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    Button,
    Alert,
} from "reactstrap";
import Swal from "sweetalert2";
import CardReservation from "./card-reservation";
import {
    deleteReservation,
    changeReservationStatus,
    updateReservation,
} from "@services/admin/reservationService";
import "./grid-reservation.css";

const ReservationGrid = ({
    paginate = {},
    data = [],
    onDelete,
    onPageChange,
    onUpdate,
}) => {
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showView, setShowView] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editForm, setEditForm] = useState({});

    const currentPage = paginate.page || 1;
    const totalPages = paginate.totalPage || 1;

    const handleDelete = async () => {
        try {
            await deleteReservation(selectedItem.id);
            Swal.fire({
                title: "Thành công!",
                text: "Đã xóa đơn đặt bàn thành công",
                icon: "success",
                confirmButtonText: "OK",
            });
            if (onDelete) onDelete(selectedItem.id);
        } catch (error) { // eslint-disable-line no-unused-vars
            Swal.fire({
                title: "Lỗi!",
                text: "Không thể xóa đơn đặt bàn",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
        setShowDelete(false);
        setSelectedItem(null);
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await changeReservationStatus(id, newStatus);
            Swal.fire({
                title: "Thành công!",
                text: "Đã cập nhật trạng thái thành công",
                icon: "success",
                confirmButtonText: "OK",
            });
            if (onUpdate) onUpdate();
        } catch (error) { // eslint-disable-line no-unused-vars
            Swal.fire({
                title: "Lỗi!",
                text: "Không thể cập nhật trạng thái",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const handleEdit = async () => {
        try {
            await updateReservation(selectedItem.id, editForm);
            Swal.fire({
                title: "Thành công!",
                text: "Đã cập nhật đơn đặt bàn thành công",
                icon: "success",
                confirmButtonText: "OK",
            });
            if (onUpdate) onUpdate();
            setShowEdit(false);
            setSelectedItem(null);
            setEditForm({});
        } catch (error) { // eslint-disable-line no-unused-vars
            Swal.fire({
                title: "Lỗi!",
                text: "Không thể cập nhật đơn đặt bàn",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages && onPageChange) {
            onPageChange(page);
        }
    };

    const openEditModal = (item) => {
        setSelectedItem(item);
        setEditForm({
            customer_name: item.customer_name || "",
            phone_number: item.customer_phone || item.phone_number || "",
            email: item.customer_email || item.email || "",
            booking_date: item.booking_date || item.reservation_date || "",
            booking_time: item.booking_time || item.reservation_time || "",
            number_of_guests: item.number_of_guests || "",
            special_requests: item.special_requests || item.notes || "",
        });
        setShowEdit(true);
    };

    const openViewModal = (item) => {
        setSelectedItem(item);
        setShowView(true);
    };

    const handleCardDelete = (item) => {
        setSelectedItem(item);
        setShowDelete(true);
    };

    return (
        <>
            {/* Grid Layout */}
            <div className="reservation-grid">
                {data.length === 0 ? (
                    <Alert color="info" className="text-center">
                        Không có đơn đặt bàn nào
                    </Alert>
                ) : (
                    <Row className="g-4">
                        {data.map((reservation) => (
                            <Col key={reservation.id} xs={12} sm={6} md={4} lg={3} xl={3}>
                                <CardReservation
                                    reservation={reservation}
                                    onEdit={openEditModal}
                                    onView={openViewModal}
                                    onDelete={handleCardDelete}
                                    onStatusChange={handleStatusChange}
                                />
                            </Col>
                        ))}
                    </Row>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <Card className="mt-4">
                    <CardBody className="d-flex justify-content-center">
                        <Pagination aria-label="pagination">
                            <PaginationItem disabled={currentPage === 1}>
                                <PaginationLink first onClick={() => handlePageChange(1)} />
                            </PaginationItem>
                            <PaginationItem disabled={currentPage === 1}>
                                <PaginationLink
                                    previous
                                    onClick={() => handlePageChange(currentPage - 1)}
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <PaginationItem active={currentPage === i + 1} key={i}>
                                    <PaginationLink onClick={() => handlePageChange(i + 1)}>
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem disabled={currentPage === totalPages}>
                                <PaginationLink
                                    next
                                    onClick={() => handlePageChange(currentPage + 1)}
                                />
                            </PaginationItem>
                            <PaginationItem disabled={currentPage === totalPages}>
                                <PaginationLink
                                    last
                                    onClick={() => handlePageChange(totalPages)}
                                />
                            </PaginationItem>
                        </Pagination>
                    </CardBody>
                </Card>
            )}

            {/* Modal Xóa */}
            <Modal isOpen={showDelete} toggle={() => setShowDelete(false)}>
                <ModalHeader toggle={() => setShowDelete(false)}>
                    Xác nhận xóa
                </ModalHeader>
                <ModalBody>
                    Bạn có chắc chắn muốn xóa đơn đặt bàn của{" "}
                    <strong>{selectedItem?.customer_name}</strong> không?
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setShowDelete(false)}>
                        Hủy
                    </Button>
                    <Button color="danger" onClick={handleDelete}>
                        Xóa
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Modal Chỉnh sửa */}
            <Modal isOpen={showEdit} toggle={() => setShowEdit(false)} size="lg">
                <ModalHeader toggle={() => setShowEdit(false)}>
                    Chỉnh sửa đơn đặt bàn
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="customer_name">Tên khách hàng</Label>
                                    <Input
                                        id="customer_name"
                                        value={editForm.customer_name}
                                        onChange={(e) =>
                                            setEditForm({
                                                ...editForm,
                                                customer_name: e.target.value,
                                            })
                                        }
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="phone_number">Số điện thoại</Label>
                                    <Input
                                        id="phone_number"
                                        value={editForm.phone_number}
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, phone_number: e.target.value })
                                        }
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={editForm.email}
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, email: e.target.value })
                                        }
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="number_of_guests">Số khách</Label>
                                    <Input
                                        id="number_of_guests"
                                        type="number"
                                        value={editForm.number_of_guests}
                                        onChange={(e) =>
                                            setEditForm({
                                                ...editForm,
                                                number_of_guests: e.target.value,
                                            })
                                        }
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="booking_date">Ngày đặt</Label>
                                    <Input
                                        id="booking_date"
                                        type="date"
                                        value={editForm.booking_date}
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, booking_date: e.target.value })
                                        }
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="booking_time">Giờ đặt</Label>
                                    <Input
                                        id="booking_time"
                                        type="time"
                                        value={editForm.booking_time}
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, booking_time: e.target.value })
                                        }
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="special_requests">Yêu cầu đặc biệt</Label>
                            <Input
                                id="special_requests"
                                type="textarea"
                                value={editForm.special_requests}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, special_requests: e.target.value })
                                }
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setShowEdit(false)}>
                        Hủy
                    </Button>
                    <Button color="primary" onClick={handleEdit}>
                        Cập nhật
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Modal Xem chi tiết */}
            <Modal isOpen={showView} toggle={() => setShowView(false)} size="lg" centered>
                <ModalHeader toggle={() => setShowView(false)} className="border-0 pb-0">
                    <span className="fw-bold fs-4">Reservation Details</span>
                </ModalHeader>
                <ModalBody className="pt-0">
                    {selectedItem && (
                        <div className="reservation-detail-modal">
                            {/* Header */}
                            <div className="d-flex align-items-center mb-3">
                                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48, fontSize: 24, fontWeight: 600 }}>
                                    {selectedItem.customer_name?.charAt(0)?.toUpperCase() || "A"}
                                </div>
                                <div className="flex-grow-1">
                                    <div className="fw-bold fs-5 mb-1">{selectedItem.customer_name}</div>
                                    <div className="text-muted" style={{ fontSize: 14 }}>
                                        Reservation #{selectedItem.id || "N/A"}
                                    </div>
                                </div>
                                <div>
                                    {(() => {
                                        const statusMap = {
                                            pending: { color: "warning", text: "Chờ xác nhận" },
                                            confirmed: { color: "success", text: "Đã xác nhận" },
                                            cancelled: { color: "danger", text: "Đã hủy" },
                                            completed: { color: "info", text: "Hoàn thành" },
                                            no_show: { color: "secondary", text: "Không đến" },
                                            seated: { color: "primary", text: "Đã ngồi" },
                                        };
                                        const config = statusMap[selectedItem.status] || { color: "secondary", text: "Không xác định" };
                                        return <span className={`badge bg-${config.color} px-3 py-2`} style={{ fontSize: 14 }}>{config.text}</span>;
                                    })()}
                                </div>
                            </div>

                            {/* Reservation Details */}
                            <div className="mb-4">
                                <div className="fw-semibold mb-2" style={{ fontSize: 16 }}>Reservation Details</div>
                                <Row className="gy-2">
                                    <Col md={4} xs={12} className="d-flex align-items-center">
                                        <span className="me-2 text-primary"><i className="mdi mdi-calendar"></i></span>
                                        <span>
                                            <div className="text-muted" style={{ fontSize: 13 }}>Date</div>
                                            <div className="fw-bold">{selectedItem.booking_date || selectedItem.reservation_date}</div>
                                        </span>
                                    </Col>
                                    <Col md={4} xs={12} className="d-flex align-items-center">
                                        <span className="me-2 text-primary"><i className="mdi mdi-clock-outline"></i></span>
                                        <span>
                                            <div className="text-muted" style={{ fontSize: 13 }}>Time</div>
                                            <div className="fw-bold">{selectedItem.booking_time || selectedItem.reservation_time}</div>
                                        </span>
                                    </Col>
                                    <Col md={4} xs={12} className="d-flex align-items-center">
                                        <span className="me-2 text-primary"><i className="mdi mdi-account-group-outline"></i></span>
                                        <span>
                                            <div className="text-muted" style={{ fontSize: 13 }}>Party Size</div>
                                            <div className="fw-bold">{selectedItem.number_of_guests} guests</div>
                                        </span>
                                    </Col>
                                </Row>
                                {selectedItem.notes || selectedItem.special_requests ? (
                                    <div className="mt-3 d-flex align-items-center">
                                        <span className="me-2 text-primary"><i className="mdi mdi-note-text-outline"></i></span>
                                        <span>
                                            <div className="text-muted" style={{ fontSize: 13 }}>Note</div>
                                            <div>{selectedItem.notes || selectedItem.special_requests}</div>
                                        </span>
                                    </div>
                                ) : null}
                            </div>

                            {/* Customer Information */}
                            <div className="mb-4">
                                <div className="fw-semibold mb-2 text-primary" style={{ fontSize: 16 }}>Customer Information</div>
                                <Row>
                                    <Col md={6} xs={12} className="d-flex align-items-center mb-2">
                                        <span className="me-2 text-secondary"><i className="mdi mdi-phone"></i></span>
                                        <span>
                                            <div className="text-muted" style={{ fontSize: 13 }}>Phone</div>
                                            <div className="fw-bold">{selectedItem.customer_phone || selectedItem.phone_number}</div>
                                        </span>
                                    </Col>
                                    <Col md={6} xs={12} className="d-flex align-items-center mb-2">
                                        <span className="me-2 text-secondary"><i className="mdi mdi-email-outline"></i></span>
                                        <span>
                                            <div className="text-muted" style={{ fontSize: 13 }}>Email</div>
                                            <div className="fw-bold">{selectedItem.customer_email || selectedItem.email}</div>
                                        </span>
                                    </Col>
                                </Row>
                            </div>

                            {/* System Information */}
                            <div className="mb-2">
                                <div className="fw-semibold mb-2 text-dark" style={{ fontSize: 16 }}>System Information</div>
                                <Row>
                                    <Col md={6} xs={12}>
                                        <div className="text-muted" style={{ fontSize: 13 }}>Created</div>
                                        <div>{selectedItem.created_at}</div>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <div className="text-muted" style={{ fontSize: 13 }}>Last Updated</div>
                                        <div>{selectedItem.updated_at || selectedItem.created_at}</div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    )}
                </ModalBody>
                <ModalFooter className="border-0 pt-0">
                    <Button color="secondary" onClick={() => setShowView(false)}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ReservationGrid; 