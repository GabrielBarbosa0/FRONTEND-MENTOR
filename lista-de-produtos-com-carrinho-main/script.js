let products = [];
const cart = {};

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const confirmBtn = document.getElementById("confirm-btn");
const modal = document.getElementById("confirmation-modal");
const orderSummary = document.getElementById("order-summary");
const orderTotal = document.getElementById("order-total");
const newOrderBtn = document.getElementById("new-order-btn");

// Carrega produtos a partir do arquivo JSON
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    products = data;
    renderProducts();
  })
  .catch(error => console.error("Erro ao carregar produtos:", error));

function renderProducts() {
  productList.innerHTML = "";

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

function addToCart(productId) {
  if (!cart[productId]) {
    cart[productId] = 1;
  } else {
    cart[productId]++;
  }
  updateCart();
}

function removeFromCart(productId) {
  if (cart[productId]) {
    cart[productId]--;
    if (cart[productId] === 0) {
      delete cart[productId];
    }
  }
  updateCart();
}

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

newOrderBtn.addEventListener("click", () => {
  Object.keys(cart).forEach(key => delete cart[key]);
  updateCart();
  modal.classList.add("hidden");
});
