/* ============================================
   SHOPIFY - Main JavaScript File
   All logic: auth, cart, products, UI
   ============================================ */

// ============================================
// PRODUCT DATA (10 Products)
// ============================================
const PRODUCTS = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 7469,
    originalPrice: 10799,
    discount: 31,
    rating: 4.5,
    reviews: 1284,
    image: "images/headphones1.jpg",
    description: "Experience crystal-clear audio with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions. Perfect for work, travel, and everyday listening.",
    badge: "Best Seller",
    stock: 45,
    brand: "SoundPro"
  },
  {
    id: 2,
    name: "Minimalist Leather Watch",
    category: "Fashion",
    price: 12449,
    originalPrice: 16599,
    discount: 25,
    rating: 4.8,
    reviews: 876,
    image: "images/watch.jpg",
    description: "Timeless elegance meets modern craftsmanship. This minimalist leather watch features a genuine Italian leather band, sapphire crystal glass, and Swiss quartz movement. Water-resistant up to 50m.",
    badge: "New",
    stock: 18,
    brand: "TimeClassic"
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 4979,
    originalPrice: 6639,
    discount: 25,
    rating: 4.3,
    reviews: 2103,
    image: "images/headphones1.jpg",
    description: "Take your music anywhere with this rugged, waterproof Bluetooth speaker. Delivers 360° surround sound with deep bass. 20-hour playtime. IPX7 waterproof rating. Connect two speakers for stereo sound.",
    badge: "Hot",
    stock: 62,
    brand: "BoomSound"
  },
  {
    id: 4,
    name: "Running Shoes Pro",
    category: "Sports",
    price: 9959,
    originalPrice: 13279,
    discount: 25,
    rating: 4.6,
    reviews: 3421,
    image: "images/shoes.jpg",
    description: "Engineered for performance. These running shoes feature a responsive foam midsole, breathable mesh upper, and durable rubber outsole. Ideal for road running, training, and casual wear.",
    badge: "Sale",
    stock: 34,
    brand: "SpeedFlex"
  },
  {
    id: 5,
    name: "Organic Face Cream",
    category: "Beauty",
    price: 3319,
    originalPrice: 4564,
    discount: 27,
    rating: 4.7,
    reviews: 987,
    image: "images/facecream.jpg",
    description: "Nourish your skin with 100% organic ingredients. This luxurious face cream contains hyaluronic acid, vitamin C, and shea butter. Suitable for all skin types. Dermatologist tested, cruelty-free.",
    badge: "Organic",
    stock: 78,
    brand: "PureGlow"
  },
  {
    id: 6,
    name: "Smart Fitness Tracker",
    category: "Electronics",
    price: 6639,
    originalPrice: 8299,
    discount: 20,
    rating: 4.4,
    reviews: 5621,
    image: "images/fitness-tracker.jpg",
    description: "Track your health 24/7 with this advanced fitness tracker. Monitor heart rate, sleep quality, steps, calories, and stress levels. GPS enabled. 7-day battery life. Compatible with iOS & Android.",
    badge: "Popular",
    stock: 91,
    brand: "FitTrack"
  },
  {
    id: 7,
    name: "Canvas Backpack",
    category: "Fashion",
    price: 5809,
    originalPrice: 7469,
    discount: 22,
    rating: 4.5,
    reviews: 1432,
    image: "images/backpack.jpg",
    description: "Stylish and functional canvas backpack with 30L capacity. Features laptop compartment (fits up to 15\"), multiple pockets, water-resistant coating, and ergonomic padded straps. Perfect for travel & daily use.",
    badge: null,
    stock: 27,
    brand: "UrbanCarry"
  },
  {
    id: 8,
    name: "Stainless Steel Water Bottle",
    category: "Sports",
    price: 2489,
    originalPrice: 3319,
    discount: 25,
    rating: 4.9,
    reviews: 7845,
    image: "images/bottle.jpg",
    description: "Keep drinks cold for 24 hours or hot for 12 hours with this premium insulated water bottle. Made from 18/8 food-grade stainless steel. BPA-free, leak-proof lid. Fits most car cup holders.",
    badge: "Top Rated",
    stock: 120,
    brand: "HydroSip"
  },
  {
    id: 9,
    name: "Scented Soy Candle Set",
    category: "Home",
    price: 4149,
    originalPrice: 5394,
    discount: 23,
    rating: 4.6,
    reviews: 2341,
    image: "images/candle.jpg",
    description: "Create a cozy atmosphere with our handcrafted soy candle set. Comes with 4 unique scents: Lavender Dreams, Vanilla Oak, Fresh Linen, and Citrus Burst. 45+ hours burn time each. Gift-ready packaging.",
    badge: "Gift Set",
    stock: 43,
    brand: "GlowCraft"
  },
  {
    id: 10,
    name: "Yoga Mat Premium",
    category: "Sports",
    price: 4564,
    originalPrice: 6224,
    discount: 27,
    rating: 4.7,
    reviews: 3012,
    image: "images/yoga-mat.jpg",
    description: "Elevate your practice with this eco-friendly, non-slip yoga mat. 6mm thick for joint support. Made from natural tree rubber. Includes alignment lines, carry strap, and microfiber towel. Perfect for yoga, pilates, and stretching.",
    badge: "Eco-Friendly",
    stock: 56,
    brand: "ZenFlow"
  }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Show a toast notification
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const icons = { success: '✅', error: '❌', info: 'ℹ️', cart: '🛒' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.success}</span> ${message}`;
  container.appendChild(toast);

  // Remove after 3 seconds
  setTimeout(() => toast.remove(), 3100);
}

// Format price as INR
function formatPrice(price) {
  return `₹${Math.round(parseFloat(price)).toLocaleString("en-IN")}`;
}

// Generate star rating HTML
function generateStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = '';
  for (let i = 0; i < full; i++) stars += '★';
  if (half) stars += '½';
  while (stars.replace('½', '').length < 5) stars += '☆';
  return stars;
}

// Get cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('shopifyCart') || '[]');
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('shopifyCart', JSON.stringify(cart));
  updateCartBadge();
}

// Update cart badge count in navbar
function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (!badge) return;
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

// Check if user is logged in
function isLoggedIn() {
  return !!localStorage.getItem('shopifyCurrentUser');
}

// Get current user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('shopifyCurrentUser') || 'null');
}

// Protect page: redirect if not logged in
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'index.html';
  }
}

// ============================================
// LOADING ANIMATION
// ============================================
function initLoader() {
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) {
    setTimeout(() => overlay.classList.add('hidden'), 700);
  }
}

// ============================================
// DARK MODE
// ============================================
function initDarkMode() {
  const isDark = localStorage.getItem('shopifyDarkMode') === 'true';
  if (isDark) document.body.classList.add('dark-mode');

  const toggle = document.getElementById('darkToggle');
  if (toggle) {
    toggle.textContent = isDark ? '☀️' : '🌙';
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const dark = document.body.classList.contains('dark-mode');
      localStorage.setItem('shopifyDarkMode', dark);
      toggle.textContent = dark ? '☀️' : '🌙';
    });
  }
}

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
  updateCartBadge();

  // Hamburger menu for mobile
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('shopifyCurrentUser');
      showToast('Logged out successfully!', 'info');
      setTimeout(() => window.location.href = 'index.html', 1000);
    });
  }

  // Show user name if logged in
  const userGreet = document.getElementById('userGreeting');
  if (userGreet) {
    const user = getCurrentUser();
    if (user) userGreet.textContent = `Hi, ${user.name.split(' ')[0]}!`;
  }
}

// ============================================
// AUTH PAGES (Login & Register)
// ============================================

// Toggle password visibility
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

// --- REGISTER ---
function initRegister() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  // Redirect if already logged in
  if (isLoggedIn()) { window.location.href = 'home.html'; return; }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name     = document.getElementById('regName').value.trim();
    const email    = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirm  = document.getElementById('regConfirm').value;

    // Clear previous errors
    document.querySelectorAll('.field-error').forEach(el => el.classList.remove('visible'));

    // Validate Name
    if (name.length < 2) {
      showError('nameError', 'Name must be at least 2 characters.');
      valid = false;
    }

    // Validate Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('emailError', 'Please enter a valid email address.');
      valid = false;
    }

    // Validate Password
    if (password.length < 6) {
      showError('passwordError', 'Password must be at least 6 characters.');
      valid = false;
    }

    // Validate Confirm Password
    if (password !== confirm) {
      showError('confirmError', 'Passwords do not match.');
      valid = false;
    }

    if (!valid) return;

    // Check if email already registered
    const users = JSON.parse(localStorage.getItem('shopifyUsers') || '[]');
    if (users.find(u => u.email === email)) {
      showError('emailError', 'This email is already registered. Please login.');
      return;
    }

    // Save new user
    const newUser = { name, email, password, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('shopifyUsers', JSON.stringify(users));

    showToast('Account created! Redirecting to login...', 'success');
    setTimeout(() => window.location.href = 'index.html', 1500);
  });
}

// --- LOGIN ---
function initLogin() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  // Redirect if already logged in
  if (isLoggedIn()) { window.location.href = 'home.html'; return; }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const email    = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    document.querySelectorAll('.field-error').forEach(el => el.classList.remove('visible'));

    if (!email) { showError('loginEmailError', 'Email is required.'); valid = false; }
    if (!password) { showError('loginPasswordError', 'Password is required.'); valid = false; }
    if (!valid) return;

    const users = JSON.parse(localStorage.getItem('shopifyUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      showError('loginEmailError', 'Invalid email or password. Please try again.');
      showToast('Login failed. Check your credentials.', 'error');
      return;
    }

    // Save current user session
    localStorage.setItem('shopifyCurrentUser', JSON.stringify(user));
    showToast(`Welcome back, ${user.name.split(' ')[0]}! 🎉`, 'success');
    setTimeout(() => window.location.href = 'home.html', 1200);
  });
}

// Helper: show field error message
function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.classList.add('visible'); }
}

// ============================================
// HOME PAGE - Product Listing
// ============================================
function initHomePage() {
  requireAuth();

  const grid = document.getElementById('productsGrid');
  const searchInput = document.getElementById('searchInput');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const countEl = document.getElementById('productsCount');

  let currentCategory = 'All';
  let searchQuery = '';

  function renderProducts() {
    let filtered = PRODUCTS.filter(p => {
      const matchCat = currentCategory === 'All' || p.category === currentCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (countEl) countEl.textContent = `${filtered.length} products found`;

    if (!grid) return;

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="no-products">
        <div class="emoji">🔍</div>
        <h3>No products found</h3>
        <p>Try a different search or category.</p>
      </div>`;
      return;
    }

    grid.innerHTML = filtered.map(p => `
      <div class="product-card" onclick="goToProduct(${p.id})">
        <div class="product-img-wrap">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          <button class="product-wishlist" onclick="toggleWishlist(event, ${p.id})" id="wish-${p.id}" title="Wishlist">♡</button>
        </div>
        <div class="product-body">
          <div class="product-category">${p.category}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-rating">
            <span class="stars">${generateStars(p.rating)}</span>
            <span class="rating-count">(${p.reviews.toLocaleString()})</span>
          </div>
          <div class="product-price-row">
            <span class="product-price">${formatPrice(p.price)}</span>
            <span class="product-price-original">${formatPrice(p.originalPrice)}</span>
            <span class="product-discount">${p.discount}% off</span>
          </div>
          <button class="btn-add-cart" onclick="addToCartFromHome(event, ${p.id})">
            🛒 Add to Cart
          </button>
        </div>
      </div>
    `).join('');

    // Restore wishlist state
    const wishlist = JSON.parse(localStorage.getItem('shopifyWishlist') || '[]');
    wishlist.forEach(id => {
      const btn = document.getElementById(`wish-${id}`);
      if (btn) { btn.textContent = '♥'; btn.classList.add('active'); }
    });
  }

  // Search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Category filter
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      renderProducts();
    });
  });

  renderProducts();
}

