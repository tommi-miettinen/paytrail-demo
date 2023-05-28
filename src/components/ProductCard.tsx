import { View, Image, Text, Pressable, TouchableOpacity } from "react-native";
import { addToCart } from "../store/cartStore";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <View className="w-full flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Pressable onPress={() => {}}>
        <Image className="rounded-t-lg h-[200px] w-[200px]" source={{ uri: product.image }} />
      </Pressable>
      <View className="flex flex-row">
        <TouchableOpacity className="bg-blue-600 color-white rounded-lg shadow px-5 py-2.5">-</TouchableOpacity>
        <TouchableOpacity onPress={() => addToCart(product)} className="bg-blue-600 color-white rounded-lg shadow px-5 py-2.5">
          +
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;
