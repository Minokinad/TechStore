import { useState } from "react";
import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import ProductGrid from "./components/features/ProductGrid";
import ShoppingCart from "./components/features/ShoppingCart";
import PriceFilter from "./components/features/PriceFilter";
import { useCart } from "./hooks/useCart";
import { useProducts } from "./hooks/useProducts";

function App() {
  const { cart, addToCart, removeFromCart, total, clearCart } = useCart();
  const { filteredProducts, updateFilter, filters } = useProducts();

  // Состояние для открытия/закрытия корзины
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCheckout = () => {
    alert(`Order confirmed for $${total.toFixed(2)}`);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="app">
      <Header
        cartCount={cart.length}
        onSearch={(val) => updateFilter("search", val)}
        onCartClick={() => setIsCartOpen(true)}
      />

      {!filters.search && <Hero />}

      <main className="container">
        <section className="content" style={{ padding: "40px 0" }}>
          <PriceFilter filters={filters} onFilterChange={updateFilter} />

          <h2 style={{ margin: "40px 0 20px" }}>
            {filters.search
              ? `Results for "${filters.search}" (${filteredProducts.length})`
              : "New Arrivals"}
          </h2>

          <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
        </section>
      </main>

      <ShoppingCart
        isOpen={isCartOpen}
        items={cart}
        total={total}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export default App;
