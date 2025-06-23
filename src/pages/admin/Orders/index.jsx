import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    ButtonGroup,
    Button,
    Row,
    Col,
    Input,
    Offcanvas,
    OffcanvasHeader,
    OffcanvasBody,
    Form,
    FormGroup,
    Label,
    Badge,
    Spinner,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from "reactstrap";
import { MdSearch, MdFilterList, MdDelete, MdRestore, MdReceipt } from "react-icons/md";
import Breadcrumbs from "@components/admin/ui/Breadcrumb";
import OrderGrid from "@components/admin/Orders/grid-order";
import { 
    getListOrders, 
    createOrder,
    trackOrder,
} from "@services/admin/orderService";
import Swal from "sweetalert2";

// Danh sách trạng thái đơn hàng
const orderStatusOptions = [
    { label: "Tất cả", value: "all", badgeColor: "secondary" },
    { label: "Chờ xác nhận", value: "pending_confirmation", badgeColor: "warning" },
    { label: "Đã xác nhận", value: "confirmed", badgeColor: "info" },
    { label: "Đang chế biến", value: "preparing", badgeColor: "primary" },
    { label: "Sẵn sàng", value: "ready", badgeColor: "success" },
    { label: "Đã giao", value: "delivered", badgeColor: "success" },
    { label: "Đã hủy", value: "cancelled", badgeColor: "danger" },
    { label: "Hoàn thành", value: "completed", badgeColor: "info" },
];

// Component hiển thị các nút trạng thái để lọc
const OrderStatusFilter = ({ currentStatus, onChange }) => (
    <div className="mb-3 d-flex flex-wrap gap-2">
        {orderStatusOptions.map((option) => (
            <Button
                key={option.value}
                color={currentStatus === option.value ? option.badgeColor : "light"}
                outline={currentStatus !== option.value}
                onClick={() => onChange(option.value)}
                size="sm"
            >
                {option.label}
            </Button>
        ))}
    </div>
);

