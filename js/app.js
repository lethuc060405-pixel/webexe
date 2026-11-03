/**
 * TÍCH CỜ - STICKERS VIỆT NAM
 * Web Application Logic & Interactions
 */

// -----------------------------------------------------------------------------
// DỮ LIỆU CÁC BỘ SƯU TẬP & SẢN PHẨM
// -----------------------------------------------------------------------------
const collectionsData = {
  'vn-que-huong': {
    id: 'vn-que-huong',
    name: 'Ông Năm Chèo',
    shortDesc: 'Huyền tích sông nước qua nét vẽ sticker.',
    fullDesc: 'Bộ sưu tập lấy cảm hứng từ truyền tích dân gian Ông Năm Chèo, tái hiện sinh động hình tượng cá sấu khổng lồ, những đợt sóng cuộn trào cùng các nhân vật bơi lội và nhà sàn ven sông.',
    price: 39000,
    oldPrice: 60000,
    image: 'assets/images/shop_featured_vnqh.jpg',
    cardImage: 'assets/images/card_vn_quehuong.jpg',
    stickers: [
      'Cá sấu Ông Năm Chèo dũng mãnh',
      'Các nhân vật bơi lội vượt sóng',
      'Những đợt sóng nước cuộn trào sinh động',
      'Nhà sàn gỗ ven sông miền sông nước',
      'Rặng dừa xanh & đóa hoa sen hồng',
      'Logo Tích Cờ nghệ thuật truyền thống'
    ],
    specs: {
      material: 'Decal Vinyl chống nước 100%',
      finish: 'Cán màng mờ bảo vệ chống trầy',
      size: 'Tấm A6 (10.5 x 14.8 cm)',
      cut: 'Bế demi từng hình sắc nét'
    }
  },
};

// State hiện tại của ứng dụng
let currentCollectionId = 'vn-que-huong';
let cart = JSON.parse(localStorage.getItem('tichco_cart') || '[]');

// -----------------------------------------------------------------------------
// TIỆN ÍCH ĐỊNH DẠNG (FORMATTING UTILITIES)
// -----------------------------------------------------------------------------
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const iconSvg = type === 'success' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#72D8BE" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF7597" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `${iconSvg} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// -----------------------------------------------------------------------------
// CHỨC NĂNG CHỌN & HIỂN THỊ BỘ SƯU TẬP
// -----------------------------------------------------------------------------
function setFeaturedCollection(id) {
  const item = collectionsData[id];
  if (!item) return;

  currentCollectionId = id;

  // Cập nhật Breadcrumbs
  const breadcrumbEl = document.getElementById('currentBreadcrumb');
  if (breadcrumbEl) breadcrumbEl.textContent = item.name;

  // Cập nhật tiêu đề, mô tả & giá
  const titleEl = document.getElementById('featuredTitle');
  const descEl = document.getElementById('featuredDesc');
  const priceEl = document.getElementById('featuredPrice');
  const oldPriceEl = document.getElementById('featuredOldPrice');
  const imgEl = document.getElementById('featuredMainImg');

  if (titleEl) titleEl.textContent = item.name;
  if (descEl) descEl.textContent = item.fullDesc;
  if (priceEl) priceEl.textContent = formatCurrency(item.price);
  if (oldPriceEl) oldPriceEl.textContent = formatCurrency(item.oldPrice);
  if (imgEl) {
    imgEl.style.opacity = '0';
    setTimeout(() => {
      imgEl.src = item.image;
      imgEl.alt = item.name;
      imgEl.style.opacity = '1';
    }, 150);
  }

  // Reset thumbnail trạng thái active về thumb đầu tiên
  const thumbs = document.querySelectorAll('.showcase-thumbs .thumb-item');
  thumbs.forEach((el, idx) => {
    if (idx === 0) el.classList.add('active');
    else el.classList.remove('active');
  });

  // Cập nhật danh sách "CÁC BỘ SƯU TẬP KHÁC"
  updateRelatedCollections();
}

function switchFeaturedThumb(thumbEl, imageSrc) {
  document.querySelectorAll('.showcase-thumbs .thumb-item').forEach(el => el.classList.remove('active'));
  if (thumbEl) thumbEl.classList.add('active');
  const imgEl = document.getElementById('featuredMainImg');
  if (imgEl && imageSrc) {
    imgEl.style.opacity = '0';
    setTimeout(() => {
      imgEl.src = imageSrc;
      imgEl.style.opacity = '1';
    }, 150);
  }
}

