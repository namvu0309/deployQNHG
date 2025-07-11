import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner, Row, Col } from "reactstrap";
import CardTable from "./CardTable";
import { getTables } from "@services/admin/tableService";
import { getTableAreas } from "@services/admin/tableAreaService";

const TableSelectModal = ({ isOpen, onClose, onConfirm, initialSelectedTables = [] }) => {
    const [tableAreas, setTableAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);
    const [tableList, setTableList] = useState([]);
    const [loadingTables, setLoadingTables] = useState(false);
    const [selectedTables, setSelectedTables] = useState(initialSelectedTables);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen) {
            getTableAreas()
                .then((res) => {
                    const areas = (res.data?.data?.items || []).filter((area) => area.status === "active");
                    setTableAreas(areas);
                    setSelectedArea(areas[0]?.id || null);
                })
                .catch(() => {
                    setTableAreas([]);
                });
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && selectedArea) {
            setLoadingTables(true);
            getTables({ table_area_id: selectedArea })
                .then((res) => {
                    setTableList(res.data?.data?.items || []);
                })
                .catch(() => {
                    setTableList([]);
                })
                .finally(() => setLoadingTables(false));
        }
    }, [isOpen, selectedArea]);

    useEffect(() => {
        setSelectedTables(initialSelectedTables);
    }, [initialSelectedTables, isOpen]);

    const handleTableToggle = (tableId) => {
        setSelectedTables((prev) => {
            const exists = prev.find((t) => String(t.id) === String(tableId));
            if (exists) {
                return prev.filter((t) => String(t.id) !== String(tableId));
            } else {
                const found = tableList.find((t) => String(t.id) === String(tableId));
                if (found) {
                    return [...prev, found];
                }
                return prev;
            }
        });
    };

    const handleConfirm = () => {
        if (selectedTables.length === 0) {
            setError("Bạn phải chọn ít nhất 1 bàn!");
            return;
        }
        setError("");
        onConfirm(selectedTables);
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose} size="xl" style={{ maxWidth: "80vw" }}>
            <ModalHeader toggle={onClose}>Chọn bàn</ModalHeader>
            <ModalBody>
                <div className="table-area-carousel d-flex align-items-center mb-3" style={{ overflowX: "auto" }}>
                    {tableAreas.map((area) => (
                        <div
                            key={area.id}
                            className={`table-area-item py-2 me-2 rounded ${selectedArea === area.id ? "active" : ""}`}
                            style={{
                                background: selectedArea === area.id ? "#556ee6" : "#f4f4f6",
                                color: selectedArea === area.id ? "#fff" : "#222",
                                cursor: "pointer",
                                minWidth: 120,
                                textAlign: "center",
                                fontWeight: 500,
                                border: selectedArea === area.id ? "2px solid #556ee6" : "2px solid transparent",
                                transition: "all 0.2s",
                            }}
                            onClick={() => setSelectedArea(area.id)}
                        >
                            {area.name}
                        </div>
                    ))}
                </div>
                <div className="table-modal-list-by-status">
                    {loadingTables ? (
                        <div className="text-center w-100 py-4">
                            <Spinner color="primary" />
                        </div>
                    ) : tableList.length === 0 ? (
                        <div className="text-muted text-center w-100">Không có bàn nào trong khu vực này.</div>
                    ) : (
                        [
                            { key: "available", label: "Trống" },
                            { key: "occupied", label: "Đang sử dụng" },
                            { key: "cleaning", label: "Đang dọn dẹp" },
                            { key: "out_of_service", label: "Ngưng phục vụ" },
                        ].map((statusObj) => {
                            const tables = tableList.filter((t) => t.status === statusObj.key);
                            return (
                                <div className="table-status-row mb-3" key={statusObj.key}>
                                    <div className="table-status-label mb-1" style={{ fontWeight: 600 }}>{statusObj.label}</div>
                                    <div className="table-status-cards-row d-flex flex-row flex-nowrap align-items-center" style={{ gap: 12, overflowX: "auto", minHeight: 48 }}>
                                        {tables.length === 0 ? (
                                            <span className="text-muted" style={{ fontSize: "0.97rem" }}>Không có bàn</span>
                                        ) : (
                                            tables.map((table) => {
                                                const isSelected = selectedTables.some((t) => String(t.id) === String(table.id));
                                                return (
                                                    <div
                                                        key={table.id}
                                                        className={`table-card-wrapper ${isSelected ? "selected" : ""}`}
                                                        onClick={() => handleTableToggle(String(table.id))}
                                                        style={{ margin: 4, flex: "0 0 auto" }}
                                                    >
                                                        <CardTable
                                                            tableId={table.id}
                                                            tableNumber={table.table_number}
                                                            seatCount={
                                                                table.table_type === "2_seats"
                                                                    ? 2
                                                                    : table.table_type === "4_seats"
                                                                        ? 4
                                                                        : table.table_type === "8_seats"
                                                                            ? 8
                                                                            : table.capacity || 4
                                                            }
                                                            status={table.status}
                                                            hideMenu={true}
                                                        />
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
                {error && <div className="text-danger mt-2">{error}</div>}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleConfirm}>
                    Xác nhận
                </Button>
                <Button color="secondary" onClick={onClose}>
                    Đóng
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default TableSelectModal; 