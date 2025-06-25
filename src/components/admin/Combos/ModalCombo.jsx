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

const ModalCombo = ({
  modalOpen,
  setModalOpen,
  combo,
  setCombo,
  dishList = [],
  onSave,
  isEdit = false,
  errors = {},
}) => {
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (modalOpen) {
      const fullImageUrl = "http://localhost:8000/storage/";
      if (isEdit && combo.image_url && typeof combo.image_url === "string") {
        setPreviewImage(`${fullImageUrl}${combo.image_url}`);
      } else {
        setPreviewImage(null);
      }
    }
  }, [modalOpen, combo.image_url, isEdit]);

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
    <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} size="lg" centered>
      <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
        {isEdit ? "Chỉnh sửa combo" : "Thêm mới combo"}
      </ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            {/* Image Upload */}
            <Col md={12} className="text-center mb-4">
              <FormGroup>
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
            </Col>
            {/* Combo Name */}
            <Col md={6}>
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
            </Col>
            {/* Giá combo */}
            <Col md={6}>
              <FormGroup>
                <Label for="price">
                  Giá combo <span className="text-danger">*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  value={combo.price || ""}
                  onChange={(e) => setCombo({ ...combo, price: e.target.value })}
                  placeholder="Nhập giá combo"
                  invalid={!!errors.price}
                />
                {errors.price && <FormFeedback>{errors.price}</FormFeedback>}
              </FormGroup>
            </Col>
            {/* Danh sách món */}
            <Col md={12}>
              <FormGroup>
                <Label for="items">Danh sách món trong combo</Label>
                <Input
                  id="items"
                  type="select"
                  multiple
                  value={combo.items?.map(i => i.id) || []}
                  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions).map(opt => parseInt(opt.value));
                    const selectedDishes = dishList.filter(d => selectedOptions.includes(d.id));
                    setCombo({ ...combo, items: selectedDishes });
                  }}
                  invalid={!!errors.items}
                >
                  {dishList.map(dish => (
                    <option key={dish.id} value={dish.id}>{dish.name}</option>
                  ))}
                </Input>
                {errors.items && <FormFeedback>{errors.items}</FormFeedback>}
              </FormGroup>
            </Col>
            {/* Mô tả */}
            <Col md={12}>
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
            </Col>
            {/* Trạng thái */}
            <Col md={6}>
              <FormGroup>
                <Label for="status">Trạng thái</Label>
                <Input
                  id="status"
                  type="select"
                  value={combo.status || "active"}
                  onChange={(e) => setCombo({ ...combo, status: e.target.value })}
                >
                  <option value="active">Đang bán</option>
                  <option value="inactive">Ngưng bán</option>
                </Input>
              </FormGroup>
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