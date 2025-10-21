export interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

export interface ProductListProps {
  product: ProductProps;
}

