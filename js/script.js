import ApiService from "./api/apiService.js";
import { API_CONFIG } from "./api/config.js";
import LocalStorageService from "./storage/localStorage.js";
import {
  createProductCard,
  createCartItemHTML,
  createSlideHTML,
} from "./components/render.js";
import { formatCurrency } from "./utils/dataParser.js";
import SessionStorageService from "./storage/sessionStorage.js";

class App {
  constructor() {
    this.api = new ApiService(API_CONFIG.fakeStore);
    this.storage = new LocalStorageService();
    this.sessionCache = new SessionStorageService();
    this.products = [];
    this.filteredProducts = [];
    this.cart = this.storage.get("cyber_cart") || [];
    this.currentSlide = 0;
    this.heroSlides = [
      {
        title: "iPhone 14 <strong>Pro</strong>",
        sub: "Pro.Beyond.",
        desc: "Created to change everything for the better.",
        img: "images/iphone-hero.png",
      },
    ];

    this.init();
  }

  async init() {
    this.cacheDom();
    this.bindEvents();
    this.renderSlider();
    await this.loadProducts();
    this.updateCartUI();
    this.setupSync();
  }

  cacheDom() {
    this.productsGrid = document.querySelector(".products__grid");
    this.cartCount = document.getElementById("cart-count");
    this.cartItemsList = document.getElementById("cart-items-list");
    this.cartTotalEl = document.getElementById("cart-total");
    this.heroContainer = document.getElementById("hero-slider");
    this.cartSidebar = document.getElementById("cart-sidebar");
    this.cartOverlay = document.getElementById("cart-overlay");
    this.checkoutBtn = document.querySelector("#cart-sidebar .btn");
    this.searchInput = document.getElementById("main-search");
    this.filterMin = document.getElementById("filter-min-price");
    this.filterMax = document.getElementById("filter-max-price");
  }

  bindEvents() {
    document.getElementById("next-slide").onclick = () => this.moveSlide(1);
    document.getElementById("prev-slide").onclick = () => this.moveSlide(-1);
    document.getElementById("cart-btn").onclick = () => this.toggleCart(true);
    document.getElementById("close-cart").onclick = () =>
      this.toggleCart(false);
    this.cartOverlay.onclick = () => this.toggleCart(false);

    this.checkoutBtn.onclick = () => this.handleStripePayment();

    [this.searchInput, this.filterMin, this.filterMax].forEach((el) => {
      if (el) el.oninput = () => this.applyFilters();
    });

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart"))
        this.addToCart(Number(e.target.dataset.id));
      if (e.target.classList.contains("remove-from-cart"))
        this.removeFromCart(Number(e.target.dataset.index));
    });
  }

  async loadProducts() {
    try {
      const cachedProducts = this.sessionCache.get("cached_electronics");

      if (cachedProducts) {
        console.log("Products loaded from SessionStorage cache");
        this.products = cachedProducts;
      } else {
        console.log("Fetching products from FakeStore API...");
        this.products = await this.api.get(API_CONFIG.endpoints.products);

        this.sessionCache.set("cached_electronics", this.products);
      }

      this.applyFilters();
    } catch (e) {
      this.productsGrid.innerHTML = `<p>Error loading electronics.</p>`;
    }
  }

  applyFilters() {
    const query = this.searchInput.value.toLowerCase();
    const min = Number(this.filterMin.value) || 0;
    const max = Number(this.filterMax.value) || Infinity;
    this.filteredProducts = this.products.filter(
      (p) =>
        p.title.toLowerCase().includes(query) &&
        p.price >= min &&
        p.price <= max
    );
    this.renderProducts();
  }

  renderProducts() {
    this.productsGrid.innerHTML = this.filteredProducts
      .map((p) => createProductCard(p))
      .join("");
  }

  async handleStripePayment() {
    if (this.cart.length === 0) return alert("Корзина пуста");

    this.checkoutBtn.disabled = true;
    this.checkoutBtn.textContent = "Confirming Payment...";

    const totalAmount = Math.round(
      this.cart.reduce((sum, item) => sum + item.price, 0) * 100
    );

    const body = new URLSearchParams({
      amount: totalAmount,
      currency: "usd",
      description: "TechStore Lab Order",
      payment_method: "pm_card_visa",
      confirm: "true",
      return_url: "https://example.com",
    });

    try {
      const response = await fetch(
        `${API_CONFIG.stripe}${API_CONFIG.endpoints.payment}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_CONFIG.keys.stripe}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body,
        }
      );

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error.message);
      }

      alert(
        `✅ Оплата завершена!\nID: ${result.id}\nСтатус: ${result.status.toUpperCase()}`
      );
      console.log("Stripe Full Success:", result);

      this.cart = [];
      this.updateCartUI();
      this.toggleCart(false);
    } catch (error) {
      console.error("Stripe API Error:", error);
      alert("Ошибка: " + error.message);
    } finally {
      this.checkoutBtn.disabled = false;
      this.checkoutBtn.textContent = "Оформить заказ";
    }
  }

  addToCart(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      this.cart.push(product);
      this.updateCartUI();
    }
  }

  removeFromCart(index) {
    this.cart.splice(index, 1);
    this.updateCartUI();
  }

  updateCartUI() {
    this.cartItemsList.innerHTML = this.cart
      .map((item, i) => createCartItemHTML(item, i))
      .join("");
    const total = this.cart.reduce((sum, item) => sum + item.price, 0);
    this.cartTotalEl.textContent = formatCurrency(total);
    this.cartCount.textContent = this.cart.length;
    this.storage.set("cyber_cart", this.cart);
  }

  renderSlider() {
    if (this.heroContainer) {
      this.heroContainer.innerHTML = createSlideHTML(this.heroSlides[0]);
    }
  }

  moveSlide(direction) {
    this.renderSlider();
  }

  toggleCart(open) {
    this.cartSidebar.style.right = open ? "0" : "-400px";
    this.cartOverlay.style.display = open ? "block" : "none";
  }

  setupSync() {
    window.addEventListener("online", () => {
      this.updateCartUI();
      alert("Сеть восстановлена. Данные синхронизированы.");
    });
  }
}

new App();
