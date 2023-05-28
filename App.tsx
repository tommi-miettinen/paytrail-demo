import React from "react";
import { View } from "react-native";
import Navbar from "./src/components/Navbar";
import Store from "./src/views/Store";

import "./styles";

export default function App() {
  return (
    <View className="bg-1 h-full w-full">
      <Navbar />
      <Store />
    </View>
  );
}
