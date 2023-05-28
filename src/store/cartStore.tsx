import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cartItems: Product[];
}

export const useCartStore = create(
  persist<CartState>(
    () => ({
      cartItems: [],
    }),
    {
      name: "cartStorage",
      getStorage: () => (Platform.OS === "web" ? localStorage : AsyncStorage),
    }
  )
);

export const addToCart = (product: any) => {
  const existingProduct = useCartStore.getState().cartItems.find((item) => item.id === product.id);
  const existingCartItems = useCartStore.getState().cartItems;

  if (existingProduct)
    return useCartStore.setState({
      cartItems: existingCartItems.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)),
    });

  useCartStore.setState({ cartItems: [...existingCartItems, { ...product, quantity: 1 }] });
};

export const removeFromCart = (product: Product) => {
  const existingCartItems = useCartStore.getState().cartItems;
  useCartStore.setState({
    cartItems: existingCartItems.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity - 1 } : i)).filter((i) => i.quantity > 0),
  });
};

export const useTotalItems = () => useCartStore((state) => state.cartItems.reduce((total, item) => total + item.quantity, 0));
