import { useEffect } from 'react';
import Pusher from 'pusher-js';
import { toast } from 'react-toastify';

const RealtimeOrderUpdater = ({ onRefreshData }) => {
    useEffect(() => {
        const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            encrypted: true,
        });

        const orderChannel = pusher.subscribe('orders');
        orderChannel.bind('order.created', (data) => {
            toast.info(`Đơn hàng #${data.order_code} vừa được tạo!`);
            if (onRefreshData) onRefreshData();
        });

        return () => {
            orderChannel.unbind_all();
            pusher.unsubscribe('orders');
            pusher.disconnect();
        };
    }, [onRefreshData]);

    return null;
};

export default RealtimeOrderUpdater; 