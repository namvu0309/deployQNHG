import React, { useEffect, useState } from "react";
import { Row, Col, Spinner, Button, Offcanvas, OffcanvasHeader, OffcanvasBody, Form, FormGroup, Label, Input, Card, CardHeader, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Badge } from "reactstrap";
import KanbanColumn from "@components/admin/KitchenOrders/KanbanColumn";
import FilterBar from "@components/admin/KitchenOrders/FilterBar";
import { getListKitchenOrders, updateKitchenOrderStatus, cancelKitchenOrder } from "@services/admin/kitchenOrderService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Breadcrumbs from "@components/admin/ui/Breadcrumb";
import '@pages/admin/KitchenOrders/KitchenOrdersKanban.css';
import KanbanCard from "@components/admin/KitchenOrders/KanbanCard";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const STATUS_LIST = [
    { key: "pending", label: "Pending", badgeColor: "warning" },
    { key: "preparing", label: "In Progress", badgeColor: "info" },
    { key: "ready", label: "Completed", badgeColor: "success" },
    { key: "cancelled", label: "Cancelled", badgeColor: "danger" },
];

const KitchenOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [showFilter, setShowFilter] = useState(false);
    const [activeTab, setActiveTab] = useState("1");
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const fetchOrders = async (page = 1, filterParams = filter) => {
        setLoading(true);
        try {
            const params = { ...filterParams, page, per_page: 10 };
            const res = await getListKitchenOrders(params);
            const items = (res.data.data && Array.isArray(res.data.data.items)) ? res.data.data.items : [];
            setOrders(items);
            setCurrentPage(res.data.data?.meta?.page || 1);
            setTotalPage(res.data.data?.meta?.totalPage || 1);
        } catch {
            setOrders([]);
            toast.error("Không thể tải danh sách đơn bếp!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(1, filter);
        // eslint-disable-next-line
    }, []);

    // Filter trạng thái badge
    const handleStatusBadge = (status) => {
        setStatusFilter(status);
        setFilter(f => ({ ...f, status: status === "all" ? "" : status }));
        fetchOrders(1, { ...filter, status: status === "all" ? "" : status });
    };

    // Filter nhanh
    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };
    const handleSearch = () => {
        fetchOrders(1, filter);
    };

    // Chuyển trạng thái đơn bếp
    const handleChangeStatus = async (orderId, newStatus) => {
        try {
            await updateKitchenOrderStatus(orderId, { status: newStatus });
            toast.success("Cập nhật trạng thái thành công!");
            fetchOrders(currentPage, filter);
        } catch {
            toast.error("Cập nhật trạng thái thất bại!");
        }
    };

    // Hủy đơn bếp
    const handleCancel = async (orderId) => {
        const result = await Swal.fire({
            title: "Bạn chắc chắn muốn hủy đơn này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Hủy đơn",
            cancelButtonText: "Đóng"
        });
        if (result.isConfirmed) {
            try {
                const res = await cancelKitchenOrder(orderId);
                // Nếu API trả về message lỗi, hiển thị message đó
                if (res?.data?.message && res?.data?.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success("Đã hủy đơn bếp!");
                    fetchOrders(currentPage, filter);
                }
            } catch (err) {
                // Nếu có response từ backend, lấy message
                const msg = err?.response?.data?.message || "Hủy đơn thất bại!";
                toast.error(msg);
            }
        }
    };

    // Phân trang
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPage) {
            setCurrentPage(page);
            fetchOrders(page, filter);
        }
    };

    // Đếm số lượng theo trạng thái
    const countByStatus = (status) =>
        status === "all" ? orders.length : orders.filter((o) => o.status === status).length;

    // Filter theo searchTerm và statusFilter
    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            String(order.order_id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(order.table_number || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(order.item_name || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Xử lý kéo thả card giữa các cột
    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;
        // Tìm order bị kéo
        const draggedOrder = orders.find(o => String(o.id) === draggableId);
        if (!draggedOrder) return;
        // Nếu trạng thái thay đổi thì cập nhật
        if (draggedOrder.status !== destination.droppableId) {
            await handleChangeStatus(draggedOrder.id, destination.droppableId);
        }
    };

    // Component hiển thị card đơn bếp
    const OrderCard = ({ order }) => {
        const nextStatus = order.status === "pending" ? "preparing" : order.status === "preparing" ? "ready" : null;
        const statusInfo = STATUS_LIST.find(s => s.key === order.status);
        
        return (
            <Card className="mb-3 shadow-sm" style={{ minWidth: 280 }}>
                <CardBody className="p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold text-primary">#{order.order_id || order.id}</span>
                        <Badge color={statusInfo?.badgeColor || "secondary"}>{statusInfo?.label || order.status}</Badge>
                    </div>
                    <div className="mb-2">
                        <strong>Bàn:</strong> {order.table_number || "-"}
                        {order.is_priority && <Badge color="danger" className="ms-2">Ưu tiên</Badge>}
                    </div>
                    <div className="mb-2">
                        <strong>Món:</strong> {order.item_name}
                        <Badge color="light" className="text-dark ms-1">x{order.quantity}</Badge>
                    </div>
                    {order.notes && (
                        <div className="mb-2 text-muted">
                            <i className="mdi mdi-note-text me-1"></i>
                            {order.notes}
                        </div>
                    )}
                    <div className="mb-3 text-secondary" style={{ fontSize: 12 }}>
                        <i className="mdi mdi-clock me-1"></i>
                        {order.created_at ? new Date(order.created_at).toLocaleString('vi-VN') : "-"}
                    </div>
                    <div className="d-flex gap-2">
                        {nextStatus && (
                            <Button 
                                color="primary" 
                                size="sm" 
                                onClick={() => handleChangeStatus(order.id, nextStatus)}
                            >
                                <i className="mdi mdi-arrow-right me-1"></i>
                                Chuyển trạng thái
                            </Button>
                        )}
                        {order.status !== "cancelled" && (
                            <Button 
                                color="outline-danger" 
                                size="sm" 
                                onClick={() => handleCancel(order.id)}
                            >
                                <i className="mdi mdi-close me-1"></i>
                                Hủy đơn
                            </Button>
                        )}
                    </div>
                </CardBody>
            </Card>
        );
    };

    return (
        <div className="page-content">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            <Breadcrumbs title="Danh sách đơn bếp" breadcrumbItem="Quản lí đơn bếp" />
            {/* Tabs */}
            <Card className="mb-4">
                <CardHeader className="bg-white border-bottom-0">
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={activeTab === "1" ? "active" : ""} onClick={() => setActiveTab("1")}>Đơn bếp ({orders.length})</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={activeTab === "2" ? "active" : ""} onClick={() => setActiveTab("2")}>Thùng rác (0)</NavLink>
                        </NavItem>
                    </Nav>
                </CardHeader>
            </Card>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    {/* Bộ lọc trạng thái badge */}
                    <Card className="mb-4">
                        <CardHeader className="bg-white border-bottom-0">
                            <div className="d-flex flex-wrap gap-2">
                                <Button color={statusFilter === "all" ? "secondary" : "light"} outline={statusFilter !== "all"} onClick={() => handleStatusBadge("all")} size="sm">
                                    Tất cả <Badge color="secondary" pill className="ms-2">{countByStatus("all")}</Badge>
                                </Button>
                                {STATUS_LIST.map((opt) => (
                                    <Button
                                        key={opt.key}
                                        color={statusFilter === opt.key ? opt.badgeColor : "light"}
                                        outline={statusFilter !== opt.key}
                                        className={statusFilter !== opt.key ? "text-dark border" : ""}
                                        style={statusFilter !== opt.key ? { opacity: 0.95, fontWeight: 500 } : {}}
                                        onClick={() => handleStatusBadge(opt.key)}
                                        size="sm"
                                    >
                                        {opt.label} <Badge color={opt.badgeColor} pill className="ms-2">{countByStatus(opt.key)}</Badge>
                                    </Button>
                                ))}
                            </div>
                        </CardHeader>
                    </Card>
                    {/* Filter nhanh và nâng cao */}
                    <Card className="mb-4">
                        <CardBody>
                            <Row className="align-items-center">
                                <Col md={4}>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="mdi mdi-magnify"></i></span>
                                        <Input type="text" placeholder="Tìm kiếm theo mã đơn, bàn, món..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="mdi mdi-filter-variant"></i></span>
                                        <Input type="select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                            <option value="all">Tất cả trạng thái</option>
                                            <option value="pending">Pending</option>
                                            <option value="preparing">In Progress</option>
                                            <option value="ready">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </Input>
                                    </div>
                                </Col>
                                <Col md={5} className="d-flex justify-content-md-end justify-content-start">
                                    <Button color="light" className="border" style={{ minWidth: 140 }} onClick={() => setShowFilter(true)}>
                                        <i className="mdi mdi-filter-variant me-1"></i> Lọc nâng cao
                                    </Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    
                    {/* Kanban board dạng hàng ngang với kéo thả */}
                    <DragDropContext onDragEnd={onDragEnd}>
                        {STATUS_LIST.filter(s => s.key !== undefined).map((status) => (
                            <div key={status.key} className="kanban-swimlane-row mb-4">
                                <div className="d-flex align-items-center mb-2">
                                    <h5 className="mb-0 me-2">{status.label}</h5>
                                    <Badge color={status.badgeColor} pill>{filteredOrders.filter((o) => o.status === status.key).length}</Badge>
                                </div>
                                <Droppable droppableId={status.key} direction="horizontal">
                                    {(provided) => (
                                        <div
                                            className="kanban-swimlane-cards d-flex flex-row gap-3 overflow-auto pb-2"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {filteredOrders.filter((o) => o.status === status.key).length === 0 ? (
                                                <div className="text-muted">Không có đơn nào</div>
                                            ) : (
                                                filteredOrders.filter((o) => o.status === status.key).map((order, idx) => (
                                                    <KanbanCard
                                                        key={order.id}
                                                        order={order}
                                                        index={idx}
                                                        onChangeStatus={handleChangeStatus}
                                                        onCancel={handleCancel}
                                                        status={status.key}
                                                    />
                                                ))
                                            )}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ))}
                    </DragDropContext>
                    
                    {/* Pagination */}
                    <div className="d-flex justify-content-center mt-4">
                        <Button 
                            color="light" 
                            disabled={currentPage === 1} 
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="me-2"
                        >
                            <i className="mdi mdi-chevron-left"></i> Trước
                        </Button>
                        <span className="mx-3 d-flex align-items-center">
                            Trang {currentPage} / {totalPage}
                        </span>
                        <Button 
                            color="light" 
                            disabled={currentPage === totalPage} 
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="ms-2"
                        >
                            Sau <i className="mdi mdi-chevron-right"></i>
                        </Button>
                    </div>
                    {loading && (
                        <div className="text-center py-4">
                            <Spinner color="primary" />
                            <p className="mt-2">Đang tải dữ liệu...</p>
                        </div>
                    )}
                </TabPane>
                <TabPane tabId="2">
                    {/* Thùng rác - có thể phát triển thêm logic xóa mềm */}
                    <div className="text-center text-muted py-5">
                        <i className="mdi mdi-delete-outline" style={{ fontSize: 64 }}></i>
                        <h5 className="mt-3">Chức năng thùng rác</h5>
                        <p>Chức năng thùng rác sẽ phát triển sau.</p>
                    </div>
                </TabPane>
            </TabContent>
            {/* Offcanvas bộ lọc nâng cao */}
            <Offcanvas direction="end" isOpen={showFilter} toggle={() => setShowFilter(false)}>
                <OffcanvasHeader toggle={() => setShowFilter(false)}>
                    Bộ lọc nâng cao
                </OffcanvasHeader>
                <OffcanvasBody>
                    <Form>
                        <FormGroup>
                            <Label for="filterOrderId">Mã đơn</Label>
                            <Input id="filterOrderId" name="order_id" value={filter.order_id || ""} onChange={handleFilterChange} placeholder="Nhập mã đơn..." />
                        </FormGroup>
                        <FormGroup>
                            <Label for="filterTable">Bàn</Label>
                            <Input id="filterTable" name="table_number" value={filter.table_number || ""} onChange={handleFilterChange} placeholder="Nhập số bàn..." />
                        </FormGroup>
                        <FormGroup>
                            <Label for="filterItem">Món ăn</Label>
                            <Input id="filterItem" name="item_name" value={filter.item_name || ""} onChange={handleFilterChange} placeholder="Nhập tên món..." />
                        </FormGroup>
                        <FormGroup>
                            <Label for="filterStatus">Trạng thái</Label>
                            <Input id="filterStatus" type="select" name="status" value={filter.status || ""} onChange={handleFilterChange}>
                                <option value="">Tất cả</option>
                                <option value="pending">Pending</option>
                                <option value="preparing">In Progress</option>
                                <option value="ready">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="filterPriority">Ưu tiên</Label>
                            <Input id="filterPriority" type="select" name="is_priority" value={filter.is_priority || ""} onChange={handleFilterChange}>
                                <option value="">Tất cả</option>
                                <option value="1">Ưu tiên</option>
                                <option value="0">Thường</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="filterCreatedAt">Ngày tạo</Label>
                            <Input id="filterCreatedAt" type="date" name="created_at" value={filter.created_at || ""} onChange={handleFilterChange} />
                        </FormGroup>
                        <Button color="primary" className="mt-3" block onClick={handleSearch}>
                            <i className="mdi mdi-filter-check me-1"></i>
                            Áp dụng lọc
                        </Button>
                    </Form>
                </OffcanvasBody>
            </Offcanvas>
        </div>
    );
};

export default KitchenOrdersPage; 