const OrderIndex = () => {
    const [orderData, setOrderData] = useState({ items: [], meta: {} });
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("1");
    const [view, setView] = useState("grid");
    const [showFilter, setShowFilter] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showTrack, setShowTrack] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [trackCode, setTrackCode] = useState("");
    const [trackResult, setTrackResult] = useState(null);

    const [createForm, setCreateForm] = useState({
        order_type: "dine-in",
        customer_name: "",
        customer_phone: "",
        customer_email: "",
        table_id: "",
        notes: "",
        items: [],
        delivery_address: "",
        delivery_contact_name: "",
        delivery_contact_phone: "",
    });

    // Lọc dữ liệu theo search và filter
    const filteredData = orderData.items.filter((order) => {
        const matchesSearch = order.customer?.full_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            order.customer?.phone_number?.includes(searchTerm) ||
            order.order_code?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const fetchOrders = async (page = 1) => {
        setLoading(true);
        try {
            const res = await getListOrders({ page });
            console.log("API SUCCESS:", res.data);
            setOrderData({
                items: res.data.data.items || res.data.items || res.data.data || [],
                meta: res.data.data.meta || res.data.meta || {},
            });
        } catch (error) {
            console.error("API ERROR:", error);
            Swal.fire({
                title: "Lỗi!",
                text: "Không thể tải danh sách đơn hàng",
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchMenuItems = async () => {
        try {
            // Implement fetch menu items API
            setMenuItems([
                { id: 1, name: "Phở bò", price: 50000 },
                { id: 2, name: "Cơm tấm", price: 35000 },
                { id: 3, name: "Bún chả", price: 40000 },
            ]);
        } catch (error) {
            console.error("API ERROR:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
        fetchMenuItems();
    }, []);

    const handleDelete = async (id) => {
        try {
            setOrderData((prev) => ({
                ...prev,
                items: prev.items.filter((order) => order.id !== id),
            }));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const handleCreate = async () => {
        try {
            if (!createForm.customer_name || !createForm.customer_phone) {
                Swal.fire({
                    title: "Lỗi!",
                    text: "Vui lòng điền đầy đủ thông tin bắt buộc (tên và số điện thoại)",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                return;
            }

            const payload = {
                order_type: createForm.order_type,
                customer_name: createForm.customer_name,
                customer_phone: createForm.customer_phone,
                customer_email: createForm.customer_email,
                notes: createForm.notes,
                items: createForm.items,
            };

            if (createForm.order_type === 'dine-in') {
                payload.table_id = createForm.table_id || null;
            } else if (createForm.order_type === 'delivery') {
                if (!createForm.delivery_address || !createForm.delivery_contact_name || !createForm.delivery_contact_phone) {
                    Swal.fire({
                        title: "Lỗi!",
                        text: "Vui lòng điền đầy đủ thông tin giao hàng",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                    return;
                }
                payload.delivery_address = createForm.delivery_address;
                payload.delivery_contact_name = createForm.delivery_contact_name;
                payload.delivery_contact_phone = createForm.delivery_contact_phone;
            }

            await createOrder(payload);
            Swal.fire({
                title: "Thành công!",
                text: "Đã tạo đơn hàng thành công",
                icon: "success",
                confirmButtonText: "OK",
            });
            setShowCreate(false);
            setCreateForm({
                order_type: "dine-in",
                customer_name: "",
                customer_phone: "",
                customer_email: "",
                table_id: "",
                notes: "",
                items: [],
                delivery_address: "",
                delivery_contact_name: "",
                delivery_contact_phone: "",
            });
            fetchOrders();
        } catch (error) {
            console.error("Error creating order:", error);
            Swal.fire({
                title: "Lỗi!",
                text: error.response?.data?.message || error.message || "Không thể tạo đơn hàng",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const handleTrackOrder = async () => {
        if (!trackCode.trim()) {
            Swal.fire({
                title: "Lỗi!",
                text: "Vui lòng nhập mã đơn hàng",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        try {
            const res = await trackOrder(trackCode);
            setTrackResult(res.data);
        } catch (error) {
            console.error("Track order error:", error);
            Swal.fire({
                title: "Lỗi!",
                text: "Không tìm thấy đơn hàng với mã này",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const handleUpdate = () => {
        fetchOrders();
    };

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    return (
        <div className="page-content">
            <Breadcrumbs
                title="Danh sách đơn hàng"
                breadcrumbItem="Quản lí đơn hàng"
            />

            {/* Tabs */}
            <Card className="mb-4">
                <CardHeader className="bg-white border-bottom-0">
                    <Row className="align-items-center">
                        <Col md="7" sm="12">
                            <Nav tabs className="border-0">
                                <NavItem>
                                    <NavLink
                                        className={`border-0 ${activeTab === "1" ? "active fw-bold" : "text-muted"}`}
                                        onClick={() => toggleTab("1")}
                                        style={{
                                            borderBottom: activeTab === "1" ? "3px solid #556ee6" : "none",
                                            padding: "12px 20px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Đơn hàng 
                                        <Badge color="primary" className="ms-2" pill>
                                            {orderData.items.length}
                                        </Badge>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={`border-0 ${activeTab === "2" ? "active fw-bold" : "text-muted"}`}
                                        onClick={() => toggleTab("2")}
                                        style={{
                                            borderBottom: activeTab === "2" ? "3px solid #556ee6" : "none",
                                            padding: "12px 20px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Theo dõi đơn hàng
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Col>
                        <Col md="5" sm="12" className="d-flex justify-content-md-end justify-content-start align-items-center gap-2">
                            <Button
                                color="success"
                                onClick={() => setShowCreate(true)}
                                className="d-flex align-items-center"
                                size="sm"
                            >
                                <MdReceipt className="me-1" />
                                Tạo đơn hàng
                            </Button>
                            <Button
                                color="info"
                                onClick={() => setShowTrack(true)}
                                className="d-flex align-items-center"
                                size="sm"
                            >
                                <MdSearch className="me-1" />
                                Theo dõi
                            </Button>
                            <ButtonGroup size="sm">
                                <Button
                                    color={view === "grid" ? "primary" : "light"}
                                    onClick={() => setView("grid")}
                                    title="Dạng card"
                                    className="d-flex align-items-center"
                                >
                                    <i className="mdi mdi-view-grid-outline"></i>
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </CardHeader>
            </Card>
            

            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    {/* Bộ lọc trạng thái và view switch */}
                    <Card className="mb-4">
                        <CardHeader className="bg-white border-bottom-0">
                            <Row className="align-items-center">
                                <Col
                                    md="7"
                                    sm="12"
                                    className="mb-2 mb-md-0 d-flex align-items-center"
                                >
                                    <div style={{ display: "flex" }}>
                                        {orderStatusOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                style={{
                                                    background: "none",
                                                    border: "none",
                                                    padding: "8px 24px",
                                                    fontWeight: 400,
                                                    color: "#333",
                                                    borderBottom: statusFilter === opt.value ? `3px solid #${opt.badgeColor}` : "3px solid transparent",
                                                    fontSize: 16,
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                                onClick={() => setStatusFilter(opt.value)}
                                            >
                                                {opt.label}
                                                <Badge
                                                    color={opt.badgeColor}
                                                    pill
                                                    className="ms-2"
                                                    style={{ fontSize: 13, minWidth: 28 }}
                                                >
                                                    {filteredData.filter(item =>
                                                        opt.value === "all" ? true : item.status === opt.value
                                                    ).length}
                                                </Badge>
                                            </button>
                                        ))}
                                    </div>
                                </Col>

                               
                            </Row>
                        </CardHeader>
                    </Card>

                    {/* Khối tìm kiếm và lọc nâng cao */}
                    <Card className="mb-4">
                        <CardBody>
                            <Row className="align-items-center">
                                <Col md={4}>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <MdSearch />
                                        </span>
                                        <Input
                                            type="text"
                                            placeholder="Tìm kiếm theo mã đơn hàng, tên, SĐT..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <MdFilterList />
                                        </span>
                                        <Input
                                            type="select"
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                        >
                                            <option value="all">Tất cả trạng thái</option>
                                            <option value="pending_confirmation">Chờ xác nhận</option>
                                            <option value="confirmed">Đã xác nhận</option>
                                            <option value="preparing">Đang chế biến</option>
                                            <option value="ready">Sẵn sàng</option>
                                            <option value="delivered">Đã giao</option>
                                            <option value="cancelled">Đã hủy</option>
                                            <option value="completed">Hoàn thành</option>
                                        </Input>
                                    </div>
                                </Col>
                                <Col md={5} className="d-flex justify-content-md-end justify-content-start">
                                    <Button
                                        color="light"
                                        className="border"
                                        style={{ minWidth: 140 }}
                                        onClick={() => setShowFilter(true)}
                                    >
                                        <i className="mdi mdi-filter-variant me-1"></i> Lọc nâng cao
                                    </Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                    {/* Danh sách đơn hàng */}
                    {loading ? (
                        <div className="text-center my-5">
                            <Spinner color="primary" />
                        </div>
                    ) : (
                        <OrderGrid
                            data={filteredData}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                            menuItems={menuItems}
                        />
                    )}
                </TabPane>

                <TabPane tabId="2">
                    {/* Theo dõi đơn hàng */}
                    <Card className="mb-4">
                        <CardHeader className="bg-white border-bottom-0">
                            <Row className="align-items-center">
                                <Col>
                                    <h5 className="mb-0 text-info">
                                        <MdSearch className="me-2" />
                                        Theo dõi đơn hàng
                                    </h5>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="trackCode">Mã đơn hàng</Label>
                                        <div className="input-group">
                                            <Input
                                                id="trackCode"
                                                placeholder="Nhập mã đơn hàng..."
                                                value={trackCode}
                                                onChange={(e) => setTrackCode(e.target.value)}
                                            />
                                            <Button color="primary" onClick={handleTrackOrder}>
                                                <MdSearch />
                                            </Button>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>

                            {trackResult && (
                                <Card className="mt-3">
                                    <CardBody>
                                        <h6>Kết quả theo dõi:</h6>
                                        <pre>{JSON.stringify(trackResult, null, 2)}</pre>
                                    </CardBody>
                                </Card>
                            )}
                        </CardBody>
                    </Card>
                </TabPane>
            </TabContent>

            {/* Offcanvas bộ lọc */}
            <Offcanvas
                direction="end"
                isOpen={showFilter}
                toggle={() => setShowFilter(false)}
            >
                <OffcanvasHeader toggle={() => setShowFilter(false)}>
                    Bộ lọc nâng cao
                </OffcanvasHeader>
                <OffcanvasBody>
                    <Form>
                        <FormGroup>
                            <Label for="filterCustomerName">Tên khách hàng</Label>
                            <Input
                                id="filterCustomerName"
                                placeholder="Nhập tên khách hàng..."
                                disabled
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="filterPhone">Số điện thoại</Label>
                            <Input
                                id="filterPhone"
                                placeholder="Nhập số điện thoại..."
                                disabled
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="filterDate">Ngày đặt</Label>
                            <Input
                                id="filterDate"
                                type="date"
                                disabled
                            />
                        </FormGroup>
                        <Button color="primary" className="mt-3" block disabled>
                            Áp dụng lọc
                        </Button>
                    </Form>
                </OffcanvasBody>
            </Offcanvas>

            {/* Modal Tạo đơn hàng */}
            <Modal isOpen={showCreate} toggle={() => setShowCreate(false)} size="lg">
                <ModalHeader toggle={() => setShowCreate(false)}>
                    Tạo đơn hàng mới
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="order_type">Loại đơn hàng *</Label>
                                    <Input
                                        id="order_type"
                                        type="select"
                                        value={createForm.order_type}
                                        onChange={e => setCreateForm({ ...createForm, order_type: e.target.value })}
                                        required
                                    >
                                        <option value="dine-in">Tại bàn</option>
                                        <option value="takeaway">Mang về</option>
                                        <option value="delivery">Giao hàng</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            {createForm.order_type === 'dine-in' && (
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="table_id">Bàn</Label>
                                        <Input
                                            id="table_id"
                                            type="select"
                                            value={createForm.table_id}
                                            onChange={e => setCreateForm({ ...createForm, table_id: e.target.value })}
                                        >
                                            <option value="">Chọn bàn</option>
                                            <option value="1">Bàn 1</option>
                                            <option value="2">Bàn 2</option>
                                            <option value="3">Bàn 3</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            )}
                        </Row>
                        <hr/>
                        <h6 className="mb-3">Thông tin khách hàng</h6>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="customer_name">Tên khách hàng *</Label>
                                    <Input
                                        id="customer_name"
                                        value={createForm.customer_name}
                                        onChange={e => setCreateForm({ ...createForm, customer_name: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="customer_phone">Số điện thoại *</Label>
                                    <Input
                                        id="customer_phone"
                                        value={createForm.customer_phone}
                                        onChange={e => setCreateForm({ ...createForm, customer_phone: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="customer_email">Email</Label>
                                    <Input
                                        id="customer_email"
                                        type="email"
                                        value={createForm.customer_email}
                                        onChange={e => setCreateForm({ ...createForm, customer_email: e.target.value })}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        
                        {createForm.order_type === 'delivery' && (
                            <>
                                <hr />
                                <h6 className="mb-3">Thông tin giao hàng</h6>
                                <FormGroup>
                                    <Label for="delivery_address">Địa chỉ giao hàng *</Label>
                                    <Input
                                        id="delivery_address"
                                        type="textarea"
                                        rows="2"
                                        value={createForm.delivery_address}
                                        onChange={e => setCreateForm({ ...createForm, delivery_address: e.target.value })}
                                        required
                                    />
                                </FormGroup>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="delivery_contact_name">Tên người nhận *</Label>
                                            <Input
                                                id="delivery_contact_name"
                                                value={createForm.delivery_contact_name}
                                                onChange={e => setCreateForm({ ...createForm, delivery_contact_name: e.target.value })}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="delivery_contact_phone">SĐT người nhận *</Label>
                                            <Input
                                                id="delivery_contact_phone"
                                                value={createForm.delivery_contact_phone}
                                                onChange={e => setCreateForm({ ...createForm, delivery_contact_phone: e.target.value })}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </>
                        )}

                        <hr />
                        <FormGroup>
                            <Label for="notes">Ghi chú</Label>
                            <Input
                                id="notes"
                                type="textarea"
                                value={createForm.notes}
                                onChange={e => setCreateForm({ ...createForm, notes: e.target.value })}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setShowCreate(false)}>
                        Hủy
                    </Button>
                    <Button
                        color="primary"
                        onClick={handleCreate}
                    >
                        Tạo đơn hàng
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Modal Theo dõi đơn hàng */}
            <Modal isOpen={showTrack} toggle={() => setShowTrack(false)}>
                <ModalHeader toggle={() => setShowTrack(false)}>
                    Theo dõi đơn hàng
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="trackCodeModal">Mã đơn hàng</Label>
                        <div className="input-group">
                            <Input
                                id="trackCodeModal"
                                placeholder="Nhập mã đơn hàng..."
                                value={trackCode}
                                onChange={(e) => setTrackCode(e.target.value)}
                            />
                            <Button color="primary" onClick={handleTrackOrder}>
                                <MdSearch />
                            </Button>
                        </div>
                    </FormGroup>

                    {trackResult && (
                        <div className="mt-3">
                            <h6>Kết quả theo dõi:</h6>
                            <pre>{JSON.stringify(trackResult, null, 2)}</pre>
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setShowTrack(false)}>
                        Đóng
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default OrderIndex; 