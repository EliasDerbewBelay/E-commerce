export interface ButtonProps {
  title: string;
  style?: string;
  onAction?: () => void;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface ProductProps {
  id: number;
  name: string;
  price: number;
  category: string;
  description?: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  rating: number;
  reviewCount: number;
  stock: number;
}

export interface ProductListProps {
  product: ProductProps;
}
