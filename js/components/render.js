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
    <article class="product-card" style="position: relative;">
        <div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 5px;">
             <button class="edit-item-btn" data-id="${p.id}" style="background: #fff; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; padding: 4px 8px;">✎</button>
             <button class="delete-item-btn" data-id="${p.id}" style="background: #fff; border: 1px solid #ff4d4d; color: #ff4d4d; border-radius: 4px; cursor: pointer; padding: 4px 8px;">&times;</button>
        </div>
        <span style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.05); padding: 2px 8px; border-radius: 4px; font-size: 10px; pointer-events: none;">${p.category}</span>
        
        <div class="product-card__image-container">
            <img src="${p.img || "images/products/iphone14.png"}" alt="${p.title}" style="width: 100%; object-fit: contain; height: 160px;">
        </div>
        <h3 class="product-card__title" style="font-size: 16px; margin: 10px 0;">${p.title}</h3>
        <span class="product-card__price">$${p.price}</span>
        <button class="btn add-to-cart" data-id="${p.id}" style="width: 100%; background: #000; color: #fff; margin-top: 15px;">Add to Cart</button>
    </article>
`;

export const createCartItemHTML = (item, index) => `
    <div style="display: flex; gap: 15px; margin-bottom: 15px; align-items: center;">
        <img src="${item.img}" style="width: 50px; height: 50px; object-fit: contain;">
        <div style="flex-grow: 1;">
            <h4 style="font-size: 14px; margin: 0;">${item.title}</h4>
            <span style="font-weight: bold;">$${item.price}</span>
        </div>
        <button class="remove-from-cart" data-index="${index}" style="background: none; border: none; color: red; cursor: pointer;">&times;</button>
    </div>
`;