function updateRelatedCollections() {
  const container = document.getElementById('relatedCollectionsRow');
  if (!container) return;

  const otherIds = Object.keys(collectionsData).filter(id => id !== currentCollectionId);
  // Lấy 3 bộ sưu tập khác để hiển thị
  const displayItems = otherIds.slice(0, 3);

  container.innerHTML = displayItems.map(id => {
    const col = collectionsData[id];
    return `
      <div class="related-card" onclick="selectAndScrollCollection('${id}')">
        <div class="related-thumb">
          <img src="${col.cardImage}" alt="${col.name}">
        </div>
        <div class="related-title">${col.name}</div>
        <div class="related-arrow">&rarr;</div>
      </div>
    `;
  }).join('');
}

function selectAndScrollCollection(id) {
  setFeaturedCollection(id);
  const shopEl = document.getElementById('shop');
  if (shopEl) {
    shopEl.scrollIntoView({ behavior: 'smooth' });
  }
}

// -----------------------------------------------------------------------------
// QUẢN LÝ GIỎ HÀNG (SHOPPING CART)
// -----------------------------------------------------------------------------
function saveCart() {
  localStorage.setItem('tichco_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(id, quantity = 1) {
  const itemData = collectionsData[id];
  if (!itemData) return;

  const existingIndex = cart.findIndex(item => item.id === id);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: itemData.id,
      name: itemData.name,
      price: itemData.price,
      image: itemData.cardImage || itemData.image,
      quantity: quantity
    });
  }

  saveCart();

  // Hiệu ứng bump trên icon giỏ hàng
  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 400);
  }

  showToast(`Đã thêm "${itemData.name}" vào giỏ hàng!`);
}

function changeCartQty(id, delta) {
  const index = cart.findIndex(item => item.id === id);
  if (index > -1) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
  }
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  showToast('Đã xóa sản phẩm khỏi giỏ hàng.');
}

