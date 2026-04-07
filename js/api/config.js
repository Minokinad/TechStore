import { loadEnv } from "../utils/envLoader.js";

const env = await loadEnv();

export const API_CONFIG = {
  fakeStore: env.FAKE_STORE_URL || "https://fakestoreapi.com",
  stripe: "https://api.stripe.com/v1",
  keys: {
    stripe: env.STRIPE_SECRET_KEY,
  },
  endpoints: {
    products: "/products/category/electronics",
    payment: "/payment_intents",
  },
};
