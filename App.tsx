import React, { useEffect, useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import Navbar from "./src/components/Navbar";
import Store from "./src/views/Store";
import OrderSummary from "./src/views/OrderSummary";
import Payment from "./src/views/Payment";
import { useTotalItems } from "./src/store/cartStore";
import paytrailAPI from "./src/api/paytrailAPI";
import "./styles";

export default function App() {
  const [view, setView] = useState("store");
  const totalItems = useTotalItems();

  useEffect(() => {
    paytrailAPI.createPayment();
    const handleDeepLink = (event) => {
      let { url } = event;
      if (!url) return;
      if (url.includes("payment/success")) {
        setView("store");
      }
    };

    // Handle deep linking when the app is completely closed
    Linking.getInitialURL().then((url) => {
      console.log(url);
      let fakeEvent = { url };
      handleDeepLink(fakeEvent);
    });

    const listener = Linking.addEventListener("url", handleDeepLink);

    return () => listener.remove();
  }, []);

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