// Navigate to product detail
function goToProduct(id) {
  localStorage.setItem('shopifyViewProduct', id);
  window.location.href = 'product.html';
}

// Add to cart from home page
function addToCartFromHome(e, id) {
  e.stopPropagation();
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  addToCart(product, 1);
  showToast(`"${product.name}" added to cart! 🛒`, 'cart');
}

// Toggle wishlist
function toggleWishlist(e, id) {
  e.stopPropagation();
  const wishlist = JSON.parse(localStorage.getItem('shopifyWishlist') || '[]');
  const btn = document.getElementById(`wish-${id}`);
  const idx = wishlist.indexOf(id);

  if (idx === -1) {
    wishlist.push(id);
    if (btn) { btn.textContent = '♥'; btn.classList.add('active'); }
    showToast('Added to wishlist! ❤️', 'success');
  } else {
    wishlist.splice(idx, 1);
    if (btn) { btn.textContent = '♡'; btn.classList.remove('active'); }
    showToast('Removed from wishlist', 'info');
  }

  localStorage.setItem('shopifyWishlist', JSON.stringify(wishlist));
}

// ============================================
// PRODUCT DETAIL PAGE
// ============================================
function initProductPage() {
  requireAuth();

  const id = parseInt(localStorage.getItem('shopifyViewProduct'));
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    window.location.href = 'home.html';
    return;
  }

  // Populate product details
  document.getElementById('detailImage').src = product.image;
  document.getElementById('detailImage').alt = product.name;
  document.getElementById('detailCategory').textContent = product.category;
  document.getElementById('detailName').textContent = product.name;
  document.getElementById('detailStars').textContent = generateStars(product.rating);
  document.getElementById('detailRatingCount').textContent = `${product.reviews.toLocaleString()} reviews`;
  document.getElementById('detailPrice').textContent = formatPrice(product.price);
  document.getElementById('detailOriginalPrice').textContent = formatPrice(product.originalPrice);
  document.getElementById('detailDiscount').textContent = `${product.discount}% off`;
  document.getElementById('detailDescription').textContent = product.description;
  document.getElementById('detailBrand').textContent = product.brand;
  document.getElementById('detailStock').textContent = `${product.stock} units`;
  document.title = `${product.name} - Shopify`;

  // Breadcrumb link
  const bcLink = document.getElementById('breadcrumbCategory');
  if (bcLink) bcLink.textContent = product.category;

  // Quantity control
  let qty = 1;
  const qtyVal = document.getElementById('qtyValue');

  document.getElementById('qtyMinus').addEventListener('click', () => {
    if (qty > 1) { qty--; qtyVal.textContent = qty; }
  });

  document.getElementById('qtyPlus').addEventListener('click', () => {
    if (qty < product.stock) { qty++; qtyVal.textContent = qty; }
  });

  // Add to Cart button
  document.getElementById('detailAddCart').addEventListener('click', () => {
    addToCart(product, qty);
    showToast(`${qty}x "${product.name}" added to cart! 🛒`, 'cart');
  });

  // Buy Now button
  document.getElementById('detailBuyNow').addEventListener('click', () => {
    addToCart(product, qty);
    window.location.href = 'cart.html';
  });
}

