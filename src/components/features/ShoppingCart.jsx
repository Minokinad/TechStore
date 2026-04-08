// src/components/features/ShoppingCart.jsx
import Button from "../ui/Button";

const ShoppingCart = ({ items, onRemove, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <aside className="shopping-cart">
      <h3>Your Cart ({items.length})</h3>
      <div className="cart-items">
        {items.map((item, index) => (
          <div key={`${item.id}-${index}`} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div className="cart-item__info">
              <span>{item.title}</span>
              <strong>${item.price}</strong>
            </div>
            <button className="btn-remove" onClick={() => onRemove(index)}>
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <div className="cart-total">Total: ${total}</div>
        <Button onClick={onCheckout} variant="outline">
          Checkout
        </Button>
      </div>
    </aside>
  );
};
export default ShoppingCart;
