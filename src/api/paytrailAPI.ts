import axios from "axios";
import { createPaytrailHeaders } from "../utils/paytrail.utils";
import { v4 as uuid } from "uuid";

const merchantId = 375917;
const PROXY_URL = "https://cors-anywhere.herokuapp.com";
const baseUrl = `${PROXY_URL}/https://services.paytrail.com`;

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  svg: string;
  group: string;
}

const getPaymentProviders = async () => {
  try {
    const response = await axios.get(`${baseUrl}/merchants/payment-providers`, {
      headers: await createPaytrailHeaders("GET"),
    });
    return response.data as PaymentMethod[];
  } catch (err) {
    console.log(err);
  }
};

const createPayment = async () => {
  try {
    const body = {
      stamp: uuid(),
      reference: "3759170",
      amount: 1525,
      currency: "EUR",
      language: "FI",
      items: [
        {
          unitPrice: 1525,
          units: 1,
          vatPercentage: 24,
          productCode: "#1234",
          deliveryDate: "2018-09-01",
        },
      ],
      customer: {
        email: "test.customer@example.com",
      },
      redirectUrls: {
        success: "http://localhost:19006/payment/success",
        cancel: "https://ecom.example.com/cart/cancel",
      },
    };

    const response = await axios.post(`${baseUrl}/payments`, body, {
      headers: await createPaytrailHeaders("POST", body),
    });

    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export default {
  getPaymentProviders,
  createPayment,
};