// ============================================
// CART FUNCTIONS
// ============================================

// Add product to cart
function addToCart(product, qty) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      qty: qty
    });
  }

  saveCart(cart);
}

// ============================================
// CART PAGE
// ============================================
function initCartPage() {
  requireAuth();
  renderCart();
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cartItemsContainer');
  const emptyState = document.getElementById('cartEmpty');
  const cartLayout = document.getElementById('cartLayout');

  if (cart.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    if (cartLayout) cartLayout.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (cartLayout) cartLayout.style.display = 'grid';

  if (container) {
    container.innerHTML = cart.map(item => `
      <div class="cart-item" id="cart-item-${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onclick="goToProduct(${item.id})">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-category">${item.category}</div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
        </div>
        <div class="cart-item-controls">
          <div class="cart-qty-control">
            <button class="cart-qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
            <span class="cart-qty-val" id="qty-${item.id}">${item.qty}</span>
            <button class="cart-qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          </div>
          <div class="cart-item-total" id="total-${item.id}">${formatPrice(item.price * item.qty)}</div>
          <button class="btn-remove" onclick="removeFromCart(${item.id})" title="Remove item">🗑️</button>
        </div>
      </div>
    `).join('');
  }

  updateCartSummary();
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);

  // Update DOM without full re-render
  const qtyEl = document.getElementById(`qty-${id}`);
  const totalEl = document.getElementById(`total-${id}`);
  if (qtyEl) qtyEl.textContent = item.qty;
  if (totalEl) totalEl.textContent = formatPrice(item.price * item.qty);
  updateCartSummary();
}

