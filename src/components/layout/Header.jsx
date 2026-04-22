const Header = ({ cartCount, onCartClick, onSearch }) => (
  <header className="header">
    <div className="container header__content">
      <a href="/" className="logo">
        cyber
      </a>

      <input type="text" className="search-bar" placeholder="Search" />

      <nav className="nav">
        <ul className="nav__list">
          <li>
            <a href="#" className="nav__link">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav__link">
              About
            </a>
          </li>
          <li>
            <a href="#" className="nav__link">
              Contact Us
            </a>
          </li>
          <li>
            <a href="#" className="nav__link">
              Blog
            </a>
          </li>
        </ul>
      </nav>

      <div className="header__actions">
        <img src="heart.svg" alt="favourites" className="header__icon" />

        <div
          onClick={onCartClick}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <img src="cart.svg" alt="cart" className="header__icon" />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>

        <img src="user.svg" alt="user" className="header__icon" />
      </div>
    </div>
  </header>
);

export default Header;
