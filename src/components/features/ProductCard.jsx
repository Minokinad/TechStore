// src/components/features/ProductCard.jsx
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <article className="product-card">
      <div className="product-card__image-container">
        <img src={product.image} alt={product.title} />
      </div>
      <span className="product-card__category">{product.category}</span>
      <h3 className="product-card__title">{product.title}</h3>
      <p className="product-card__desc">{product.description}</p>
      <div className="product-card__rating">
        <span style={{ color: "#FFB800" }}>⭐</span> {product.rating}
      </div>
      <span className="product-card__price">${product.price}</span>
      <button className="btn-add" onClick={() => onAddToCart(product.id)}>
        Add to Cart
      </button>
    </article>
  );
};

export default ProductCard;