function removeFromCart(id) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  cart = cart.filter(i => i.id !== id);
  saveCart(cart);

  if (item) showToast(`"${item.name}" removed from cart`, 'info');
  renderCart();
}

function updateCartSummary() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 4149 ? 0 : 829;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  setEl('summarySubtotal', formatPrice(subtotal));
  setEl('summaryShipping', shipping === 0 ? '<span class="free">FREE</span>' : formatPrice(shipping));
  setEl('summaryTax', formatPrice(tax));
  setEl('summaryTotal', formatPrice(total));
}

function setEl(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

// Proceed to checkout
function proceedToCheckout() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }
  window.location.href = 'checkout.html';
}

// ============================================
// CHECKOUT PAGE
// ============================================
function initCheckoutPage() {
  requireAuth();

  const cart = getCart();
  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  // Render order review
  const reviewContainer = document.getElementById('orderReviewItems');
  if (reviewContainer) {
    reviewContainer.innerHTML = cart.map(item => `
      <div class="review-item">
        <img src="${item.image}" alt="${item.name}">
        <span class="review-item-name">${item.name}</span>
        <span class="review-item-qty">× ${item.qty}</span>
        <span class="review-item-price">${formatPrice(item.price * item.qty)}</span>
      </div>
    `).join('');
  }

  // Pre-fill user data
  const user = getCurrentUser();
  if (user) {
    const nameField = document.getElementById('checkoutName');
    const emailField = document.getElementById('checkoutEmail');
    if (nameField) nameField.value = user.name;
    if (emailField) emailField.value = user.email;
  }

  // Update summary totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 4149 ? 0 : 829;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  setEl('checkoutSubtotal', formatPrice(subtotal));
  setEl('checkoutShipping', shipping === 0 ? 'FREE' : formatPrice(shipping));
  setEl('checkoutTax', formatPrice(tax));
  setEl('checkoutTotal', formatPrice(total));

  // Place Order form
  const form = document.getElementById('checkoutForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      placeOrder(total);
    });
  }
}

