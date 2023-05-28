import { create } from "zustand";

interface CartState {
  cartItems: Product[];
}

export const useCartStore = create<CartState>(() => ({
  cartItems: [],
}));

export const addToCart = (product: any) => {
  const existingProduct = useCartStore.getState().cartItems.find((item) => item.id === product.id);
  const existingCartItems = useCartStore.getState().cartItems;

  if (existingProduct)
    return useCartStore.setState({
      cartItems: existingCartItems.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)),
    });

  useCartStore.setState({ cartItems: [...existingCartItems, { ...product, quantity: 1 }] });
};

export const useTotalItems = () => useCartStore((state) => state.cartItems.reduce((total, item) => total + item.quantity, 0));
