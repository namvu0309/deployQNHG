# Mô tả chức năng các thư mục trong `src`

## 📁 assets

Chứa các tài nguyên tĩnh như:

- Hình ảnh, biểu tượng, fonts,...
- Được chia thành:
  - `admin/`: Tài nguyên riêng cho giao diện admin.
  - `client/`: Tài nguyên riêng cho giao diện người dùng (client).

---

## 📁 components

Chứa các component tái sử dụng được trong giao diện.

- `admin/`: Component dùng trong trang quản trị.
- `client/`: Component dùng trong giao diện người dùng.
- `common/`: Component dùng chung cho cả admin và client.

---

## 📁 constants

Chứa các hằng số dùng toàn cục:

- Route path
- Enum
- Các cấu hình tĩnh như `status`, `roles`, `genders`, v.v.

---

## 📁 hooks

Chứa các custom hook React.

- `admin/`: Hook riêng cho giao diện admin.
- `client/`: Hook riêng cho giao diện client.
  > Ví dụ: `useDebounce`, `useAuth`, `useScrollTop`,...

---

## 📁 layouts

Chứa bố cục chính của các phần ứng dụng.

- `admin/`: Layout cho trang quản trị (có sidebar, header riêng).
- `client/`: Layout cho người dùng (có header, footer,...).

---

## 📁 pages

Chứa các trang hiển thị nội dung chính.

- `admin/`: Các trang quản trị như: Dashboard, Quản lý user, sản phẩm,...
- `client/`: Các trang hiển thị với người dùng như: Trang chủ, sản phẩm, liên hệ,...

---

## 📁 routes

Chứa định nghĩa các tuyến đường (routes) trong ứng dụng.

- `adminRoutes.jsx`: Các route dành cho admin.
- `clientRoutes.jsx`: Các route dành cho người dùng.
- `index.jsx`: Tổng hợp và export routes.

---

## 📁 services

Chứa các file giao tiếp API (sử dụng Axios hoặc fetch).

- `admin/`: Các API riêng cho admin.
- `client/`: Các API dùng cho người dùng.

---

## 📁 utils

Chứa các hàm tiện ích dùng chung cho toàn dự án.

> Ví dụ: formatDate, formatCurrency, validator,...

---

## 📁 store (nếu có thể thêm)

(Nếu bạn sử dụng Redux, Zustand hoặc Context API)

- Chứa toàn bộ logic quản lý trạng thái toàn cục.

---

## Các file gốc khác

- `App.jsx`: File root chứa cấu trúc chính của app.
- `main.jsx`: Điểm khởi tạo ứng dụng React.
- `index.css`, `App.css`: CSS toàn cục.
