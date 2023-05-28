import { View } from "react-native";
import { useCartStore, useTotalItems } from "../store/cartStore";

const Navbar = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalItems = useTotalItems();

  console.log(cartItems);

  return <View className="h-[60px]">{totalItems}</View>;
};

export default Navbar;
