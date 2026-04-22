const ShoppingCart = ({
  isOpen,
  items,
  total,
  onClose,
  onRemove,
  onCheckout,
}) => {
  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      />

      <aside className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="cart-drawer__header">
          <h3 style={{ fontSize: "24px", fontWeight: "700" }}>Your Cart</h3>
          <button className="cart-close-icon" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="cart-drawer__content">
          {items.length === 0 ? (
            <div className="empty-cart-msg">
              <img
                src="cart.svg"
                alt=""
                style={{ width: "50px", opacity: 0.2, marginBottom: "15px" }}
              />
              <p>Your cart is empty</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={item.cartId} className="cart-item-mini">
                <div className="cart-item-mini__img">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="cart-item-mini__info">
                  <h4>{item.title}</h4>
                  <span>${item.price}</span>
                </div>
                <button
                  className="cart-item-mini__remove"
                  onClick={() => onRemove(index)}
                  title="Remove item"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-drawer__footer">
          <div className="total-row">
            <span style={{ color: "#909090", fontWeight: "400" }}>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className="checkout-btn-premium"
            onClick={onCheckout}
            disabled={items.length === 0}
          >
            <span>Checkout Now</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
};

export default ShoppingCart;
