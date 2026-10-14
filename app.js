/**
 * paunaderia - Interactive E-commerce Engine
 * Handles catalog rendering, category filtering, cart management,
 * shipping calculation, WhatsApp checkout generator, and quick view modal.
 */

// 1. Initial Products Catalog
// Note: When you provide images, simply place them in the 'assets/images/' folder
// with the filename specified below or update the 'image' property.
const PRODUCTS = [
  {
    id: 'hogaza-campagne',
    name: 'Hogaza Campagne Rústica',
    category: 'masa-madre',
    categoryName: 'Masa Madre & Hogazas',
    price: 4.80,
    weight: '850 g aprox.',
    fermentation: '36h reposo en frío',
    flours: 'Trigo molido a la piedra T80 + 15% Centeno integral',
    description: 'Nuestra hogaza insignia. Corteza gruesa, caramelizada y crujiente con miga alveolada, húmeda y de acidez balanceada.',
    badge: 'Estrella del Obrador',
    badgeType: 'badge-highlight',
    icon: '🍞',
    image: 'assets/images/hogaza-campagne.jpg',
    popularScore: 98,
    allergens: 'Gluten. Puede contener trazas de sésamo.'
  },
  {
    id: 'croissant-mantequilla',
    name: 'Croissant Hojaldrado de Mantequilla',
    category: 'viennoiserie',
    categoryName: 'Bollería & Viennoiserie',
    price: 2.20,
    weight: '90 g',
    fermentation: '24h laminado en frío',
    flours: 'Harina de fuerza ecológica y mantequilla 84% M.G.',
    description: 'Hojaldre de capas infinitas, crujiente por fuera y con corazón suave y alveolado que funde en boca.',
    badge: 'Recién Salido',
    badgeType: 'badge-fermentation',
    icon: '🥐',
    image: 'assets/images/croissant-mantequilla.jpg',
    popularScore: 95,
    allergens: 'Gluten, lácteos, huevo.'
  },
  {
    id: 'baguette-tradition',
    name: 'Baguette Tradition Francesa',
    category: 'especiales',
    categoryName: 'Baguettes & Especiales',
    price: 1.80,
    weight: '280 g',
    fermentation: '24h autólisis y fermentación',
    flours: 'Trigo limpio Label Rouge sin blanqueantes',
    description: 'Elaborada según la tradición parisina. Corteza fina y quebradiza, puntas crujientes y miga aireada color crema.',
    badge: 'Crujiente Diario',
    badgeType: 'badge-fermentation',
    icon: '🥖',
    image: 'assets/images/baguette-tradition.jpg',
    popularScore: 90,
    allergens: 'Gluten.'
  },
  {
    id: 'galletas-chocolate',
    name: 'Galletas de Chocolate Artesanas',
    category: 'viennoiserie',
    categoryName: 'Bollería & Viennoiserie',
    price: 3.50,
    weight: 'Paquete de 6 uds.',
    fermentation: 'Reposo de masa 12h en frío',
    flours: 'Harina de trigo eco, mantequilla y pepitas de chocolate negro 70%',
    description: 'Bordes crujientes y centro tierno y fundente, cargadas de generosas pepitas de chocolate negro.',
    badge: 'Favorito Dulce',
    badgeType: 'badge-highlight',
    icon: '🍪',
    image: 'assets/images/galletas-chocolate.jpg',
    popularScore: 93,
    allergens: 'Gluten, lácteos, huevo, soja.'
  },
  {
    id: 'focaccia-romero',
    name: 'Focaccia Genovesa de Romero & Sal Maldon',
    category: 'especiales',
    categoryName: 'Baguettes & Especiales',
    price: 3.90,
    weight: '400 g',
    fermentation: '18h alta hidratación (85%)',
    flours: 'Trigo molido piedra, Aceite de Oliva Virgen Extra cosecha temprana y romero fresco',
    description: 'Esponjosa y jugosa por dentro con fondo dorado crocante impregnado en el mejor AOVE.',
    badge: 'Vegano',
    badgeType: 'badge-vegan',
    icon: '🌿',
    image: 'assets/images/focaccia-romero.jpg',
    popularScore: 87,
    allergens: 'Gluten.'
  },
  {
    id: 'rollo-canela',
    name: 'Rollo de Canela Glaseado',
    category: 'viennoiserie',
    categoryName: 'Bollería & Viennoiserie',
    price: 3.20,
    weight: '140 g',
    fermentation: 'Fermentación lenta de 18h',
    flours: 'Masa de brioche enrollada con canela de Ceilán y glaseado de queso crema',
    description: 'Espiral tierna y especiada coronada con un generoso glaseado de queso crema recién hecho.',
    badge: 'Tierno 4 días',
    badgeType: 'badge-fermentation',
    icon: '🌀',
    image: 'assets/images/rollo-canela.jpg',
    popularScore: 91,
    allergens: 'Gluten, lácteos, huevos.'
  },
  {
    id: 'tarta-zanahoria',
    name: 'Tarta de Zanahoria con Queso Crema',
    category: 'packs',
    categoryName: 'Packs & Desayunos',
    price: 4.50,
    weight: 'Porción 180 g',
    fermentation: 'Horneado artesano diario',
    flours: 'Zanahoria fresca, nueces, especias y cobertura de queso crema batido',
    description: 'Tres capas jugosas de bizcocho especiado con nueces, cubiertas de un suave frosting de queso crema.',
    badge: 'Recién Horneada',
    badgeType: 'badge-highlight',
    icon: '🥕',
    image: 'assets/images/tarta-zanahoria.jpg',
    popularScore: 94,
    allergens: 'Gluten, lácteos, huevo, frutos secos.'
  },
  {
    id: 'mermelada-fresa',
    name: 'Mermelada de Fresa Casera',
    category: 'packs',
    categoryName: 'Packs & Desayunos',
    price: 4.20,
    weight: 'Tarro 250 g',
    fermentation: 'Cocción lenta artesanal',
    flours: 'Fresas de temporada, azúcar de caña y un toque de limón',
    description: 'Elaborada en pequeños lotes con fruta madura, perfecta para untar en nuestras hogazas y tostadas.',
    badge: 'Hecho a Mano',
    badgeType: 'badge-vegan',
    icon: '🍓',
    image: 'assets/images/mermelada-fresa.jpg',
    popularScore: 85,
    allergens: 'Ninguno. Puede contener trazas de frutos secos.'
  },
  {
    id: 'pack-desayuno-obrador',
    name: 'Pack Desayuno Obrador',
    category: 'packs',
    categoryName: 'Packs & Desayunos',
    price: 9.90,
    weight: 'Caja Completa',
    fermentation: 'Combinación artesana',
    flours: 'Selección de nuestras mejores harinas ecológicas',
    description: '1 Croissant de mantequilla + 1 Pan de semillas + 1 Tarro de mermelada de fresa casera, listo para regalar o disfrutar.',
    badge: 'Ahorro 15%',
    badgeType: 'badge-highlight',
    icon: '🎁',
    image: 'assets/images/pack-obrador.jpg',
    popularScore: 99,
    allergens: 'Gluten, lácteos, huevo.'
  }
];

