export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const DEMO_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Classic Leather Sneakers",
    description: "Comfortable and stylish sneakers made from premium leather.",
    price: 89.99,
    image: "https://picsum.photos/id/1025/800/600", // dog photo - reliable
  },
  {
    id: 2,
    name: "Smartwatch Pro X",
    description: "Track your fitness, heart rate, and stay connected.",
    price: 149.99,
    image: "https://picsum.photos/id/1005/800/600",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    description: "Noise-cancelling headphones with superior sound quality.",
    price: 129.99,
    image: "https://picsum.photos/id/1057/800/600",
  },
  {
    id: 4,
    name: "Minimalist Backpack",
    description: "Durable and sleek backpack perfect for work or travel.",
    price: 79.99,
    image: "https://picsum.photos/id/1043/800/600",
  },
  {
    id: 5,
    name: "Elegant Wristwatch",
    description: "A timeless wristwatch crafted with precision and elegance.",
    price: 199.99,
    image: "https://picsum.photos/id/1011/800/600",
  },
  {
    id: 6,
    name: "Sleek Sunglasses",
    description: "Stylish UV-protected sunglasses for a cool everyday look.",
    price: 59.99,
    image: "https://picsum.photos/id/1010/800/600",
  },
  {
    id: 7,
    name: "Wireless Keyboard",
    description: "Compact and responsive keyboard with Bluetooth connectivity.",
    price: 49.99,
    image: "https://picsum.photos/id/1062/800/600",
  },
  {
    id: 8,
    name: "Ergonomic Office Chair",
    description: "Comfortable chair designed for long working hours.",
    price: 249.99,
    image: "https://picsum.photos/id/1027/800/600",
  },
];
