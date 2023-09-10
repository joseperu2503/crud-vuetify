export interface Product {
  created_at: string;
  name: string;
  description: string;
  id: number;
  price: number;
  stock: number;
  images: string[];
  updated_at: string;
}

export interface ProductErrors {
  name?: string[];
  price?: string[];
  stock?: string[];
  images?: string[];
  description?: string[];
}

export interface ProductForm {
  name: string | null;
  description: string | null;
  price: number | null;
  stock: number | null;
  images: string[];
  colors: string[];
  genders: number[];
  sizes: number[];
  brand_id: number | null;
  category_id: number | null;
  is_public: boolean | null;
}

export interface Gender {
  id: number;
  name: string;
}

export interface Size {
  id: number;
  name: string;
}
export interface Category {
  id: number;
  name: string;
}
export interface Brand {
  id: number;
  name: string;
}
