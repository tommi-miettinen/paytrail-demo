declare module "*.css";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
  rating: {
    rate: number;
    count: number;
  };
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  svg: string;
  group: string;
}
