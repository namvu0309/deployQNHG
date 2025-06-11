import React, { useState, useMemo } from "react";
import { Card, CardHeader, ButtonGroup, Button, Row, Col } from "reactstrap";
import Breadcrumbs from "@components/admin/ui/Breadcrumb";
import GridBranch from "./grid-branch";
import ListBranch from "./list-branch";

const branchStatusOptions = [
  { label: "Tất cả", value: "all" },
  { label: "Đang hoạt động", value: "active" },
  { label: "Tạm ngưng", value: "inactive" },
];

// Dữ liệu mẫu chi nhánh
const branches = [
  {
    id: 1,
    name: "Chi nhánh Quận 1",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    status: "active",
    tables: 25,
    staff: 42,
    phone: "028 1234 5678",
    email: "quan1@nhahang.com",
    openTime: ["Thứ 2-6: 10:00 - 22:00", "Thứ 7-CN: 09:00 - 23:00"],
  },
  {
    id: 2,
    name: "Chi nhánh Quận 2",
    address: "456 Lê Lợi, Quận 2, TP.HCM",
    status: "inactive",
    tables: 18,
    staff: 30,
    phone: "028 2345 6789",
    email: "quan2@nhahang.com",
    openTime: ["Thứ 2-6: 10:00 - 22:00", "Thứ 7-CN: 09:00 - 23:00"],
  },
  // Thêm chi nhánh khác nếu muốn
];

const ContactsIndex = () => {
  const [view, setView] = useState("list"); // 'list' hoặc 'grid'
  const [status, setStatus] = useState("all");

  // Lọc dữ liệu theo search và status
  const filteredData = useMemo(() => {
    return branches.filter((branch) => {
      const matchStatus = status === "all" || branch.status === status;
      return matchStatus;
    });
  }, [status]);

  return (
    <div className="page-content">
      <Breadcrumbs title="Danh sách chi nhánh" breadcrumbItem="Quản lí chi nhánh" />
      <Card className="mb-4">
        <CardHeader className="bg-white border-bottom-0">
          <Row className="align-items-center">
            {/* Filter trạng thái dạng tab bên trái */}
            <Col
              md="7"
              sm="12"
              className="mb-2 mb-md-0 d-flex align-items-center"
            >
              <div style={{ display: "flex", position: "relative" }}>
                {branchStatusOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setStatus(opt.value)}
                    style={{
                      background: "none",
                      border: "none",
                      outline: "none",
                      padding: "8px 24px",
                      fontWeight: status === opt.value ? 700 : 400,
                      color: status === opt.value ? "#2563eb" : "#333",
                      borderBottom:
                        status === opt.value
                          ? "3px solid #2563eb"
                          : "3px solid transparent",
                      transition: "border-bottom 0.3s, color 0.3s",
                      fontSize: 16,
                      cursor: "pointer",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </Col>
            {/* Nhóm icon chuyển đổi bên phải + nút thêm mới */}
            <Col
              md="5"
              sm="12"
              className="d-flex justify-content-md-end justify-content-start align-items-center gap-2"
            >
              <Button color="success" className="me-2">
                <i className="mdi mdi-plus"></i> Thêm chi nhánh mới
              </Button>
              <ButtonGroup>
                <Button
                  color={view === "list" ? "primary" : "light"}
                  onClick={() => setView("list")}
                  title="Dạng danh sách"
                >
                  <i className="mdi mdi-format-list-bulleted"></i>
                </Button>
                <Button
                  color={view === "grid" ? "primary" : "light"}
                  onClick={() => setView("grid")}
                  title="Dạng card"
                >
                  <i className="mdi mdi-view-grid-outline"></i>
                </Button>
                <Button color="light" title="Lọc nâng cao">
                  <i className="mdi mdi-filter-variant"></i>
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </CardHeader>
      </Card>
      {/* Hiển thị dạng list hoặc grid */}
      {view === "list" ? (
        <ListBranch data={filteredData} />
      ) : (
        <GridBranch data={filteredData} />
      )}
    </div>
  );
};

export default ContactsIndex;
