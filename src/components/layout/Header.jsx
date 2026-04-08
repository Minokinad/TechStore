const Header = () => (
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
        <img src="/heart.svg" alt="Favorites" className="header__icon" />
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src="/cart.svg" alt="Cart" className="header__icon" />
          <span
            style={{
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "10px",
              position: "absolute",
              top: "-8px",
              right: "-10px",
              fontWeight: "bold",
            }}
          >
            2
          </span>
        </div>
        <img src="/user.svg" alt="Profile" className="header__icon" />
      </div>
    </div>
  </header>
);

export default Header;
