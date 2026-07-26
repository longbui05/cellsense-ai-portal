# RUN_PROJECT.md

# Hướng dẫn chạy project

## Bước 1: Chuẩn bị Database

* Khởi động **MySQL** hoặc **XAMPP**.
* Import file SQL vào MySQL.

Tên database:

```text
cellsense_ai
```

File SQL:

```text
database/cellsense_ai.sql
```

---

## Bước 2: Mở project

Mở Visual Studio Code.

Chọn:

```text
File
→ Open Folder
→ cellsense-ai-portal
```

---

## Bước 3: Chạy Backend

Mở Terminal thứ nhất.

Di chuyển vào thư mục Backend:

```bash
cd backend
```

Cài đặt thư viện (chỉ cần thực hiện lần đầu):

```bash
npm install
```

Khởi động Backend:

```bash
node server.js
```

Nếu thành công sẽ hiển thị:

```text
MySQL Connected
Server running
```

---

## Bước 4: Chạy Frontend

Mở Terminal thứ hai.

Di chuyển vào thư mục Frontend:

```bash
cd frontend
```

Cài đặt thư viện (chỉ cần thực hiện lần đầu):

```bash
npm install
```

Khởi động React:

```bash
npm start
```

---

# Đường dẫn truy cập

## Website

```text
http://localhost:3000
```

## Backend

```text
http://localhost:5000
```

## API Danh sách điện thoại

```text
http://localhost:5000/api/phones
```

## AI Assistant API

```text
POST
http://localhost:5000/api/ai/chat
```

## Thư mục ảnh

```text
http://localhost:5000/uploads/
```

---

# Thứ tự chạy project

1. Khởi động MySQL/XAMPP.
2. Chạy Backend.
3. Chạy Frontend.
4. Mở trình duyệt và truy cập:

```text
http://localhost:3000
```

---

# Lưu ý

* Luôn chạy **Backend trước Frontend**.
* Đảm bảo MySQL đang hoạt động.
* Không xóa thư mục **uploads**.
* Nếu thay đổi file **.env**, hãy khởi động lại Backend.
* Nếu thiếu thư viện, chạy lại:

```bash
npm install
```

ở cả thư mục **backend** và **frontend**.
