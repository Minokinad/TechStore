const ProductCard = ({ product, onAddToCart }) => {
  return (
    <article className="product-card">
      <div className="product-card__image-container">
        <img src={product.image} alt={product.title} />
      </div>
      <h3 className="product-card__title">{product.title}</h3>
      <span className="product-card__price">${product.price}</span>
      <button className="btn" onClick={() => onAddToCart(product.id)}>
        Add to Cart
      </button>
    </article>
  );
};
export default ProductCard;
