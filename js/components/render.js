import { formatCurrency, truncateText } from "../utils/dataParser.js";

export const createSlideHTML = (slide) => `
    <div class="slide-content" style="display: flex; align-items: center; justify-content: space-between; animation: fadeIn 0.8s ease;">
        <div style="max-width: 500px; text-align: left;">
            <p style="color: #909090; text-transform: uppercase; letter-spacing: 2px;">${slide.sub}</p>
            <h1 style="font-size: 72px; margin: 10px 0; color: white;">${slide.title}</h1>
            <p style="color: #cfcfcf; margin-bottom: 30px;">${slide.desc}</p>
            <a href="#products-section" class="btn btn--outline">Shop Now</a>
        </div>
        <img src="${slide.img}" alt="${slide.title}" style="max-height: 400px; filter: drop-shadow(0 20px 50px rgba(0,0,0,0.5));">
    </div>
`;

export const createProductCard = (p) => `
    <article class="product-card">
        <span style="background: rgba(0,0,0,0.05); padding: 2px 8px; border-radius: 4px; font-size: 10px;">${p.category}</span>
        <div class="product-card__image-container">
            <img src="${p.image}" alt="${p.title}" style="width: 100%; object-fit: contain; height: 160px;">
        </div>
        <h3 class="product-card__title">${truncateText(p.title)}</h3>
        <span class="product-card__price">${formatCurrency(p.price)}</span>
        <button class="btn add-to-cart" data-id="${p.id}" style="width: 100%; background: #000; color: #fff; margin-top: 15px;">Add to Cart</button>
    </article>
`;

export const createCartItemHTML = (item, index) => `
    <div style="display: flex; gap: 15px; margin-bottom: 15px; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 10px;">
        <img src="${item.image}" style="width: 40px; height: 40px; object-fit: contain;">
        <div style="flex-grow: 1;">
            <h4 style="font-size: 12px; margin: 0;">${truncateText(item.title, 20)}</h4>
            <span style="font-weight: bold;">${formatCurrency(item.price)}</span>
        </div>
        <button class="remove-from-cart" data-index="${index}" style="background: none; border: none; color: red; cursor: pointer;">&times;</button>
    </div>
`;
