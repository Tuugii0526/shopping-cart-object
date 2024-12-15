const showOrHideCartButton = document.getElementById("show-hide-cart-button");
const showOrHideSpan = document.getElementById("show-or-hide");
const cartContainer = document.getElementById("cart");
const clearCartButton = document.getElementById("clear-cart");
const cardContainer = document.getElementById("card-container");
const productsContainer = document.getElementById("products-container");
const totalNumberSpan = document.getElementById("total-number-of-items");
const subTotalSpan = document.getElementById("subtotal");
const taxSpan = document.getElementById("taxes");
const totalSpan = document.getElementById("total");
let isHidden = true;
const products = [
  {
    id: 1,
    name: "Vanilla Cupcakes (6 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
  {
    id: 2,
    name: "French Macaron",
    price: 3.99,
    category: "Macaron",
  },
  {
    id: 3,
    name: "Pumpkin Cupcake",
    price: 3.99,
    category: "Cupcake",
  },
  {
    id: 4,
    name: "Chocolate Cupcake",
    price: 5.99,
    category: "Cupcake",
  },
  {
    id: 5,
    name: "Chocolate Pretzels (4 Pack)",
    price: 10.99,
    category: "Pretzel",
  },
  {
    id: 6,
    name: "Strawberry Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 7,
    name: "Chocolate Macarons (4 Pack)",
    price: 9.99,
    category: "Macaron",
  },
  {
    id: 8,
    name: "Strawberry Pretzel",
    price: 4.99,
    category: "Pretzel",
  },
  {
    id: 9,
    name: "Butter Pecan Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 10,
    name: "Rocky Road Ice Cream",
    price: 2.99,
    category: "Ice Cream",
  },
  {
    id: 11,
    name: "Vanilla Macarons (5 Pack)",
    price: 11.99,
    category: "Macaron",
  },
  {
    id: 12,
    name: "Lemon Cupcakes (4 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
];
products.forEach(({ id, name, price, category }) => {
  cardContainer.innerHTML += `
    <div class="card">
    <p class="card-title">${name}</p>
<p>$${price}</p>
<p>Category: ${category}</p>
<button id="${id}" class="add-to-cart-button">Add to cart</button>
    </div>
    `;
});
class ShoppingCart {
  constructor() {
    this.items = [];
    this.taxRate = 8.25;
    this.total = 0;
  }
  addItem(id, products) {
    const totalCountPerProduct = {};
    const product = products.find((product) => product.id == id);
    const { name, price } = product;
    this.items.push(product);
    this.items.forEach((item) => {
      totalCountPerProduct[item.id] = (totalCountPerProduct[item.id] || 0) + 1;
    });
    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(
      `count-span-for-id${product.id}`
    );
    currentProductCount > 1
      ? (currentProductCountSpan.textContent = currentProductCount)
      : (productsContainer.innerHTML += `
       <div class="ordered-product">
    <span id="count-span-for-id${product.id}" style="font-weight:800">1</span>
    <span style="font-weight:800">x</span>
<span>${name}</span>
<p class="price-span" style="font-weight:700">${price}$</p>
</div>
       `);
  }
  getCounts() {
    return this.items.length;
  }
  clearCart() {
    if (!this.items.length) {
      alert("Your cart is already empty");
      return;
    }
    const willCartBeCleared = confirm(
      "Are you sure you want to clear all items from your shopping cart?"
    );
    if (willCartBeCleared) {
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalNumberSpan.textContent = 0;
      subTotalSpan.textContent = 0;
      taxSpan.textContent = 0;
      totalSpan.textContent = 0;
    }
  }
  calculateTaxes(subTotal) {
    return (this.taxRate / 100) * subTotal.toFixed(2);
  }
  calculate() {
    totalNumberSpan.innerText = this.items.length;
    const subTotal = this.items.reduce((acc, el) => acc + el.price, 0);
    const tax = this.calculateTaxes(subTotal);
    const total = (subTotal + tax).toFixed(2);
    subTotalSpan.innerText = subTotal.toFixed(2);
    totalSpan.innerText = total;
    taxSpan.innerText = tax.toFixed(2);
  }
}
const cart = new ShoppingCart();
const addToCartButtns = document.getElementsByClassName("add-to-cart-button");
[...addToCartButtns].forEach((button) => {
  button.addEventListener("click", (event) => {
    const thisButton = event.target;
    const id = Number(thisButton.id);
    cart.addItem(id, products);
    cart.calculate();
    alert("You have successfully added to a cart");
  });
});
showOrHideCartButton.addEventListener("click", () => {
  cartContainer.classList.toggle("hidden");
  showOrHideSpan.innerText = isHidden ? "Hide" : "Show";
  isHidden = !isHidden;
});
clearCartButton.addEventListener("click", () => {
  cart.clearCart();
});
