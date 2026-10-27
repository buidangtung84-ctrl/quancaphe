# ☕ Quán Cà Phê — Hệ thống quản lý quán cà phê

Web app quản lý quán cà phê, song ngữ **Tiếng Việt / English**, xây dựng bằng **HTML + CSS + JavaScript thuần**
(không framework, không cần build). Dữ liệu lưu trong `localStorage` của trình duyệt.

![Dashboard](https://img.shields.io/badge/stack-vanilla%20JS-informational)

## ✨ Tính năng

| Mục | Mô tả |
|---|---|
| **Tổng quan (Dashboard)** | Lời chào theo giờ, 4 thẻ thống kê (doanh thu, số đơn, giá trị đơn TB, khách quay lại) với sparkline, công việc hôm nay, cảnh báo sắp hết hàng, biểu đồ doanh thu 7 ngày, công thức nổi bật, nhân sự & công việc |
| **Đơn hàng (Orders)** | Danh sách đơn theo bộ lọc (hôm nay / 7 ngày / tất cả), tạo đơn mới — **tự động trừ nguyên liệu khỏi kho theo công thức** |
| **Kho hàng (Inventory)** | Theo dõi tồn kho, cảnh báo *Sắp hết / Cần chú ý / Đủ dùng*, nhập thêm hàng, thêm nguyên liệu mới |
| **Công thức (Recipes)** | Danh sách món với nguyên liệu & định lượng, các bước pha, giá bán — thêm / sửa / xóa công thức |
| **Nhân sự & Công việc** | Phân công công việc theo giờ, checklist mở cửa, tiến độ từng nhân viên |
| **Báo cáo (Reports)** | Doanh thu & số đơn 14 ngày, món bán chạy nhất |
| **Cài đặt (Settings)** | Đổi ngôn ngữ VI/EN, tên quán, tên quản lý, đơn vị tiền (VND/USD), xuất / nhập dữ liệu JSON, đặt lại dữ liệu mẫu |

## 🚀 Chạy cục bộ

Chỉ cần mở `index.html` bằng trình duyệt, hoặc dùng một static server (Python tương đương):

```bash
# bất kỳ static server nào cũng được
npx serve .
python -m http.server 8080
```

## 📦 Đẩy lên GitHub

```bash
# 1. Tạo repository mới trên github.com (ví dụ: quan-caphe), KHÔNG tạo README sẵn
# 2. Trong thư mục dự án:
git init
git add .
git commit -m "Coffee shop management app"
git branch -M main
git remote add origin https://github.com/<USERNAME>/quan-caphe.git
git push -u origin main
```

## 🌐 Host lên Hostinger

Web tĩnh này chạy tốt trên mọi gói Hostinger (Shared, Premium, Business, Cloud).

### Cách 1 — Upload thủ công (đơn giản nhất)

1. Nén toàn bộ thư mục (`index.html`, `css/`, `js/`) thành `quan-caphe.zip`.
2. Vào **hPanel → Files → File Manager → public_html**.
3. Upload file zip → chọn **Extract** → đảm bảo `index.html` nằm ngay trong `public_html`.
4. Xong! Truy cập tên miền của bạn, ví dụ `https://yourdomain.com`.

### Cách 2 — Deploy tự động từ GitHub (khuyên dùng)

Repo này kèm sẵn workflow `.github/workflows/deploy-hostinger.yml`. Cấu hình 1 lần:

1. Vào **hPanel → (Advanced) → FTP Accounts**, lấy `host`, `username`, `password` (hoặc tạo account riêng cho deploy, root dir = `public_html`).
2. Trên GitHub: **Settings → Secrets and variables → Actions → New repository secret**, thêm 3 secret:
   | Secret | Giá trị |
   |---|---|
   | `FTP_HOST` | hostname FTP của Hostinger, ví dụ `ftpupload.net` (không kèm `ftp://`) |
   | `FTP_USERNAME` | tên user FTP |
   | `FTP_PASSWORD` | mật khẩu FTP |
3. Mỗi lần `git push` vào `main`, GitHub Actions sẽ tự động FTP toàn bộ site lên `public_html`.

> 💡 Hostinger gói Business trở lên cũng hỗ trợ **SSH + Git**: giữ repo trên GitHub, vào SSH chạy
> `git pull` từ thư mục `public_html` nếu muốn kéo code thủ công.

## 🗂 Cấu trúc

```
├── index.html          # khung trang
├── css/style.css       # theme ấm "between us cafe"
├── js/i18n.js          # song ngữ VI/EN
├── js/data.js          # Store + dữ liệu mẫu 14 ngày
├── js/charts.js        # sparkline & bar chart SVG thuần
├── js/app.js           # router + toàn bộ view
└── .github/workflows/deploy-hostinger.yml   # auto-deploy FTP
```

## ⚠️ Lưu ý về dữ liệu

Dữ liệu nằm trong `localStorage` của từng trình duyệt/máy — phù hợp cho demo và quán chạy nhỏ
(mỗi máy tự giữ dữ liệu của nó). Cấu hình lại dữ liệu thật cần xem xét: dùng nút
**Cài đặt → Tải dữ liệu (JSON)** để sao lưu định kỳ, hoặc nâng cấp lên backend có database nếu
cần đồng bộ nhiều máy.
