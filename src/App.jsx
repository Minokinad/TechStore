import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import ProductGrid from "./components/features/ProductGrid";
import ShoppingCart from "./components/features/ShoppingCart";
import PriceFilter from "./components/features/PriceFilter";
import { products, cartItems } from "./data/mockData";

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />

      <main className="container main-layout">
        <section>
          <PriceFilter onFilterChange={(t, v) => console.log(t, v)} />
          <h2 style={{ marginBottom: "20px" }}>New Arrivals</h2>
          <ProductGrid
            products={products}
            onAddToCart={(id) => console.log(id)}
          />
        </section>

        <aside>
          <ShoppingCart items={cartItems} onRemove={(i) => console.log(i)} />
        </aside>
      </main>
    </div>
  );
}

export default App;
