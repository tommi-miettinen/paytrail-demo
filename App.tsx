import React, { useEffect, useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import Navbar from "./src/components/Navbar";
import Store from "./src/views/Store";
import OrderSummary from "./src/views/OrderSummary";
import Payment from "./src/views/Payment";
import { useTotalItems } from "./src/store/cartStore";
import paytrailAPI from "./src/api/paytrailAPI";
import "./styles";

const App = () => {
  const [view, setView] = useState("store");
  const totalItems = useTotalItems();

  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      if (!url) return;
      if (url.includes("payment/success")) {
        setView("store");
      }
    };

    Linking.getInitialURL().then((url) => handleDeepLink({ url }));

    const listener = Linking.addEventListener("url", handleDeepLink);
    return () => listener.remove();
  }, []);

  const handlePayment = async () => {
    try {
      const result = await paytrailAPI.createPayment();

      await Linking.openURL(result.href as string);
    } catch (error) {}
  };

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
        <TouchableOpacity onPress={() => handlePayment()} className="sticky bottom-12 m-4 rounded-lg text-white p-4  bg-blue-600">
          Maksamaan {totalItems}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default App;
