import React, { useState } from "react";
import {
    Card,
    CardBody,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Badge,
    Button,
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
} from "reactstrap";
import { MdModeEdit, MdVisibility } from "react-icons/md";
import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import {
    deleteReservation,
    changeReservationStatus,
    updateReservation,
} from "@services/admin/reservationService";

const ROWS_PER_PAGE = 10;

const ListReservation = ({
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
        return <Badge color={config.color}>{config.text}</Badge>;
    };

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

    return (
        <>
            <Card>
                <CardBody>
                    <Table bordered responsive hover className="mb-0">
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: 60 }}>#</th>
                                <th>Tên khách</th>
                                <th>SĐT</th>
                                <th>Email</th>
                                <th>Thời gian đặt</th>
                                <th>Số khách</th>
                                <th>Bàn</th>
                                <th>Ghi chú</th>
                                <th>Trạng thái</th>
                                <th>Nhân viên tạo</th>
                                <th style={{ width: 150 }}>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={15} className="text-center text-muted">
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            ) : (
                                data.map((booking, idx) => (
                                    <tr key={booking.id}>
                                        <td>
                                            {(currentPage - 1) * (paginate.perPage || ROWS_PER_PAGE) +
                                                idx +
                                                1}
                                        </td>
                                        <td>{booking.customer_name}</td>
                                        <td>{booking.customer_phone}</td>
                                        <td>{booking.customer_email}</td>
                                        <td>{booking.reservation_time}</td>
                                        <td>{booking.number_of_guests}</td>
                                        <td>{booking.table_id}</td>
                                        <td>{booking.notes}</td>
                                        <td>{getStatusBadge(booking.status)}</td>
                                        <td>{booking.user_id}</td>
                                        <td>
                                            <div className="btn-group" role="group">
                                                <Button
                                                    color="info"
                                                    size="sm"
                                                    onClick={() => openViewModal(booking)}
                                                    title="Xem chi tiết"
                                                >
                                                    <MdVisibility />
                                                </Button>
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                    onClick={() => openEditModal(booking)}
                                                    title="Chỉnh sửa"
                                                >
                                                    <MdModeEdit />
                                                </Button>
                                                <Button
                                                    color="success"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleStatusChange(booking.id, "confirmed")
                                                    }
                                                    title="Xác nhận"
                                                    disabled={booking.status === "confirmed"}
                                                >
                                                    <FaCheck />
                                                </Button>
                                                <Button
                                                    color="danger"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedItem(booking);
                                                        setShowDelete(true);
                                                    }}
                                                    title="Xóa"
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </CardBody>
                {totalPages > 1 && (
                    <CardBody className="d-flex justify-content-end">
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
                )}
            </Card>

            {/* Modal Xóa */}
            <Modal isOpen={showDelete} toggle={() => setShowDelete(false)}>
                <ModalHeader toggle={() => setShowDelete(false)}>
                    Xác nhận xóa
                </ModalHeader>
                <ModalBody>Bạn có chắc chắn muốn xóa đơn đặt bàn này không?</ModalBody>
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
            <Modal isOpen={showView} toggle={() => setShowView(false)} size="lg">
                <ModalHeader toggle={() => setShowView(false)}>
                    Chi tiết đơn đặt bàn
                </ModalHeader>
                <ModalBody>
                    {selectedItem && (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <p>
                                        <strong>Tên khách hàng:</strong>{" "}
                                        {selectedItem.customer_name}
                                    </p>
                                    <p>
                                        <strong>Số điện thoại:</strong> {selectedItem.customer_phone || selectedItem.phone_number}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {selectedItem.customer_email || selectedItem.email}
                                    </p>
                                </Col>
                                <Col md={6}>
                                    <p>
                                        <strong>Ngày đặt:</strong> {selectedItem.booking_date || selectedItem.reservation_date}
                                    </p>
                                    <p>
                                        <strong>Giờ đặt:</strong> {selectedItem.booking_time || selectedItem.reservation_time}
                                    </p>
                                    <p>
                                        <strong>Số khách:</strong> {selectedItem.number_of_guests}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <p>
                                        <strong>Trạng thái:</strong>{" "}
                                        {selectedItem.status}
                                    </p>
                                    <p>
                                        <strong>Ghi chú:</strong>{" "}
                                        {selectedItem.notes || selectedItem.special_requests || "Không có"}
                                    </p>
                                    <p>
                                        <strong>Ngày tạo:</strong> {selectedItem.created_at}
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setShowView(false)}>
                        Đóng
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ListReservation; 