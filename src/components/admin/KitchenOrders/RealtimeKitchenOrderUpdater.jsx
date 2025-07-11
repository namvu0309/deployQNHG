import { useEffect } from 'react';
import Pusher from 'pusher-js';
import { toast } from 'react-toastify';

const RealtimeKitchenOrderUpdater = ({ onRefreshData }) => {
    useEffect(() => {
        const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            encrypted: true,
        });
        const channel = pusher.subscribe('kitchen-orders');
        channel.bind('orderitem.updated', (data) => {
            toast.info(`Món "${data.item_name}" vừa được cập nhật trạng thái: ${data.status}`);
            if (onRefreshData) onRefreshData();
        });
        channel.bind('orderitem.created', (data) => {
            toast.info(`Món mới "${data.item_name}" vừa được thêm vào đơn bếp!`);
            if (onRefreshData) onRefreshData();
        });
        channel.bind('orderitem.deleted', (data) => {
            toast.info(`Món "${data.item_name}" đã bị xóa khỏi bếp!`);
            if (onRefreshData) onRefreshData();
        });
        return () => {
            channel.unbind_all();
            pusher.unsubscribe('kitchen-orders');
            pusher.disconnect();
        };
    }, [onRefreshData]);
    return null;
};

export default RealtimeKitchenOrderUpdater; 