import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Pusher from 'pusher-js';
import { toast } from 'react-toastify';

const RealtimeReservationUpdater = ({ onRefreshData }) => {
    useEffect(() => {
        // Khởi tạo Pusher
        const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            encrypted: true,
        });

        // Subscribe to public channel
        const channel = pusher.subscribe('reservations');

        // Listen for new reservation events
        channel.bind('reservation.created', (data) => {
            console.log('Realtime: New reservation received:', data);

            // Hiển thị toast notification
            toast.success(`Đơn đặt bàn mới từ ${data.customer_name}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // Gọi callback để cập nhật UI
            if (onRefreshData) {
                onRefreshData();
            }
        });

        // Listen for status update events
        channel.bind('reservation.status.updated', (data) => {
            console.log('Realtime: Reservation status updated:', data);

            // Hiển thị toast notification
            toast.info(`Trạng thái đơn đặt bàn của ${data.customer_name} đã được cập nhật`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // Gọi callback để cập nhật UI
            if (onRefreshData) {
                setTimeout(() => {
                    onRefreshData();
                }, 1000);
            }
        });

        // Cleanup function
        return () => {
            channel.unbind_all();
            pusher.unsubscribe('reservations');
            pusher.disconnect();
        };
    }, [onRefreshData]);

    // Component này không render gì, chỉ xử lý realtime
    return null;
};

RealtimeReservationUpdater.propTypes = {
    onRefreshData: PropTypes.func,
};

export default RealtimeReservationUpdater; 