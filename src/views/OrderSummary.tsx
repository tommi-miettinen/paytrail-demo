import { View, Image } from "react-native";
import { useCartStore } from "../store/cartStore";

const Checkout = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <View>
      {cartItems.map((item) => (
        <View className="flex flex-row items-center justify-center bg-2 border p-4">
          <Image className="rounded-t-lg h-[100px] w-[100px]" source={{ uri: item.image }} />
          {item.description}
        </View>
      ))}
    </View>
  );
};

export default Checkout;