// 2. Application State
const state = {
  cart: JSON.parse(localStorage.getItem('paunaderia_cart') || '[]'),
  currentCategory: 'todos',
  searchQuery: '',
  sortBy: 'destacados',
  freeShippingThreshold: 25.00,
  shippingCost: 3.50
};

// 3. DOM Elements
const productsGrid = document.getElementById('productsGrid');
const emptyState = document.getElementById('emptyState');
const resultsCount = document.getElementById('resultsCount');
const categoryTabs = document.getElementById('categoryTabs');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');

// Cart Drawer Elements
const cartTrigger = document.getElementById('cartTrigger');
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartCloseBtn = document.getElementById('cartCloseBtn');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartCount = document.getElementById('cartCount');
const cartItemsSubtitle = document.getElementById('cartItemsSubtitle');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartShippingCost = document.getElementById('cartShippingCost');
const cartTotal = document.getElementById('cartTotal');
const shippingText = document.getElementById('shippingText');
const shippingProgressFill = document.getElementById('shippingProgressFill');
const checkoutBtn = document.getElementById('checkoutBtn');
const whatsappOrderBtn = document.getElementById('whatsappOrderBtn');
const breadCutOption = document.getElementById('breadCutOption');
const deliverySlotOption = document.getElementById('deliverySlotOption');

