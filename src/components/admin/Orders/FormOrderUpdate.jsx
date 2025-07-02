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
import { useLocation, useNavigate } from "react-router-dom";
import { FaEdit, FaShoppingCart } from "react-icons/fa";
import "./FormOrder.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dishDefaultImg from "@assets/admin/images/dish/dish-default.webp";
import { formatPriceToVND } from "@helpers/formatPriceToVND";
import Breadcrumbs from "@components/admin/ui/Breadcrumb";
import CardTable from "../Table/CardTable";

const FormOrderUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderDetail?.id;

  const [orderItems, setOrderItems] = useState([]);
  const [orderNotes, setOrderNotes] = useState("");
  const [orderMethod, setOrderMethod] = useState("Dine In");
  const [orderStatus, setOrderStatus] = useState("pending");
  const [selectedTables, setSelectedTables] = useState([]); // [{id, table_number, ...}]
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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const fullUrl = `http://localhost:8000/storage/`;

  const statusOptionsMap = {
    "Dine In": [
      { value: "pending", label: "Chờ xác nhận" },
      { value: "confirmed", label: "Đã xác nhận" },
      { value: "preparing", label: "Đang chuẩn bị" },
      { value: "ready", label: "Sẵn sàng" },
      { value: "served", label: "Đã phục vụ" },
      { value: "completed", label: "Hoàn tất" },
      { value: "cancelled", label: "Đã hủy" },
    ],
    Takeaway: [
      { value: "pending", label: "Chờ xác nhận" },
      { value: "confirmed", label: "Đã xác nhận" },
      { value: "preparing", label: "Đang chuẩn bị" },
      { value: "ready", label: "Sẵn sàng" },
      { value: "completed", label: "Hoàn tất" },
      { value: "cancelled", label: "Đã hủy" },
    ],
    Delivery: [
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
          setOrderItems(
            orderData.items.map((item) => ({
              ...item,
              id: item.dish_id?.id || item.id,
              name: item.dish_id?.name || item.name,
              price: item.unit_price || item.price,
              image_url: item.dish_id?.image_url || item.image_url,
            })) || []
          );
          setOrderNotes(orderData.notes || "");
          setOrderMethod(
            orderData.order_type === "dine-in"
              ? "Dine In"
              : orderData.order_type === "takeaway"
              ? "Takeaway"
              : "Delivery"
          );
          setOrderStatus(orderData.status || "pending");
          setDeliveryAddress(orderData.delivery_address || "");
          setContactName(orderData.contact_name || "");
          setContactEmail(orderData.contact_email || "");
          setContactPhone(orderData.contact_phone || "");

          setSelectedTables(Array.isArray(orderData.tables) ? orderData.tables : []);
          setTempNote(orderData.notes || "");

          if (Array.isArray(orderData.tables) && orderData.tables.length > 0) {
            setTableList(orderData.tables);
            const areaId = orderData.tables[0]?.table_area_id;
            if (areaId) {
              setSelectedArea(areaId);
              setLoadingTables(true);
              try {
                const tablesRes = await getTables({
                  table_area_id: areaId,
                });
                const fetchedTables = tablesRes.data?.data?.items || [];
                const mergedTables = [
                  ...orderData.tables,
                  ...fetchedTables.filter(
                    (t) => !orderData.tables.some((ot) => ot.id === t.id)
                  ),
                ];
                setTableList(mergedTables);
              } catch (e) {
                setTableList(orderData.tables);
                console.error("Error loading tables:", e);
              } finally {
                setLoadingTables(false);
              }
            }
          }
        })
        .catch(() => {
          console.error("Error fetching order details");
          toast.error("Lỗi khi tải chi tiết đơn hàng!");
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
        toast.error("Cấu trúc dữ liệu API không đúng!");
      }
    } catch (error) {
      console.error("Error fetching dishes:", error.response || error);
      setDishes([]);
      toast.error("Lỗi khi tải danh sách món ăn!");
    } finally {
      setLoadingDishes(false);
    }
  };

  const addToOrder = (dish) => {
    setOrderItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => (item.dish_id?.id || item.id) === dish.id
      );
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
        return prevItems.filter((item) => (item.dish_id?.id || item.id) !== id);
      }
      return prevItems.map((item) =>
        (item.dish_id?.id || item.id) === id ? { ...item, quantity } : item
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
        if (areaId) {
          getTables({ status: "available", table_area_id: areaId })
            .then((res) => {
              const allTables = res.data?.data?.items || [];
              const filteredTables = allTables.filter(
                (table) =>
                  table.status === "available" ||
                  selectedTables.some((t) => String(t.id) === String(table.id))
              );
              setTableList(filteredTables);
            })
            .catch(() => {
              setTableList([]);
              toast.error("Lỗi khi tải danh sách bàn!");
            })
            .finally(() => setLoadingTables(false));
        } else {
          setTableList([]);
          setLoadingTables(false);
        }
      })
      .catch(() => {
        setTableAreas([]);
        toast.error("Lỗi khi tải danh sách khu vực bàn!");
        setLoadingTables(false);
      });
  };

  const handleCloseTableModal = () => setShowTableModal(false);

  const handleTableToggle = (tableId) => {
    setSelectedTables((prev) => {
      const exists = prev.find((t) => String(t.id) === String(tableId));
      if (exists) {
        return prev.filter((t) => String(t.id) !== String(tableId));
      } else {
        // tìm object trong tableList
        const found = tableList.find((t) => String(t.id) === String(tableId));
        if (found) {
          return [...prev, found];
        }
        return prev;
      }
    });
  };

  useEffect(() => {
    if (showTableModal && selectedArea) {
      setLoadingTables(true);
      getTables({ status: "available", table_area_id: selectedArea })
        .then((res) => {
          const allTables = res.data?.data?.items || [];
          const filteredTables = allTables.filter(
            (table) =>
              table.status === "available" ||
              selectedTables.some((t) => String(t.id) === String(table.id))
          );
          setTableList(filteredTables);
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

  const subtotal = orderItems.reduce(
    (sum, item) => sum + (item.unit_price || item.price) * item.quantity,
    0
  );
  const vat = 0;
  const total = subtotal;

  const handleUpdateOrder = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        order_type: getOrderType(orderMethod),
        status: orderStatus,
        notes: orderNotes || "",
        tables:
          orderMethod === "Dine In"
            ? selectedTables.map((t) => ({ table_id: Number(t.id) }))
            : [],
        delivery_address: orderMethod === "Delivery" ? deliveryAddress || "" : "",
        contact_name: contactName || "",
        contact_email: contactEmail || "",
        contact_phone: contactPhone || "",
        items: orderItems.map((item) => ({
          dish_id: item.dish_id?.id || item.id,
          quantity: Number(item.quantity),
          unit_price: Number(item.unit_price || item.price),
        })),
      };

      console.log("Payload gửi lên:", payload);

      await updateOrder(orderId, payload);
      toast.success("Cập nhật đơn hàng thành công!", {
        autoClose: 2000,
        onClose: () => {
          navigate("/orders/list");
        },
      });
    } catch (error) {
      console.error("Error updating order:", error.response || error);
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
      <ToastContainer />
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
                  <Col md={6} key={dish.id} className="mb-3">
                    <Card className="menu-card d-flex flex-row align-items-stretch shadow-sm border-0">
                      <div className="menu-card-img-block">
                        <img
                          src={dish.image_url ? `${fullUrl}${dish.image_url}` : dishDefaultImg}
                          alt={dish.name}
                          className="menu-card-img"
                        />
                      </div>
                      <CardBody className="d-flex flex-column justify-content-center py-2">
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
                </div>
              </div>
              <div className="order-sidebar-section mb-3">
                {orderMethod === "Dine In" && (
                  <div className="order-table-box d-flex align-items-center justify-content-between py-2 mb-2">
                    <span>
                      {selectedTables.length > 0 ? (
                        selectedTables.map((t) => `Bàn ${t.table_number}`).join(", ")
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
                    <Modal
                      isOpen={showTableModal}
                      toggle={handleCloseTableModal}
                      size="xl"
                      style={{ maxWidth: '80vw' }}
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
                              className={`table-area-item py-2 me-2 rounded ${
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
                          {tableList.map((table) => {
                            const isSelected = selectedTables.some((t) => String(t.id) === String(table.id));
                            return (
                              <div
                                key={table.id}
                                className={`table-card-wrapper ${isSelected ? "selected" : ""}`}
                                onClick={() => handleTableToggle(String(table.id))}
                                style={{ margin: 8 }}
                              >
                                <CardTable
                                  tableId={table.table_number}
                                  seatCount={table.capacity}
                                  status={table.status}
                                  hideMenu={true}
                                />
                              </div>
                            );
                          })}
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
                <div className="order-note-area py-2 mb-2">
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
                <div className="order-method-row py-2 mb-2">
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
                {orderMethod === "Delivery" && (
                  <div className="delivery-info py-2 mb-2">
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
                <div className="order-status-row py-2 mb-2">
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
                    {(statusOptionsMap[orderMethod] || []).map((opt, idx, arr) => {
                      const currentIdx = arr.findIndex(o => o.value === orderStatus);
                      const isNext = idx === currentIdx + 1;
                      const isCurrent = idx === currentIdx;
                      return (
                        <option
                          key={opt.value}
                          value={opt.value}
                          disabled={!(isCurrent || isNext)}
                        >
                          {opt.label}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
              <div className="order-items-detail-box mb-3">
                <div className="fw-bold mb-3 px-3" style={{ fontSize: "1.1rem" }}>
                  Chi tiết đơn hàng ({orderItems.length} món)
                </div>
                <div className="order-items-list">
                  {orderItems.length === 0 ? (
                    <div className="text-muted text-center py-4">
                      <FaShoppingCart size={32} className="mb-2 text-secondary" />
                      <div>Chưa có món nào trong đơn hàng.</div>
                    </div>
                  ) : (
                    orderItems.map((item) => (
                      <div
                        className="order-item-row d-flex align-items-center"
                        key={item.dish_id?.id || item.id}
                      >
                        <div className="order-item-img-block me-3">
                          <img
                            src={
                              item.image_url
                                ? `${fullUrl}${item.image_url}`
                                : dishDefaultImg
                            }
                            alt={item.name}
                            className="order-item-img"
                          />
                        </div>
                        <div className="flex-grow-1 d-flex align-items-center">
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="fw-bold order-item-title ellipsis-1 mb-1">
                              {item.name}
                            </div>
                            <div className="order-item-price-mult text-muted">
                              {formatPriceToVND(item.unit_price || item.price)} đ ×{" "}
                              {item.quantity}
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-2 ms-3">
                            <Button
                              color="light"
                              size="sm"
                              className="border order-item-qty-btn"
                              onClick={() =>
                                updateQuantity(
                                  item.dish_id?.id || item.id,
                                  item.quantity - 1
                                )
                              }
                            >
                              -
                            </Button>
                            <span className="mx-2 order-item-qty">{item.quantity}</span>
                            <Button
                              color="light"
                              size="sm"
                              className="border order-item-qty-btn"
                              onClick={() =>
                                updateQuantity(
                                  item.dish_id?.id || item.id,
                                  item.quantity + 1
                                )
                              }
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="order-sidebar-totals mb-3">
                <div className="order-totals-row">
                  <span className="order-totals-label">Tạm tính</span>
                  <span className="order-totals-value">{formatPriceToVND(subtotal)}</span>
                </div>
                <div className="order-totals-row">
                  <span className="order-totals-label">VAT</span>
                  <span className="order-totals-value">{formatPriceToVND(vat)}</span>
                </div>
                <div className="order-totals-row order-totals-total">
                  <span className="order-totals-label order-totals-label-total">
                    Tổng cộng
                  </span>
                  <span className="order-totals-value order-totals-value-total">
                    {formatPriceToVND(total)}
                  </span>
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
              <Modal
                isOpen={showPaymentModal}
                toggle={() => setShowPaymentModal(false)}
              >
                <ModalHeader toggle={() => setShowPaymentModal(false)}>
                  Chọn phương thức thanh toán
                </ModalHeader>
                <ModalBody>
                  <div className="d-flex flex-column gap-3">
                    <Button
                      color="primary"
                      onClick={() => {
                        setShowPaymentModal(false);
                        handleUpdateOrder();
                      }}
                    >
                      Tiền mặt
                    </Button>
                    <Button
                      color="info"
                      onClick={() => {
                        setShowPaymentModal(false);
                        handleUpdateOrder();
                      }}
                    >
                      Chuyển khoản
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => setShowPaymentModal(false)}
                    >
                      Hủy
                    </Button>
                  </div>
                </ModalBody>
              </Modal>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default FormOrderUpdate;