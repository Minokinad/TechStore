import { storage } from "./utils/storage.js";
import { showError, clearErrors } from "./utils/helpers.js";
import {
  createSlideHTML,
  createProductCard,
  createCartItemHTML,
} from "./components/render.js";

const heroSlides = [
  {
    title: "iPhone 14 <strong>Pro</strong>",
    sub: "Pro.Beyond.",
    desc: "Created to change everything for the better. For everyone.",
    img: "images/iphone-hero.png",
  },
  {
    title: "AirPods <strong>Max</strong>",
    sub: "High-fidelity audio",
    desc: "The perfect balance of exhilarating high-fidelity audio.",
    img: "images/airpods-max.png",
  },
  {
    title: "PlayStation <strong>5</strong>",
    sub: "Next-gen gaming",
    desc: "Experience lightning-fast loading with an ultra-high speed SSD.",
    img: "images/ps5.png",
  },
];

let products = storage.load("cyber_products") || [
  {
    id: 1,
    title: "Apple iPhone 14 Pro Max",
    price: 900,
    category: "Phones",
    img: "images/products/iphone14.png",
  },
  {
    id: 2,
    title: "Apple Watch Series 9",
    price: 399,
    category: "Watches",
    img: "images/icons/watches.svg",
  },
  {
    id: 3,
    title: "Sony WH-1000XM5",
    price: 350,
    category: "Headphones",
    img: "images/airpods-max.png",
  },
  {
    id: 4,
    title: "MacBook Pro M2",
    price: 1999,
    category: "Computers",
    img: "images/products/iphone14.png",
  },
  {
    id: 5,
    title: "PlayStation 5 Console",
    price: 499,
    category: "Gaming",
    img: "images/ps5.png",
  },
];

let cart = storage.load("cyber_cart") || [];

const productsGrid = document.querySelector(".products__grid");
const productForm = document.getElementById("product-form");
const editingIdInput = document.getElementById("editing-id");
const submitBtn = document.getElementById("submit-btn");
const cancelEditBtn = document.getElementById("cancel-edit");

const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const cartCount = document.getElementById("cart-count");
const cartItemsList = document.getElementById("cart-items-list");
const cartTotalEl = document.getElementById("cart-total");

const searchInput = document.getElementById("main-search");
const filterCat = document.getElementById("filter-category");
const filterMin = document.getElementById("filter-min-price");
const filterMax = document.getElementById("filter-max-price");

let currentSlide = 0;
const renderSlider = () => {
  const container = document.getElementById("hero-slider");
  if (!container) return;
  container.style.opacity = 0;
  setTimeout(() => {
    container.innerHTML = createSlideHTML(heroSlides[currentSlide]);
    container.style.opacity = 1;
  }, 300);
};

document.getElementById("next-slide").onclick = () => {
  currentSlide = (currentSlide + 1) % heroSlides.length;
  renderSlider();
};
document.getElementById("prev-slide").onclick = () => {
  currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
  renderSlider();
};
setInterval(() => document.getElementById("next-slide").click(), 6000);

const toggleCart = (open) => {
  cartSidebar.style.right = open ? "0" : "-400px";
  cartOverlay.style.display = open ? "block" : "none";
};

document.getElementById("cart-btn").onclick = () => toggleCart(true);
document.getElementById("close-cart").onclick = () => toggleCart(false);
cartOverlay.onclick = () => toggleCart(false);

const updateCartUI = () => {
  cartItemsList.innerHTML = cart
    .map((item, i) => createCartItemHTML(item, i))
    .join("");
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotalEl.textContent = `$${total}`;
  cartCount.textContent = cart.length;
  storage.save("cyber_cart", cart);
};

const applyFilters = () => {
  const query = searchInput.value.toLowerCase().trim();
  const cat = filterCat.value;
  const min = Number(filterMin.value) || 0;
  const max = Number(filterMax.value) || Infinity;

  const filtered = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(query);
    const matchCat = cat === "all" || p.category === cat;
    const matchPrice = p.price >= min && p.price <= max;
    return matchSearch && matchCat && matchPrice;
  });

  if (productsGrid) {
    productsGrid.innerHTML =
      filtered.length > 0
        ? filtered.map((p) => createProductCard(p)).join("")
        : `<p style="grid-column: 1/-1; text-align: center; padding: 50px;">Товары не найдены 🔍</p>`;
  }
};

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.querySelector(".products").scrollIntoView({ behavior: "smooth" });
    applyFilters();
  }
});

[searchInput, filterCat, filterMin, filterMax].forEach((el) => {
  el.addEventListener("input", applyFilters);
});

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = editingIdInput.value;
  const title = document.getElementById("prod-title").value;
  const price = Number(document.getElementById("prod-price").value);
  const category = document.getElementById("prod-category").value;
  const img = document.getElementById("prod-img").value;

  clearErrors(document.getElementById("prod-title"));
  if (title.length < 3) {
    showError(document.getElementById("prod-title"), "Минимум 3 символа");
    return;
  }

  if (id) {
    const index = products.findIndex((p) => p.id == id);
    products[index] = { ...products[index], title, price, category, img };
  } else {
    products.push({
      id: Date.now(),
      title,
      price,
      category,
      img,
      date: Date.now(),
    });
  }

  resetForm();
  storage.save("cyber_products", products);
  applyFilters();
});

const resetForm = () => {
  productForm.reset();
  editingIdInput.value = "";
  submitBtn.textContent = "Добавить товар";
  submitBtn.style.background = "#211c24";
  cancelEditBtn.style.display = "none";
};

cancelEditBtn.onclick = resetForm;

document.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);

  if (e.target.classList.contains("add-to-cart")) {
    const product = products.find((p) => p.id === id);
    if (product) {
      cart.push(product);
      updateCartUI();
    }
  }

  if (e.target.classList.contains("remove-from-cart")) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    updateCartUI();
  }

  if (e.target.classList.contains("delete-item-btn")) {
    if (confirm("Удалить товар из магазина?")) {
      products = products.filter((p) => p.id !== id);
      storage.save("cyber_products", products);
      applyFilters();
    }
  }

  if (e.target.classList.contains("edit-item-btn")) {
    const p = products.find((prod) => prod.id === id);
    if (p) {
      editingIdInput.value = p.id;
      document.getElementById("prod-title").value = p.title;
      document.getElementById("prod-price").value = p.price;
      document.getElementById("prod-category").value = p.category;
      document.getElementById("prod-img").value = p.img;

      productForm.scrollIntoView({ behavior: "smooth" });
      submitBtn.textContent = "Сохранить изменения";
      submitBtn.style.background = "#28a745";
      cancelEditBtn.style.display = "inline-block";
    }
  }
});

renderSlider();
applyFilters();
updateCartUI();

const burger = document.querySelector(".header__burger");
const nav = document.querySelector(".header__nav");
if (burger && nav) {
  burger.onclick = () => nav.classList.toggle("nav--active");
}
