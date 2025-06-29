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
} from "reactstrap";
import { getDishes } from "@services/admin/dishService";
import "./FormOrder.scss";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getTables } from "@services/admin/tableService";
import { getTableAreas } from "@services/admin/tableAreaService";
import TableCard from "@components/admin/Table/CardTable";
import { useLocation } from "react-router-dom";

const FormOrder = () => {
  const location = useLocation();
  const orderDetail = location.state?.orderDetail;

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
  const [isEdit, setIsEdit] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);

  // State cho edit note
  const [editNote, setEditNote] = useState(false);
  const [tempNote, setTempNote] = useState(orderNotes);

  const [tableList, setTableList] = useState([]);
  const [loadingTables, setLoadingTables] = useState(false);
  const [tableAreas, setTableAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);

  useEffect(() => {
    if (orderDetail) {
      setOrderItems(orderDetail.items || []);
      setOrderNotes(orderDetail.notes || "");
      setOrderMethod(orderDetail.order_method || "Dine In");
      setSelectedTables(orderDetail.tables?.map(t => String(t.id)) || []);
    }
  }, [orderDetail]);

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
      setMeta({
        current_page: 1,
        per_page: 10,
        total: 0,
        last_page: 1,
      });
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

  const removeFromOrder = (id) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
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
      .catch(() => setTableAreas([]));
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
        .catch(() => setTableList([]))
        .finally(() => setLoadingTables(false));
    }
  }, [showTableModal, selectedArea]);

  return (
    <div className="page-content">
      <Row>
        {/* Product Catalog */}
        <Col md={9}>
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
                {/* Note: Category options would need to be fetched separately like in DishIndex */}
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
                        src={`${fullUrl}${dish.image_url}` || "không có ảnh"}
                        alt={dish.name}
                        className="menu-card-img"
                      />
                    </div>
                    <CardBody className="d-flex flex-column justify-content-center py-2 px-3">
                      <div className="menu-card-title mb-1">
                        {dish.name || "Unnamed Dish"}
                      </div>
                      <div className="menu-card-price mb-2">
                        {dish.selling_price
                          ? dish.selling_price.toLocaleString("vi-VN")
                          : "0"}
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
        <Col md={3} className="order-sidebar">
          <div className="order-sidebar-inner">
            <div className="order-sidebar-header mb-3">
              <div className="order-sidebar-title">
                {isEdit ? "Edit Order" : "New Order"}
              </div>
            </div>
            {/* Existing Items */}
            <div className="order-sidebar-list order-sidebar-list-scroll mb-3">
              {orderItems.length === 0 ? (
                <div className="text-muted text-center py-4 small">
                  No items in the order yet.
                </div>
              ) : (
                orderItems.map((item) => (
                  <div className="order-item-box d-flex align-items-start justify-content-between mb-3">
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
                      ${item.price * item.quantity}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* New Items (only show in edit mode) */}
            {isEdit && (
              <div className="order-sidebar-list order-sidebar-list-scroll mb-3">
                <div className="order-sidebar-label mb-2">New Items</div>
                {/* Render new items here, for demo just show a placeholder */}
                <div className="text-muted text-center py-3 small">
                  No new items added yet.
                </div>
                {/* Bạn có thể render danh sách newItems nếu có */}
              </div>
            )}

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
                  <div className="order-sidebar-label">Order Note</div>
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
                    {orderNotes ? orderNotes : "No notes added"}
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
                <Label className="order-sidebar-label mb-1">Order Method</Label>
                <Input
                  type="select"
                  value={orderMethod}
                  onChange={(e) => setOrderMethod(e.target.value)}
                  className="order-method-select"
                  style={{ width: "100%" }}
                >
                  <option value="Dine In">Dine In</option>
                  <option value="Takeaway">Takeaway</option>
                  <option value="Delivery">Delivery</option>
                </Input>
              </div>

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
                      <span className="text-muted">No table selected</span>
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
              <div className="d-flex justify-content-between small mb-1">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between small mb-1">
                <span>VAT</span>
                <span>${vat.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button color="primary" block className="order-sidebar-btn">
              {isEdit ? "Update Order" : "Process Order"}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FormOrder;