function updateCartUI() {
  const badge = document.getElementById('cartBadge');
  const countHeader = document.getElementById('cartCountHeader');
  const body = document.getElementById('cartDrawerBody');
  const subtotalEl = document.getElementById('cartSubtotal');

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (badge) badge.textContent = totalCount;
  if (countHeader) countHeader.textContent = `(${totalCount})`;
  if (subtotalEl) subtotalEl.textContent = formatCurrency(totalAmount);

  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="empty-cart-msg">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#B0A89C" stroke-width="1.5" style="margin-bottom:12px">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <p>Giỏ hàng của bạn đang trống</p>
        <button class="btn-pill-primary" style="margin-top:16px; padding:10px 20px; font-size:12px" onclick="toggleCartDrawer(false)">
          Khám phá sticker ngay
        </button>
      </div>
    `;
    return;
  }

  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-thumb">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatCurrency(item.price)}</div>
        <div class="cart-item-controls">
          <button class="cart-qty-btn" onclick="changeCartQty('${item.id}', -1)">-</button>
          <span style="font-weight:600; font-size:13px; min-width:20px; text-align:center">${item.quantity}</span>
          <button class="cart-qty-btn" onclick="changeCartQty('${item.id}', 1)">+</button>
          <span class="cart-remove-btn" onclick="removeFromCart('${item.id}')">Xóa</span>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleCartDrawer(open) {
  const overlay = document.getElementById('modalOverlay');
  const drawer = document.getElementById('cartDrawer');

  if (open) {
    overlay.classList.add('active');
    drawer.classList.add('active');
  } else {
    drawer.classList.remove('active');
    // Chỉ đóng overlay nếu không có modal nào khác mở
    if (!document.querySelector('.custom-modal.active, .search-modal.active')) {
      overlay.classList.remove('active');
    }
  }
}

// -----------------------------------------------------------------------------
// CHI TIẾT SẢN PHẨM (QUICK VIEW MODAL)
// -----------------------------------------------------------------------------
function openProductModal(id = currentCollectionId) {
  const item = collectionsData[id];
  if (!item) return;

  const modal = document.getElementById('productModal');
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('productModalContent');

  content.innerHTML = `
    <div style="display:grid; grid-template-columns: 1fr 1.1fr; gap:28px; align-items:center;">
      <div style="background:#F8F3EA; border-radius:16px; padding:20px; text-align:center;">
        <img src="${item.image}" alt="${item.name}" style="max-height:260px; margin:0 auto; filter:drop-shadow(0 6px 16px rgba(0,0,0,0.12));">
      </div>
      <div>
        <span class="section-tag">STICKER NGHỆ THUẬT</span>
        <h3 style="font-family:var(--font-serif); font-size:28px; color:var(--primary-green); margin-bottom:8px;">${item.name}</h3>
        <div style="color:#F5A623; margin-bottom:12px; font-size:14px;">★★★★★ <span style="color:#6E6862; font-size:13px;">(4.9/5 • Đã bán 240+)</span></div>
        <div class="price-row" style="margin-bottom:16px;">
          <span class="price-current">${formatCurrency(item.price)}</span>
          <span class="price-old">${formatCurrency(item.oldPrice)}</span>
          <span class="price-discount">TIẾT KIỆM</span>
        </div>
        <p style="font-size:14px; color:var(--text-muted); line-height:1.6; margin-bottom:18px;">${item.fullDesc}</p>
        
        <div style="background:#FAF6EF; border-radius:12px; padding:14px; margin-bottom:20px; font-size:13px;">
          <div style="font-weight:700; color:var(--primary-green); margin-bottom:6px;">Bộ sản phẩm bao gồm:</div>
          <ul style="padding-left:18px; color:var(--text-muted); line-height:1.5;">
            ${item.stickers.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>

        <div style="display:flex; gap:12px;">
          <button class="btn-pill-primary" style="flex:1; justify-content:center;" onclick="addToCart('${item.id}', 1); closeModals();">
            Thêm vào giỏ hàng
          </button>
          <button class="btn-pill-outline" style="padding:12px 18px;" onclick="addToCart('${item.id}', 1); closeModals(); toggleCartDrawer(true);">
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  `;

  overlay.classList.add('active');
  modal.classList.add('active');
}

// -----------------------------------------------------------------------------
// TÌM KIẾM SẢN PHẨM (SEARCH MODAL)
// -----------------------------------------------------------------------------
function toggleSearchModal(open) {
  const modal = document.getElementById('searchModal');
  const overlay = document.getElementById('modalOverlay');
  const input = document.getElementById('searchInput');

  if (open) {
    overlay.classList.add('active');
    modal.classList.add('active');
    setTimeout(() => input && input.focus(), 100);
    renderSearchResults('');
  } else {
    modal.classList.remove('active');
    if (!document.querySelector('.cart-drawer.active, .custom-modal.active')) {
      overlay.classList.remove('active');
    }
  }
}

function handleSearch(query) {
  renderSearchResults(query.trim().toLowerCase());
}

function renderSearchResults(query) {
  const container = document.getElementById('searchResultsList');
  if (!container) return;

  const matched = Object.values(collectionsData).filter(item => {
    if (!query) return true;
    return item.name.toLowerCase().includes(query) ||
           item.shortDesc.toLowerCase().includes(query) ||
           item.stickers.some(s => s.toLowerCase().includes(query));
  });

  if (matched.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:24px; color:var(--text-muted); font-size:14px;">
        Không tìm thấy sticker nào phù hợp với từ khóa "${query}".
      </div>
    `;
    return;
  }

  container.innerHTML = matched.map(item => `
    <div class="search-result-item" onclick="selectAndScrollCollection('${item.id}'); closeModals();">
      <div style="width:48px; height:48px; background:#F8F3EA; border-radius:8px; display:flex; align-items:center; justify-content:center; overflow:hidden;">
        <img src="${item.cardImage}" alt="${item.name}" style="max-height:36px;">
      </div>
      <div style="flex:1;">
        <div style="font-weight:700; color:var(--primary-green); font-size:14.5px;">${item.name}</div>
        <div style="font-size:12.5px; color:var(--text-muted);">${item.shortDesc}</div>
      </div>
      <div style="font-weight:700; color:var(--primary-pink); font-size:14px;">${formatCurrency(item.price)}</div>
    </div>
  `).join('');
}

// -----------------------------------------------------------------------------
// ĐẶT HÀNG & THANH TOÁN (CHECKOUT MODAL)
// -----------------------------------------------------------------------------
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast('Giỏ hàng của bạn đang trống! Hãy chọn sticker trước nhé.', 'warning');
    return;
  }

  toggleCartDrawer(false);

  const modal = document.getElementById('orderModal');
  const overlay = document.getElementById('modalOverlay');
  const summaryEl = document.getElementById('orderSummaryList');
  const totalEl = document.getElementById('orderModalTotal');

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  summaryEl.innerHTML = cart.map(item => `
    <div style="display:flex; justify-content:space-between; font-size:13.5px; padding:6px 0; border-bottom:1px dashed #E5DCCF;">
      <span>${item.name} <strong>x${item.quantity}</strong></span>
      <span style="font-weight:600;">${formatCurrency(item.price * item.quantity)}</span>
    </div>
  `).join('');

  totalEl.textContent = formatCurrency(totalAmount);

  overlay.classList.add('active');
  modal.classList.add('active');
}

function handleOrderSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('orderName').value.trim();
  const phone = document.getElementById('orderPhone').value.trim();
  const address = document.getElementById('orderAddress').value.trim();
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

  if (!name || !phone || !address) {
    showToast('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng!', 'warning');
    return;
  }

  const orderId = 'TC-' + Math.floor(100000 + Math.random() * 900000);

  // Hiển thị màn hình đặt hàng thành công
  const modalContent = document.getElementById('orderModalContent');
  modalContent.innerHTML = `
    <div style="text-align:center; padding:20px 0;">
      <div style="width:72px; height:72px; border-radius:50%; background:#EAF8F3; color:var(--primary-green); margin:0 auto 18px; display:flex; align-items:center; justify-content:center;">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      <h3 style="font-family:var(--font-serif); font-size:28px; color:var(--primary-green); margin-bottom:8px;">Đặt hàng thành công!</h3>
      <p style="font-size:14.5px; color:var(--text-muted); margin-bottom:20px;">
        Cảm ơn <strong>${name}</strong> đã ủng hộ Tích Cơ. Mã đơn hàng của bạn là <strong style="color:var(--primary-pink);">${orderId}</strong>.
      </p>

      <div style="background:#FAF6EF; border-radius:12px; padding:16px; margin-bottom:24px; text-align:left; font-size:13.5px; line-height:1.7;">
        <div><strong>Người nhận:</strong> ${name} (${phone})</div>
        <div><strong>Địa chỉ giao:</strong> ${address}</div>
        <div><strong>Hình thức:</strong> ${paymentMethod === 'cod' ? 'Thanh toán tiền mặt khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng (VietQR)'}</div>
        <div><strong>Trạng thái:</strong> Đang chuẩn bị đóng gói</div>
      </div>

      ${paymentMethod === 'bank' ? `
        <div style="background:#FFF9E6; border:1px solid #FFE58F; border-radius:12px; padding:16px; margin-bottom:24px; font-size:13px; text-align:left;">
          <div style="font-weight:700; color:#874D00; margin-bottom:6px;">Thông tin chuyển khoản:</div>
          <div>Ngân hàng: <strong>MB Bank (Ngân hàng Quân Đội)</strong></div>
          <div>Số tài khoản: <strong>0939443299</strong></div>
          <div>Chủ tài khoản: <strong>LE THUC</strong></div>
          <div>Nội dung: <strong>${orderId} ${phone}</strong></div>
        </div>
      ` : ''}

      <button class="btn-pill-primary" style="margin:0 auto; padding:12px 28px;" onclick="closeModals();">
        Tiếp tục trải nghiệm Tích Cơ
      </button>
    </div>
  `;

  // Xóa giỏ hàng
  cart = [];
  saveCart();
  showToast('Đơn hàng đã được tạo thành công!');
}

function closeModals() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.querySelectorAll('.custom-modal, .search-modal').forEach(m => m.classList.remove('active'));
  toggleCartDrawer(false);
}

// -----------------------------------------------------------------------------
// FORM LIÊN HỆ (CONTACT FORM)
// -----------------------------------------------------------------------------
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  if (!name || !email || !message) {
    showToast('Vui lòng điền đầy đủ thông tin để Tích Cơ có thể liên hệ lại bạn nhé!', 'warning');
    return;
  }

  showToast(`Cảm ơn bạn ${name}! Tích Cơ đã nhận được tin nhắn và sẽ phản hồi qua email ${email} sớm nhất.`);
  e.target.reset();
}

function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Đã sao chép ${label}: ${text}`);
  }).catch(() => {
    showToast(`${label}: ${text}`);
  });
}

// -----------------------------------------------------------------------------
// SCROLL SPY & MENU HIGHLIGHTING
// -----------------------------------------------------------------------------
function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    const header = document.querySelector('.site-header');

    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

// -----------------------------------------------------------------------------
// KHỞI TẠO ỨNG DỤNG (INITIALIZATION)
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Cài đặt bộ sưu tập mặc định
  setFeaturedCollection('vn-que-huong');

  // Cập nhật giỏ hàng từ localStorage
  updateCartUI();

  // Cài đặt Scroll Spy
  setupScrollSpy();

  // Bộ chọn số lượng tại Showcase
  const qtyInput = document.getElementById('showcaseQty');
  const btnMinus = document.getElementById('qtyMinus');
  const btnPlus = document.getElementById('qtyPlus');

  if (btnMinus && qtyInput) {
    btnMinus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val > 1) qtyInput.value = val - 1;
    });
  }

  if (btnPlus && qtyInput) {
    btnPlus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val < 99) qtyInput.value = val + 1;
    });
  }

  // Nút thêm vào giỏ hàng tại Showcase
  const addShowcaseBtn = document.getElementById('addShowcaseToCartBtn');
  if (addShowcaseBtn) {
    addShowcaseBtn.addEventListener('click', () => {
      const qty = parseInt(qtyInput.value) || 1;
      addToCart(currentCollectionId, qty);
    });
  }

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });

    // Đóng menu khi click vào link
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
      });
    });
  }

  // Đóng modal khi click ra ngoài overlay
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.addEventListener('click', closeModals);
  }
});
