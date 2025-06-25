import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Spinner,
    Input,
    Button,
    Badge,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Modal,
} from "reactstrap";
import Breadcrumbs from "@components/admin/ui/Breadcrumb";
import ListCombo from "@components/admin/Combos/ListCombo";
import ListTrashCombo from "@components/admin/Combos/ListTrashCombo";
import ModalCombo from "@components/admin/Combos/ModalCombo";
import { toast } from "react-toastify";
import { getCombos, createCombo, updateCombo, softDeleteCombo, getComboDetail } from "@services/admin/comboService";
import Swal from "sweetalert2";
import ComboCardGrid from "@components/admin/Combos/ComboCardGrid";

const statusOptions = [
    { value: "all", label: "Tất cả", badgeColor: "secondary" },
    { value: "active", label: "Đang bán", badgeColor: "success" },
    { value: "inactive", label: "Ngưng bán", badgeColor: "danger" },
];

const ComboIndex = () => {
    const [combos, setCombos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [meta, setMeta] = useState({
        page: 1,
        perPage: 8,
        total: 0,
        totalPage: 1,
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [newCombo, setNewCombo] = useState({
        name: "",
        price: "",
        status: "active",
        description: "",
        items: [],
        image_url: "",
    });
    const [errors, setErrors] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [editComboId, setEditComboId] = useState(null);
    const [activeTab, setActiveTab] = useState("list");
    const [dishList] = useState([]); // TODO: fetch danh sách món ăn
    const [selectedCombo, setSelectedCombo] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const fetchCombos = async (page = 1) => {
        setLoading(true);
        try {
            const params = {
                page,
                per_page: 8,
                search: search || undefined,
            };
            if (status !== "all") params.status = status;
            const res = await getCombos(params);
            const items = res.data?.data?.items;
            if (Array.isArray(items)) {
                setCombos(items);
                setMeta({
                    page: res.data.data.meta.page || 1,
                    perPage: 8,
                    total: res.data.data.meta.total || 0,
                    totalPage: res.data.data.meta.totalPage || 1,
                });
            } else {
                setCombos([]);
                setMeta({ page: 1, perPage: 8, total: 0, totalPage: 1 });
            }
        } catch {
            setCombos([]);
            setMeta({ page: 1, perPage: 8, total: 0, totalPage: 1 });
            toast.error("Lỗi khi tải danh sách combo!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === "list") fetchCombos(meta.page);
    }, [meta.page, search, status, activeTab]);

    const handleStatusChange = (value) => {
        setStatus(value);
        setMeta((prev) => ({ ...prev, page: 1 }));
        fetchCombos(1);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setMeta((prev) => ({ ...prev, page: 1 }));
        fetchCombos(1);
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= meta.totalPage) {
            setMeta((prev) => ({ ...prev, page: pageNumber }));
        }
    };

    const resetNewCombo = () => {
        setNewCombo({
            name: "",
            price: "",
            status: "active",
            description: "",
            items: [],
            image_url: "",
        });
        setErrors({});
        setIsEdit(false);
        setEditComboId(null);
    };

    const handleEditCombo = async (comboId) => {
        try {
            const res = await getComboDetail(comboId);
            const combo = res.data.data.combo;
            setNewCombo({
                name: combo.name || "",
                price: combo.price || "",
                status: combo.status || "active",
                description: combo.description || "",
                items: combo.items || [],
                image_url: combo.image_url || "",
            });
            setEditComboId(combo.id);
            setIsEdit(true);
            setModalOpen(true);
            setErrors({});
        } catch {
            toast.error("Không lấy được thông tin combo!");
        }
    };

    const handleSave = async () => {
        setErrors({});
        const formData = new FormData();
        formData.append("name", newCombo.name || "");
        formData.append("price", newCombo.price || "");
        formData.append("status", newCombo.status || "active");
        formData.append("description", newCombo.description || "");
        if (newCombo.items && newCombo.items.length > 0) {
            newCombo.items.forEach((item) => formData.append("items[]", item.id));
        }
        if (newCombo.image instanceof File) {
            formData.append("image_url", newCombo.image);
        }
        try {
            let response;
            if (isEdit) {
                response = await updateCombo(editComboId, formData);
                if (response) toast.success("Cập nhật combo thành công!");
            } else {
                response = await createCombo(formData);
                if (response) toast.success("Thêm combo thành công!");
            }
            setModalOpen(false);
            resetNewCombo();
            fetchCombos(meta.page);
        } catch (error) {
            const apiErrors = error.response?.data?.errors;
            if (apiErrors) setErrors(apiErrors);
            toast.error(error.response?.data?.message || "Lỗi khi lưu combo!");
        }
    };

    const handleDeleteClick = (comboId) => {
        Swal.fire({
            title: "Xóa combo?",
            text: "Bạn có chắc chắn muốn xóa combo này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteCombo(comboId);
            }
        });
    };

    const handleDeleteCombo = async (comboId) => {
        try {
            await softDeleteCombo(comboId);
            toast.success("Xóa combo thành công!");
            fetchCombos(meta.page);
        } catch {
            toast.error("Lỗi khi xóa combo!");
        }
    };

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
            setSearch("");
            setStatus("all");
            setMeta((prev) => ({ ...prev, page: 1 }));
            if (tab === "list") fetchCombos(1);
        }
    };

    const handleAddDish = (comboId) => {
        toast.info(`Thêm món ăn cho combo #${comboId} (demo)`);
    };

    const handleToggleStatus = (comboId) => {
        toast.info(`Tắt/đổi trạng thái combo #${comboId} (demo)`);
    };

    const handleShowDetailCombo = async (comboId) => {
        try {
            const res = await getComboDetail(comboId);
            setSelectedCombo(res.data.data.combo);
            setShowDetailModal(true);
        } catch {
            toast.error("Không lấy được thông tin combo!");
        }
    };

    return (
        <div className="page-content">
            <Breadcrumbs title="Quản Lý Combo" breadcrumbItem={activeTab === "list" ? "Danh sách combo" : "Thùng rác"} />
            <Card className="mb-4">
                <CardHeader className="bg-white border-bottom-0">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                style={{ cursor: "pointer" }}
                                className={activeTab === "list" ? "active" : ""}
                                onClick={() => toggleTab("list")}
                            >
                                Danh sách combo
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                style={{ cursor: "pointer" }}
                                className={activeTab === "trash" ? "active" : ""}
                                onClick={() => toggleTab("trash")}
                            >
                                Thùng rác
                            </NavLink>
                        </NavItem>
                    </Nav>
                </CardHeader>
            </Card>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="list">
                    <Card className="mb-4">
                        <CardHeader className="bg-white border-bottom-0">
                            <Row className="align-items-center">
                                <Col md={7} sm={12} className="mb-2 mb-md-0 d-flex align-items-center">
                                    <div style={{ display: "flex" }}>
                                        {statusOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => handleStatusChange(opt.value)}
                                                style={{
                                                    background: "none",
                                                    border: "none",
                                                    padding: "8px 24px",
                                                    fontWeight: status === opt.value ? 600 : 400,
                                                    color: status === opt.value ? "#007bff" : "#333",
                                                    borderBottom: status === opt.value ? "3px solid #007bff" : "3px solid transparent",
                                                    fontSize: 16,
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {opt.label}
                                                <Badge
                                                    color={opt.badgeColor}
                                                    pill
                                                    className="ms-2"
                                                    style={{ fontSize: 13, minWidth: 28 }}
                                                >
                                                    {opt.value === "all" ? meta.total : combos.filter(c => c.status === opt.value).length}
                                                </Badge>
                                            </button>
                                        ))}
                                    </div>
                                </Col>
                                <Col md={5} sm={12} className="d-flex justify-content-md-end justify-content-start align-items-center gap-2">
                                    <Button
                                        color="success"
                                        onClick={() => {
                                            resetNewCombo();
                                            setModalOpen(true);
                                        }}
                                    >
                                        <i className="mdi mdi-plus"></i> Thêm mới combo
                                    </Button>
                                </Col>
                            </Row>
                        </CardHeader>
                    </Card>
                    <Card className="mb-4">
                        <CardBody>
                            <Row className="align-items-center g-2">
                                <Col md={6} sm={12}>
                                    <Input
                                        type="search"
                                        placeholder="Tìm kiếm combo..."
                                        value={search}
                                        onChange={handleSearchChange}
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <Card className="mb-4">
                        <CardBody>
                            {loading ? (
                                <div className="text-center my-5">
                                    <Spinner color="primary" />
                                </div>
                            ) : (
                                <>
                                    <ComboCardGrid
                                        data={combos}
                                        onDetail={handleShowDetailCombo}
                                        onEdit={handleEditCombo}
                                        onDelete={handleDeleteClick}
                                        onAddDish={handleAddDish}
                                        onToggleStatus={handleToggleStatus}
                                    />
                                    {/* Phân trang */}
                                    {meta.totalPage > 1 && (
                                        <div className="d-flex justify-content-end mt-4">
                                            <nav>
                                                <ul className="pagination">
                                                    <li className={`page-item${meta.page === 1 ? " disabled" : ""}`}>
                                                        <button className="page-link" onClick={() => handlePageChange(meta.page - 1)}>&laquo;</button>
                                                    </li>
                                                    {Array.from({ length: meta.totalPage }, (_, i) => (
                                                        <li key={i + 1} className={`page-item${meta.page === i + 1 ? " active" : ""}`}>
                                                            <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                                                        </li>
                                                    ))}
                                                    <li className={`page-item${meta.page === meta.totalPage ? " disabled" : ""}`}>
                                                        <button className="page-link" onClick={() => handlePageChange(meta.page + 1)}>&raquo;</button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    )}
                                </>
                            )}
                        </CardBody>
                    </Card>
                </TabPane>
                <TabPane tabId="trash">
                    <ListTrashCombo />
                </TabPane>
            </TabContent>
            <ModalCombo
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                combo={newCombo}
                setCombo={setNewCombo}
                dishList={dishList}
                onSave={handleSave}
                isEdit={isEdit}
                errors={errors}
            />
            {/* Modal chi tiết combo */}
            <Modal isOpen={showDetailModal} toggle={() => setShowDetailModal(false)} size="lg" centered>
                <div className="modal-header">
                    <h5 className="modal-title">Chi tiết combo</h5>
                    <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)}></button>
                </div>
                <div className="modal-body">
                    {selectedCombo ? (
                        <div>
                            <div className="mb-3"><b>Tên combo:</b> {selectedCombo.name}</div>
                            <div className="mb-3"><b>Giá bán:</b> {selectedCombo.selling_price?.toLocaleString()} đ</div>
                            <div className="mb-3"><b>Mô tả:</b> {selectedCombo.description}</div>
                            <div className="mb-3"><b>Trạng thái:</b> {selectedCombo.is_active === 1 ? "Áp dụng" : "Ngừng áp dụng"}</div>
                            <div className="mb-3"><b>Ngày tạo:</b> {selectedCombo.created_at ? new Date(selectedCombo.created_at).toLocaleDateString('vi-VN') : ""}</div>
                            {/* Thêm các trường khác nếu muốn */}
                        </div>
                    ) : (
                        <div>Đang tải...</div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default ComboIndex; 