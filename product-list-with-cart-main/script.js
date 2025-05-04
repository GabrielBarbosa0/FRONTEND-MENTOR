const products = [
    {
        image: {
            thumbnail: "./assets/images/image-waffle-thumbnail.jpg"
        },
        name: "Waffle com Frutas Vermelhas",
        category: "Waffle",
        price: 6.50
    },
    {
        image: {
            thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg"
        },
        name: "Crème Brûlée de Baunilha",
        category: "Crème Brûlée",
        price: 7.00
    },
    {
        image: {
            thumbnail: "./assets/images/image-macaron-thumbnail.jpg"
        },
        name: "Mix de Macarons (5 unidades)",
        category: "Macaron",
        price: 8.00
    },
    {
        image: {
            thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg"
        },
        name: "Tiramisu Clássico",
        category: "Tiramisu",
        price: 5.50
    },
    {
        image: {
            thumbnail: "./assets/images/image-baklava-thumbnail.jpg"
        },
        name: "Baklava de Pistache",
        category: "Baklava",
        price: 4.00
    },
    {
        image: {
            thumbnail: "./assets/images/image-meringue-thumbnail.jpg"
        },
        name: "Torta de Merengue de Limão",
        category: "Torta",
        price: 5.00
    },
    {
        image: {
            thumbnail: "./assets/images/image-cake-thumbnail.jpg"
        },
        name: "Bolo Red Velvet",
        category: "Bolo",
        price: 4.50
    },
    {
        image: {
            thumbnail: "./assets/images/image-brownie-thumbnail.jpg"
        },
        name: "Brownie de Caramelo Salgado",
        category: "Brownie",
        price: 4.50
    },
    {
        image: {
            thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg"
        },
        name: "Panna Cotta de Baunilha",
        category: "Panna Cotta",
        price: 6.50
    }
];

let cart = [];

function renderProducts() {
    const productList = document.getElementById('product-list');
    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
        <img src="${product.image.thumbnail}" alt="${product.name}">
        <div class="product-info">
          <p class="category">${product.category}</p>
          <h4>${product.name}</h4>
          <p class="price">R$ ${product.price.toFixed(2)}</p>
        </div>
        <button class="add-to-cart-btn" data-index="${index}">
          🛒 Adicionar ao Carrinho
        </button>
      `;
        productList.appendChild(card);
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(btn =>
        btn.addEventListener('click', handleAddToCart)
    );
}

function handleAddToCart(e) {
    const index = e.currentTarget.dataset.index;
    const product = products[index];

    const existing = cart.find(item => item.name === product.name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);

    cartItems.innerHTML = cart.length === 0
        ? `<img src="./assets/images/empty-cart.png" alt="Carrinho vazio" class="empty-cart-image"/>
         <p>Os itens adicionados aparecerão aqui</p>`
        : cart.map(item => `
          <div class="cart-item">
            <span>${item.quantity}x ${item.name}</span>
            <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        `).join('') +
        `<div class="cart-total">
           <strong>Total:</strong>
           <span>R$ ${total.toFixed(2)}</span>
         </div>
         <button class="confirm-btn" onclick="confirmOrder()">Confirmar Pedido</button>`;
}

function confirmOrder() {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const summary = cart.map(item =>
        `<li><strong>${item.name}</strong> — ${item.quantity}x R$${item.price.toFixed(2)} = R$${(item.quantity * item.price).toFixed(2)}</li>`
    ).join('');

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
    
      </div>
      <div class=" order-confirmed-modal">
        <div class="modal-header">
          <span class="check-icon">✅</span>
          <h2>Pedido Confirmado</h2>
          <p>Esperamos que aproveite sua sobremesa!</p>
        </div>

        <ul>${summary}</ul>
        <p class="order-total"><strong>Total do Pedido:</strong> R$ ${total.toFixed(2)}</p>
        <button class="new-order-btn onclick=" startNewOrder()">Novo Pedido</button>
        <script src="script.js"></script>
      `;

    document.body.appendChild(modal);
}

function startNewOrder() {
    cart = [];
    updateCartUI();
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
}

renderProducts();
















