import React from "react";
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

const statusOptions = [
  { value: "available", label: "Trống" },
  { value: "occupied", label: "Đang sử dụng" },
  { value: "cleaning", label: "Đang dọn dẹp" },
  { value: "out_of_service", label: "Ngưng phục vụ" },
];

const tableTypeOptions = [
  { value: "2_seats", label: "2 ghế" },
  { value: "4_seats", label: "4 ghế" },
  { value: "6_seats", label: "6 ghế" },
  { value: "8_seats", label: "8 ghế" },
];

const TableModal = ({
  modalOpen,
  setModalOpen,
  newTable,
  setNewTable,
  tableAreas,
  onSave,
  isEdit = false,
  errors = {},
}) => (
  <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} size="lg" centered>
    <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
      {isEdit ? "Chỉnh sửa bàn" : "Thêm mới bàn"}
    </ModalHeader>
    <ModalBody>
      <Form>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="table_number">
                Số bàn <span className="text-danger">*</span>
              </Label>
              <Input
                id="table_number"
                value={newTable.table_number}
                onChange={(e) =>
                  setNewTable({ ...newTable, table_number: e.target.value })
                }
                placeholder="Nhập số bàn"
                maxLength={50}
                invalid={!!errors.table_number}
              />
              {errors.table_number && (
                <FormFeedback>
                  {Array.isArray(errors.table_number)
                    ? errors.table_number.join(", ")
                    : errors.table_number}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="table_type">
                Loại bàn <span className="text-danger">*</span>
              </Label>
              <Input
                id="table_type"
                type="select"
                value={newTable.table_type}
                onChange={(e) =>
                  setNewTable({ ...newTable, table_type: e.target.value })
                }
                invalid={!!errors.table_type}
              >
                <option value="">Chọn loại bàn</option>
                {tableTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Input>
              {errors.table_type && (
                <FormFeedback>
                  {Array.isArray(errors.table_type)
                    ? errors.table_type.join(", ")
                    : errors.table_type}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="table_area_id">
                Khu vực <span className="text-danger">*</span>
              </Label>
              <Input
                id="table_area_id"
                type="select"
                value={newTable.table_area_id}
                onChange={(e) =>
                  setNewTable({ ...newTable, table_area_id: e.target.value })
                }
                invalid={!!errors.table_area_id}
              >
                <option value="">Chọn khu vực</option>
                {tableAreas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </Input>
              {errors.table_area_id && (
                <FormFeedback>
                  {Array.isArray(errors.table_area_id)
                    ? errors.table_area_id.join(", ")
                    : errors.table_area_id}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="tags">Tags</Label>
              <Input
                id="tags"
                value={newTable.tags}
                onChange={(e) =>
                  setNewTable({ ...newTable, tags: e.target.value })
                }
                placeholder="VD: VIP, ngoài trời, ... (phân cách bởi dấu phẩy)"
                invalid={!!errors.tags}
              />
              {errors.tags && (
                <FormFeedback>
                  {Array.isArray(errors.tags)
                    ? errors.tags.join(", ")
                    : errors.tags}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="description">Mô tả</Label>
              <Input
                id="description"
                type="textarea"
                rows="3"
                value={newTable.description}
                onChange={(e) =>
                  setNewTable({ ...newTable, description: e.target.value })
                }
                placeholder="Mô tả ngắn về bàn"
                invalid={!!errors.description}
              />
              {errors.description && (
                <FormFeedback>
                  {Array.isArray(errors.description)
                    ? errors.description.join(", ")
                    : errors.description}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
          {isEdit && (
            <Col md={12}>
              <FormGroup>
                <Label for="statuses">Trạng thái</Label>
                <Input
                  id="statuses"
                  type="select"
                  value={newTable.status || ""}
                  onChange={(e) =>
                    setNewTable({ ...newTable, status: e.target.value })
                  }
                  invalid={!!errors.status}
                >
                  <option value="">Chọn trạng thái</option>
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Input>
                {errors.status && (
                  <FormFeedback>
                    {Array.isArray(errors.status)
                      ? errors.status.join(", ")
                      : errors.status}
                  </FormFeedback>
                )}
              </FormGroup>
            </Col>
          )}
         
        </Row>
      </Form>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={onSave}>
        {isEdit ? "Lưu thay đổi" : "Lưu"}
      </Button>
      <Button color="secondary" onClick={() => setModalOpen(false)}>
        Hủy
      </Button>
    </ModalFooter>
  </Modal>
);

export default TableModal;