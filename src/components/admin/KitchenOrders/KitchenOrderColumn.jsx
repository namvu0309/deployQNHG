import React from "react";
import KitchenOrderCard from "./KitchenOrderCard";

const KitchenOrderColumn = ({ status, label, orders, onChangeStatus, onCancel, loading }) => {
    return (
        <div className="kitchen-order-column">
            <h5>{label} ({orders.length})</h5>
            <div className="kitchen-order-list">
                {orders.map((order) => (
                    <KitchenOrderCard
                        key={order.id}
                        order={order}
                        onChangeStatus={onChangeStatus}
                        onCancel={onCancel}
                        status={status}
                    />
                ))}
                {orders.length === 0 && !loading && <div>Không có đơn nào</div>}
            </div>
        </div>
    );
};

export default KitchenOrderColumn; 