function placeOrder(total) {
  const name    = document.getElementById('checkoutName').value.trim();
  const email   = document.getElementById('checkoutEmail').value.trim();
  const phone   = document.getElementById('checkoutPhone').value.trim();
  const address = document.getElementById('checkoutAddress').value.trim();
  const city    = document.getElementById('checkoutCity').value.trim();
  const zip     = document.getElementById('checkoutZip').value.trim();

  // Basic validation
  if (!name || !email || !phone || !address || !city || !zip) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }
  if (!/^\d{10,15}$/.test(phone.replace(/[\s\-\+]/g, ''))) {
    showToast('Please enter a valid phone number.', 'error');
    return;
  }

  const cart = getCart();
  const orderId = 'ORD-' + Date.now().toString(36).toUpperCase();

  // Delivery date: 5-7 days from now
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 5);

  const order = {
    orderId,
    customer: { name, email, phone, address: `${address}, ${city} - ${zip}` },
    items: cart,
    subtotal: cart.reduce((s, i) => s + i.price * i.qty, 0),
    total,
    deliveryDate: deliveryDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    placedAt: new Date().toISOString()
  };

  // Save order history
  const orders = JSON.parse(localStorage.getItem('shopifyOrders') || '[]');
  orders.unshift(order);
  localStorage.setItem('shopifyOrders', JSON.stringify(orders));
  localStorage.setItem('shopifyLastOrder', JSON.stringify(order));

  // Clear cart
  saveCart([]);

  // Redirect to confirmation
  window.location.href = 'order.html';
}

// ============================================
// ORDER CONFIRMATION PAGE
// ============================================
function initOrderPage() {
  requireAuth();

  const order = JSON.parse(localStorage.getItem('shopifyLastOrder') || 'null');
  if (!order) {
    window.location.href = 'home.html';
    return;
  }

  setEl('orderIdDisplay', order.orderId);
  setEl('orderCustomerName', order.customer.name);
  setEl('orderCustomerEmail', order.customer.email);
  setEl('orderCustomerPhone', order.customer.phone);
  setEl('orderCustomerAddress', order.customer.address);
  setEl('orderDeliveryDate', order.deliveryDate);
  setEl('orderPlacedDate', new Date(order.placedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));

  // Render ordered items
  const itemsContainer = document.getElementById('orderItemsList');
  if (itemsContainer) {
    itemsContainer.innerHTML = order.items.map(item => `
      <div class="order-item-row">
        <img src="${item.image}" alt="${item.name}">
        <span class="order-item-name">${item.name}</span>
        <span class="order-item-qty">× ${item.qty}</span>
        <span class="order-item-price">${formatPrice(item.price * item.qty)}</span>
      </div>
    `).join('');
  }

  // Totals
  const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 4149 ? 0 : 829;
  const tax = subtotal * 0.08;

  setEl('orderSubtotalAmt', formatPrice(subtotal));
  setEl('orderShippingAmt', shipping === 0 ? 'FREE' : formatPrice(shipping));
  setEl('orderTaxAmt', formatPrice(tax));
  setEl('orderGrandTotal', formatPrice(order.total));
}

// ============================================
// INIT ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initDarkMode();
  initNavbar();

  const page = document.body.dataset.page;

  switch (page) {
    case 'login':    initLogin();    break;
    case 'register': initRegister(); break;
    case 'home':     initHomePage(); break;
    case 'product':  initProductPage(); break;
    case 'cart':     initCartPage(); break;
    case 'checkout': initCheckoutPage(); break;
    case 'order':    initOrderPage(); break;
  }
});
