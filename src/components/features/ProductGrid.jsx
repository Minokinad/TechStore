import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <div className="products__grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};
export default ProductGrid;
