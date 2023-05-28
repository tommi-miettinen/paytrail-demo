import { v4 as uuid } from "uuid";

const merchantId = 375917;
const secretKey = "SAIPPUAKAUPPIAS";

const textEncoder = new TextEncoder();

const calculateHmac = async (secret: string, params: { [key: string]: string }, body: any) => {
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

export const createPaytrailHeaders = async (method: "GET" | "POST", body?: any) => {
  const headers: any = {
    "checkout-account": merchantId,
    "checkout-algorithm": "sha256",
    "checkout-method": method,
    "checkout-nonce": uuid(),
    "checkout-timestamp": new Date().toISOString(),
  };
  headers.signature = await calculateHmac(secretKey, headers, body ? body : "");

  return headers;
};
