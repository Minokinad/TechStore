const SHOPIFY_DOMAIN = "your-store.myshopify.com";
const STOREFRONT_TOKEN = "shpat_...";

async function testShopify() {
  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2026-04/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: `
          query {
            shop {
              name
            }
          }
        `,
      }),
    }
  );

  const data = await res.json();
  console.log("SHOPIFY RESPONSE:", data);
}

testShopify();