// Quick View Modal
const productModal = document.getElementById('productModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalBody = document.getElementById('modalBody');

// Toast Notification
const toastNotification = document.getElementById('toastNotification');
const toastMessage = document.getElementById('toastMessage');

// Checkout Confirmation Modal
const checkoutModal = document.getElementById('checkoutModal');
const checkoutSummaryBox = document.getElementById('checkoutSummaryBox');
const closeCheckoutModalBtn = document.getElementById('closeCheckoutModalBtn');

// Set Current Year in Footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ==========================================================================
// Initialization
// ==========================================================================
function init() {
  renderCatalog();
  updateCartUI();
  setupEventListeners();
  injectStructuredData();
}

// ==========================================================================
// Structured Data for Crawlers / AI Image Tools (Higgsfield, bots, etc.)
// Emits a schema.org ItemList of Products with absolute image URLs so the
// full catalog + photos can be read from a single <script type="application/ld+json">
// block without needing to parse the rendered DOM.
// ==========================================================================
function injectStructuredData() {
  const origin = window.location.href.replace(/index\.html.*$/, '').replace(/\/?$/, '/');

  const itemListElement = PRODUCTS.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Product',
      sku: product.id,
      name: product.name,
      category: product.categoryName,
      description: product.description,
      image: origin + product.image,
      weight: product.weight,
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'fermentacion', value: product.fermentation },
        { '@type': 'PropertyValue', name: 'harinas', value: product.flours },
        { '@type': 'PropertyValue', name: 'alergenos', value: product.allergens }
      ],
      offers: {
        '@type': 'Offer',
        price: product.price.toFixed(2),
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: origin + '#catalogo'
      }
    }
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Catálogo paunaderia',
    itemListElement
  };

  let script = document.getElementById('productCatalogJsonLd');
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'productCatalogJsonLd';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(jsonLd, null, 2);
}

// ==========================================================================
// Catalog Logic
// ==========================================================================
function getFilteredProducts() {
  return PRODUCTS.filter(product => {
    // Category filter
    const matchesCategory = state.currentCategory === 'todos' || product.category === state.currentCategory;
    
    // Search query filter
    const query = state.searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.flours.toLowerCase().includes(query) ||
      product.categoryName.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (state.sortBy === 'precio-menor') return a.price - b.price;
    if (state.sortBy === 'precio-mayor') return b.price - a.price;
    if (state.sortBy === 'popular') return b.popularScore - a.popularScore;
    return 0; // 'destacados' keeps default order
  });
}

