import axios from "axios";
import { v4 as uuid } from "uuid";

const merchantId = 375917;
const secretKey = "SAIPPUAKAUPPIAS";

const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const baseUrl = "https://services.paytrail.com";

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  svg: string;
  group: string;
}

const textEncoder = new TextEncoder();

const calculateHmac = async (secret, params, body) => {
  const hmacPayload = Object.keys(params)
    .sort()
    .map((key) => [key, params[key]].join(":"))
    .concat(body ? JSON.stringify(body) : "")
    .join("\n");

  const key = await window.crypto.subtle.importKey("raw", textEncoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);

  const signature = await window.crypto.subtle.sign("HMAC", key, textEncoder.encode(hmacPayload));

  let hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

const getPaymentProviders = async () => {
  try {
    const headers: any = {
      "checkout-account": merchantId,
      "checkout-algorithm": "sha256",
      "checkout-method": "GET",
      "checkout-nonce": uuid(),
      "checkout-timestamp": new Date().toISOString(),
    };

    const signature = await calculateHmac(secretKey, headers, "");
    headers.signature = signature;

    const response = await axios.get(`${PROXY_URL}${baseUrl}/merchants/payment-providers`, {
      headers: headers,
    });

    return response.data as PaymentMethod[];
  } catch (err) {
    console.log(err);
  }
};

export default {
  getPaymentProviders,
};
