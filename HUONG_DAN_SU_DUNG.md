# 🌸 HƯỚNG DẪN SỬ DỤNG VÀ QUẢN LÝ WEBSITE TÍCH CỜ
> **Dành riêng cho bạn - Người mới bắt đầu làm quen với website**

Chào bạn! Website **Tích Cơ - Stickers Việt Nam** đã được dựng hoàn chỉnh 100% đúng theo thiết kế và đầy đủ tất cả các tính năng bạn đã gửi trong hình. Bạn không cần phải cài đặt những phần mềm phức tạp gì cả, mọi thứ đã sẵn sàng để bạn sử dụng ngay.

---

## 🚀 1. CÁCH MỞ VÀ XEM WEBSITE TRÊN MÁY TÍNH

Bạn có **2 cách cực kỳ dễ dàng** để xem website:

### Cách 1: Mở trực tiếp (Nhanh nhất - Không cần gõ lệnh)
1. Mở thư mục dự án `EXE101Thuc` trong Finder.
2. Tìm file **`index.html`** và **nhấp đúp chuột vào file đó**.
3. Trình duyệt (Chrome, Safari, Cốc Cốc, Edge...) sẽ tự động mở trang web lên ngay lập tức!

### Cách 2: Chạy Server nội bộ (Khuyên dùng khi kiểm tra đặt hàng)
1. Mở ứng dụng **Terminal** trên máy Mac.
2. Kéo file **`start.sh`** vào cửa sổ Terminal rồi bấm **Enter**.
3. Trình duyệt sẽ mở địa chỉ `http://localhost:8000`. Khi không dùng nữa, bạn chỉ cần bấm phím `Ctrl + C` ở Terminal để tắt.

---

## 🎨 2. CÁC TÍNH NĂNG ĐÃ ĐƯỢC XÂY DỰNG TRÊN WEBSITE

Website gồm 5 khối chức năng chính đúng theo 5 khung hình bạn đã gửi:

| Khung hình trong ảnh | Chức năng trên website | Điểm nổi bật |
|----------------------|------------------------|--------------|
| **1. Hero Banner (Góc trên trái)** | Banner chào mừng & Giới thiệu | Tiêu đề *"Dán lên những câu chuyện thật đẹp"*, cuốn sổ dán sticker nghệ thuật, nút *"Khám phá bộ sưu tập"*. |
| **2. Bộ sưu tập (Góc trên phải)** | Danh mục bộ sticker | Lưới các thẻ bộ sưu tập: *Ông Năm Chèo, Ẩm Thực Việt Nam, Văn Hóa Truyền Thống*. Bấm vào thẻ sẽ tự động chuyển sang xem chi tiết. |
| **3. Shop & Chi tiết (Góc dưới trái)** | Spotlight sản phẩm & Giỏ hàng | Xem ảnh lớn, phóng to thumbnail, tăng giảm số lượng, xem giá ưu đãi `45.000đ`, nút *"Thêm vào giỏ hàng"* và *"Xem chi tiết"*. Phía dưới có thanh chuyển đổi *"Các bộ sưu tập khác"*. |
| **4. Về Chúng Tôi (Góc dưới giữa)** | Câu chuyện thương hiệu | Giới thiệu dự án của nhóm sinh viên Graphic Design, 3 giá trị cốt lõi (*Sáng tạo, Văn hóa, Kết nối*), kèm bức tranh non nước thủy mặc. |
| **5. Liên Hệ (Góc dưới phải)** | Kênh kết nối & Form nhắn tin | Số Hotline `0939443299`, Email `lethuc0604@gmail.com`, form nhập tên/email/tin nhắn có thông báo phản hồi ngay, tranh Chùa Cổ & Hoa Sen. |

### 🎁 Các tính năng bán hàng nâng cao kèm theo:
- **Giỏ hàng trượt (Cart Drawer)**: Bấm vào icon giỏ hàng ở góc phải trên cùng để xem các món hàng đã chọn, thay đổi số lượng hoặc xóa món hàng.
- **Quy trình đặt hàng (Checkout)**: Khách hàng nhập Tên, Số điện thoại, Địa chỉ nhận hàng, chọn thanh toán COD hoặc Chuyển khoản VietQR.
- **Tìm kiếm thông minh (Search Modal)**: Bấm icon kính lúp để tìm nhanh theo món ăn, địa danh, tên sticker (vd: gõ "Phở", "Hạ Long", "Sen"...).
- **Xem nhanh chi tiết (Quick View Modal)**: Bấm nút "Xem Chi Tiết ➔" để xem danh sách từng sticker có trong set kèm đánh giá 5 sao ⭐.
- **Tương thích 100% mọi thiết bị**: Hiển thị đẹp mắt trên cả máy tính, iPad và điện thoại (tự động có menu di động).

---

## 📝 3. HƯỚNG DẪN THAY ĐỔI THÔNG TIN BÁN HÀNG

Tất cả các file đều là văn bản thông thường, bạn có thể mở bằng bất kỳ trình soạn thảo nào (VS Code, TextEdit, Sublime Text...):

### 3.1. Thay đổi số điện thoại & Email
- Mở file **`index.html`**:
  - Tìm số `0939443299` và thay bằng số điện thoại mới của bạn.
  - Tìm email `lethuc0604@gmail.com` và thay bằng email mới của bạn.
- Mở file **`js/app.js`**:
  - Tìm dòng có số điện thoại `0939443299` (dùng cho thông tin thanh toán chuyển khoản) để cập nhật số tài khoản ngân hàng của bạn.

### 3.2. Thay đổi giá tiền và tên sản phẩm
- Mở file **`js/app.js`**, tìm đến phần `const collectionsData = { ... }` ở ngay đầu file:
  - `name`: Tên bộ sưu tập (Ví dụ: `'Việt Nam Quê Hương'`).
  - `price`: Giá bán (Ví dụ: `45000` tương đương 45.000 VNĐ).
  - `oldPrice`: Giá gốc trước khi giảm (Ví dụ: `60000`).
  - `fullDesc`: Lời giới thiệu chi tiết về bộ sticker.
  - `stickers`: Danh sách tên các sticker có trong bộ.

### 3.3. Thay đổi hình ảnh sản phẩm
Các hình ảnh được lưu trong thư mục: **`assets/images/`**
- Bạn chỉ cần chép hình ảnh sticker mới của bạn vào thư mục này, đặt tên tương ứng (hoặc đổi đường dẫn ảnh trong file `js/app.js`).

---

## 🌐 4. CÁCH ĐƯA WEBSITE LÊN INTERNET MIỄN PHÍ

Khi bạn muốn gửi link cho bạn bè hoặc khách hàng trên Facebook/Instagram/TikTok vào xem và đặt mua, bạn có thể đưa web lên mạng **hoàn toàn miễn phí** chỉ với 3 phút:

### Cách đưa lên Vercel (Rất nhanh và phổ biến nhất hiện nay):
1. Truy cập trang web: [vercel.com](https://vercel.com) và đăng ký tài khoản miễn phí.
2. Kéo toàn bộ thư mục `EXE101Thuc` thả vào trang Vercel (hoặc liên kết qua tài khoản GitHub).
3. Bấm **Deploy**. Sau 30 giây, bạn sẽ nhận được một đường link (ví dụ: `https://tichco-stickers.vercel.app`) để gửi cho khách hàng khắp cả nước!

---

*Chúc dự án Tích Cơ của bạn phát triển rực rỡ và nhận được thật nhiều sự ủng hộ từ khách hàng!* 🌸🇻🇳
