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
    Row,
    Col,
    Button,
    Alert,
    Badge,
} from "reactstrap";
import { toast } from "react-toastify";
import { MdPrint } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import OrderCard from "./card-order";
import PrintableReceipt from "./printable-receipt";
import {
    updateOrder,
} from "@services/admin/orderService";
import "./grid-order.css";
import OrderDetailModal from "./OrderDetailModal";

const OrderGrid = ({
    paginate = {},
    data = [],
    onDelete,
    onPageChange,
    onUpdate,
    onEdit,
}) => {
    const [showDelete, setShowDelete] = useState(false);
    const [showView, setShowView] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [printableOrder, setPrintableOrder] = useState(null);

    const currentPage = paginate.page || 1;
    const totalPages = paginate.totalPage || 1;

    const handleDelete = async () => {
        try {
            // Implement delete order logic
            toast.success("Đã xóa đơn hàng thành công");
            if (onDelete) onDelete(selectedItem.id);
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Không thể xóa đơn hàng");
        }
        setShowDelete(false);
        setSelectedItem(null);
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const payload = {
                status: newStatus,
            };

            await updateOrder(id, payload);
            toast.success("Đã cập nhật trạng thái thành công");
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Không thể cập nhật trạng thái");
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages && onPageChange) {
            onPageChange(page);
        }
    };

    const handlePrint = (order) => {
        setPrintableOrder(order);
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
            <PrintableReceipt order={printableOrder} onPrinted={() => setPrintableOrder(null)} />

            {/* Grid Layout */}
            <div className="order-grid">
                {data.length === 0 ? (
                    <Alert color="info" className="text-center">
                        Không có đơn hàng nào
                    </Alert>
                ) : (
                    <Row className="g-4">
                        {data.map((order) => (
                            <Col key={order.id} xs={12} sm={6} md={4} lg={3} xl={3}>
                                <OrderCard
                                    order={order}
                                    onEdit={() => onEdit(order)}
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
                    Bạn có chắc chắn muốn xóa đơn hàng{" "}
                    <strong>#{selectedItem?.order_code || selectedItem?.id}</strong> không?
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
             <OrderDetailModal
               isOpen={showView}
               toggle={() => setShowView(false)}
               order={selectedItem}
               onPrint={handlePrint}
             />
        </>
    );
};

export default OrderGrid; 