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
import { getTables } from "@services/admin/tableService";
import { getTableAreas } from "@services/admin/tableAreaService";
import { getOrderDetail, updateOrder } from "@services/admin/orderService";
import { useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import OrderItemsModal from "./OrderItemsModal";
import "./OrderItemsModal.scss";
import "./FormOrder.scss";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dishDefaultImg from "@assets/admin/images/dish/dish-default.webp";
import { formatPriceToVND } from "@helpers/formatPriceToVND";
import Breadcrumbs from "@components/admin/ui/Breadcrumb";

const FormOrderUpdate = () => {
  const location = useLocation();
  const orderId = location.state?.orderDetail?.id;

  const [orderItems, setOrderItems] = useState([]);
  const [orderNotes, setOrderNotes] = useState("");
  const [orderMethod, setOrderMethod] = useState("dine-in");
  const [orderStatus, setOrderStatus] = useState("pending_confirmation");
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
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingDishes, setLoadingDishes] = useState(true);
  const [showTableModal, setShowTableModal] = useState(false);
  const [editNote, setEditNote] = useState(false);
  const [tempNote, setTempNote] = useState("");
  const [tableList, setTableList] = useState([]);
  const [loadingTables, setLoadingTables] = useState(false);
  const [tableAreas, setTableAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showItemsModal, setShowItemsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const fullUrl = `http://localhost:8000/storage/`;

  const statusOptionsMap = {
    "dine-in": [
      { value: "pending", label: "Chờ xác nhận" },
      { value: "confirmed", label: "Đã xác nhận" },
      { value: "preparing", label: "Đang chuẩn bị" },
      { value: "ready", label: "Sẵn sàng" },
      { value: "served", label: "Đã phục vụ" },
      { value: "completed", label: "Hoàn tất" },
      { value: "cancelled", label: "Đã hủy" },
    ],
    "takeaway": [
      { value: "pending", label: "Chờ xác nhận" },
      { value: "confirmed", label: "Đã xác nhận" },
      { value: "preparing", label: "Đang chuẩn bị" },
      { value: "ready", label: "Sẵn sàng" },
      { value: "completed", label: "Hoàn tất" },
      { value: "cancelled", label: "Đã hủy" },
    ],
    "delivery": [
      { value: "pending", label: "Chờ xác nhận" },
      { value: "confirmed", label: "Đã xác nhận" },
      { value: "preparing", label: "Đang chuẩn bị" },
      { value: "ready", label: "Sẵn sàng" },
      { value: "delivering", label: "Đang giao hàng" },
      { value: "completed", label: "Hoàn tất" },
      { value: "cancelled", label: "Đã hủy" },
    ],
  };

  useEffect(() => {
    if (orderId) {
      setLoadingOrder(true);
      getOrderDetail(orderId)
        .then(async (res) => {
          const orderData = res.data.data.order;
          setOrderItems(orderData.items || []);
          setOrderNotes(orderData.notes || "");
          setOrderMethod(orderData.order_type || "dine-in");
          setOrderStatus(orderData.status || "pending_confirmation");

          const tableIds = Array.isArray(orderData.tables)
            ? orderData.tables.map((t) => String(t.id))
            : [];
          setSelectedTables(tableIds);
          setTempNote(orderData.notes || "");

          // Initialize tableList with tables from orderData.tables
          if (Array.isArray(orderData.tables) && orderData.tables.length > 0) {
            setTableList(orderData.tables); // Directly set tableList with orderData.tables
            const areaId = orderData.tables[0]?.table_area_id;
            if (areaId) {
              setSelectedArea(areaId);
              setLoadingTables(true);
              try {
                // Fetch all tables for the area (without status filter)
                const tablesRes = await getTables({
                  table_area_id: areaId,
                });
                // Merge orderData.tables with fetched tables, prioritizing orderData.tables
                const fetchedTables = tablesRes.data?.data?.items || [];
                const mergedTables = [
                  ...orderData.tables,
                  ...fetchedTables.filter(
                    (t) => !orderData.tables.some((ot) => ot.id === t.id)
                  ),
                ];
                setTableList(mergedTables);
              } catch (e) {
                setTableList(orderData.tables); // Fallback to orderData.tables
                console.error("Error loading tables:", e);
              } finally {
                setLoadingTables(false);
              }
            }
          }
        })
        .catch(() => {
          console.error("Error fetching order details");
        })
        .finally(() => setLoadingOrder(false));
    }
  }, [orderId]);

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
      }
    } catch (error) {
      console.error("Error fetching dishes:", error);
      setDishes([]);
    } finally {
      setLoadingDishes(false);
    }
  };

  const addToOrder = (dish) => {
    setOrderItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => {
        // So sánh id món ăn thực sự
        if (item.dish_id && typeof item.dish_id === 'object') {
          return item.dish_id.id === dish.id;
        }
        if (item.dish_id && typeof item.dish_id === 'number') {
          return item.dish_id === dish.id;
        }
        return item.id === dish.id;
      });
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

  const handleEditTables = () => {
    setShowTableModal(true);

    setLoadingTables(true);
    getTableAreas()
      .then((res) => {
        const areas = (res.data?.data?.items || []).filter(
          (area) => area.status === "active"
        );
        setTableAreas(areas);
        let areaId = selectedArea;
        if (!areaId && areas.length > 0) {
          areaId = areas[0]?.id;
          setSelectedArea(areaId);
        }
        // Fetch tables for the selected area
        if (areaId) {
          getTables({ table_area_id: areaId })
            .then((res) => {
              setTableList(res.data?.data?.items || []);
            })
            .catch(() => setTableList([]))
            .finally(() => setLoadingTables(false));
        } else {
          setTableList([]);
          setLoadingTables(false);
        }
      })
      .catch(() => {
        setTableAreas([]);
        setTableList([]);
        setLoadingTables(false);
      });
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
      getTables({ table_area_id: selectedArea })
        .then((res) => {
          const allTables = res.data?.data?.items || [];
          // Chỉ hiển thị bàn đang trống hoặc đã được chọn trong order
          const filteredTables = allTables.filter(
            (table) =>
              table.status === "available" ||
              selectedTables.includes(String(table.id))
          );
          setTableList(filteredTables);
        })
        .catch(() => setTableList([]))
        .finally(() => setLoadingTables(false));
    }
  }, [showTableModal, selectedArea]);

  const subtotal = orderItems.reduce(
    (sum, item) => sum + (item.unit_price || item.price) * item.quantity,
    0
  );
  const vat = subtotal * 0.1;
  const total = subtotal + vat;

  const handleUpdateOrder = async () => {
    setIsSubmitting(true);
    try {
      const orderData = {
        order_type: orderMethod,
        status: orderStatus,
        notes: orderNotes,
        items: orderItems.map((item) => ({
          dish_id: item.dish_id?.id || item.id,
          quantity: item.quantity,
          unit_price: item.unit_price ,
        })),
        tables: orderMethod === "dine-in" ? selectedTables : [],
      };

      console.log('Dữ liệu cập nhật gửi đi:', orderData);

      await updateOrder(orderId, orderData);
      toast.success("Cập nhật đơn hàng thành công!");
    } catch (error) {
      console.error("Error updating order:", error);
      const apiErrors = error.response?.data?.errors;
      if (apiErrors) {
        const errorMessages = Object.values(apiErrors)
          .map((e) => (Array.isArray(e) ? e.join(", ") : e))
          .join("; ");
        toast.error(errorMessages || "Lỗi khi cập nhật đơn hàng!");
      } else {
        toast.error(error.response?.data?.message || "Lỗi khi cập nhật đơn hàng!");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-content">
      <div className="mb-3">
        <Breadcrumbs title="Quản lý đơn hàng" breadcrumbItem="Chỉnh sửa đơn hàng" />
      </div>
      {loadingOrder ? (
        <div className="text-center my-5">
          <Spinner color="primary" />
        </div>
      ) : (
        <Row>
          {/* Product Catalog */}
          <Col md={8}>
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
                  Chỉnh sửa đơn hàng
                  <Button color="link" size="sm" className="ms-2 p-0" onClick={() => setShowItemsModal(true)} title="Xem danh sách món ăn">
                    <FaEdit size={20} />
                  </Button>
                </div>
              </div>
              <div className="order-sidebar-list order-sidebar-list-scroll mb-3">
                {orderItems.length === 0 ? (
                  <div className="text-muted text-center py-4 small">
                    Chưa có món nào trong đơn hàng.
                  </div>
                ) : (
                  orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="order-item-box d-flex align-items-start justify-content-between mb-3"
                    >
                      <div style={{ flex: 1 }}>
                        <div className="mb-1">
                          <span className="order-item-title">
                            {item.dish_id?.name || item.name}
                          </span>
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
                        {formatPriceToVND((item.unit_price || item.price) * item.quantity)}
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
                  <Label className="order-sidebar-label mb-1">
                    Hình thức đơn hàng
                  </Label>
                  <Input
                    type="select"
                    value={orderMethod}
                    onChange={(e) => setOrderMethod(e.target.value)}
                    className="order-method-select"
                    style={{ width: "100%" }}
                  >
                    <option value="dine-in">Ăn tại chỗ</option>
                    <option value="takeaway">Mang đi</option>
                    <option value="delivery">Giao hàng</option>
                  </Input>
                </div>

                {/* Order Status */}
                <div
                  className="order-status-row px-3 py-2 mb-2"
                  style={{
                    background: "#f7f8fa",
                    borderRadius: 10,
                    borderBottom: "1px solid #ececec",
                  }}
                >
                  <Label className="order-sidebar-label mb-1">
                    Trạng thái đơn hàng
                  </Label>
                  <Input
                    type="select"
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                    className="order-status-select"
                    style={{ width: "100%" }}
                  >
                    {(statusOptionsMap[orderMethod] || []).map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Input>
                </div>

                {/* Selected Tables */}
                {orderMethod === "dine-in" && (
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
                            const found = tableList.find(
                              (t) => String(t.id) === String(id)
                            );
                            return found ? `Bàn ${found.table_number}` : null;
                          })
                          .filter((tableStr) => tableStr !== null)
                          .join(", ") || "Chưa chọn bàn nào"
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
                  onClick={handleUpdateOrder}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Spinner size="sm" /> : "Lưu lại"}
                </button>
                <button
                  type="button"
                  className="btn btn-danger w-100"
                  onClick={() => setShowPaymentModal(true)}
                  disabled={isSubmitting}
                >
                  Lưu & Thanh toán
                </button>
              </div>
              <Modal isOpen={showPaymentModal} toggle={() => setShowPaymentModal(false)}>
                <ModalHeader toggle={() => setShowPaymentModal(false)}>Chọn phương thức thanh toán</ModalHeader>
                <ModalBody>
                  <div className="d-flex flex-column gap-3">
                    <Button color="primary" onClick={() => { setShowPaymentModal(false); handleUpdateOrder(/* paymentMethod: 'cash' */); }}>Tiền mặt</Button>
                    <Button color="info" onClick={() => { setShowPaymentModal(false); handleUpdateOrder(/* paymentMethod: 'bank' */); }}>Chuyển khoản</Button>
                    <Button color="secondary" onClick={() => setShowPaymentModal(false)}>Hủy</Button>
                  </div>
                </ModalBody>
              </Modal>
            </div>
          </Col>

          {/* Table Selection Modal */}
          <Modal
            isOpen={showTableModal}
            toggle={handleCloseTableModal}
            size="lg"
          >
            <ModalHeader toggle={handleCloseTableModal}>Chọn bàn</ModalHeader>
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
                        selectedArea === area.id ? "#556ee6" : "#f4f4f6",
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
                      <div className="table-number">{table.table_number}</div>
                      <div className="table-info">
                        <div className="table-info-item">
                          <span className="table-info-label">Khu vực:</span>
                          <span className="table-info-value">
                            {table.table_area?.name || "N/A"}
                          </span>
                        </div>
                        <div className="table-info-item">
                          <span className="table-info-label">Sức chứa:</span>
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

          <OrderItemsModal
            isOpen={showItemsModal}
            toggle={() => setShowItemsModal(false)}
            items={orderItems}
          />
        </Row>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default FormOrderUpdate;