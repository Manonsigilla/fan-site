// ============================================
// DONNÉES DES PRODUITS - Merchandising OM/Mandanda
// ============================================
const products = [
    { 
        id: 1, 
        name: "Maillot Mandanda #30", 
        price: 89.99, 
        emoji: "👕", 
        description: "Maillot officiel OM avec flocage Mandanda" 
    },
    { 
        id: 2, 
        name: "Écharpe Supporter", 
        price: 24.99, 
        emoji: "🧣", 
        description: "Écharpe aux couleurs de l'OM" 
    },
    { 
        id: 3, 
        name: "Casquette OM", 
        price: 19.99, 
        emoji: "🧢", 
        description: "Casquette officielle Olympique de Marseille" 
    },
    { 
        id: 4, 
        name: "Gants de Gardien", 
        price: 49.99, 
        emoji: "🧤", 
        description: "Gants pro comme ceux de Mandanda" 
    },
    { 
        id: 5, 
        name: "Poster Mandanda", 
        price: 14.99, 
        emoji: "🖼️", 
        description: "Poster grand format du Phénomène" 
    },
    { 
        id: 6, 
        name: "Ballon Officiel OM", 
        price: 34.99, 
        emoji: "⚽", 
        description: "Ballon collector OM édition limitée" 
    },
    { 
        id: 7, 
        name: "Mug Steve Mandanda", 
        price: 12.99, 
        emoji: "☕", 
        description: "Mug collector à l'effigie du gardien" 
    },
    { 
        id: 8, 
        name: "Porte-clés OM", 
        price: 7.99, 
        emoji: "🔑", 
        description: "Porte-clés métallique aux couleurs de l'OM" 
    }
];

// Panier (chargé depuis le localStorage)
let cart = JSON.parse(localStorage.getItem('cart-mandanda')) || [];

// ============================================
// INITIALISATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartUI();
    setupCheckoutForm();
});

// ============================================
// AFFICHAGE DES PRODUITS
// ============================================
function displayProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">${product.price.toFixed(2)}€</div>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">
                Ajouter au panier
            </button>
        </div>
    `).join('');
}

// ============================================
// GESTION DU PANIER
// ============================================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    
    // Animation d'ajout
    const cartIcon = document.querySelector('.cart-icon-fixed');
    cartIcon.style.transform = 'scale(1.3)';
    setTimeout(() => cartIcon.style.transform = 'scale(1)', 300);
}

function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('cart-mandanda', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2) + '€';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Votre panier est vide 🛒</div>';
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = '0.5';
    } else {
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = '1';
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.emoji}</div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div>${item.price.toFixed(2)}€</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Retirer</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('open');
}

// ============================================
// CHECKOUT
// ============================================
function goToCheckout() {
    if (cart.length === 0) return;
    
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.remove('open');
    
    document.getElementById('products').style.display = 'none';
    document.getElementById('checkout-section').style.display = 'block';
    
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name} x${item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}€</span>
        </div>
    `).join('');
    
    checkoutTotal.textContent = totalPrice.toFixed(2) + '€';
    
    window.scrollTo(0, 0);
}

function cancelCheckout() {
    document.getElementById('checkout-section').style.display = 'none';
    document.getElementById('products').style.display = 'block';
    window.scrollTo(0, 0);
}

function setupCheckoutForm() {
    const form = document.getElementById('checkout-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        processOrder();
    });
}

function processOrder() {
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        postalCode: document.getElementById('postalCode').value,
        country: document.getElementById('country').value
    };
    
    const order = {
        id: 'OM-' + Date.now(),
        date: new Date().toISOString(),
        items: cart,
        customer: formData,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    
    // Sauvegarder la commande
    const orders = JSON.parse(localStorage.getItem('orders-mandanda')) || [];
    orders.push(order);
    localStorage.setItem('orders-mandanda', JSON.stringify(orders));
    
    // Afficher la confirmation
    document.getElementById('checkout-section').style.display = 'none';
    document.getElementById('confirmation-section').style.display = 'block';
    document.getElementById('order-number').textContent = order.id;
    
    // Vider le panier
    cart = [];
    saveCart();
    updateCartUI();
    
    // Réinitialiser le formulaire
    document.getElementById('checkout-form').reset();
    
    window.scrollTo(0, 0);
}

function resetShop() {
    document.getElementById('confirmation-section').style.display = 'none';
    document.getElementById('products').style.display = 'block';
    window.scrollTo(0, 0);
}