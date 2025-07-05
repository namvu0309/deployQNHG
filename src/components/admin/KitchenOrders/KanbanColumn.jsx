import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import KanbanCard from "./KanbanCard";

const KanbanColumn = ({ status, label, orders, onChangeStatus, onCancel, loading }) => (
    <div className="kanban-column">
        <div className="kanban-column-header d-flex align-items-center justify-content-between mb-2">
            <span className="fw-bold">{label}</span>
            <span className="badge bg-secondary">{orders.length}</span>
        </div>
        <Droppable droppableId={status} direction="horizontal">
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="d-flex flex-row gap-3 kanban-column-list kanban-column-list--fixed"
                >
                    {orders.map((order, idx) => (
                        <KanbanCard
                            key={`${order.id}-${order.table_number}`}
                            order={order}
                            index={idx}
                            onChangeStatus={onChangeStatus}
                            onCancel={onCancel}
                            status={status}
                        />
                    ))}
                    {provided.placeholder}
                    {orders.length === 0 && !loading && <div className="text-muted">Không có đơn nào</div>}
                </div>
            )}
        </Droppable>
    </div>
);

export default KanbanColumn; 