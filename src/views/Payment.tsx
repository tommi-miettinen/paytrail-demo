import { useState, useEffect } from "react";
import { View, Image } from "react-native";
import paytrailAPI from "../api/paytrailAPI";

const Payment = () => {
  const [providers, setProviders] = useState<PaymentMethod[]>([]);
  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    const data = await paytrailAPI.getPaymentProviders();
    if (!data) return;
    setProviders(data);
  };

  console.log(providers);

  return (
    <View>
      {providers.map((provider) => (
        <View key={provider.id}>
          <Image className="rounded-t-lg h-[100px] w-[100px]" source={{ uri: provider.icon }} />
          {provider.name}
        </View>
      ))}
    </View>
  );
};

export default Payment;
