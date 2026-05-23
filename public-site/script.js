const products = [
  {
    id: 1,
    name: "Sun-Faded Chore Coat",
    category: "jackets",
    size: "M",
    price: 12800,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80",
    alt: "Vintage tan chore coat on a hanger"
  },
  {
    id: 2,
    name: "Washed 501 Denim",
    category: "denim",
    size: "30",
    price: 9600,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
    alt: "Classic blue denim jeans"
  },
  {
    id: 3,
    name: "Varsity Wool Jacket",
    category: "jackets",
    size: "L",
    price: 16400,
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=900&q=80",
    alt: "Vintage jacket styled on a model"
  },
  {
    id: 4,
    name: "Paisley Silk Scarf",
    category: "accessories",
    size: "OS",
    price: 4200,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=900&q=80",
    alt: "Patterned vintage scarf"
  },
  {
    id: 5,
    name: "Railroad Stripe Pants",
    category: "denim",
    size: "32",
    price: 11800,
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=900&q=80",
    alt: "Vintage clothing arranged on a rack"
  },
  {
    id: 6,
    name: "Leather Belt No. 7",
    category: "accessories",
    size: "34",
    price: 5800,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80",
    alt: "Brown leather belt detail"
  },
  {
    id: 7,
    name: "Indigo Trucker Jacket",
    category: "jackets",
    size: "S",
    price: 14200,
    image: "https://images.unsplash.com/photo-1603252109360-909baaf261c7?auto=format&fit=crop&w=900&q=80",
    alt: "Denim jacket close up"
  },
  {
    id: 8,
    name: "Patchwork Denim Tote",
    category: "accessories",
    size: "OS",
    price: 7400,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    alt: "Vintage fabric tote bag"
  }
];

const productGrid = document.querySelector("#productGrid");
const filterButtons = document.querySelectorAll(".filter");
const cartButton = document.querySelector(".cart-button");
const closeCartButton = document.querySelector(".close-cart");
const cartPanel = document.querySelector("#cartPanel");
const overlay = document.querySelector("#overlay");
const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");
const paymentForm = document.querySelector("#paymentForm");
const paymentDetails = document.querySelector("#paymentDetails");
const paymentNote = document.querySelector("#paymentNote");

const cart = [];

function formatPrice(value) {
  return `Rs. ${value.toLocaleString("en-NP")}`;
}

const paymentFields = {
  esewa: `
    <label>
      eSewa ID or mobile number
      <input type="tel" name="esewaId" placeholder="98XXXXXXXX" required>
    </label>
  `,
  khalti: `
    <label>
      Khalti mobile number
      <input type="tel" name="khaltiId" placeholder="98XXXXXXXX" required>
    </label>
  `,
  bank: `
    <label>
      Bank name
      <select name="bankName" required>
        <option value="">Select bank</option>
        <option>Nabil Bank</option>
        <option>NIC ASIA Bank</option>
        <option>Global IME Bank</option>
        <option>Prabhu Bank</option>
        <option>Nepal Investment Mega Bank</option>
      </select>
    </label>
    <label>
      Account holder name
      <input type="text" name="accountName" placeholder="Your full name" required>
    </label>
  `,
  card: `
    <label>
      Card number
      <input type="text" name="cardNumber" placeholder="1234 5678 9012 3456" inputmode="numeric" required>
    </label>
    <label>
      Name on card
      <input type="text" name="cardName" placeholder="Card holder name" required>
    </label>
    <label>
      Expiry date
      <input type="text" name="cardExpiry" placeholder="MM/YY" required>
    </label>
  `
};

function renderProducts(category = "all") {
  const visibleProducts = category === "all"
    ? products
    : products.filter((product) => product.category === category);

  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.alt}">
      </div>
      <div class="product-info">
        <div>
          <h3>${product.name}</h3>
          <div class="product-meta">
            <span>${product.category}</span>
            <span>Size ${product.size}</span>
          </div>
        </div>
        <div class="product-meta">
          <strong>${formatPrice(product.price)}</strong>
          <span>One available</span>
        </div>
        <button class="add-button" type="button" data-id="${product.id}">Add to bag</button>
      </div>
    </article>
  `).join("");
}

function renderCart() {
  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your bag is empty.</p>';
    cartTotal.textContent = "Rs. 0";
    return;
  }

  cartItems.innerHTML = cart.map((item) => `
    <div class="cart-row">
      <div>
        <p>${item.name}</p>
        <span>Size ${item.size}</span>
      </div>
      <strong>${formatPrice(item.price)}</strong>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = formatPrice(total);
}

function renderPaymentFields(method = "esewa") {
  paymentDetails.innerHTML = paymentFields[method];
  paymentNote.textContent = "";
}

function openCart() {
  cartPanel.classList.add("open");
  overlay.classList.add("show");
}

function closeCart() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("show");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((filter) => filter.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});

productGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest(".add-button");

  if (!addButton) {
    return;
  }

  const product = products.find((item) => item.id === Number(addButton.dataset.id));
  cart.push(product);
  renderCart();
  openCart();
});

cartButton.addEventListener("click", openCart);
closeCartButton.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

paymentForm.addEventListener("change", (event) => {
  if (event.target.name === "payment") {
    renderPaymentFields(event.target.value);
  }
});

paymentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (cart.length === 0) {
    paymentNote.textContent = "Please add an item to your bag before payment.";
    return;
  }

  const selectedPayment = paymentForm.elements.payment.value;
  const paymentName = {
    esewa: "eSewa",
    khalti: "Khalti",
    bank: "Nepali bank transfer",
    card: "credit card"
  }[selectedPayment];

  paymentNote.textContent = `Demo order ready for ${paymentName}. Connect a real payment gateway to process live payments.`;
});

renderProducts();
renderCart();
renderPaymentFields();
