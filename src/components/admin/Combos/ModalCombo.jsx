import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
import { toast } from "react-toastify";
import { getDishes } from "@services/admin/dishService";

const ModalCombo = ({
  modalOpen,
  setModalOpen,
  combo,
  setCombo,
  onSave,
  isEdit = false,
  errors = {},
}) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [dishList, setDishList] = useState([]);

  // Tính tổng giá gốc các món đã chọn
  useEffect(() => {
    if (combo.items && combo.items.length > 0) {
      const total = combo.items.reduce((sum, item) => sum + (item.selling_price || 0) * (item.quantity || 1), 0);
      setCombo({ ...combo, original_total_price: total });
    } else {
      setCombo({ ...combo, original_total_price: 0 });
    }
    // eslint-disable-next-line
  }, [combo.items]);

  useEffect(() => {
    if (modalOpen) {
      const fullImageUrl = "http://localhost:8000/storage/";
      if (isEdit && combo.image_url && typeof combo.image_url === "string") {
        setPreviewImage(`${fullImageUrl}${combo.image_url}`);
      } else {
        setPreviewImage(null);
      }
      fetchDishList();
    }
    // eslint-disable-next-line
  }, [modalOpen, combo.image_url, isEdit]);

  const fetchDishList = async () => {
    try {
      const res = await getDishes();
      setDishList(res.data.data.items || []);
    } catch {
      toast.error("Không lấy được danh sách món ăn!");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Vui lòng chọn một tệp hình ảnh!");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Hình ảnh quá lớn! Vui lòng chọn tệp dưới 5MB.");
        return;
      }
      setCombo({ ...combo, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} size="xl" centered>
      <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
        {isEdit ? "Chỉnh sửa combo" : "Thêm mới combo"}
      </ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            {/* Cột trái: Thông tin combo */}
            <Col md={7}>
              {/* Ảnh */}
              <FormGroup className="text-center mb-4">
                <Label for="image-upload-button">Hình ảnh</Label>
                <div>
                  <Input
                    id="image_url"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    invalid={!!errors.image}
                    style={{ display: "none" }}
                  />
                  <Button
                    id="image-upload-button"
                    color="primary"
                    onClick={() => document.getElementById("image_url").click()}
                  >
                    Chọn hình ảnh
                  </Button>
                </div>
                {previewImage && (
                  <div className="mt-3">
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "contain" }}
                    />
                  </div>
                )}
                {errors.image && (
                  <div className="text-danger small mt-1">
                    {Array.isArray(errors.image) ? errors.image.join(", ") : errors.image}
                  </div>
                )}
              </FormGroup>
              {/* Tên combo */}
              <FormGroup>
                <Label for="name">
                  Tên combo <span className="text-danger">*</span>
                </Label>
                <Input
                  id="name"
                  value={combo.name || ""}
                  onChange={(e) => setCombo({ ...combo, name: e.target.value })}
                  placeholder="Nhập tên combo"
                  invalid={!!errors.name}
                />
                {errors.name && <FormFeedback>{errors.name}</FormFeedback>}
              </FormGroup>
              {/* Giá bán combo */}
              <FormGroup>
                <Label for="selling_price">
                  Giá bán combo <span className="text-danger">*</span>
                </Label>
                <Input
                  id="selling_price"
                  type="number"
                  min={0}
                  value={combo.selling_price || ""}
                  onChange={(e) => setCombo({ ...combo, selling_price: e.target.value })}
                  placeholder="Nhập giá bán combo"
                />
                {errors.selling_price && <FormFeedback>{errors.selling_price}</FormFeedback>}
              </FormGroup>
              {/* Mô tả */}
              <FormGroup>
                <Label for="description">Mô tả</Label>
                <Input
                  id="description"
                  type="textarea"
                  value={combo.description || ""}
                  onChange={(e) => setCombo({ ...combo, description: e.target.value })}
                  invalid={!!errors.description}
                />
                {errors.description && <FormFeedback>{errors.description}</FormFeedback>}
              </FormGroup>
              {/* Trạng thái */}
              <FormGroup>
                <Label for="is_active">Trạng thái</Label>
                <Input
                  id="is_active"
                  type="select"
                  value={combo.is_active === 0 ? 0 : 1}
                  onChange={(e) => setCombo({ ...combo, is_active: Number(e.target.value) })}
                >
                  <option value={1}>Đang bán</option>
                  <option value={0}>Ngưng bán</option>
                </Input>
              </FormGroup>
            </Col>
            {/* Cột phải: Danh sách món ăn và tổng giá */}
            <Col md={5}>
              {/* Tổng giá gốc các món */}
              <div style={{ marginBottom: 16, background: "#fffbe6", borderRadius: 8, padding: 12, fontWeight: 600, fontSize: 18, color: "#ff6600", textAlign: "center", border: "1px solid #ffe58f" }}>
                Tổng giá gốc: {combo.original_total_price?.toLocaleString()} đ
              </div>
              <div style={{ maxHeight: 420, overflowY: "auto", border: "1px solid #eee", borderRadius: 8, padding: 12, background: "#fafbfc" }}>
                <div className="fw-bold mb-2">Danh sách món ăn</div>
                {dishList.length === 0 && <div className="text-muted">Không có món ăn nào</div>}
                {dishList.map(dish => {
                  const found = combo.items?.find(i => i.id === dish.id);
                  const quantity = found ? found.quantity : 0;
                  return (
                    <div
                      key={dish.id}
                      className="d-flex align-items-center justify-content-between mb-2"
                      style={{
                        background: "#fff",
                        borderRadius: 10,
                        border: "1px solid #eee",
                        padding: "10px 16px"
                      }}
                    >
                      <div className="d-flex align-items-center">
                        {/* Ảnh món ăn hoặc icon */}
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: "50%",
                            background: "#f3f3f3",
                            marginRight: 14,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden"
                          }}
                        >
                          {dish.image_url ? (
                            <img
                              src={dish.image_url}
                              alt={dish.name}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          ) : (
                            <i className="mdi mdi-image" style={{ fontSize: 22, color: "#bbb" }}></i>
                          )}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{dish.name}</div>
                          <div style={{ color: "#888", fontSize: 15 }}>
                            {dish.selling_price?.toLocaleString()} đ{" "}
                            {dish.category?.name && (
                              <span
                                style={{
                                  background: "#f3f3f3",
                                  borderRadius: 8,
                                  padding: "2px 10px",
                                  fontSize: 13,
                                  marginLeft: 8,
                                  color: "#333"
                                }}
                              >
                                {dish.category.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <Button
                          color="light"
                          size="sm"
                          style={{ borderRadius: 8, minWidth: 32, minHeight: 32, fontWeight: 700, fontSize: 18, border: "1px solid #ddd" }}
                          disabled={quantity === 0}
                          onClick={() => {
                            let newItems = combo.items ? [...combo.items] : [];
                            if (quantity > 1) {
                              newItems = newItems.map(i => i.id === dish.id ? { ...i, quantity: i.quantity - 1 } : i);
                            } else if (quantity === 1) {
                              newItems = newItems.filter(i => i.id !== dish.id);
                            }
                            setCombo({ ...combo, items: newItems });
                          }}
                        >
                          -
                        </Button>
                        <span style={{ minWidth: 24, textAlign: "center", fontWeight: 600 }}>{quantity}</span>
                        <Button
                          color="warning"
                          size="sm"
                          style={{ borderRadius: 8, minWidth: 32, minHeight: 32, fontWeight: 700, fontSize: 18, background: "#ff6600", border: "none" }}
                          onClick={() => {
                            let newItems = combo.items ? [...combo.items] : [];
                            if (quantity > 0) {
                              newItems = newItems.map(i => i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i);
                            } else {
                              newItems.push({ ...dish, quantity: 1 });
                            }
                            setCombo({ ...combo, items: newItems });
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  );
                })}
                {errors.items && <div className="text-danger small mt-1">{errors.items}</div>}
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => setModalOpen(false)}>
          Hủy
        </Button>
        <Button color="primary" onClick={onSave}>
          {isEdit ? "Lưu thay đổi" : "Thêm mới"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalCombo; 