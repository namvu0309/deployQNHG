import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col, Badge } from "reactstrap";
import SimpleBar from "simplebar-react";
import Pusher from "pusher-js";

import { withTranslation } from "react-i18next";

const NotificationDropdown = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Khởi tạo Pusher
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      encrypted: true,
    });

    // Subscribe to public channel reservations
    const channel = pusher.subscribe('reservations');
    // Subscribe to public channel orders
    const orderChannel = pusher.subscribe('orders');
    // Subscribe to kitchen-orders
    const kitchenOrderChannel = pusher.subscribe('kitchen-orders');
    // Subscribe to tables
    const tableChannel = pusher.subscribe('tables');
    
    // Listen for new reservation events
    channel.bind('reservation.created', (data) => {
      console.log('New reservation received:', data);
      addNotification({
        id: Date.now(),
        type: 'reservation_created',
        title: 'Đơn đặt bàn mới',
        message: data.message,
        customer_name: data.customer_name,
        customer_phone: data.customer_phone,
        reservation_date: data.reservation_date,
        reservation_time: data.reservation_time,
        number_of_guests: data.number_of_guests,
        timestamp: new Date(data.created_at),
        unread: true,
      });
    });

    // Listen for status update events
    channel.bind('reservation.status.updated', (data) => {
      console.log('Reservation status updated:', data);
      addNotification({
        id: Date.now(),
        type: 'reservation_status_updated',
        title: 'Cập nhật trạng thái đơn đặt bàn',
        message: data.message,
        customer_name: data.customer_name,
        old_status: data.old_status_label,
        new_status: data.new_status_label,
        timestamp: new Date(data.updated_at),
        unread: true,
      });
    });

    // Listen for new order events
    orderChannel.bind('order.created', (data) => {
      console.log('New order created:', data);
      addNotification({
        id: Date.now(),
        type: 'order_created',
        title: 'Đơn hàng mới',
        message: `Đơn hàng #${data.order_code} vừa được tạo từ xác nhận đặt bàn.`,
        order_code: data.order_code,
        timestamp: new Date(data.created_at),
        unread: true,
      });
    });

    // Listen for order update events
    orderChannel.bind('order.updated', (data) => {
      addNotification({
        id: Date.now(),
        type: 'order_updated',
        title: 'Cập nhật đơn hàng',
        message: `Đơn hàng #${data.order_code} đã cập nhật trạng thái: ${data.status}.`,
        order_code: data.order_code,
        new_status: data.status,
        timestamp: new Date(data.updated_at || Date.now()),
        unread: true,
      });
    });

    // Listen for kitchen order item update events
    kitchenOrderChannel.bind('orderitem.updated', (data) => {
      addNotification({
        id: Date.now(),
        type: 'orderitem_updated',
        title: 'Cập nhật món ăn',
        message: `Món "${data.item_name}" trong đơn #${data.order_id} vừa cập nhật trạng thái: ${data.status}.`,
        order_id: data.order_id,
        item_name: data.item_name,
        new_status: data.status,
        timestamp: new Date(data.updated_at || Date.now()),
        unread: true,
      });
    });

    // Listen for table status update events
    tableChannel.bind('table.status.updated', (data) => {
      addNotification({
        id: Date.now(),
        type: 'table_status_updated',
        title: 'Cập nhật trạng thái bàn',
        message: `Bàn số ${data.table_number} vừa cập nhật trạng thái: ${data.status}.`,
        table_number: data.table_number,
        new_status: data.status,
        timestamp: new Date(data.updated_at || Date.now()),
        unread: true,
      });
    });

    // Cleanup function
    return () => {
      channel.unbind_all();
      pusher.unsubscribe('reservations');
      orderChannel.unbind_all();
      pusher.unsubscribe('orders');
      kitchenOrderChannel.unbind_all();
      pusher.unsubscribe('kitchen-orders');
      tableChannel.unbind_all();
      pusher.unsubscribe('tables');
      pusher.disconnect();
    };
  }, []);

  const addNotification = (notification) => {
    setNotifications(prev => {
      const newNotifications = [notification, ...prev.slice(0, 9)]; // Giữ tối đa 10 notifications
      return newNotifications;
    });
    setUnreadCount(prev => prev + 1);
  };

  const markAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, unread: false }))
    );
    setUnreadCount(0);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'reservation_created':
        return 'bx bx-calendar-plus';
      case 'reservation_status_updated':
        return 'bx bx-refresh';
      case 'order_created':
        return 'bx bx-receipt';
      case 'order_updated':
        return 'bx bx-edit';
      case 'orderitem_updated':
        return 'bx bx-food-menu';
      case 'table_status_updated':
        return 'bx bx-table';
      default:
        return 'bx bx-bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'reservation_created':
        return 'primary';
      case 'reservation_status_updated':
        return 'success';
      case 'order_created':
        return 'warning';
      case 'order_updated':
        return 'info';
      case 'orderitem_updated':
        return 'warning';
      case 'table_status_updated':
        return 'primary';
      default:
        return 'info';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Vừa xong';
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => {
          setMenu(!menu);
          if (!menu) {
            markAsRead();
          }
        }}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon position-relative"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="bx bx-bell bx-tada" />
          {unreadCount > 0 && (
            <span className="badge bg-danger rounded-pill">{unreadCount}</span>
          )}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t("Notifications")} </h6>
              </Col>
              <div className="col-auto">
                <a href="#!" className="small">
                  {" "}
                  View All
                </a>
              </div>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {notifications.length === 0 ? (
              <div className="text-center py-4">
                <i className="bx bx-bell font-size-24 text-muted"></i>
                <p className="text-muted mt-2 mb-0">Không có thông báo mới</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <Link to="/admin/reservations" className="text-reset notification-item" key={notification.id}>
                  <div className="d-flex">
                    <div className="avatar-xs me-3">
                      <span className={`avatar-title bg-${getNotificationColor(notification.type)} rounded-circle font-size-16`}>
                        <i className={getNotificationIcon(notification.type)} />
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mt-0 mb-1">
                        {notification.title}
                        {notification.unread && (
                          <Badge color="danger" size="sm" className="ms-2">Mới</Badge>
                        )}
                      </h6>
                      <div className="font-size-12 text-muted">
                        <p className="mb-1">{notification.message}</p>
                        {notification.customer_name && (
                          <p className="mb-1">
                            <strong>Khách hàng:</strong> {notification.customer_name}
                            {notification.customer_phone && ` (${notification.customer_phone})`}
                          </p>
                        )}
                        {notification.reservation_date && (
                          <p className="mb-1">
                            <strong>Ngày đặt:</strong> {new Date(notification.reservation_date).toLocaleDateString('vi-VN')}
                            {notification.reservation_time && ` - ${notification.reservation_time}`}
                          </p>
                        )}
                        {notification.number_of_guests && (
                          <p className="mb-1">
                            <strong>Số khách:</strong> {notification.number_of_guests} người
                          </p>
                        )}
                        {notification.old_status && notification.new_status && (
                          <p className="mb-1">
                            <strong>Trạng thái:</strong> {notification.old_status} → {notification.new_status}
                          </p>
                        )}
                        <p className="mb-0">
                          <i className="mdi mdi-clock-outline" />
                          {formatTimeAgo(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </SimpleBar>
          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 btn-block text-center"
              to="/admin/reservations"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
              {props.t("View all")}{" "}
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withTranslation()(NotificationDropdown);

NotificationDropdown.propTypes = {
  t: PropTypes.any,
};
