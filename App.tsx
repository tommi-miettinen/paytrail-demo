import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Navbar from "./src/components/Navbar";
import Store from "./src/views/Store";
import OrderSummary from "./src/views/OrderSummary";
import Payment from "./src/views/Payment";
import { useTotalItems } from "./src/store/cartStore";

import "./styles";

export default function App() {
  const [view, setView] = useState("store");
  const totalItems = useTotalItems();
  return (
    <View className="bg-1 h-full w-full text-white">
      {view === "store" && <Store />}
      {view === "summary" && <OrderSummary />}
      {view === "payment" && <Payment />}
      {view === "store" && (
        <TouchableOpacity onPress={() => setView("summary")} className="sticky bottom-12 m-4 rounded-lg text-white p-4  bg-blue-600">
          Tarkastele tilausta {totalItems}
        </TouchableOpacity>
      )}
      {view === "summary" && (
        <TouchableOpacity onPress={() => setView("payment")} className="sticky bottom-12 m-4 rounded-lg text-white p-4  bg-blue-600">
          Siirry kassalle {totalItems}
        </TouchableOpacity>
      )}
    </View>
  );
}
