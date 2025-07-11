import { useEffect } from 'react';
import Pusher from 'pusher-js';
import { toast } from 'react-toastify';

const RealtimeTableUpdater = ({ onRefreshData }) => {
    useEffect(() => {
        const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            encrypted: true,
        });
        const channel = pusher.subscribe('tables');
        channel.bind('table.status.updated', (data) => {
            toast.info(`Bàn số ${data.table_number} vừa cập nhật trạng thái: ${data.status}`);
            if (onRefreshData) onRefreshData();
        });
        return () => {
            channel.unbind_all();
            pusher.unsubscribe('tables');
            pusher.disconnect();
        };
    }, [onRefreshData]);
    return null;
};

export default RealtimeTableUpdater; 