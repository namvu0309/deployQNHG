import React from "react";
import { Draggable } from "@hello-pangea/dnd";

const STATUS_LABEL = {
  pending: { text: "Pending", color: "warning" },
  preparing: { text: "In Progress", color: "info" },
  ready: { text: "Completed", color: "success" },
  cancelled: { text: "Cancelled", color: "secondary" },
};

const KanbanCard = ({ order, index, onChangeStatus, onCancel, status }) => {
  const nextStatus = status === "pending" ? "preparing" : status === "preparing" ? "ready" : null;
  return (
    <Draggable draggableId={order.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          className={`kanban-card mb-3 p-3 rounded shadow-sm${order.is_priority ? " border border-danger" : ""}${snapshot.isDragging ? " is-dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ background: snapshot.isDragging ? "#f8f9fa" : "#fff", ...provided.draggableProps.style }}
        >
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="fw-bold">#{order.order_id || order.id}</span>
            <span className={`badge bg-${STATUS_LABEL[order.status]?.color || "secondary"}`}>{STATUS_LABEL[order.status]?.text || order.status}</span>
          </div>
          <div className="mb-1"><b>Bàn:</b> {order.table_number || "-"} {order.is_priority ? <span className="badge bg-danger ms-2">Ưu tiên</span> : null}</div>
          <div className="mb-1"><b>Món:</b> {order.item_name} <span className="badge bg-light text-dark ms-1">x{order.quantity}</span></div>
          {order.notes && <div className="mb-1 text-muted"><i>{order.notes}</i></div>}
          <div className="mb-1 text-secondary" style={{ fontSize: 12 }}>Giờ đặt: {order.created_at ? new Date(order.created_at).toLocaleString() : "-"}</div>
          <div className="d-flex gap-2 mt-2">
            {nextStatus && (
              <button className="btn btn-sm btn-primary" onClick={e => { e.stopPropagation(); onChangeStatus(order.id, nextStatus); }}>Chuyển trạng thái</button>
            )}
            {order.status !== "cancelled" && (
              <button className="btn btn-sm btn-outline-danger" onClick={e => { e.stopPropagation(); onCancel(order.id); }}>Hủy đơn</button>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard; 