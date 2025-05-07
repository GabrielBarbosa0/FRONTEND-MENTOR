
// Lista de produtos simulados

const products = [
    {
      id: 1,
      name: "Waffle com Frutas Vermelhas",
      price: 6.5,
      image: "./assets/images/image-waffle-thumbnail.jpg"
    },
    {
      id: 2,
      name: "Crème Brûlée de Baunilha",
      price: 7.0,
      image: "./assets/images/image-creme-brulee-thumbnail.jpg"
    },
    {
      id: 3,
      name: "Mix de Macarons (5 unidades)",
      price: 8.0,
      image: "./assets/images/image-macaron-thumbnail.jpg"
    },
    {
      id: 4,
      name: "Tiramisu Clássico",
      price: 5.5,
      image: "./assets/images/image-tiramisu-thumbnail.jpg"
    },
    {
      id: 5,
      name: "Baklava de Pistache",
      price: 4.0,
      image: "./assets/images/image-baklava-thumbnail.jpg"
    },
    {
      id: 6,
      name: "Torta de Merengue de Limão",
      price: 5.0,
      image: "./assets/images/image-meringue-thumbnail.jpg"
    },
    {
      id: 7,
      name: "Bolo Red Velvet",
      price: 4.5,
      image: "./assets/images/image-cake-thumbnail.jpg"
    },
    {
      id: 8,
      name: "Brownie de Caramelo Salgado",
      price: 4.5,
      image: "./assets/images/image-brownie-thumbnail.jpg"
    },
    {
      id: 9,
      name: "Panna Cotta de Baunilha",
      price: 6.5,
      image: "./assets/images/image-panna-cotta-thumbnail.jpg"
    }
  ];
  
  
  const cart = {};
  
  // Elementos do DOM
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  const confirmBtn = document.getElementById("confirm-btn");
  const modal = document.getElementById("confirmation-modal");
  const orderSummary = document.getElementById("order-summary");
  const orderTotal = document.getElementById("order-total");
  const newOrderBtn = document.getElementById("new-order-btn");
  
  // Renderizar os cards de produto
  function renderProducts() {
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "card";
  
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>R$ ${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Adicionar</button>
      `;
  
      productList.appendChild(card);
    });
  }
  
  // Adicionar item ao carrinho
  function addToCart(productId) {
    if (!cart[productId]) {
      cart[productId] = 1;
    } else {
      cart[productId]++;
    }
    updateCart();
  }
  
  // Remover item do carrinho
  function removeFromCart(productId) {
    if (cart[productId]) {
      cart[productId]--;
      if (cart[productId] === 0) {
        delete cart[productId];
      }
    }
    updateCart();
  }
  
  // Atualizar carrinho
  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    let itemCount = 0;
  
    if (Object.keys(cart).length === 0) {
      cartItems.innerHTML = '<li class="empty-cart">Seu carrinho está vazio.</li>';
      confirmBtn.disabled = true;
      cartCount.textContent = "0";
      cartTotal.textContent = "R$ 0,00";
      return;
    }
  
    Object.entries(cart).forEach(([id, qty]) => {
      const product = products.find(p => p.id == id);
      const subtotal = product.price * qty;
      total += subtotal;
      itemCount += qty;
  
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${product.name} (${qty}x)</span>
        <div>
          <button onclick="removeFromCart(${id})">−</button>
          <button onclick="addToCart(${id})">+</button>
        </div>
      `;
      cartItems.appendChild(li);
    });
  
    cartCount.textContent = itemCount;
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    confirmBtn.disabled = false;
  }
  
  // Confirmar pedido
  confirmBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    orderSummary.innerHTML = "";
    let total = 0;
  
    Object.entries(cart).forEach(([id, qty]) => {
      const product = products.find(p => p.id == id);
      const subtotal = product.price * qty;
      total += subtotal;
  
      const item = document.createElement("li");
      item.textContent = `${product.name} — ${qty}x R$${product.price.toFixed(2)} = R$${subtotal.toFixed(2)}`;
      orderSummary.appendChild(item);
    });
  
    orderTotal.textContent = `R$ ${total.toFixed(2)}`;
  });
  
  // Novo pedido
  newOrderBtn.addEventListener("click", () => {
    Object.keys(cart).forEach(key => delete cart[key]);
    updateCart();
    modal.classList.add("hidden");
  });
  
  // Inicializar
  renderProducts();
  