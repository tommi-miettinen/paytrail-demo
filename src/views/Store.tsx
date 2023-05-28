import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useProductStore, fetchProducts } from "../store/productStore";

const Store = () => {
  const products = useProductStore((state) => state.products);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
};

export default Store;
