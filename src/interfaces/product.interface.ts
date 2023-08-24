export interface Product {
  created_at: string;
  name: string;
  id: number;
  price: number;
  stock: number;
  image: string;
  updated_at: string;
}

export interface ProductErrors {
  name?: string[];
  price?: string[];
  stock?: string[];
  image?: string[];
}

export interface ProductForm {
  name: string | null;
  price: number | null;
  stock: number | null;
  image: string | null;
}
