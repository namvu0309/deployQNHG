import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Label,
  Spinner,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { getDishes } from "@services/admin/dishService";
import "./FormOrder.scss";
import { FaEdit } from "react-icons/fa";
import { getTables } from "@services/admin/tableService";
import { getTableAreas } from "@services/admin/tableAreaService";
import { createOrder } from "@services/admin/orderService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import OrderItemsModal from "./OrderItemsModal";
import dishDefaultImg from "@assets/admin/images/dish/dish-default.webp";
import { formatPriceToVND } from "@helpers/formatPriceToVND";
import Breadcrumbs from "@components/admin/ui/Breadcrumb";

const FormOrderCreate = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [orderNotes, setOrderNotes] = useState("");
  const [orderMethod, setOrderMethod] = useState("Dine In");
  const [selectedTables, setSelectedTables] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [meta, setMeta] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1,
  });
  const fullUrl = `http://localhost:8000/storage/`;

  const [currentPage, setCurrentPage] = useState(1);
  const [loadingDishes, setLoadingDishes] = useState(true);
  const [showTableModal, setShowTableModal] = useState(false);
  const [editNote, setEditNote] = useState(false);
  const [tempNote, setTempNote] = useState(orderNotes);
  const [tableList, setTableList] = useState([]);
  const [loadingTables, setLoadingTables] = useState(false);
  const [tableAreas, setTableAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [showItemsModal, setShowItemsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDishes(currentPage);
  }, [currentPage, search, categoryFilter]);

  const fetchDishes = async (page = 1) => {
    setLoadingDishes(true);
    try {
      const params = {
        page,
        per_page: 10,
        search: search || undefined,
        category_id: categoryFilter || undefined,
      };

      const res = await getDishes(params);
      const items = res.data?.data?.items;
      if (Array.isArray(items)) {
        setDishes(items);
        setMeta({
          current_page: res.data.data.meta.page || 1,
          per_page: res.data.data.meta.perPage || 10,
          total: res.data.data.meta.total || 0,
          last_page: res.data.data.meta.totalPage || 1,
        });
        setCurrentPage(res.data.data.meta.page || 1);
      } else {
        setDishes([]);
        setMeta({
          current_page: 1,
          per_page: 10,
          total: 0,
          last_page: 1,
        });
        toast.error("Cấu trúc dữ liệu API không đúng!");
      }
    } catch (error) {
      console.error("Error fetching dishes:", error.response || error);
      setDishes([]);
      setMeta({
        current_page: 1,
        per_page: 10,
        total: 0,
        last_page: 1,
      });
      toast.error("Lỗi khi tải danh sách món ăn!");
    } finally {
      setLoadingDishes(false);
    }
  };

  const addToOrder = (dish) => {
    setOrderItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === dish.id);
      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += 1;
        return updatedItems;
      } else {
        return [
          ...prevItems,
          {
            ...dish,
            quantity: 1,
            price: dish.selling_price ?? dish.price ?? 0,
          },
        ];
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    setOrderItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.id !== id);
      }
      return prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
    fetchDishes(1);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1);
    fetchDishes(1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= meta.last_page) {
      setCurrentPage(pageNumber);
    }
  };

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const vat = subtotal * 0.1; // 10% VAT
  const total = subtotal + vat;

  const handleEditTables = () => {
    setShowTableModal(true);
    setLoadingTables(true);
    getTableAreas()
      .then((res) => {
        const areas = (res.data?.data?.items || []).filter(
          (area) => area.status === "active"
        );
        setTableAreas(areas);
        setSelectedArea(areas[0]?.id || null);
      })
      .catch(() => {
        setTableAreas([]);
        toast.error("Lỗi khi tải danh sách khu vực bàn!");
      })
      .finally(() => setLoadingTables(false));
  };

  const handleCloseTableModal = () => setShowTableModal(false);

  const handleTableToggle = (tableId) => {
    setSelectedTables((prev) =>
      prev.includes(tableId)
        ? prev.filter((id) => id !== tableId)
        : [...prev, tableId]
    );
  };

  useEffect(() => {
    if (showTableModal && selectedArea) {
      setLoadingTables(true);
      getTables({ status: "available", table_area_id: selectedArea })
        .then((res) => {
          setTableList(res.data?.data?.items || []);
        })
        .catch(() => {
          setTableList([]);
          toast.error("Lỗi khi tải danh sách bàn!");
        })
        .finally(() => setLoadingTables(false));
    }
  }, [showTableModal, selectedArea]);

  const getOrderType = (method) => {
    if (method === "Dine In") return "dine-in";
    if (method === "Takeaway") return "takeaway";
    if (method === "Delivery") return "delivery";
    return "dine-in";
  };

  const handleCreateOrder = async () => {
    const payload = {
      order_type: getOrderType(orderMethod),
      tables:
        orderMethod === "Dine In"
          ? selectedTables.map((id) => ({ table_id: Number(id) }))
          : [],
      reservation_id: null,
      customer_id: null,
      notes: orderNotes || "",
      delivery_address: orderMethod === "Delivery" ? deliveryAddress || "" : "",
      contact_name: contactName || "",
      contact_email: contactEmail || "",
      contact_phone: contactPhone || "",
      items: orderItems.map((item) => ({
        dish_id: Number(item.id),
        quantity: Number(item.quantity),
        unit_price: Number(item.price),
      })),
    };

    console.log("Payload gửi lên:", payload);

    try {
      await createOrder(payload);
      toast.success("Tạo đơn hàng thành công!", {
        autoClose: 2000, // Toast hiển thị trong 2 giây
        onClose: () => {
          navigate("/orders/list"); // Chuyển hướng sau khi toast đóng
        },
      });
    } catch (error) {
      console.error("Error creating order:", error.response || error);
      const apiErrors = error.response?.data?.errors;
      if (apiErrors) {
        const errorMessages = Object.values(apiErrors)
          .map((e) => (Array.isArray(e) ? e.join(", ") : e))
          .join("; ");
        toast.error(errorMessages || "Lỗi khi tạo đơn hàng!");
      } else {
        toast.error(error.response?.data?.message || "Lỗi khi tạo đơn hàng!");
      }
    }
  };

  return (
    <div className="page-content">
      <ToastContainer />
      <div className="mb-3">
        <Breadcrumbs title="Quản lý đơn hàng" breadcrumbItem="Tạo đơn hàng mới" />
      </div>
      <Row>
        {/* Product Catalog */}
        <Col md={8}>
          {/* Search & Category Filter */}
          <Row className="align-items-center g-2 mb-3">
            <Col md={8} sm={12}>
              <div className="input-group">
                <span className="input-group-text">Search</span>
                <Input
                  type="search"
                  placeholder="Tìm kiếm món ăn..."
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
            </Col>
            <Col md={4} sm={12}>
              <Input
                type="select"
                value={categoryFilter}
                onChange={handleCategoryFilterChange}
              >
                <option value="">Tất cả danh mục</option>
                {/* Note: Category options would need to be fetched separately */}
              </Input>
            </Col>
          </Row>

          <Row>
            {loadingDishes ? (
              <div className="text-center my-5">
                <Spinner color="primary" />
              </div>
            ) : (
              dishes.map((dish) => (
                <Col md={4} key={dish.id} className="mb-3">
                  <Card className="menu-card d-flex flex-row align-items-stretch shadow-sm border-0">
                    <div className="menu-card-img-block">
                      <img
                        src={dish.image_url ? `${fullUrl}${dish.image_url}` : dishDefaultImg}
                        alt={dish.name}
                        className="menu-card-img"
                      />
                    </div>
                    <CardBody className="d-flex flex-column justify-content-center py-2 px-3">
                      <div className="menu-card-title mb-1">
                        {dish.name || "Unnamed Dish"}
                      </div>
                      <div className="menu-card-price mb-2">
                        {formatPriceToVND(dish.selling_price || 0)}
                      </div>
                      <Button
                        color="light"
                        size="sm"
                        className="border menu-card-btn"
                        onClick={() => addToOrder(dish)}
                      >
                        <span className="fw-bold">+</span> Thêm
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              ))
            )}
          </Row>
          {/* Pagination */}
          <div className="d-flex justify-content-center mt-3">
            <Pagination>
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink
                  previous
                  onClick={() => handlePageChange(currentPage - 1)}
                />
              </PaginationItem>
              {Array.from({ length: meta.last_page }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page} active={page === currentPage}>
                    <PaginationLink onClick={() => handlePageChange(page)}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem disabled={currentPage === meta.last_page}>
                <PaginationLink
                  next
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </PaginationItem>
            </Pagination>
          </div>
        </Col>

        {/* Order Summary */}
        <Col md={4} className="order-sidebar">
          <div className="order-sidebar-inner">
            <div className="order-sidebar-header mb-3">
              <div className="order-sidebar-title d-flex align-items-center">
                Tạo đơn hàng mới
                <Button color="link" size="sm" className="ms-2 p-0" onClick={() => setShowItemsModal(true)} title="Xem danh sách món ăn">
                  <FaEdit size={20} />
                </Button>
              </div>
            </div>
            {/* Existing Items */}
            <div className="order-sidebar-list order-sidebar-list-scroll mb-3">
              {orderItems.length === 0 ? (
                <div className="text-muted text-center py-4 small">
                  Chưa có món nào trong đơn hàng.
                </div>
              ) : (
                orderItems.map((item) => (
                  <div
                    className="order-item-box d-flex align-items-start justify-content-between mb-3"
                    key={item.id}
                  >
                    <div style={{ flex: 1 }}>
                      <div className="mb-1">
                        <span className="order-item-title">{item.name}</span>
                      </div>
                      <div className="d-flex align-items-center mt-2">
                        <Button
                          color="light"
                          size="sm"
                          className="border px-2 py-0 order-item-qty-btn"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </Button>
                        <span className="mx-2 order-item-qty">
                          {item.quantity}
                        </span>
                        <Button
                          color="light"
                          size="sm"
                          className="border px-2 py-0 order-item-qty-btn"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="order-item-price fw-bold ms-3 mt-1">
                      {formatPriceToVND(item.price * item.quantity)}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="order-sidebar-section">
              {/* Order Note */}
              <div
                className="order-note-area px-3 py-2 mb-2"
                style={{
                  background: "#f7f8fa",
                  borderRadius: 10,
                  borderBottom: "1px solid #ececec",
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <div className="order-sidebar-label">Ghi chú đơn hàng</div>
                  <Button
                    color="link"
                    size="sm"
                    className="p-0 ms-2"
                    style={{ color: "#222" }}
                    onClick={() => setEditNote(!editNote)}
                    title="Edit note"
                  >
                    <FaEdit size={18} />
                  </Button>
                </div>
                {editNote ? (
                  <Input
                    type="textarea"
                    value={tempNote}
                    onChange={(e) => setTempNote(e.target.value)}
                    rows={2}
                    className="order-sidebar-input"
                    onBlur={() => {
                      setOrderNotes(tempNote);
                      setEditNote(false);
                    }}
                    autoFocus
                  />
                ) : (
                  <div className="text-muted small">
                    {orderNotes ? orderNotes : "Chưa có ghi chú"}
                  </div>
                )}
              </div>

              {/* Order Method */}
              <div
                className="order-method-row px-3 py-2 mb-2"
                style={{
                  background: "#f7f8fa",
                  borderRadius: 10,
                  borderBottom: "1px solid #ececec",
                }}
              >
                <Label className="order-sidebar-label mb-1">Hình thức đơn hàng</Label>
                <Input
                  type="select"
                  value={orderMethod}
                  onChange={(e) => setOrderMethod(e.target.value)}
                  className="order-method-select"
                  style={{ width: "100%" }}
                >
                  <option value="Dine In">Ăn tại chỗ</option>
                  <option value="Takeaway">Mang đi</option>
                  <option value="Delivery">Giao hàng</option>
                </Input>
              </div>

              {/* Delivery/Contact Info */}
              {orderMethod === "Delivery" && (
                <div
                  className="delivery-info px-3 py-2 mb-2"
                  style={{
                    background: "#f7f8fa",
                    borderRadius: 10,
                    borderBottom: "1px solid #ececec",
                  }}
                >
                  <Label className="order-sidebar-label mb-1">Thông tin giao hàng</Label>
                  <Input
                    type="text"
                    placeholder="Địa chỉ giao hàng"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="mb-2"
                  />
                  <Input
                    type="text"
                    placeholder="Tên người nhận"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="mb-2"
                  />
                  <Input
                    type="email"
                    placeholder="Email liên hệ"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="mb-2"
                  />
                  <Input
                    type="tel"
                    placeholder="Số điện thoại liên hệ"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                  />
                </div>
              )}

              {/* Selected Tables */}
              {orderMethod === "Dine In" && (
                <div
                  className="order-table-box d-flex align-items-center justify-content-between px-3 py-2 mb-2"
                  style={{
                    background: "#fff",
                    borderRadius: 10,
                    borderBottom: "1px solid #ececec",
                  }}
                >
                  <span>
                    {selectedTables.length > 0 ? (
                      selectedTables
                        .map((id) => {
                          const found = tableList.find((t) => String(t.id) === String(id));
                          return found ? `Bàn ${found.table_number}` : `Bàn ${id}`;
                        })
                        .join(", ")
                    ) : (
                      <span className="text-muted">Chưa chọn bàn nào</span>
                    )}
                  </span>
                  <Button
                    color="link"
                    size="sm"
                    style={{ color: "#222" }}
                    onClick={handleEditTables}
                    className="p-0 ms-2"
                    title="Edit tables"
                  >
                    <FaEdit size={18} />
                  </Button>
                  {/* Modal chọn bàn */}
                  <Modal
                    isOpen={showTableModal}
                    toggle={handleCloseTableModal}
                    size="lg"
                  >
                    <ModalHeader toggle={handleCloseTableModal}>
                      Chọn bàn
                    </ModalHeader>
                    <ModalBody>
                      <div
                        className="table-area-carousel d-flex align-items-center mb-3"
                        style={{ overflowX: "auto" }}
                      >
                        {tableAreas.map((area) => (
                          <div
                            key={area.id}
                            className={`table-area-item px-3 py-2 me-2 rounded ${
                              selectedArea === area.id ? "active" : ""
                            }`}
                            style={{
                              background:
                                selectedArea === area.id
                                  ? "#556ee6"
                                  : "#f4f4f6",
                              color: selectedArea === area.id ? "#fff" : "#222",
                              cursor: "pointer",
                              minWidth: 120,
                              textAlign: "center",
                              fontWeight: 500,
                              border:
                                selectedArea === area.id
                                  ? "2px solid #556ee6"
                                  : "2px solid transparent",
                              transition: "all 0.2s",
                            }}
                            onClick={() => setSelectedArea(area.id)}
                          >
                            {area.name}
                          </div>
                        ))}
                      </div>
                      <div
                        className="table-modal-list"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "flex-start",
                          gap: "16px",
                          minHeight: "200px",
                          padding: "8px 0",
                        }}
                      >
                        {tableList.length === 0 && !loadingTables && (
                          <div className="text-muted text-center w-100">
                            Không có bàn nào khả dụng.
                          </div>
                        )}
                        {tableList.map((table) => (
                          <div
                            key={table.id}
                            className={`table-card ${
                              selectedTables.includes(String(table.id))
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => handleTableToggle(String(table.id))}
                          >
                            <div className="table-card-inner">
                              <div
                                className="table-status-badge"
                                style={{
                                  background:
                                    table.status === "available"
                                      ? "linear-gradient(135deg, #4ade80, #22c55e)"
                                      : table.status === "occupied"
                                      ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                                      : "linear-gradient(135deg, #e5e7eb, #d1d5db)",
                                  color:
                                    table.status === "available"
                                      ? "#065f46"
                                      : table.status === "occupied"
                                      ? "#92400e"
                                      : "#6b7280",
                                }}
                              >
                                {table.status === "available"
                                  ? "Trống"
                                  : table.status === "occupied"
                                  ? "Đang dùng"
                                  : table.status}
                              </div>
                              <div className="table-number">
                                Bàn {table.table_number}
                              </div>
                              <div className="table-info">
                                <div className="table-info-item">
                                  <span className="table-info-label">
                                    Khu vực:
                                  </span>
                                  <span className="table-info-value">
                                    {table.table_area?.name || "N/A"}
                                  </span>
                                </div>
                                <div className="table-info-item">
                                  <span className="table-info-label">
                                    Sức chứa:
                                  </span>
                                  <span className="table-info-value">
                                    {table.capacity || "N/A"} người
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {loadingTables && (
                          <div className="text-center w-100 py-4">
                            <Spinner color="primary" />
                          </div>
                        )}
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={handleCloseTableModal}>
                        Xác nhận
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              )}
            </div>

            <div className="order-sidebar-totals mb-3">
              <div className="d-flex justify-content-between mb-1" style={{fontSize: '1.1rem', fontWeight: 500}}>
                <span>Tạm tính</span>
                <span>{formatPriceToVND(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-1" style={{fontSize: '1.1rem', fontWeight: 500}}>
                <span>VAT</span>
                <span>{formatPriceToVND(vat)}</span>
              </div>
              <div className="d-flex justify-content-between" style={{fontSize: '1.25rem', fontWeight: 700}}>
                <span>Tổng cộng</span>
                <span>{formatPriceToVND(total)}</span>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={handleCreateOrder}
              >
                Lưu lại
              </button>
              <button
                type="button"
                className="btn btn-danger w-100"
                onClick={() => setShowPaymentModal(true)}
              >
                Lưu & Thanh toán
              </button>
            </div>
            <Modal isOpen={showPaymentModal} toggle={() => setShowPaymentModal(false)}>
              <ModalHeader toggle={() => setShowPaymentModal(false)}>Chọn phương thức thanh toán</ModalHeader>
              <ModalBody>
                <div className="d-flex flex-column gap-3">
                  <Button color="primary" onClick={() => { setShowPaymentModal(false); handleCreateOrder(/* paymentMethod: 'cash' */); }}>Tiền mặt</Button>
                  <Button color="info" onClick={() => { setShowPaymentModal(false); handleCreateOrder(/* paymentMethod: 'bank' */); }}>Chuyển khoản</Button>
                  <Button color="secondary" onClick={() => setShowPaymentModal(false)}>Hủy</Button>
                </div>
              </ModalBody>
            </Modal>
          </div>
        </Col>
      </Row>
      <OrderItemsModal
        isOpen={showItemsModal}
        toggle={() => setShowItemsModal(false)}
        items={orderItems}
      />
    </div>
  );
};

export default FormOrderCreate;