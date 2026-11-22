/* ============================================
   THE FASHION — Main JavaScript
   Cart, Filtering, Forms, UI Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- CART STATE ----
  let cart = JSON.parse(localStorage.getItem('theFashionCart')) || [];

  function saveCart() {
    localStorage.setItem('theFashionCart', JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const countEls = document.querySelectorAll('.cart-count');
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    countEls.forEach(el => {
      el.textContent = total;
      el.classList.toggle('hidden', total === 0);
    });
  }

  function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    renderCartSidebar();
    openCart();
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCartSidebar();
  }

  function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    saveCart();
    renderCartSidebar();
  }

  function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // ---- CART SIDEBAR ----
  const cartSidebar = document.querySelector('.cart-sidebar');
  const cartOverlay = document.querySelector('.cart-overlay');
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartFooter = document.querySelector('.cart-footer');

  function openCart() {
    if (cartSidebar) cartSidebar.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (cartSidebar) cartSidebar.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Cart button(s)
  document.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  });

  // Close cart
  document.querySelectorAll('.close-cart').forEach(btn => {
    btn.addEventListener('click', closeCart);
  });

  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }

  function renderCartSidebar() {
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty">
          <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <p>Your cart is empty</p>
          <a href="shop.html" class="btn btn-primary btn-sm">Browse Collection</a>
        </div>
      `;
      if (cartFooter) cartFooter.style.display = 'none';
      return;
    }

    if (cartFooter) cartFooter.style.display = 'block';

    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}" onerror="this.style.background='#333'">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
          <div class="cart-item-controls">
            <button class="qty-btn qty-minus" data-id="${item.id}">−</button>
            <span class="cart-item-qty">${item.quantity}</span>
            <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
            <button class="remove-item" data-id="${item.id}">Remove</button>
          </div>
        </div>
      </div>
    `).join('');

    // Update total
    const totalEl = document.querySelector('.cart-total-amount');
    if (totalEl) {
      totalEl.textContent = `₹${getCartTotal().toLocaleString('en-IN')}`;
    }

    // Cart item count in header
    const cartItemCountEl = document.querySelector('.cart-item-count');
    if (cartItemCountEl) {
      const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
      cartItemCountEl.textContent = `(${totalItems} item${totalItems !== 1 ? 's' : ''})`;
    }

    // Event listeners
    cartItemsContainer.querySelectorAll('.qty-minus').forEach(btn => {
      btn.addEventListener('click', () => updateQuantity(parseInt(btn.dataset.id), -1));
    });
    cartItemsContainer.querySelectorAll('.qty-plus').forEach(btn => {
      btn.addEventListener('click', () => updateQuantity(parseInt(btn.dataset.id), 1));
    });
    cartItemsContainer.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id)));
    });
  }

  // ---- RENDER PRODUCTS ----
  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;

    card.innerHTML = `
      <div class="product-card-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.parentElement.style.background='#252525'">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      </div>
      <div class="product-card-body">
        <div class="product-category">${product.category}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    `;

    // Add to cart
    const addBtn = card.querySelector('.add-to-cart-btn');
    addBtn.addEventListener('click', () => {
      addToCart(product);
      addBtn.textContent = '✓ Added';
      addBtn.classList.add('added');
      setTimeout(() => {
        addBtn.textContent = 'Add to Cart';
        addBtn.classList.remove('added');
      }, 1500);
    });

    return card;
  }

  // Featured products on homepage
  const featuredGrid = document.querySelector('.featured-products .products-grid');
  if (featuredGrid && typeof featuredProducts !== 'undefined') {
    featuredProducts.forEach(product => {
      featuredGrid.appendChild(createProductCard(product));
    });
  }

  // Shop page products
  const shopGrid = document.querySelector('.shop-section .products-grid');
  if (shopGrid && typeof allProducts !== 'undefined') {
    allProducts.forEach(product => {
      shopGrid.appendChild(createProductCard(product));
    });

    // Update product count
    const countEl = document.querySelector('.product-count');
    if (countEl) {
      countEl.textContent = `Showing ${allProducts.length} products`;
    }
  }

  // ---- SHOP FILTERS ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;
      const cards = document.querySelectorAll('.shop-section .product-card');
      let visibleCount = 0;

      cards.forEach(card => {
        if (category === 'All' || card.dataset.category === category) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      const countEl = document.querySelector('.product-count');
      if (countEl) {
        countEl.textContent = `Showing ${visibleCount} product${visibleCount !== 1 ? 's' : ''}`;
      }
    });
  });

  // ---- HEADER SCROLL ----
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ---- MOBILE NAV ----
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- TOAST NOTIFICATION ----
  function showToast(message, type = 'success') {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : '✕'}</span>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // ---- CONTACT FORM ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Message sent successfully! We\'ll get back to you soon.');
      contactForm.reset();
    });
  }

  // ---- CHECKOUT ----
  const checkoutForm = document.getElementById('checkoutForm');
  const orderItemsContainer = document.querySelector('.order-items');
  const orderTotalsContainer = document.querySelector('.order-totals');

  // Render order summary on checkout page
  if (orderItemsContainer && orderTotalsContainer) {
    renderOrderSummary();
  }

  function renderOrderSummary() {
    if (!orderItemsContainer) return;

    if (cart.length === 0) {
      orderItemsContainer.innerHTML = '<p style="color:var(--gray-400);text-align:center;padding:20px;">Your cart is empty. <a href="shop.html">Shop now</a></p>';
      orderTotalsContainer.innerHTML = '';
      return;
    }

    orderItemsContainer.innerHTML = cart.map(item => `
      <div class="order-item">
        <div class="order-item-img">
          <img src="${item.image}" alt="${item.name}" onerror="this.style.background='#333'">
        </div>
        <div class="order-item-details">
          <div class="order-item-name">${item.name}</div>
          <div class="order-item-qty">Qty: ${item.quantity}</div>
        </div>
        <div class="order-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
      </div>
    `).join('');

    const subtotal = getCartTotal();
    const shipping = subtotal >= 5000 ? 0 : 199;
    const total = subtotal + shipping;

    orderTotalsContainer.innerHTML = `
      <div class="order-row">
        <span>Subtotal</span>
        <span>₹${subtotal.toLocaleString('en-IN')}</span>
      </div>
      <div class="order-row ${shipping === 0 ? 'free-shipping' : ''}">
        <span>Shipping</span>
        <span>${shipping === 0 ? 'Free' : '₹' + shipping}</span>
      </div>
      <div class="order-row total">
        <span>Total</span>
        <span>₹${total.toLocaleString('en-IN')}</span>
      </div>
    `;
  }

  // Payment method selection
  const paymentOptions = document.querySelectorAll('.payment-option');
  paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
      paymentOptions.forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      option.querySelector('input[type="radio"]').checked = true;
    });
  });

  // Checkout form submit
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (cart.length === 0) {
        showToast('Your cart is empty. Add items before checkout.', 'error');
        return;
      }

      // Validate payment method
      const paymentSelected = document.querySelector('input[name="payment"]:checked');
      if (!paymentSelected) {
        showToast('Please select a payment method.', 'error');
        return;
      }

      // Simulate order
      const orderId = 'TF' + Date.now().toString(36).toUpperCase();
      showToast(`Order ${orderId} placed successfully! Redirecting...`);

      // Clear cart
      cart = [];
      saveCart();

      // Simulate redirect
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2500);
    });
  }

  // ---- INIT ----
  updateCartCount();
  renderCartSidebar();

});
