export interface Product {
  created_at: string;
  name: string;
  id: number;
  price: number;
  stock: number;
  updated_at: string;
}

export interface ProductError {
  name?: string[];
  price?: string[];
  stock?: string[];
}

export interface ProductForm {
  name: string | null;
  price: number | null;
  stock: number | null;
}
