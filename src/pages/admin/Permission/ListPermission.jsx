import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    Input,
    Button,
    Offcanvas,
    OffcanvasHeader,
    OffcanvasBody,
    Form,
    FormGroup,
    Label,
} from "reactstrap";
import Swal from "sweetalert2";
import Breadcrumbs from "@components/admin/ui/Breadcrumb.jsx";
import CreatePermission from "./CreatePermission";
import { getPermissions, deletePermission } from "@services/admin/permissionService.js";

export default function ListPermission() {
    const [permissions, setPermissions] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingPermission, setEditingPermission] = useState(null);

    const [showFilter, setShowFilter] = useState(false);
    const [filterGroupName, setFilterGroupName] = useState("");

    useEffect(() => {
        fetchPermissions();
    }, [page, keyword]);

    const fetchPermissions = () => {
        setLoading(true);
        const params = {
            page,
            keyword,
            ...(filterGroupName && { permission_group_name: filterGroupName }),
        };

        getPermissions(params)
            .then((res) => {
                const result = res.data.data;
                setPermissions(result.items || []);
                setMeta(result.meta || {});
            })
            .finally(() => setLoading(false));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Xác nhận xóa",
            text: "Bạn có chắc chắn muốn xóa quyền này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy"
        }).then((res) => {
            if (res.isConfirmed) {
                deletePermission(id)
                    .then(() => {
                        Swal.fire("Đã xóa!", "Quyền đã được xóa.", "success");
                        fetchPermissions();
                    })
                    .catch((err) => {
                        const message = err?.response?.data?.message || "Không thể xóa.";
                        const errors = err?.response?.data?.errors;
                        let errorDetail = "";

                        if (errors && typeof errors === "object") {
                            const allErrors = Object.values(errors).flat();
                            errorDetail = allErrors.length > 0 ? `\n- ${allErrors.join("\n- ")}` : "";
                        }

                        Swal.fire("Lỗi!", `${message}${errorDetail}`, "error");
                    });
            }
        });
    };

    return (
        <div className="page-content">
            <Breadcrumbs title="Danh sách quyền" breadcrumbItem="Quản lý quyền" />

            <div className="d-flex justify-content-between align-items-center mb-3">
                <Button color="primary" onClick={() => {
                    setEditingPermission(null);
                    setShowModal(true);
                }}>
                    + Thêm mới
                </Button>
            </div>

            <Card className="mb-4">
                <CardHeader className="bg-white border-bottom-0 d-flex justify-content-between">
                    <Input
                        type="search"
                        placeholder="Tìm kiếm quyền..."
                        value={keyword}
                        onChange={(e) => {
                            setPage(1);
                            setKeyword(e.target.value);
                        }}
                        style={{ maxWidth: 250 }}
                    />
                    <Button color="light" className="border" onClick={() => setShowFilter(true)}>
                        <i className="mdi mdi-filter-variant me-1"></i> Lọc nâng cao
                    </Button>
                </CardHeader>
            </Card>

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                        <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Tên quyền</th>
                            <th>Nhóm quyền</th>
                            <th>Mô tả nhóm</th>
                            <th>Mô tả quyền</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {permissions.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">Không có quyền nào.</td>
                            </tr>
                        ) : (
                            permissions.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.permission_name}</td>
                                    <td>{item.permission_group_name}</td>
                                    <td>{item.permission_group_description}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Button
                                                size="sm"
                                                color="light"
                                                title="Sửa"
                                                onClick={() => {
                                                    setEditingPermission(item);
                                                    setShowModal(true);
                                                }}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </Button>
                                            <Button
                                                size="sm"
                                                color="light"
                                                title="Xóa"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {meta.total > meta.per_page && (
                <div className="d-flex justify-content-end mt-3 align-items-center gap-2">
                    <Button
                        color="light"
                        disabled={!meta.prev_page_url}
                        onClick={() => setPage(meta.current_page - 1)}
                    >
                        Trước
                    </Button>
                    <span>
                        Trang {meta.current_page} / {meta.last_page}
                    </span>
                    <Button
                        color="light"
                        disabled={!meta.next_page_url}
                        onClick={() => setPage(meta.current_page + 1)}
                    >
                        Sau
                    </Button>
                </div>
            )}

            {/* Bộ lọc nâng cao */}
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
                            <Label for="filterGroupName">Nhóm quyền</Label>
                            <Input
                                id="filterGroupName"
                                placeholder="Nhập tên nhóm quyền..."
                                value={filterGroupName}
                                onChange={(e) => setFilterGroupName(e.target.value)}
                            />
                        </FormGroup>
                        <Button
                            color="primary"
                            className="mt-3"
                            block
                            onClick={() => {
                                setPage(1);
                                setShowFilter(false);
                                fetchPermissions();
                            }}
                        >
                            Áp dụng lọc
                        </Button>
                    </Form>
                </OffcanvasBody>
            </Offcanvas>

            {/* Modal thêm/sửa */}
            {showModal && (
                <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {editingPermission ? "Cập nhật quyền" : "Thêm quyền"}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingPermission(null);
                                    }}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <CreatePermission
                                    permission={editingPermission}
                                    onSuccess={() => {
                                        fetchPermissions();
                                        setShowModal(false);
                                        setEditingPermission(null);
                                    }}
                                    onClose={() => {
                                        setShowModal(false);
                                        setEditingPermission(null);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