function renderCatalog() {
  const filtered = getFilteredProducts();

  if (filtered.length === 0) {
    productsGrid.innerHTML = '';
    emptyState.style.display = 'block';
    resultsCount.textContent = '0 panes encontrados';
    return;
  }

  emptyState.style.display = 'none';
  resultsCount.textContent = `Mostrando ${filtered.length} producto${filtered.length > 1 ? 's' : ''}`;

  productsGrid.innerHTML = filtered.map(product => {
    return `
      <article class="product-card" data-id="${product.id}" data-sku="${product.id}" data-category="${product.category}" data-price="${product.price.toFixed(2)}" data-currency="EUR" data-image="${product.image}" itemscope itemtype="https://schema.org/Product">
        <meta itemprop="sku" content="${product.id}">
        <meta itemprop="category" content="${product.categoryName}">
        <div class="product-thumb-wrap" onclick="openProductModal('${product.id}')" title="Ver detalles de ${product.name}">
          ${product.badge ? `<div class="product-badges"><span class="badge ${product.badgeType}">${product.badge}</span></div>` : ''}

          <img
            src="${product.image}"
            alt="${product.name} - ${product.categoryName} de paunaderia, ${product.weight}"
            class="product-thumb"
            loading="lazy"
            itemprop="image"
            data-product-id="${product.id}"
            data-product-name="${product.name}"
            onerror="handleImageError(this, '${product.icon}', '${product.name}')"
          >

          <button class="quick-view-btn" onclick="event.stopPropagation(); openProductModal('${product.id}')" aria-label="Ver detalles">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
        </div>

        <div class="product-details">
          <div class="product-category-name">${product.categoryName}</div>
          <h3 class="product-title" itemprop="name" onclick="openProductModal('${product.id}')" style="cursor: pointer;">${product.name}</h3>
          <p class="product-description" itemprop="description">${product.description}</p>

          <div class="product-meta-tags">
            <span class="meta-pill">⏱️ ${product.fermentation}</span>
            <span class="meta-pill">⚖️ ${product.weight}</span>
          </div>

          <div class="product-footer-row" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <meta itemprop="priceCurrency" content="EUR">
            <meta itemprop="price" content="${product.price.toFixed(2)}">
            <meta itemprop="availability" content="https://schema.org/InStock">
            <div class="product-price-wrap">
              <span class="product-price">${formatCurrency(product.price)}</span>
              <span class="product-weight">${product.weight}</span>
            </div>

            <button class="add-cart-btn" onclick="addToCart('${product.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              <span>Añadir</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Graceful fallback for products before the user uploads their own photo
window.handleImageError = function(imgElement, icon, name) {
  const container = imgElement.parentElement;
  imgElement.style.display = 'none';

  // Check if placeholder is already inserted
  if (!container.querySelector('.placeholder-thumb')) {
    const placeholder = document.createElement('div');
    placeholder.className = 'placeholder-thumb';
    placeholder.innerHTML = `
      <span class="placeholder-icon">${icon || '🥖'}</span>
      <span class="placeholder-badge">Foto próximamente</span>
    `;
    container.prepend(placeholder);
  }
};

// ==========================================================================
// Cart Management
// ==========================================================================
function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = state.cart.findIndex(item => item.id === productId);

  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      weight: product.weight,
      image: product.image,
      icon: product.icon,
      quantity: quantity
    });
  }

  saveCart();
  updateCartUI();
  showToast(`¡Añadido "${product.name}" a la cesta!`);

  // Animate cart badge
  cartCount.classList.remove('bump');
  void cartCount.offsetWidth; // trigger reflow
  cartCount.classList.add('bump');
}

function updateCartQuantity(productId, newQty) {
  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }

  const item = state.cart.find(i => i.id === productId);
  if (item) {
    item.quantity = newQty;
    saveCart();
    updateCartUI();
  }
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('paunaderia_cart', JSON.stringify(state.cart));
}

function calculateCartTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isFreeShipping = subtotal >= state.freeShippingThreshold || subtotal === 0;
  const shipping = isFreeShipping ? 0 : state.shippingCost;
  const total = subtotal + shipping;

  return { subtotal, shipping, total, isFreeShipping };
}

function updateCartUI() {
  const totalCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = totalCount;
  cartItemsSubtitle.textContent = `${totalCount} producto${totalCount === 1 ? '' : 's'}`;

  const { subtotal, shipping, total, isFreeShipping } = calculateCartTotals();

  // Update Free Shipping Progress Bar
  const progressPercent = Math.min(100, (subtotal / state.freeShippingThreshold) * 100);
  shippingProgressFill.style.width = `${progressPercent}%`;

  if (subtotal === 0) {
    shippingText.innerHTML = `Añade <strong>${formatCurrency(state.freeShippingThreshold)}</strong> para <strong>envío gratis</strong>`;
  } else if (isFreeShipping) {
    shippingText.innerHTML = `🎉 ¡Genial! Tienes <strong>ENVÍO GRATIS</strong> en este pedido`;
  } else {
    const diff = state.freeShippingThreshold - subtotal;
    shippingText.innerHTML = `Te faltan solo <strong>${formatCurrency(diff)}</strong> para <strong>envío gratis</strong>`;
  }

  // Update Item List
  if (state.cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty-drawer">
        <div class="empty-bag-icon">🧺</div>
        <h4>Tu cesta está vacía</h4>
        <p>Aún no has seleccionado tus piezas de masa madre para la tanda de hoy.</p>
        <button class="btn btn-outline" style="margin-top: 1rem;" onclick="toggleCartDrawer(false)">Volver al Mostrador</button>
      </div>
    `;
    cartSubtotal.textContent = formatCurrency(0);
    cartShippingCost.textContent = formatCurrency(0);
    cartTotal.textContent = formatCurrency(0);
    checkoutBtn.disabled = true;
    whatsappOrderBtn.disabled = true;
    return;
  }

  checkoutBtn.disabled = false;
  whatsappOrderBtn.disabled = false;

  cartItemsContainer.innerHTML = state.cart.map(item => {
    return `
      <div class="cart-item">
        <div class="cart-item-thumb">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
          >
          <span class="mini-emoji" style="display: none;">${item.icon || '🍞'}</span>
        </div>

        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-cut">${item.weight}</div>
          
          <div class="cart-item-bottom">
            <span class="cart-item-price">${formatCurrency(item.price * item.quantity)}</span>
            <div class="qty-controls">
              <button class="qty-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})" aria-label="Restar">-</button>
              <span class="qty-num">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})" aria-label="Sumar">+</button>
            </div>
          </div>
        </div>

        <button class="remove-item-btn" onclick="removeFromCart('${item.id}')" aria-label="Eliminar producto">&times;</button>
      </div>
    `;
  }).join('');

  cartSubtotal.textContent = formatCurrency(subtotal);
  cartShippingCost.textContent = shipping === 0 ? 'Gratis' : formatCurrency(shipping);
  cartTotal.textContent = formatCurrency(total);
}

function toggleCartDrawer(open) {
  if (open) {
    cartDrawer.classList.add('open');
    cartBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    cartDrawer.classList.remove('open');
    cartBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ==========================================================================
// Quick View Modal
// ==========================================================================
window.openProductModal = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  modalBody.innerHTML = `
    <div class="modal-img-wrap">
      <img 
        src="${product.image}" 
        alt="${product.name}" 
        onerror="handleImageError(this, '${product.icon}', '${product.name}')"
      >
      ${product.badge ? `<div class="product-badges"><span class="badge ${product.badgeType}">${product.badge}</span></div>` : ''}
    </div>

    <div class="modal-details">
      <span class="modal-category">${product.categoryName}</span>
      <h2 class="modal-title" id="modalProductTitle">${product.name}</h2>
      
      <div class="modal-price-row">
        <span class="modal-price">${formatCurrency(product.price)}</span>
        <span class="modal-weight-label">(${product.weight})</span>
      </div>

      <p class="modal-desc">${product.description}</p>

      <div class="modal-ingredients-box">
        <strong>🌾 Harinas y Fermentación:</strong>
        <p>${product.flours}</p>
        <p style="margin-top: 0.35rem; color: var(--accent-gold);"><strong>Tiempo de fermento:</strong> ${product.fermentation}</p>
        <p style="margin-top: 0.35rem; color: var(--text-muted); font-size: 0.78rem;"><strong>Alérgenos:</strong> ${product.allergens}</p>
      </div>

      <div class="modal-actions">
        <button class="btn btn-primary btn-block" onclick="addToCart('${product.id}'); closeProductModal();">
          <span>Añadir a la cesta • ${formatCurrency(product.price)}</span>
        </button>
      </div>
    </div>
  `;

  productModal.classList.add('open');
  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
};

function closeProductModal() {
  productModal.classList.remove('open');
  modalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

// ==========================================================================
// WhatsApp Checkout Generator
// ==========================================================================
function sendWhatsAppOrder() {
  if (state.cart.length === 0) return;

  const { subtotal, shipping, total, isFreeShipping } = calculateCartTotals();
  const cut = breadCutOption.options[breadCutOption.selectedIndex].text;
  const slot = deliverySlotOption.options[deliverySlotOption.selectedIndex].text;

  let message = `🥖 *NUEVO PEDIDO - PAUNADERIA* 🌾\n\n`;
  message += `¡Hola! Me gustaría confirmar mi pedido de pan artesano:\n\n`;

  state.cart.forEach(item => {
    message += `• *${item.quantity}x* ${item.name} (${formatCurrency(item.price * item.quantity)})\n`;
  });

  message += `\n🔪 *Corte:* ${cut}`;
  message += `\n📅 *Horario preferido:* ${slot}`;
  message += `\n\n📦 *Subtotal:* ${formatCurrency(subtotal)}`;
  message += `\n🛵 *Envío:* ${isFreeShipping ? 'Gratis' : formatCurrency(shipping)}`;
  message += `\n💰 *TOTAL:* ${formatCurrency(total)}`;
  message += `\n\n¿Me confirman la disponibilidad para esta tanda? ¡Muchas gracias!`;

  const phone = '34912345678'; // Demo bakery phone
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

// ==========================================================================
// Standard Checkout Simulation
// ==========================================================================
function handleCheckout() {
  if (state.cart.length === 0) return;

  const { subtotal, shipping, total, isFreeShipping } = calculateCartTotals();
  const cut = breadCutOption.options[breadCutOption.selectedIndex].text;
  const slot = deliverySlotOption.options[deliverySlotOption.selectedIndex].text;

  checkoutSummaryBox.innerHTML = `
    <div style="margin-bottom: 0.6rem; font-weight: 700;">Resumen del pedido:</div>
    <ul style="list-style: none; margin-bottom: 0.8rem; padding-left: 0;">
      ${state.cart.map(i => `<li style="margin-bottom: 0.25rem;">${i.quantity}x ${i.name} - <strong>${formatCurrency(i.price * i.quantity)}</strong></li>`).join('')}
    </ul>
    <div style="border-top: 1px dashed var(--border-light); padding-top: 0.5rem; font-size: 0.84rem;">
      <div><strong>Preparación:</strong> ${cut}</div>
      <div><strong>Entrega:</strong> ${slot}</div>
      <div style="font-size: 1.05rem; font-weight: 800; margin-top: 0.4rem; color: var(--accent-gold);">Total: ${formatCurrency(total)}</div>
    </div>
  `;

  toggleCartDrawer(false);
  checkoutModal.classList.add('open');

  // Reset cart after order
  state.cart = [];
  saveCart();
  updateCartUI();
}

// ==========================================================================
// Toast Notification Utility
// ==========================================================================
let toastTimer = null;
function showToast(text) {
  toastMessage.textContent = text;
  toastNotification.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastNotification.classList.remove('show');
  }, 3200);
}

// ==========================================================================
// Helper Utilities
// ==========================================================================
function formatCurrency(amount) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
}

// ==========================================================================
// Event Listeners
// ==========================================================================
function setupEventListeners() {
  // Category tabs click
  categoryTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;

    categoryTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    state.currentCategory = btn.dataset.category;
    renderCatalog();
  });

  // Search input with debounce
  let searchTimeout = null;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      state.searchQuery = e.target.value;
      renderCatalog();
    }, 200);
  });

  // Sort dropdown
  sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderCatalog();
  });

  // Reset filters button
  resetFiltersBtn.addEventListener('click', () => {
    state.currentCategory = 'todos';
    state.searchQuery = '';
    searchInput.value = '';
    categoryTabs.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.category === 'todos');
    });
    renderCatalog();
  });

  // Cart Drawer open/close
  cartTrigger.addEventListener('click', () => toggleCartDrawer(true));
  cartCloseBtn.addEventListener('click', () => toggleCartDrawer(false));
  cartBackdrop.addEventListener('click', () => toggleCartDrawer(false));

  // Quick view modal close
  modalCloseBtn.addEventListener('click', closeProductModal);
  modalBackdrop.addEventListener('click', closeProductModal);

  // Checkout actions
  checkoutBtn.addEventListener('click', handleCheckout);
  whatsappOrderBtn.addEventListener('click', sendWhatsAppOrder);
  closeCheckoutModalBtn.addEventListener('click', () => checkoutModal.classList.remove('open'));

  // ESC key to close any modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleCartDrawer(false);
      closeProductModal();
      checkoutModal.classList.remove('open');
    }
  });
}

// Start application
document.addEventListener('DOMContentLoaded', init);
