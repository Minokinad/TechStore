// src/components/layout/Hero.jsx
const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero__content">
        <div className="hero__info">
          <span className="hero__sub">Pro.Beyond.</span>
          <h1 className="hero__title">
            iPhone 14 <span>Pro</span>
          </h1>
          <p className="hero__text">
            Created to change everything for the better. For everyone.
          </p>
          <a href="#store" className="btn--outline">
            Shop Now
          </a>
        </div>
        <div className="hero__image">
          {}
          <img src="/iphone-hero.png" alt="iPhone 14 Pro" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
