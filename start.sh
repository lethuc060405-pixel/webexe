#!/bin/bash
# ==============================================================================
# TÍCH CỜ - SCRIPT KHỞI CHẠY WEBSITE DÀNH CHO NGƯỜI MỚI
# ==============================================================================

echo "========================================================"
echo "   ĐANG KHỞI ĐỘNG WEBSITE TÍCH CỜ - STICKERS VIỆT NAM   "
echo "========================================================"
echo ""
echo "Website đang được mở trên trình duyệt của bạn tại:"
echo "👉 http://localhost:8000"
echo "Hoặc bạn có thể mở trực tiếp file index.html"
echo ""
echo "Nhấn Ctrl + C để dừng website khi không dùng nữa."
echo "========================================================"

# Mở trình duyệt mặc định trên macOS
open http://localhost:8000 || open index.html

# Chạy server với Python 3
python3 -m http.server 8000
