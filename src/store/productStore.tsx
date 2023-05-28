import { create } from "zustand";
import storeAPI from "../api/storeAPI";

interface ProductState {
  products: Product[];
}

export const useProductStore = create<ProductState>(() => ({
  products: [],
}));

export const fetchProducts = async () => {
  const products = await storeAPI.fetchProducts();
  useProductStore.setState({ products: products.map((product) => ({ ...product, quantity: 0 })) });
};
