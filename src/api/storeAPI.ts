import axios from "axios";

const fetchProducts = async () => {
  const res = await axios.get("https://fakestoreapi.com/products?limit=5");

  return res.data;
};

export default { fetchProducts };
